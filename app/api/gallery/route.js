import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { connectToDB } from "../../lib/db";
import GalleryItem from "../../models/GalleryItem";

export async function GET(req) {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");

  const skip = page * limit;

  const [items, totalCount] = await Promise.all([
    GalleryItem.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    GalleryItem.countDocuments(),
  ]);

  return NextResponse.json({ data: items, totalCount });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${image.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, fileName);
    fs.writeFileSync(uploadPath, buffer);
    const imageUrl = `/uploads/${fileName}`;

    await connectToDB();
    const newItem = new GalleryItem({ title, category, image: imageUrl });
    await newItem.save();

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
