import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export const DashboardNavbar = () => {

  return (
    <header className="sticky top-0 z-50 border border-b w-full bg-background">
      <div className="flex justify-between items-center w-full px-4 py-2 gap-4">
        <div className="">
          <h1>Logo</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Input id="search" type="text" placeholder="Search" className="rounded-xl border-none shadow-none bg-white w-full" />
        </div>
        <div className="">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </div>
      </div>
  </header>
  )
}

export default DashboardNavbar