import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectToDB } from "../../lib/db";
import VisaPackage from "../../models/VisaPackage";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const days = Number(formData.get("days"));
    const nights = Number(formData.get("nights"));
    const priceINR = Number(formData.get("priceINR"));
    const description = formData.get("description");
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${image.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, fileName);
    fs.writeFileSync(uploadPath, buffer);

    await connectToDB();
    const newVisa = new VisaPackage({
      title,
      days,
      nights,
      priceINR,
      description,
      image: `/uploads/${fileName}`,
    });

    await newVisa.save();

    return NextResponse.json({ success: true, data: newVisa }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  const total = await VisaPackage.countDocuments(query);
  const data = await VisaPackage.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return NextResponse.json({
    data,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
}
