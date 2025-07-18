import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { connectToDB } from "../../../lib/db";
import User from "../../../models/User";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    console.log("Body parsed:", body);

    const { email, password } = body;
    console.log("Email:", email, "Password length:", password?.length);

    console.log("Connecting to DB...");
    console.log("DB connected");

    console.log("Checking user exists...");
    const userExists = await User.findOne({ email });
    console.log("User exists:", !!userExists);

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed");

    console.log("Creating user...");
    const newUser = await User.create({ email, password: hashedPassword });
    console.log("User created:", newUser._id);

    return NextResponse.json(
      { message: "User created", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
