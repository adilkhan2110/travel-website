import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import TourPackage from "../../../models/TourPackage";
import cloudinary from "../../../../lib/cloudinary";
export const runtime = "nodejs";

// GET one TourPackage
export async function GET(_, { params }) {
  await connectToDB();
  const tour = await TourPackage.findById(params.id);
  if (!tour) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ data: tour });
}

// UPDATE TourPackage
export async function PUT(req, { params }) {

    await connectToDB();

  const { id } = params;
  const formData = await req.formData();

  const title = formData.get("title");
  const priceINR = Number(formData.get("priceINR"));
  const nights = Number(formData.get("nights"));
  const days = Number(formData.get("days"));
  const image = formData.get("bannerImage");

  let bannerImagePath;

  if (image && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "tour-packages",
      public_id: `${Date.now()}_${image.name}`,
    });

    bannerImagePath = uploadRes.secure_url;
  }



  const updatedPackage = await TourPackage.findByIdAndUpdate(
    id,
    {
      title,
      priceINR,
      nights,
      days,
      ...(bannerImagePath && { bannerImage: bannerImagePath }),
    },
    { new: true }
  );

  return NextResponse.json({ success: true, data: updatedPackage });
}

// DELETE TourPackage
export async function DELETE(_, { params }) {
  await connectToDB();
  await TourPackage.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
