'use client'

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo/logo.png"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import AuthenticationForm from "./components/authentication.form"


export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Signin
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-foreground" />
          <div className="relative z-20 flex items-center text-lg font-medium">

            <Image src={Logo.src} alt="Logo" width={300} height={160}/>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email & your password below to login to your account
              </p>
            </div>
            <AuthenticationForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Did you forgot your password ? {" "}
              <Link
                href="/forgot-password"
                className="underline underline-offset-4 hover:text-primary"
              >
                Forgot password
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}