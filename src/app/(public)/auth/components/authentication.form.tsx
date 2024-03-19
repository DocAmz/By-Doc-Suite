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
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const AuthenticationForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res && res.error) {
        setError('Invalid credentials');
        return;
      }

      router.replace('dashboard');
    }
    catch (error) {
      setError('Invalid credentials');
      console.error('Crdentials error :: ', error);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          {
            error && (
              <div className="w-full bg-red-50 rounded border border-red-500 p-2 text-center">
                <p className="text-red-500 text-xs font-light">{error}</p>
              </div>

            )
          }
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Log In</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default AuthenticationForm;