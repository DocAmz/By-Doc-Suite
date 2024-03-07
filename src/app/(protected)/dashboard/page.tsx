'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import DashboardNavbar from "@/modules/DashboardManager/ui/navbar"
import DashboardSidebar from "@/modules/DashboardManager/ui/sidebar"
import MainSection from "@/modules/DashboardManager/ui/main"
import DashboardStore from "@/modules/DashboardManager/store/DashboardStore"
import { observer } from "mobx-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IuserPublic } from "@/modules/DashboardManager/type/user.type"


const  DashboardPage = observer(() => {
 const router = useRouter()
 const { data: session } = useSession()
 const [loadedUser, setUser] = useState<IuserPublic | null>(null);

 console.log('session', session)

 if (!session) {
  router.push('/auth')
  return null // Prevent rendering the rest of the component before redirection
}

const getUser = async () => {
  const response = await fetch('/api/userInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: session?.user?.email }),
  });
  return response.json();
};

useEffect(() => {
  getUser().then(res => {
    setUser(res);
    DashboardStore.setUser(res)
    console.log('User info:', res);
  }).catch(error => {
    console.error('Error fetching user info:', error);
  });
}, []);

  if(!loadedUser) return <div>Loading...</div>

  return (
    <div className="w-full h-full">
      <DashboardNavbar />
      {
        DashboardStore.displayProfile && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <h1>Profile</h1>
              <p>{loadedUser.firstname}</p>
              <p>{loadedUser.lastname}</p>
              <p>{loadedUser.email}</p>
              <Button onClick={() => DashboardStore.setDisplayProfile()}>Close</Button>
            </div>
          </div>
        )
      }
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={15}
        >
          <DashboardSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={85}
          className="bg-white p-4"
        >
          <MainSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )

})

export default DashboardPage