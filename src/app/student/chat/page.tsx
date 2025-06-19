"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  MessageCircle,
  Send,
  Paperclip,
  Search,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Check,
  Clock,
  Download,
  Plus,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

// Types for chat system
interface Teacher {
  id: string
  name: string
  subject: string
  avatar?: string
  initials: string
  isOnline: boolean
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "file" | "image"
  status: "sending" | "sent" | "delivered" | "read"
  fileUrl?: string
  fileName?: string
  fileSize?: string
}

interface ChatConversation {
  id: string
  teacherId: string
  lastMessage?: Message
  unreadCount: number
  messages: Message[]
}

export default function StudentChatPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isTyping, setIsTyping] = useState<string | null>(null)
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample teachers data - in real app, this would come from API based on student's subjects
  const teachers: Teacher[] = [
    {
      id: "teacher-1",
      name: "Dr. Robert Chen",
      subject: "Mathematics",
      initials: "RC",
      isOnline: true,
    },
    {
      id: "teacher-2",
      name: "Prof. Sarah Johnson",
      subject: "Physics",
      initials: "SJ",
      isOnline: true,
    },
    {
      id: "teacher-3",
      name: "Ms. Emily Parker",
      subject: "English Literature",
      initials: "EP",
      isOnline: false,
      lastSeen: "2 hours ago",
    },
    {
      id: "teacher-4",
      name: "Dr. Michael Thompson",
      subject: "History",
      initials: "MT",
      isOnline: false,
      lastSeen: "1 day ago",
    },
    {
      id: "teacher-5",
      name: "Dr. Lisa Wong",
      subject: "Chemistry",
      initials: "LW",
      isOnline: true,
    },
    {
      id: "teacher-6",
      name: "Prof. David Garcia",
      subject: "Biology",
      initials: "DG",
      isOnline: false,
      lastSeen: "3 hours ago",
    },
  ]

  // Sample conversations with messages
  useEffect(() => {
    const sampleConversations: ChatConversation[] = [
      {
        id: "conv-1",
        teacherId: "teacher-1",
        unreadCount: 2,
        messages: [
          {
            id: "msg-1",
            senderId: "student",
            senderName: "Jamie Smith",
            content: "Hi Dr. Chen, I have a question about the calculus assignment.",
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            type: "text",
            status: "read",
          },
          {
            id: "msg-2",
            senderId: "teacher-1",
            senderName: "Dr. Robert Chen",
            content: "Hello Jamie! I'd be happy to help. What specific part are you having trouble with?",
            timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
            type: "text",
            status: "read",
          },
          {
            id: "msg-3",
            senderId: "student",
            senderName: "Jamie Smith",
            content: "I'm struggling with problem 15 - the one about derivatives of composite functions.",
            timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
            type: "text",
            status: "read",
          },
          {
            id: "msg-4",
            senderId: "teacher-1",
            senderName: "Dr. Robert Chen",
            content: "Ah, the chain rule! Let me send you a helpful resource.",
            timestamp: new Date(Date.now() - 1000 * 60 * 18), // 18 minutes ago
            type: "text",
            status: "delivered",
          },
          {
            id: "msg-5",
            senderId: "teacher-1",
            senderName: "Dr. Robert Chen",
            content: "Chain Rule Examples.pdf",
            timestamp: new Date(Date.now() - 1000 * 60 * 17), // 17 minutes ago
            type: "file",
            status: "delivered",
            fileUrl: "#",
            fileName: "Chain Rule Examples.pdf",
            fileSize: "1.2 MB",
          },
        ],
        lastMessage: {
          id: "msg-5",
          senderId: "teacher-1",
          senderName: "Dr. Robert Chen",
          content: "Chain Rule Examples.pdf",
          timestamp: new Date(Date.now() - 1000 * 60 * 17),
          type: "file",
          status: "delivered",
          fileUrl: "#",
          fileName: "Chain Rule Examples.pdf",
          fileSize: "1.2 MB",
        },
      },
      {
        id: "conv-2",
        teacherId: "teacher-2",
        unreadCount: 0,
        messages: [
          {
            id: "msg-6",
            senderId: "student",
            senderName: "Jamie Smith",
            content: "Prof. Johnson, when is the physics lab report due?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            type: "text",
            status: "read",
          },
          {
            id: "msg-7",
            senderId: "teacher-2",
            senderName: "Prof. Sarah Johnson",
            content:
              "The lab report is due tomorrow at 3:00 PM. Make sure to include all your data tables and analysis.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
            type: "text",
            status: "read",
          },
        ],
        lastMessage: {
          id: "msg-7",
          senderId: "teacher-2",
          senderName: "Prof. Sarah Johnson",
          content: "The lab report is due tomorrow at 3:00 PM. Make sure to include all your data tables and analysis.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
          type: "text",
          status: "read",
        },
      },
    ]
    setConversations(sampleConversations)
  }, [])

  // Get current conversation
  const currentConversation = conversations.find((conv) => conv.teacherId === selectedTeacher)
  const currentTeacher = teachers.find((teacher) => teacher.id === selectedTeacher)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  // Handle sending message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedTeacher) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "student",
      senderName: "Jamie Smith",
      content: message.trim(),
      timestamp: new Date(),
      type: "text",
      status: "sending",
    }

    // Update conversations
    setConversations((prev) => {
      const updated = [...prev]
      const convIndex = updated.findIndex((conv) => conv.teacherId === selectedTeacher)

      if (convIndex >= 0) {
        updated[convIndex].messages.push(newMessage)
        updated[convIndex].lastMessage = newMessage
      } else {
        // Create new conversation
        updated.push({
          id: `conv-${Date.now()}`,
          teacherId: selectedTeacher,
          unreadCount: 0,
          messages: [newMessage],
          lastMessage: newMessage,
        })
      }

      return updated
    })

    setMessage("")

    // Simulate message status updates
    setTimeout(() => {
      setConversations((prev) => {
        const updated = [...prev]
        const convIndex = updated.findIndex((conv) => conv.teacherId === selectedTeacher)
        if (convIndex >= 0) {
          const msgIndex = updated[convIndex].messages.findIndex((msg) => msg.id === newMessage.id)
          if (msgIndex >= 0) {
            updated[convIndex].messages[msgIndex].status = "sent"
          }
        }
        return updated
      })
    }, 1000)

    setTimeout(() => {
      setConversations((prev) => {
        const updated = [...prev]
        const convIndex = updated.findIndex((conv) => conv.teacherId === selectedTeacher)
        if (convIndex >= 0) {
          const msgIndex = updated[convIndex].messages.findIndex((msg) => msg.id === newMessage.id)
          if (msgIndex >= 0) {
            updated[convIndex].messages[msgIndex].status = "delivered"
          }
        }
        return updated
      })
    }, 2000)
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedTeacher) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "student",
      senderName: "Jamie Smith",
      content: file.name,
      timestamp: new Date(),
      type: "file",
      status: "sending",
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }

    // Update conversations
    setConversations((prev) => {
      const updated = [...prev]
      const convIndex = updated.findIndex((conv) => conv.teacherId === selectedTeacher)

      if (convIndex >= 0) {
        updated[convIndex].messages.push(newMessage)
        updated[convIndex].lastMessage = newMessage
      } else {
        updated.push({
          id: `conv-${Date.now()}`,
          teacherId: selectedTeacher,
          unreadCount: 0,
          messages: [newMessage],
          lastMessage: newMessage,
        })
      }

      return updated
    })

    // Reset file input
    event.target.value = ""

    toast(`${file.name} has been sent.`)
  }

  // Filter teachers based on search
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get message status icon
  const getMessageStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />
      default:
        return null
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString()
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="md:px-10 w-screen grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Teachers List */}
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Teachers</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">New Chat</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start new conversation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="h-9 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-1 p-3">
                {filteredTeachers.map((teacher) => {
                  const conversation = conversations.find((conv) => conv.teacherId === teacher.id)
                  return (
                    <div
                      key={teacher.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50 ${
                        selectedTeacher === teacher.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedTeacher(teacher.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                          <AvatarFallback>{teacher.initials}</AvatarFallback>
                        </Avatar>
                        {teacher.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{teacher.name}</p>
                          {conversation?.unreadCount! > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 text-xs">{conversation?.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{teacher.subject}</p>
                        {conversation?.lastMessage && (
                          <p className="text-xs text-muted-foreground truncate">
                            {conversation.lastMessage.type === "file"
                              ? `📎 ${conversation.lastMessage.fileName}`
                              : conversation.lastMessage.content}
                          </p>
                        )}
                        {!teacher.isOnline && teacher.lastSeen && (
                          <p className="text-xs text-muted-foreground">Last seen {teacher.lastSeen}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          {selectedTeacher && currentTeacher ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentTeacher.avatar || "/placeholder.svg"} alt={currentTeacher.name} />
                        <AvatarFallback>{currentTeacher.initials}</AvatarFallback>
                      </Avatar>
                      {currentTeacher.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{currentTeacher.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentTeacher.isOnline ? (
                          <>
                            <span className="text-green-500">●</span> Online
                          </>
                        ) : (
                          `Last seen ${currentTeacher.lastSeen}`
                        )}
                      </p>
                      {isTyping === currentTeacher.id && <p className="text-xs text-primary">Typing...</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                            <span className="sr-only">Voice Call</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Voice call</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Video className="h-4 w-4" />
                            <span className="sr-only">Video Call</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Video call</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More Options</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                  <div className="space-y-4">
                    {currentConversation?.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === "student" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-3 py-2 ${
                            msg.senderId === "student" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {msg.type === "file" ? (
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20">
                                <Paperclip className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{msg.fileName}</p>
                                <p className="text-xs opacity-70">{msg.fileSize}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                  // Handle file download
                                  toast(`Downloading ${msg.fileName}...`)
                                }}
                              >
                                <Download className="h-3 w-3" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          ) : (
                            <p className="text-sm">{msg.content}</p>
                          )}
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <span className="text-xs opacity-70">{formatTimestamp(msg.timestamp)}</span>
                            {msg.senderId === "student" && (
                              <div className="flex items-center">{getMessageStatusIcon(msg.status)}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="min-h-[40px] max-h-32 resize-none"
                      rows={1}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Paperclip className="h-4 w-4" />
                            <span className="sr-only">Attach File</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach file</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button onClick={handleSendMessage} disabled={!message.trim()} className="h-10 w-10 p-0">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send Message</span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // No teacher selected
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
                  <MessageCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Select a teacher to start chatting</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a teacher from the list to begin your conversation.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
