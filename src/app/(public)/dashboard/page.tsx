import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import DashboardNavbar from "@/modules/ui/navbar"
import DashboardSidebar from "@/modules/ui/sidebar"

export default function DashboardPage() {

  return (
    <div className="w-full h-full">
      <DashboardNavbar />
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
          Two
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )

}
