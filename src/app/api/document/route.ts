import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data } = req.body;

    if (!process.env.MONGODB_URI) return res.status(500).json({ message: 'MongoDB URI is not defined' });
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();
      const database = client.db('bydocprovider');
      const collection = database.collection('my-new-collection');

      await collection.insertOne({ data });
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    if (!process.env.MONGODB_URI) return res.status(500).json({ message: 'MongoDB URI is not defined' });
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();
      const database = client.db('by-doc-document');
      const collection = database.collection('my-new-collection');

      // Example: Retrieve data from MongoDB and send it as a response
      const data = await collection.find().toArray();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    res.status(405).json({ message: 'Method not implemented' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    res.status(405).json({ message: 'Method not implemented' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    res.status(405).json({ message: 'Method not implemented' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}