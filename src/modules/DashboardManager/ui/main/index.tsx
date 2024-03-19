'use client'

import { set } from "date-fns"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import DashboardStore from "@/modules/DashboardManager/store/DashboardStore"
import { observer } from "mobx-react"

const MainSection = observer(() => {
  const [fileName, setFileName] = useState("New Document");
  const [docType, setDocType] = useState("");
  const [error, setError] = useState("text editor state");
  const [editorState, setEditorState] = useState("");
  const user = DashboardStore.getUser()


  const createNewDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fileName || !docType) {
      setError("All fields are required");
      return;
    }

    if (docType !== "TypeDoc") {
      setError("This document type doesn't exist");
      return;
    }
    console.log("Creating new document:", fileName, docType, user);

    if(!user) return


    try {
      const res = await fetch("/api/createTypeDoc", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ filename: fileName, userId: user.id, editorState: editorState }),
      });

      if (res.ok) {
        const responseData = await res.json();

        if (responseData.createdId) {

          const payload = {
            fileId: responseData.createdId,
            userId: user.id
          };
          const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");

          // Redirect to the specified URI (process.env.NEXT_PUBLIC_BYTYPE_URI)
          const redirectUrl = `${process.env.NEXT_PUBLIC_BYTPE_URI}/access?payload=${encodedPayload}`;

          window.location.href = redirectUrl;
        } else {
          console.error("No createdId found in the response data");
          setError("An error occurred when creating the document");
        }
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        setError("An error occurred when creating the document");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("An error occurred when creating the document");
    }
  };

  return (
    <div>
      <div className="flex">
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <form onSubmit={createNewDocument}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="fileName">Name</Label>
                    <Input id="fileName" name="fileName" placeholder="Name of your project" onChange={(e) => setFileName(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="type">Type</Label>
                    <Select onValueChange={(value) => setDocType(value)}>
                      <SelectTrigger id="docType" name="docType">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="TypeDoc">ByType</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Create</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
});

export default MainSection;