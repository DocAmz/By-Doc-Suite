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
import { useRouter } from 'next/navigation'
// TODO import {isValidEmail} from '@/lib/utils'

const RegistrationForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password || !firstname || !lastname) {
      setError('All fields are required');
      return;
    }
    try {
      const resUserExist = await fetch('/api/userExist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const { user } = await resUserExist.json();

      console.log('user', user);

      if (user) {
        setError('User already exists');
        return;
      }

      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, firstname, lastname })
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/auth');
      } else {
        setError('An error occurred when registering the user.');
      }
    } catch (error) {
      setError(`An error occurred when registering the user. ${error}`);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
    <Card className={`${error ? 'border-red-500' : ''}`}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Already have an account? <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">Sign in</Link>
        </CardDescription>
        {
          error && (
            <div className="w-full bg-red-50 rounded border border-red-500 p-2 text-center">
              <p className="text-red-500 text-xs font-light">{error}</p>
            </div>

          )
        }

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
        <Button type="submit" className="w-full">Create account</Button>
      </CardFooter>
    </Card>
    </form>
  );
}

export default RegistrationForm