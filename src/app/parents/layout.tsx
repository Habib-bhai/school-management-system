import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ParentPortalSidebar } from "@/components/parentPortal/ParentPortalSidebar"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ParentPortalSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}
