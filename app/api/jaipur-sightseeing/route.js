import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import sightSeenSchema from "../../models/sightSeen";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req) {
  try {

      await connectToDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    
 

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 400 }
      );
    }

    // Convert to base64 and upload to Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "sight-SeenSchema",
      public_id: `${Date.now()}_${image.name}`,
    });

  

    const newVisa = new sightSeenSchema({
      title,
      description,
      image: uploadRes.secure_url, // ✅ Cloudinary URL
    });

    await newVisa.save();

    return NextResponse.json({ success: true, data: newVisa }, { status: 201 });
  } catch (err) {
    console.error("POST /visa error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  const [data, totalCount] = await Promise.all([
    sightSeenSchema.find(query)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit),
    sightSeenSchema.countDocuments(query),
  ]);

  return NextResponse.json({ data, totalCount });
}
