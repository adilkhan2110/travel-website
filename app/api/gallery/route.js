import { NextResponse } from "next/server";
 
import cloudinary from "../../../lib/cloudinary";
import { connectToDB } from "../../lib/db";
import GalleryItem from "../../models/GalleryItem";

export async function GET(req) {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const getAll = searchParams.get("all") === "true";

  if (getAll) {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: items, totalCount: items.length });
  }

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
    await connectToDB();


    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "gallery" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    const imageUrl = uploaded.secure_url;


    const newItem = new GalleryItem({ title, category, image: imageUrl });
    await newItem.save();

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
