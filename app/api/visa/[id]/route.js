import { NextResponse } from "next/server";
import VisaPackage from "../../../models/VisaPackage";
import { connectToDB } from "../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";

export const runtime = "nodejs";

// GET visa by ID
export async function GET(req, { params }) {
  await connectToDB();
  const visa = await VisaPackage.findById(params.id);
  if (!visa) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: visa });
}

// UPDATE visa
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const priceINR = formData.get("priceINR");
    const description = formData.get("description");
    const processing = formData.get("processing");
    const validity = formData.get("validity");
    const requirementsRaw = formData.get("requirements");
    const days = formData.get("days");
    const image = formData.get("image");

    const requirements = JSON.parse(requirementsRaw || "[]");

    let updateData = {
      title,
      priceINR,
      description,
      processing,
      validity,
      requirements,
      days,
    };

    // Check and upload image if provided
    if (image && typeof image !== "string") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataURI = `data:${image.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "visa-packages",
        public_id: `${Date.now()}_${image.name}`,
      });

      updateData.image = uploadRes.secure_url;
    }

    const updated = await VisaPackage.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PUT /visa error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE visa
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    await VisaPackage.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
