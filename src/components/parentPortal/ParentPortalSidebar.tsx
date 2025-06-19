"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Users,
  User,
  Bell,
  Home,
  MessageCircle,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  Baby,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/parents",
    icon: Home,
  },
  {
    title: "Child's Assignments",
    url: "/parents/childsAssignments",
    icon: BookOpen,
    badge: "3 New",
  },
  {
    title: "Teachers",
    url: "/parents/teachers",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/parents/profile",
    icon: User,
  },
  {
    title: "Notifications",
    url: "/parents/notifications",
    icon: Bell,
    badge: "5",
  },
]

export function ParentPortalSidebar() {
  const pathname = usePathname()
  const [selectedChild, setSelectedChild] = useState("Emma Johnson")

  const children = [
    { name: "Emma Johnson", class: "Grade 8A", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Alex Johnson", class: "Grade 5B", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Baby className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Parent Portal</h2>
              <p className="text-sm text-muted-foreground">Sarah Johnson</p>
            </div>
          </div>

          {/* Child Selector */}
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center justify-between rounded-lg border p-2 text-left hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>EJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedChild}</p>
                      <p className="text-xs text-muted-foreground">Grade 8A</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {children.map((child) => (
                  <DropdownMenuItem key={child.name} onClick={() => setSelectedChild(child.name)}>
                    <Avatar className="mr-2 h-6 w-6">
                      <AvatarImage src={child.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{child.name}</p>
                      <p className="text-xs text-muted-foreground">{child.class}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} className="w-full justify-start">
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/parents/teachers" className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4" />
                      <span>Message Teachers</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/parents/childsAssignments" className="flex items-center gap-3">
                      <Calendar className="h-4 w-4" />
                      <span>View Assignments</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Parent Account</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
      <div className="flex items-center gap-2 border-b p-4 md:hidden">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Parent Portal</h1>
      </div>
    </>
  )
}
