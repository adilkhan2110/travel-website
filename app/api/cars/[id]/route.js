import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Car from "../../../models/car";
import cloudinary from "../../../../lib/cloudinary";

 
// ✅ Update Car
export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const updateData = {};

    // fields update karne ke liye loop
    for (const [key, value] of formData.entries()) {
      if (key === "image" && typeof value !== "string") {
        // agar nayi image hai → upload to Cloudinary
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const dataURI = `data:${value.type};base64,${base64}`;

        const uploadRes = await cloudinary.uploader.upload(dataURI, {
          folder: "cars",
          public_id: `${Date.now()}_${value.name}`,
        });

        updateData.image = uploadRes.secure_url;
      } else {
        updateData[key] = value;
      }
    }

    const updatedCar = await Car.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!updatedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedCar });
  } catch (err) {
    console.error("PUT /cars/:id error:", err);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

// ✅ Delete Car
export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const deletedCar = await Car.findByIdAndDelete(params.id);

    if (!deletedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /cars/:id error:", err);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}
