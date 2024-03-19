import User from "@/lib/mongo/models/user.model";
import { connectMongoDB } from "@/lib/mongo/mongo";
import { middleware } from "@/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('✨ userID route');
  console.log('req:', req);
  console.log('req.query:', req.query);
  try {
    const { userId } = req.query; // Access the 'id' route parameter from req.query

    // Fetch user data using the GetUser function
    await connectMongoDB();

    const userData = await User.findOne({ _id: userId });

    // Check if user data is obtained successfully
    if (userData) {
      return res.status(200).json({ message: 'User found', data: userData });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: 'An error occurred when getting the user.' });
  }

}