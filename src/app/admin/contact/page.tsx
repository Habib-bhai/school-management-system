"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Users,
  Megaphone,
  Clock,
  Check,
  CheckCheck,
} from "lucide-react"

const teachers = [
  {
    id: 1,
    name: "Sarah Johnson",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "now",
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Michael Chen",
    subject: "Physics",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: "5 min ago",
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    subject: "English Literature",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2 hours ago",
    unreadCount: 1,
  },
  {
    id: 4,
    name: "David Thompson",
    subject: "History",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "now",
    unreadCount: 0,
  },
]

const messages = [
  {
    id: 1,
    senderId: 1,
    senderName: "Sarah Johnson",
    content: "Good morning! I wanted to discuss the new mathematics curriculum changes.",
    timestamp: "9:30 AM",
    status: "read",
  },
  {
    id: 2,
    senderId: "admin",
    senderName: "Admin",
    content: "Of course! I'd be happy to discuss that. What specific changes are you concerned about?",
    timestamp: "9:32 AM",
    status: "read",
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Sarah Johnson",
    content:
      "The new assessment methods seem quite different from what we've been using. I think we might need some training.",
    timestamp: "9:35 AM",
    status: "delivered",
  },
]

const announcements = [
  {
    id: 1,
    title: "Staff Meeting Tomorrow",
    content: "Reminder: All teaching staff meeting tomorrow at 3 PM in the main conference room.",
    timestamp: "2 hours ago",
    priority: "high",
    recipients: 24,
  },
  {
    id: 2,
    title: "New Safety Protocols",
    content: "Please review the updated safety protocols document shared in the staff portal.",
    timestamp: "1 day ago",
    priority: "medium",
    recipients: 24,
  },
  {
    id: 3,
    title: "Holiday Schedule Update",
    content: "The holiday schedule has been updated. Please check your calendars.",
    timestamp: "3 days ago",
    priority: "low",
    recipients: 24,
  },
]

export default function AdminContacts() {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", priority: "medium" })

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  const handleSendAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      // Handle sending announcement
      setNewAnnouncement({ title: "", content: "", priority: "medium" })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600 mt-1">Chat with teachers and make announcements</p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Megaphone className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>Send an announcement to all teaching staff</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Announcement title..."
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Type your announcement..."
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    className="w-full mt-1 p-2 border rounded-md"
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <Button onClick={handleSendAnnouncement} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList>
          <TabsTrigger value="chat">Direct Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Teachers List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Teachers</span>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {filteredTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b ${
                        selectedTeacher.id === teacher.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                          <AvatarFallback>
                            {teacher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            teacher.status === "online"
                              ? "bg-green-500"
                              : teacher.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{teacher.name}</p>
                          {teacher.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {teacher.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{teacher.subject}</p>
                        <p className="text-xs text-gray-400">{teacher.lastSeen}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedTeacher.avatar || "/placeholder.svg"} alt={selectedTeacher.name} />
                      <AvatarFallback>
                        {selectedTeacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedTeacher.name}</CardTitle>
                      <CardDescription>{selectedTeacher.subject}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === "admin" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
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
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Megaphone className="w-5 h-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{announcement.timestamp}</span>
                          <span>•</span>
                          <span>{announcement.recipients} recipients</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        announcement.priority === "high"
                          ? "destructive"
                          : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
