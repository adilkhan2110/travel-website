import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import TourPackage from "../../../models/TourPackage";


export async function GET(_, { params }) {
  await connectToDB();
  const tour = await TourPackage.findById(params.id);
  if (!tour) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ data: tour });
}

export async function PUT(req, { params }) {
  const { id } = params;

  const formData = await req.formData(); // ✅ instead of req.json()

  const title = formData.get("title");
  const priceINR = Number(formData.get("priceINR"));
  const nights = Number(formData.get("nights"));
  const days = Number(formData.get("days"));
  const image = formData.get("bannerImage");

  let bannerImagePath;

  if (image && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${image.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
    fs.writeFileSync(uploadPath, buffer);
    bannerImagePath = `/uploads/${fileName}`;
  }

  await connectToDB();

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

export async function DELETE(_, { params }) {
  await connectToDB();
  await TourPackage.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
