import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Holiday from "../../../models/Holiday";

import { writeFile } from "fs/promises";
import path from "path";
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

    if (image && image.arrayBuffer) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = Date.now() + "-" + image.name;
      const filepath = path.join("public/uploads", filename);
      await writeFile(filepath, buffer);
      data.image = `/uploads/${filename}`;
    }

    const updated = await Holiday.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ error: "Update failed" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
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
