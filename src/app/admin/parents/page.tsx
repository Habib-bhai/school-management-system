"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Users,
  MessageSquare,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Plus,
  Edit,
} from "lucide-react"

const parents = [
  {
    id: 1,
    name: "Robert Johnson",
    email: "robert.johnson@email.com",
    phone: "+1 (555) 987-6543",
    address: "123 Oak Street, Springfield",
    occupation: "Software Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        id: 1,
        name: "Alice Johnson",
        class: "Grade 9A",
        rollNumber: "G9A001",
        performance: "Excellent",
      },
    ],
    lastContact: "2 days ago",
    status: "active",
  },
  {
    id: 2,
    name: "Mary Smith",
    email: "mary.smith@email.com",
    phone: "+1 (555) 876-5432",
    address: "456 Pine Avenue, Springfield",
    occupation: "Marketing Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        id: 2,
        name: "Bob Smith",
        class: "Grade 9A",
        rollNumber: "G9A002",
        performance: "Good",
      },
    ],
    lastContact: "1 week ago",
    status: "active",
  },
  {
    id: 3,
    name: "James Davis",
    email: "james.davis@email.com",
    phone: "+1 (555) 765-4321",
    address: "789 Maple Drive, Springfield",
    occupation: "Doctor",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        id: 3,
        name: "Carol Davis",
        class: "Grade 9B",
        rollNumber: "G9B001",
        performance: "Outstanding",
      },
    ],
    lastContact: "3 days ago",
    status: "active",
  },
  {
    id: 4,
    name: "Linda Wilson",
    email: "linda.wilson@email.com",
    phone: "+1 (555) 654-3210",
    address: "321 Elm Street, Springfield",
    occupation: "Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        id: 4,
        name: "David Wilson",
        class: "Grade 10A",
        rollNumber: "G10A001",
        performance: "Good",
      },
      {
        id: 5,
        name: "Emma Wilson",
        class: "Grade 8A",
        rollNumber: "G8A001",
        performance: "Excellent",
      },
    ],
    lastContact: "5 days ago",
    status: "active",
  },
]

const chatMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: "Robert Johnson",
    content: "Hello, I wanted to discuss Alice's progress in mathematics.",
    timestamp: "10:30 AM",
    status: "read",
  },
  {
    id: 2,
    senderId: "admin",
    senderName: "Admin",
    content:
      "Hello Mr. Johnson! I'd be happy to discuss Alice's progress. She's doing exceptionally well in mathematics.",
    timestamp: "10:32 AM",
    status: "read",
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Robert Johnson",
    content: "That's great to hear! Are there any areas where she could improve further?",
    timestamp: "10:35 AM",
    status: "delivered",
  },
]

export default function AdminParents() {
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line
  const [selectedParent, setSelectedParent] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  const filteredParents = parents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.children.some(
        (child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.class.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parents Management</h1>
          <p className="text-gray-600 mt-1">Manage parent contacts and communications</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Parent
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search parents by name, email, or child's name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Parents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParents.map((parent) => (
          <Card key={parent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                    <AvatarFallback>
                      {parent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{parent.name}</CardTitle>
                    <CardDescription>{parent.occupation}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  {parent.children.length} Child{parent.children.length > 1 ? "ren" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{parent.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{parent.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{parent.address}</span>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Children:</p>
                <div className="space-y-1">
                  {parent.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between text-sm">
                      <span>{child.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {child.class}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                          <AvatarFallback>
                            {parent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xl font-bold">{parent.name}</div>
                          <div className="text-sm text-gray-500">{parent.occupation}</div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="details" className="mt-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="children">Children</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Contact Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{parent.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{parent.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{parent.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>{parent.occupation}</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Communication History</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Last Contact:</span>
                              <span>{parent.lastContact}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                              <span className="text-gray-600">Status:</span>
                              <Badge variant="default">{parent.status}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="children" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {parent.children.map((child) => (
                            <Card key={child.id}>
                              <CardHeader>
                                <CardTitle className="text-lg">{child.name}</CardTitle>
                                <CardDescription>
                                  {child.class} • {child.rollNumber}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Performance:</span>
                                  <Badge
                                    variant={
                                      child.performance === "Outstanding"
                                        ? "default"
                                        : child.performance === "Excellent"
                                          ? "default"
                                          : child.performance === "Good"
                                            ? "secondary"
                                            : "outline"
                                    }
                                  >
                                    {child.performance}
                                  </Badge>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-3">
                                  View Student Details
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="chat" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <MessageSquare className="w-5 h-5" />
                              <span>Chat with {parent.name}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <ScrollArea className="h-[300px] p-4">
                              <div className="space-y-4">
                                {chatMessages.map((message) => (
                                  <div
                                    key={message.id}
                                    className={`flex ${message.senderId === "admin" ? "justify-end" : "justify-start"}`}
                                  >
                                    <div
                                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        message.senderId === "admin"
                                          ? "bg-blue-600 text-white"
                                          : "bg-gray-100 text-gray-900"
                                      }`}
                                    >
                                      <p className="text-sm">{message.content}</p>
                                      <div
                                        className={`flex items-center justify-end space-x-1 mt-1 ${
                                          message.senderId === "admin" ? "text-blue-100" : "text-gray-500"
                                        }`}
                                      >
                                        <span className="text-xs">{message.timestamp}</span>
                                        {message.senderId === "admin" &&
                                          (message.status === "read" ? (
                                            <CheckCheck className="w-3 h-3" />
                                          ) : (
                                            <Check className="w-3 h-3" />
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>

                            <div className="border-t p-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Paperclip className="w-4 h-4" />
                                </Button>
                                <Input
                                  placeholder="Type a message..."
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                  className="flex-1"
                                />
                                <Button onClick={handleSendMessage}>
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredParents.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">No parents found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
