import { NextResponse } from "next/server";
import Holiday from "../../../models/Holiday";
import { connectToDB } from "../../../lib/db";
 

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
    const data = await req.json(); // JSON, not FormData
    const updated = await Holiday.findByIdAndUpdate(params.id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Update failed" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
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
