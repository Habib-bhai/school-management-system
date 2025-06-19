import type React from "react"
import type { Metadata } from "next"

import { SidebarProvider } from "@/components/ui/sidebar"
import { TeacherPortalSidebar } from "@/components/teacherPortal/TeacherportalSidebar"

export const metadata: Metadata = {
  title: "Teacher Portal",
  description: "A comprehensive teacher portal for managing classes, students, and curriculum",
}

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // TODO: Add RBAC guard here to ensure only teachers can access these routes
    <SidebarProvider>
      <div className="flex min-h-screen">
        <TeacherPortalSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
