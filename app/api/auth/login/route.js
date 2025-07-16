// app/api/auth/login/route.js
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
 
 
 
import { connectToDB } from "../../../lib/db";
import User from "../../../models/User";
import { signToken } from "../../../lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken(user._id);
    return NextResponse.json({ token, userId: user._id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
