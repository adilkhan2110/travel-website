import { NextResponse } from "next/server";
import TourPackage from "../../models/TourPackage";
import fs from "fs";
import path from "path";
import { connectToDB } from "../../lib/db";

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

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${image.name}`;
  const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

  fs.writeFileSync(uploadPath, buffer);

  await connectToDB();
  const newPackage = new TourPackage({
    title,
    priceINR,
    nights,
    days,
    bannerImage: `/uploads/${fileName}`,
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
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  const total = await TourPackage.countDocuments(query);
  const packages = await TourPackage.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return NextResponse.json(
    {
      data: packages,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    },
    { status: 200 }
  );
}
