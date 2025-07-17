import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Holiday from "../../../models/Holiday";
import cloudinary from "../../../../lib/cloudinary";  

export const runtime = "nodejs";

// GET one
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const holiday = await Holiday.findById(params.id);
    if (!holiday) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(holiday);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// UPDATE
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const form = await req.formData();

    const data = {
      title: form.get("title"),
      price: form.get("price"),
      country: form.get("country"),
      nights: form.get("nights"),
      days: form.get("days"),
      includes: JSON.parse(form.get("includes") || "[]"),
    };

    const image = form.get("image");

    if (image && typeof image !== "string") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${image.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataUri, {
        folder: "holidays",
        public_id: `${Date.now()}_${image.name}`,
      });

      data.image = uploadRes.secure_url; // ✅ Save Cloudinary image URL
    }

    const updated = await Holiday.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ error: "Update failed" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const deleted = await Holiday.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
