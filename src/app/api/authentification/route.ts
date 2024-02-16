import User from "@/lib/mongo/models/user.model";
import { connectMongoDB } from "@/lib/mongo/mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstname, lastname } = await req.json();

    // Validate input
    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Connect to MongoDB
    await connectMongoDB();

    // Create user
    await User.create({ email, password: hashedPassword, firstname, lastname });

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'An error occurred when registering the user.' }, { status: 500 });
  }
}

function isValidEmail(email: string): boolean {
  // Add email validation logic here
  // For example, you can use a regular expression to validate the email format
  return /\S+@\S+\.\S+/.test(email);
}