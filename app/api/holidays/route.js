import { NextResponse } from "next/server";
 
import { connectToDB } from "../../lib/db";

import fs from "fs";
import path from "path";
import Holiday from "../../models/Holiday";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const price = formData.get("price");
    const country = formData.get("country");
    const nights = formData.get("nights");
    const days = formData.get("days");
    const includes = JSON.parse(formData.get("includes") || "[]");
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Invalid image" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const imageName = `${Date.now()}_${image.name}`;
    const imagePath = path.join(uploadsDir, imageName);
    fs.writeFileSync(imagePath, buffer);

    await connectToDB();

    const newHoliday = new Holiday({
      title,
      price,
      country,
      nights,
      days,
      includes,
      image: `/uploads/${imageName}`,
    });

    await newHoliday.save();

    return NextResponse.json({ message: "Holiday created successfully" }, { status: 201 });
  } catch (err) {
    console.error("Holiday creation failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const data = await Holiday.find();
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
