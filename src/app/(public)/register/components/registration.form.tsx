'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

const RegistrationForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {}

  return (
    <form>
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Already have an account? <Link href="/auth/login">Sign in</Link>
          Enter your email below to create your account
        </CardDescription>

      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First name *</Label>
            <Input id="firstname" type="text" onChange={e => setFirstname(e.target.value)} placeholder="First name" />
          </div>
          <div className="grid gap-2">
            <Label  htmlFor="lastname">Last name *</Label>
            <Input id="lastname" type="text" onChange={e => setLastname(e.target.value)} placeholder="Last name" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" onChange={e => setEmail(e.target.value) } placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password *</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>Create account</Button>
        <Link href="/auth/login"></Link>
      </CardFooter>
    </Card>
    </form>
  );
}

export default RegistrationForm