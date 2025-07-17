import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import GalleryItem from "../../../models/GalleryItem";
import cloudinary from "../../../../lib/cloudinary";

export const runtime = "nodejs";

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

  if (image && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 for Cloudinary upload
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64Image}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "gallery",
      public_id: `${Date.now()}_${image.name}`,
    });

    updatedFields.image = uploadRes.secure_url;
  }

  const updatedItem = await GalleryItem.findByIdAndUpdate(
    params.id,
    updatedFields,
    { new: true }
  );

  return NextResponse.json(updatedItem, { status: 200 });
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Optionally delete from Cloudinary if stored
    if (item.image?.includes("res.cloudinary.com")) {
      const publicId = item.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      await cloudinary.uploader.destroy(`gallery/${publicId}`);
    }

    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
