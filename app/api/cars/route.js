import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Car from "../../models/car";
import cloudinary from "../../../lib/cloudinary";

// ✅ Create Car
export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const type = formData.get("type");
    const adults = parseInt(formData.get("adults"));
    const driver = parseInt(formData.get("driver"));
    const fuel_type = formData.get("fuel_type");
    const transmission = formData.get("transmission") || "Manual";
    const ac = formData.get("ac") === "true";
    const heater = formData.get("heater") === "true";
    const luggage_space = formData.get("luggage_space") || "Medium";
    const price_per_km = parseFloat(formData.get("price_per_km")) || 0;
    const status = formData.get("status") || "Available";
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 400 }
      );
    }

    // Convert & upload image to Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "cars",
      public_id: `${Date.now()}_${image.name}`,
    });

    // Save in DB
    const newCar = new Car({
      name,
      type,
      capacity: { adults, driver },
      fuel_type,
      transmission,
      ac,
      heater,
      luggage_space,
      image: uploadRes.secure_url,
      price_per_km,
      status,
    });

    await newCar.save();

    return NextResponse.json({ success: true, data: newCar }, { status: 201 });
  } catch (err) {
    console.error("POST /cars error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ✅ Get Cars (with pagination & search)
export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const [data, totalCount] = await Promise.all([
      Car.find(query)
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit),
      Car.countDocuments(query),
    ]);

    return NextResponse.json({ data, totalCount });
  } catch (err) {
    console.error("GET /cars error:", err);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
