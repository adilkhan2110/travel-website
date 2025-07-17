import { NextResponse } from "next/server";
import VisaPackage from "../../../models/VisaPackage";
import { connectToDB } from "../../../lib/db";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  await connectToDB();
  const visa = await VisaPackage.findById(params.id);
  if (!visa) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: visa });
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const body = await req.json();
    const updated = await VisaPackage.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    await VisaPackage.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
