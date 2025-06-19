"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  Phone,
  Video,
  Mail,
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Star,
  Clock,
  CheckCheck,
  Check,
} from "lucide-react"
import { toast } from "sonner"

interface Teacher {
  id: string
  name: string
  subject: string
  email: string
  phone: string
  avatar: string
  children: string[]
  classes: string[]
  isOnline: boolean
  lastSeen?: string
  rating: number
  experience: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "file"
  status: "sent" | "delivered" | "read"
  fileName?: string
}

interface Conversation {
  id: string
  teacherId: string
  teacherName: string
  teacherAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Ms. Sarah Davis",
    subject: "Mathematics",
    email: "sarah.davis@school.edu",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    children: ["Emma Johnson"],
    classes: ["Grade 8A"],
    isOnline: true,
    rating: 4.8,
    experience: "8 years",
  },
  {
    id: "2",
    name: "Mr. James Thompson",
    subject: "Science",
    email: "james.thompson@school.edu",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    children: ["Emma Johnson"],
    classes: ["Grade 8A"],
    isOnline: false,
    lastSeen: "2 hours ago",
    rating: 4.9,
    experience: "12 years",
  },
  {
    id: "3",
    name: "Mrs. Linda Wilson",
    subject: "English",
    email: "linda.wilson@school.edu",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    children: ["Alex Johnson"],
    classes: ["Grade 5B"],
    isOnline: true,
    rating: 4.7,
    experience: "6 years",
  },
  {
    id: "4",
    name: "Mr. Robert Brown",
    subject: "History",
    email: "robert.brown@school.edu",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    children: ["Emma Johnson"],
    classes: ["Grade 8A"],
    isOnline: false,
    lastSeen: "1 day ago",
    rating: 4.6,
    experience: "15 years",
  },
  {
    id: "5",
    name: "Ms. Maria Garcia",
    subject: "Art",
    email: "maria.garcia@school.edu",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=40&width=40",
    children: ["Alex Johnson"],
    classes: ["Grade 5B"],
    isOnline: true,
    rating: 4.9,
    experience: "10 years",
  },
]

const mockConversations: Conversation[] = [
  {
    id: "1",
    teacherId: "1",
    teacherName: "Ms. Sarah Davis",
    teacherAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Emma's math assignment looks great! She's showing excellent progress.",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        senderId: "parent",
        senderName: "You",
        content: "Hi Ms. Davis, how is Emma doing in math class?",
        timestamp: "2024-12-19T10:00:00Z",
        type: "text",
        status: "read",
      },
      {
        id: "2",
        senderId: "1",
        senderName: "Ms. Sarah Davis",
        content: "Hello! Emma is doing wonderfully. She's really grasped the concepts we've been working on.",
        timestamp: "2024-12-19T10:15:00Z",
        type: "text",
        status: "read",
      },
      {
        id: "3",
        senderId: "1",
        senderName: "Ms. Sarah Davis",
        content: "Emma's math assignment looks great! She's showing excellent progress.",
        timestamp: "2024-12-19T14:30:00Z",
        type: "text",
        status: "delivered",
      },
    ],
  },
  {
    id: "2",
    teacherId: "3",
    teacherName: "Mrs. Linda Wilson",
    teacherAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Alex's creative writing has improved significantly this semester.",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: "1",
        senderId: "parent",
        senderName: "You",
        content: "Thank you for the feedback on Alex's essay!",
        timestamp: "2024-12-18T15:00:00Z",
        type: "text",
        status: "read",
      },
      {
        id: "2",
        senderId: "3",
        senderName: "Mrs. Linda Wilson",
        content: "Alex's creative writing has improved significantly this semester.",
        timestamp: "2024-12-18T15:30:00Z",
        type: "text",
        status: "read",
      },
    ],
  },
]

export default function ParentTeachers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [conversations, setConversations] = useState(mockConversations)

  const filteredTeachers = mockTeachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChild = selectedChild === "all" || teacher.children.includes(selectedChild)

    return matchesSearch && matchesChild
  })

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "parent",
      senderName: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
      status: "sent",
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: newMessage,
              lastMessageTime: "Just now",
            }
          : conv,
      ),
    )

    setActiveConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, message],
            lastMessage: newMessage,
            lastMessageTime: "Just now",
          }
        : null,
    )

    setNewMessage("")
    toast.success("Message sent!")
  }

  const startConversation = (teacher: Teacher) => {
    const existingConv = conversations.find((conv) => conv.teacherId === teacher.id)
    if (existingConv) {
      setActiveConversation(existingConv)
    } else {
      const newConv: Conversation = {
        id: Date.now().toString(),
        teacherId: teacher.id,
        teacherName: teacher.name,
        teacherAvatar: teacher.avatar,
        lastMessage: "",
        lastMessageTime: "",
        unreadCount: 0,
        isOnline: teacher.isOnline,
        messages: [],
      }
      setConversations((prev) => [...prev, newConv])
      setActiveConversation(newConv)
    }
    setShowChat(true)
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Connect with your children&apos;s teachers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowChat(true)}>
            <MessageCircle className="mr-2 h-4 w-4" />
            View Chats
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Find Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select child" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                <SelectItem value="Emma Johnson">Emma Johnson</SelectItem>
                <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {teacher.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{teacher.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Teaching:</span>
                  <span>{teacher.children.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class:</span>
                  <span>{teacher.classes.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span>{teacher.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={teacher.isOnline ? "default" : "secondary"}>
                    {teacher.isOnline ? "Online" : teacher.lastSeen || "Offline"}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => startConversation(teacher)}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedTeacher(teacher)}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${teacher.email}`)}>
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Dialog */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Conversations</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                      activeConversation?.id === conv.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveConversation(conv)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.teacherAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {conv.teacherName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conv.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conv.teacherName}</p>
                          <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={activeConversation.teacherAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {activeConversation.teacherName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {activeConversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{activeConversation.teacherName}</p>
                        <p className="text-sm text-muted-foreground">
                          {activeConversation.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "parent" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === "parent" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {message.senderId === "parent" && getMessageStatus(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="min-h-[40px] max-h-[120px] resize-none pr-12"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a teacher to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Teacher Details Dialog */}
      <Dialog open={!!selectedTeacher} onOpenChange={() => setSelectedTeacher(null)}>
        <DialogContent className="max-w-md">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>Contact {selectedTeacher.name}</DialogTitle>
                <DialogDescription>Get in touch with your child&apos;s teacher</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedTeacher.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedTeacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedTeacher.name}</h3>
                    <p className="text-muted-foreground">{selectedTeacher.subject}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedTeacher.rating} rating</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedTeacher.phone}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open(`tel:${selectedTeacher.phone}`)}>
                      Call
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedTeacher.email}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${selectedTeacher.email}`)}>
                      Email
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      startConversation(selectedTeacher)
                      setSelectedTeacher(null)
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedTeacher(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
