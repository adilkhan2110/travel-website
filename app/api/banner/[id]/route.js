import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Banner from "../../../models/header-banner";  // <-- apna banner model
import cloudinary from "../../../../lib/cloudinary";

export const runtime = "nodejs";

// ✅ GET Banner by ID
export async function GET(_, { params }) {
  await connectToDB();
  const banner = await Banner.findById(params.id);
  if (!banner) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(banner, { status: 200 });
}

// ✅ UPDATE Banner
export async function PUT(req, { params }) {
  await connectToDB();

  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  let updatedFields = { title, description };

  if (image && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 for Cloudinary upload
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64Image}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "banner", // ✅ gallery ki jagah banner
      public_id: `${Date.now()}_${image.name}`,
    });

    updatedFields.image = uploadRes.secure_url;
  }

  const updatedItem = await Banner.findByIdAndUpdate(params.id, updatedFields, {
    new: true,
  });

  return NextResponse.json(updatedItem, { status: 200 });
}

// ✅ DELETE Banner
export async function DELETE(_, { params }) {
  try {
    await connectToDB();

    const { id } = params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // ✅ Delete from Cloudinary if stored
    if (banner.image?.includes("res.cloudinary.com")) {
      const publicId = banner.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`banner/${publicId}`);
    }

    await Banner.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
