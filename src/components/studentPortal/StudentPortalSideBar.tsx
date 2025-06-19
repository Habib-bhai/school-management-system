"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardList,
  Home,
  LogOut,
  Medal,
  MessageCircle,
  Settings,
  User,
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
  { name: "Dashboard", href: "/student/dashboard", icon: Home },
  { name: "Homework", href: "/student/homework", icon: ClipboardList },
  { name: "Quizzes", href: "/student/quizzes", icon: BookOpen },
  { name: "Chat", href: "/student/chat", icon: MessageCircle },
  { name: "Calendar", href: "/student/calendar", icon: Calendar },
  { name: "Leaderboard", href: "/student/leaderboard", icon: Medal },
  { name: "Analytics", href: "/student/analytics", icon: BarChart3 },
]

export function StudentPortalSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const [progress] = useState(78)

  return (
    <>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="flex flex-col items-center justify-center py-6">
          {!isMobile && (
            <>
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src="/placeholder-user.jpg" alt="Student" />
                  <AvatarFallback className="bg-primary/10 text-primary">JS</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-1 -right-1 bg-amber-500 hover:bg-amber-600">3</Badge>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-medium">Jamie Smith</h3>
                <p className="text-xs text-muted-foreground">Grade 11 • ID: 2023045</p>
              </div>
              <div className="mt-4 w-full px-4">
                <div className="flex items-center justify-between text-xs">
                  <span>Completion</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="mt-1 h-1.5" />
              </div>
            </>
          )}
          {isMobile && (
            <div className="flex items-center justify-between w-full px-2">
              <h2 className="text-lg font-serif font-medium">Student Portal</h2>
              <SidebarTrigger />
            </div>
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
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
                <Link href="/student/profile">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/student/settings">
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
