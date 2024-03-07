import TypeDoc from "@/lib/mongo/models/type.document.model";
import { connectMongoDB } from "@/lib/mongo/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { filename, userId, editorState } = await req.json();

    if (!filename) {
      return NextResponse.json({ message: "Filename is required" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ message: "Unknown user ID" }, { status: 400 });
    }

    await connectMongoDB();
    console.log("Connected - Creating the document");

    const newDoc = await TypeDoc.create({ filename, userId, editorState: "" });
    console.log("Created document:", newDoc);

    console.log("Created - Building response");
    return NextResponse.json({ message: "File created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating TypeDoc:", error);
    return NextResponse.json({ message: "An error occurred when creating the document." }, { status: 500 });
  }
}