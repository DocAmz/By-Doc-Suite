import { Button, buttonVariants } from "@/components/ui/button"
import Logo from '@/assets/logo/logo.png'
import Image from 'next/image'
import Link from "next/link"
import { cn } from "@/lib/utils"

const HomeHeader = () => {
  return (
    <header className="absolute top-0 z-50 w-full border-b border-primary bg-foreground bg-opacity-80 backdrop-blur">
      <div className="flex justify-between items-center p-4">
        <div>
          <Image src={Logo.src} alt="Logo" width={150} height={80}/>
        </div>
        <div className="flex gap-2">
        <Link className={cn(
          buttonVariants({ variant: "default" }),
          "rounded"
        )} href={"/register"} >Sign in</Link>
        <Link className={cn(
          buttonVariants({ variant: "destructive" }),
          "rounded"
        )} href={"/auth"} >Log in</Link>
        </div>

      </div>
    </header>
  )
}
export default HomeHeader