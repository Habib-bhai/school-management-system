"use client"

import { useState } from "react"
import { MessageCircle, Search, Filter, Phone, Mail, User, Calendar } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Parent {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  initials: string
  studentName: string
  studentId: string
  studentClass: string
  studentSection: string
  lastContact: string
  relationship: "Father" | "Mother" | "Guardian"
  isOnline: boolean
  unreadMessages: number
}

export default function TeacherParentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  // Sample parents data
  const parents: Parent[] = [
    {
      id: "parent-1",
      name: "Robert Smith",
      email: "robert.smith@email.com",
      phone: "+1 (555) 123-4567",
      initials: "RS",
      studentName: "Jamie Smith",
      studentId: "student-1",
      studentClass: "Grade 11",
      studentSection: "A",
      lastContact: "2 days ago",
      relationship: "Father",
      isOnline: true,
      unreadMessages: 2,
    },
    {
      id: "parent-2",
      name: "Maria Johnson",
      email: "maria.johnson@email.com",
      phone: "+1 (555) 234-5678",
      initials: "MJ",
      studentName: "Alex Johnson",
      studentId: "student-2",
      studentClass: "Grade 11",
      studentSection: "A",
      lastContact: "1 week ago",
      relationship: "Mother",
      isOnline: false,
      unreadMessages: 0,
    },
    {
      id: "parent-3",
      name: "Carlos Rodriguez",
      email: "carlos.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      initials: "CR",
      studentName: "Emily Rodriguez",
      studentId: "student-3",
      studentClass: "Grade 11",
      studentSection: "A",
      lastContact: "3 days ago",
      relationship: "Father",
      isOnline: true,
      unreadMessages: 1,
    },
    {
      id: "parent-4",
      name: "Linda Chen",
      email: "linda.chen@email.com",
      phone: "+1 (555) 456-7890",
      initials: "LC",
      studentName: "Michael Chen",
      studentId: "student-4",
      studentClass: "Grade 11",
      studentSection: "A",
      lastContact: "5 days ago",
      relationship: "Mother",
      isOnline: false,
      unreadMessages: 0,
    },
    {
      id: "parent-5",
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "+1 (555) 567-8901",
      initials: "DL",
      studentName: "Samantha Lee",
      studentId: "student-5",
      studentClass: "Grade 11",
      studentSection: "A",
      lastContact: "1 day ago",
      relationship: "Father",
      isOnline: true,
      unreadMessages: 0,
    },
    {
      id: "parent-6",
      name: "Sarah Kim",
      email: "sarah.kim@email.com",
      phone: "+1 (555) 678-9012",
      initials: "SK",
      studentName: "David Kim",
      studentId: "student-6",
      studentClass: "Grade 10",
      studentSection: "B",
      lastContact: "4 days ago",
      relationship: "Mother",
      isOnline: false,
      unreadMessages: 3,
    },
    {
      id: "parent-7",
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 789-0123",
      initials: "JW",
      studentName: "Olivia Wilson",
      studentId: "student-7",
      studentClass: "Grade 10",
      studentSection: "B",
      lastContact: "2 hours ago",
      relationship: "Father",
      isOnline: true,
      unreadMessages: 1,
    },
    {
      id: "parent-8",
      name: "Patricia Brown",
      email: "patricia.brown@email.com",
      phone: "+1 (555) 890-1234",
      initials: "PB",
      studentName: "Ethan Brown",
      studentId: "student-8",
      studentClass: "Grade 10",
      studentSection: "B",
      lastContact: "1 week ago",
      relationship: "Mother",
      isOnline: false,
      unreadMessages: 0,
    },
  ]

  // Filter parents based on search query
  const filteredParents = parents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group parents by class
  const parentsByClass = filteredParents.reduce(
    (acc, parent) => {
      const classKey = `${parent.studentClass} - Section ${parent.studentSection}`
      if (!acc[classKey]) {
        acc[classKey] = []
      }
      acc[classKey].push(parent)
      return acc
    },
    {} as Record<string, Parent[]>,
  )

  return (
    <div className="container py-6 md:py-10">
      <header className="md:px-10 mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium">Parent Communication</h1>
            <p className="text-muted-foreground">Connect with parents about their children's progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>
        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search parents or students..."
              className="h-9 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full md:px-10">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Parents</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
          <TabsTrigger value="unread">Unread ({parents.filter((p) => p.unreadMessages > 0).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-6">
            {Object.entries(parentsByClass).map(([className, classParents]) => (
              <div key={className}>
                <h3 className="text-lg font-medium mb-4">{className}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {classParents.map((parent) => (
                    <Card key={parent.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                                <AvatarFallback>{parent.initials}</AvatarFallback>
                              </Avatar>
                              {parent.isOnline && (
                                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-base">{parent.name}</CardTitle>
                              <CardDescription>{parent.relationship}</CardDescription>
                            </div>
                          </div>
                          {parent.unreadMessages > 0 && (
                            <Badge className="bg-red-500 hover:bg-red-600">{parent.unreadMessages}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{parent.studentName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">{parent.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{parent.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Last contact: {parent.lastContact}</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1 gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="online" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredParents
              .filter((parent) => parent.isOnline)
              .map((parent) => (
                <Card key={parent.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                            <AvatarFallback>{parent.initials}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{parent.name}</CardTitle>
                          <CardDescription>{parent.relationship}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{parent.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate">{parent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{parent.phone}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredParents
              .filter((parent) => parent.unreadMessages > 0)
              .map((parent) => (
                <Card key={parent.id} className="overflow-hidden hover:shadow-md transition-shadow border-red-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                            <AvatarFallback>{parent.initials}</AvatarFallback>
                          </Avatar>
                          {parent.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-base">{parent.name}</CardTitle>
                          <CardDescription>{parent.relationship}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-red-500 hover:bg-red-600">{parent.unreadMessages} unread</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{parent.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate">{parent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{parent.phone}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredParents.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No parents found</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground max-w-md">
            {searchQuery
              ? "Try adjusting your search query to find what you're looking for."
              : "No parent contacts are available."}
          </p>
        </div>
      )}
    </div>
  )
}
