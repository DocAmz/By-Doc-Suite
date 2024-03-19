import TypeDoc from "@/lib/mongo/models/type.document.model";
import { connectMongoDB } from "@/lib/mongo/mongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  try {
    const id = req.query.id as string; // Access the 'id' route parameter from req.query
    console.log('id:', id);

    // Fetch user data using the GetUser function
    await connectMongoDB();

    const documentData = await TypeDoc.findOne({ _id: id });

    // Check if user data is obtained successfully
    if (documentData) {
      return res.status(200).json({ message: 'User found', data: documentData });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: 'An error occurred when getting the user.' });
  }
}