import { NextResponse } from "next/server";
import TourPackage from "../../models/TourPackage";
import { connectToDB } from "../../lib/db";
import cloudinary from "../../../lib/cloudinary"; 

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const priceINR = Number(formData.get("priceINR"));
  const nights = Number(formData.get("nights"));
  const days = Number(formData.get("days"));
  const image = formData.get("bannerImage");

  if (!image || typeof image === "string") {
    return NextResponse.json({ error: "Image upload failed" }, { status: 400 });
  }

  // Convert image to base64
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataURI = `data:${image.type};base64,${base64}`;

  // Upload to Cloudinary
  const uploadRes = await cloudinary.uploader.upload(dataURI, {
    folder: "tour-packages",
    public_id: `${Date.now()}_${image.name}`,
  });

  await connectToDB();

  const newPackage = new TourPackage({
    title,
    priceINR,
    nights,
    days,
    bannerImage: uploadRes.secure_url, // Use Cloudinary URL instead of local path
  });

  await newPackage.save();

  return NextResponse.json(
    { success: true, data: newPackage },
    { status: 201 }
  );
}

export async function GET(req) {
  await connectToDB();

  const { searchParams } = new URL(req.url);

  const getAll = searchParams.get("all") === "true";
  const search = searchParams.get("search") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = parseInt(searchParams.get("limit") || "10");

  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  if (getAll) {
    const items = await TourPackage.find(query).sort({ createdAt: -1 });
    return NextResponse.json({
      data: items,
      totalCount: items.length,
    });
  }

  const skip = (page - 1) * limit;

  const [items, totalCount] = await Promise.all([
    TourPackage.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    TourPackage.countDocuments(query),
  ]);

  return NextResponse.json({
    data: items,
    totalCount,
  });
}
