import User from "@/lib/mongo/models/user.model";
import { connectMongoDB } from "@/lib/mongo/mongo";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (user) {
      const publicUser = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }
      return NextResponse.json(publicUser, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return NextResponse.json({ message: 'An error occurred when checking if the user exists.' }, { status: 500 });
  }
}

