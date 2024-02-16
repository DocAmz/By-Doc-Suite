'use client'

import { set } from "date-fns"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const MainSection = () => {

  const [inputData, setInputData] = useState('')

  const handleSaveData = async () => {
    const response = await fetch('/api/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputData }),
    });

    if (response.ok) {
      console.log('Data saved successfully');
      setInputData('');
    } else {
      console.error('Something went wrong');
    }
  }

  return (
    <div>
      <h1>Main Section</h1>
      <Input
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
       />
       <Button onClick={handleSaveData}>Save Data</Button>
    </div>
  )
}

export default MainSection