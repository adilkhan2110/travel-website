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
  await connectToDB();
  const data = await req.json();

  const updated = await TourPackage.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(_, { params }) {
  await connectToDB();
  await TourPackage.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
