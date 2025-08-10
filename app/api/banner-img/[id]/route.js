import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Banner from "../../../models/Banner"; // ✅ Use Banner model
import cloudinary from "../../../../lib/cloudinary";

export const runtime = "nodejs";

// ✅ GET Banner by ID
export async function GET(_, { params }) {
  await connectToDB();
  const item = await Banner.findById(params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item, { status: 200 });
}

// ✅ UPDATE Banner by ID
export async function PUT(req, { params }) {
  await connectToDB();

  const formData = await req.formData();
  const heading = formData.get("heading");
  const description = formData.get("description");
  const image = formData.get("image");

  let updatedFields = { heading, description };

  // ✅ If new image is uploaded
  if (image && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64Image}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "banners",
      public_id: `${Date.now()}_${image.name}`,
    });

    updatedFields.image = uploadRes.secure_url;
  }

  const updatedItem = await Banner.findByIdAndUpdate(params.id, updatedFields, {
    new: true,
  });

  if (!updatedItem) {
    return NextResponse.json({ error: "Banner not found" }, { status: 404 });
  }

  return NextResponse.json(updatedItem, { status: 200 });
}

// ✅ DELETE Banner by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const item = await Banner.findById(id);

    if (!item) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // ✅ Delete from Cloudinary if exists
    if (item.image?.includes("res.cloudinary.com")) {
      const publicId = item.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    await Banner.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
