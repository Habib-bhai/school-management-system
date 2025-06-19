"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Users,
  UserCheck,
  FileText,
  Award,
  Megaphone,
  LogOut,
  Settings,
  User,
  MessageCircle,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { name: "Syllabus", href: "/teacher/syllabus", icon: BookOpen },
  { name: "Classes", href: "/teacher/classes", icon: Users },
  { name: "Parents", href: "/teacher/parents", icon: UserCheck },
  { name: "Chat", href: "/teacher/chat", icon: MessageCircle },
  { name: "Requests", href: "/teacher/requests", icon: FileText },
  { name: "Achievements", href: "/teacher/achievements", icon: Award },
  { name: "Announcements", href: "/teacher/announcements", icon: Megaphone },
]

export function TeacherPortalSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const [syllabusProgress] = useState(85)

  return (
    <>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="flex flex-col items-center justify-center py-6">
          {!isMobile && (
            <>
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src="/placeholder-user.jpg" alt="Teacher" />
                  <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-1 -right-1 bg-green-500 hover:bg-green-600">5</Badge>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-medium">Prof. Sarah Johnson</h3>
                <p className="text-xs text-muted-foreground">Physics Department • ID: T2023012</p>
              </div>
              <div className="mt-4 w-full px-4">
                <div className="flex items-center justify-between text-xs">
                  <span>Syllabus Progress</span>
                  <span className="font-medium">{syllabusProgress}%</span>
                </div>
                <Progress value={syllabusProgress} className="mt-1 h-1.5" />
              </div>
            </>
          )}
          {isMobile && (
            <div className="flex items-center justify-between w-full px-2">
              <h2 className="text-lg font-serif font-medium">Teacher Portal</h2>
              <SidebarTrigger />
            </div>
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.name}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-border py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link href="/teacher/profile">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/teacher/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Logout">
                <button className="w-full">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {!isMobile && (
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <SidebarTrigger />
        </div>
      )}
    </>
  )
}
