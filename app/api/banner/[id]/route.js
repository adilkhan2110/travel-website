// app/api/banner/[id]/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
 import Banner from "../../../models/header-banner";
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const banner = await Banner.findById(params.id);
    
    if (!banner) {
      return NextResponse.json({ success: false, message: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const heading = formData.get("heading");
    const description = formData.get("description");
    const image = formData.get("image");

    const updateData = {
      heading,
      description,
    };

    // Handle new image upload
    if (image && typeof image !== "string") {
      // Get existing banner to delete old image
      const existingBanner = await Banner.findById(params.id);
      
      // Ensure uploads directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory might already exist
      }

      // Generate unique filename
      const filename = `${Date.now()}-${image.name}`;
      const filepath = path.join(uploadDir, filename);

      // Convert file to buffer and save
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      updateData.image = `/uploads/${filename}`;

      // Delete old image file if it exists
      if (existingBanner?.image && existingBanner.image.startsWith('/uploads/')) {
        try {
          const oldImagePath = path.join(process.cwd(), 'public', existingBanner.image);
          await unlink(oldImagePath);
        } catch (err) {
          console.log('Old image not found or already deleted');
        }
      }
    }

    const banner = await Banner.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!banner) {
      return NextResponse.json({ success: false, message: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    
    // Get banner to delete associated image
    const banner = await Banner.findById(params.id);
    
    if (!banner) {
      return NextResponse.json({ success: false, message: 'Banner not found' }, { status: 404 });
    }

    // Delete image file if it exists
    if (banner.image && banner.image.startsWith('/uploads/')) {
      try {
        const imagePath = path.join(process.cwd(), 'public', banner.image);
        await unlink(imagePath);
      } catch (err) {
        console.log('Image file not found or already deleted');
      }
    }

    const deleted = await Banner.deleteOne({ _id: params.id });
    
    if (!deleted.deletedCount) {
      return NextResponse.json({ success: false, message: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}