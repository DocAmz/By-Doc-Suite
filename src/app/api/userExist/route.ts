import User from "@/lib/mongo/models/user.model";
import { connectMongoDB } from "@/lib/mongo/mongo";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({email}).select('_id')
    console.log('user',  user)
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return NextResponse.json({ message: 'An error occurred when checking if the user exists.' }, { status: 500 });
  }
}