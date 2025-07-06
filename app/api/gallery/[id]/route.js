import { NextResponse } from "next/server";
 
 
import fs from "fs";
import path from "path";
import { connectToDB } from "../../../lib/db";
import GalleryItem from "../../../models/GalleryItem";

export async function GET(_, { params }) {
  await connectToDB();
  const item = await GalleryItem.findById(params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item, { status: 200 });
}

export async function PUT(req, { params }) {
  await connectToDB();

  const formData = await req.formData();
  const title = formData.get("title");
  const category = formData.get("category");
  const image = formData.get("image");

  let updatedFields = { title, category };

  // handle new image
  if (image && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${image.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
    fs.writeFileSync(uploadPath, buffer);
    updatedFields.image = `/uploads/${fileName}`;
  }

  const updatedItem = await GalleryItem.findByIdAndUpdate(params.id, updatedFields, { new: true });

  return NextResponse.json(updatedItem, { status: 200 });
}

export async function DELETE(_, { params }) {
  await connectToDB();
  const deleted = await GalleryItem.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true }, { status: 200 });
}
