"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Calendar,
  DollarSign,
  MessageCircle,
  BookOpen,
  Users,
  Search,
  Eye,
  Star,
  Clock,
  Download,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  message: string
  type: "urgent" | "info" | "success" | "warning" | "fee" | "academic" | "event" | "complaint"
  category: "general" | "academic" | "financial" | "disciplinary" | "events" | "health"
  priority: "high" | "medium" | "low"
  isRead: boolean
  isPinned: boolean
  timestamp: string
  sender: string
  senderRole: "admin" | "teacher" | "system"
  childName?: string
  actionRequired: boolean
  attachments?: string[]
  dueDate?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Fee Payment Due",
    message:
      "Monthly tuition fee for December 2024 is due by December 15th. Please make the payment to avoid late charges.",
    type: "urgent",
    category: "financial",
    priority: "high",
    isRead: false,
    isPinned: true,
    timestamp: "2024-12-19T08:00:00Z",
    sender: "Finance Department",
    senderRole: "admin",
    actionRequired: true,
    dueDate: "2024-12-15",
    attachments: ["fee_invoice_dec2024.pdf"],
  },
  {
    id: "2",
    title: "Parent-Teacher Conference Scheduled",
    message:
      "Your parent-teacher conference has been scheduled for December 20th at 3:00 PM. Please confirm your attendance.",
    type: "info",
    category: "events",
    priority: "medium",
    isRead: false,
    isPinned: false,
    timestamp: "2024-12-18T14:30:00Z",
    sender: "Ms. Sarah Davis",
    senderRole: "teacher",
    childName: "Emma Johnson",
    actionRequired: true,
    dueDate: "2024-12-20",
  },
  {
    id: "3",
    title: "Excellent Performance in Math Quiz",
    message: "Emma scored 95% in the recent mathematics quiz. Congratulations on her outstanding performance!",
    type: "success",
    category: "academic",
    priority: "low",
    isRead: true,
    isPinned: false,
    timestamp: "2024-12-17T16:45:00Z",
    sender: "Ms. Sarah Davis",
    senderRole: "teacher",
    childName: "Emma Johnson",
    actionRequired: false,
  },
  {
    id: "4",
    title: "Behavioral Concern",
    message:
      "Alex was involved in a minor disruption during class today. Please discuss appropriate classroom behavior at home.",
    type: "warning",
    category: "disciplinary",
    priority: "medium",
    isRead: false,
    isPinned: false,
    timestamp: "2024-12-17T11:20:00Z",
    sender: "Mrs. Linda Wilson",
    senderRole: "teacher",
    childName: "Alex Johnson",
    actionRequired: true,
  },
  {
    id: "5",
    title: "Science Fair Registration Open",
    message:
      "Registration for the annual science fair is now open. Encourage your child to participate in this exciting event!",
    type: "info",
    category: "events",
    priority: "low",
    isRead: true,
    isPinned: false,
    timestamp: "2024-12-16T09:00:00Z",
    sender: "Event Committee",
    senderRole: "admin",
    actionRequired: false,
    dueDate: "2024-12-30",
  },
  {
    id: "6",
    title: "Medical Form Update Required",
    message: "Please update Emma's medical information form with current emergency contact details.",
    type: "warning",
    category: "health",
    priority: "medium",
    isRead: false,
    isPinned: false,
    timestamp: "2024-12-15T13:15:00Z",
    sender: "School Nurse",
    senderRole: "admin",
    childName: "Emma Johnson",
    actionRequired: true,
    dueDate: "2024-12-25",
  },
  {
    id: "7",
    title: "Art Competition Winner",
    message:
      "Congratulations! Alex won first place in the inter-school art competition. The award ceremony is on December 22nd.",
    type: "success",
    category: "academic",
    priority: "medium",
    isRead: true,
    isPinned: true,
    timestamp: "2024-12-14T10:30:00Z",
    sender: "Ms. Maria Garcia",
    senderRole: "teacher",
    childName: "Alex Johnson",
    actionRequired: false,
  },
  {
    id: "8",
    title: "Holiday Schedule Announcement",
    message:
      "School will be closed from December 23rd to January 2nd for winter holidays. Classes resume on January 3rd, 2025.",
    type: "info",
    category: "general",
    priority: "medium",
    isRead: true,
    isPinned: false,
    timestamp: "2024-12-13T12:00:00Z",
    sender: "Principal's Office",
    senderRole: "admin",
    actionRequired: false,
  },
  {
    id: "9",
    title: "Late Arrival Notice",
    message:
      "Emma arrived 15 minutes late to school today. Please ensure punctual arrival to avoid missing important lessons.",
    type: "warning",
    category: "disciplinary",
    priority: "low",
    isRead: false,
    isPinned: false,
    timestamp: "2024-12-12T08:30:00Z",
    sender: "Attendance Office",
    senderRole: "admin",
    childName: "Emma Johnson",
    actionRequired: false,
  },
  {
    id: "10",
    title: "Library Book Overdue",
    message:
      "Alex has an overdue library book 'The Adventures of Tom Sawyer'. Please return it by December 20th to avoid fines.",
    type: "warning",
    category: "academic",
    priority: "low",
    isRead: true,
    isPinned: false,
    timestamp: "2024-12-11T14:00:00Z",
    sender: "School Librarian",
    senderRole: "admin",
    childName: "Alex Johnson",
    actionRequired: true,
    dueDate: "2024-12-20",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "urgent":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />
    case "fee":
      return <DollarSign className="h-5 w-5 text-purple-500" />
    case "academic":
      return <BookOpen className="h-5 w-5 text-indigo-500" />
    case "event":
      return <Calendar className="h-5 w-5 text-teal-500" />
    case "complaint":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

const getNotificationColor = (type: string, priority: string) => {
  if (type === "urgent" || priority === "high") {
    return "border-l-red-500 bg-red-50"
  }
  if (type === "warning") {
    return "border-l-orange-500 bg-orange-50"
  }
  if (type === "success") {
    return "border-l-green-500 bg-green-50"
  }
  return "border-l-blue-500 bg-blue-50"
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Priority</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Low Priority</Badge>
    default:
      return null
  }
}

export default function ParentNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory
    const matchesChild = selectedChild === "all" || notification.childName === selectedChild

    return matchesSearch && matchesCategory && matchesChild
  })

  const getNotificationsByStatus = (status: string) => {
    switch (status) {
      case "unread":
        return filteredNotifications.filter((n) => !n.isRead)
      case "pinned":
        return filteredNotifications.filter((n) => n.isPinned)
      case "urgent":
        return filteredNotifications.filter((n) => n.type === "urgent" || n.priority === "high")
      case "action-required":
        return filteredNotifications.filter((n) => n.actionRequired)
      default:
        return filteredNotifications
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const togglePin = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n)))
    toast.success("Notification updated!")
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setSelectedNotification(null)
    toast.success("Notification deleted!")
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    toast.success("All notifications marked as read!")
  }

  const viewNotification = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    setSelectedNotification(notification)
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => n.type === "urgent" || n.priority === "high").length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.isRead).length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important information about your children</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{actionRequiredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="disciplinary">Disciplinary</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pinned">Pinned</TabsTrigger>
          <TabsTrigger value="urgent">
            Urgent
            {urgentCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                {urgentCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="action-required">Action Required</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <NotificationsList
            notifications={getNotificationsByStatus("all")}
            onView={viewNotification}
            onPin={togglePin}
            onDelete={deleteNotification}
          />
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <NotificationsList
            notifications={getNotificationsByStatus("unread")}
            onView={viewNotification}
            onPin={togglePin}
            onDelete={deleteNotification}
          />
        </TabsContent>

        <TabsContent value="pinned" className="space-y-4">
          <NotificationsList
            notifications={getNotificationsByStatus("pinned")}
            onView={viewNotification}
            onPin={togglePin}
            onDelete={deleteNotification}
          />
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <NotificationsList
            notifications={getNotificationsByStatus("urgent")}
            onView={viewNotification}
            onPin={togglePin}
            onDelete={deleteNotification}
          />
        </TabsContent>

        <TabsContent value="action-required" className="space-y-4">
          <NotificationsList
            notifications={getNotificationsByStatus("action-required")}
            onView={viewNotification}
            onPin={togglePin}
            onDelete={deleteNotification}
          />
        </TabsContent>
      </Tabs>

      {/* Notification Details Dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedNotification && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {getNotificationIcon(selectedNotification.type)}
                  <div className="flex-1">
                    <DialogTitle>{selectedNotification.title}</DialogTitle>
                    <DialogDescription>
                      From {selectedNotification.sender} • {new Date(selectedNotification.timestamp).toLocaleString()}
                    </DialogDescription>
                  </div>
                  {selectedNotification.isPinned && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {getPriorityBadge(selectedNotification.priority)}
                  <Badge variant="outline" className="capitalize">
                    {selectedNotification.category}
                  </Badge>
                  {selectedNotification.childName && (
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      {selectedNotification.childName}
                    </Badge>
                  )}
                  {selectedNotification.actionRequired && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">Action Required</Badge>
                  )}
                </div>

                {selectedNotification.dueDate && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due: {new Date(selectedNotification.dueDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Message</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedNotification.message}</p>
                </div>

                {selectedNotification.attachments && selectedNotification.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedNotification.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{file}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4 flex-wrap">
                  <Button variant="outline" onClick={() => togglePin(selectedNotification.id)}>
                    <Star
                      className={`mr-2 h-4 w-4 ${selectedNotification.isPinned ? "fill-yellow-400 text-yellow-400" : ""}`}
                    />
                    {selectedNotification.isPinned ? "Unpin" : "Pin"}
                  </Button>
                  {selectedNotification.senderRole === "teacher" && (
                    <Button variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Reply to Teacher
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => deleteNotification(selectedNotification.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button onClick={() => setSelectedNotification(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function NotificationsList({
  notifications,
  onView,
  onPin,
  onDelete,
}: {
  notifications: Notification[]
  onView: (notification: Notification) => void
  onPin: (id: string) => void
  onDelete: (id: string) => void
}) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No notifications found</h3>
          <p className="text-muted-foreground text-center">No notifications match your current filters.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`hover:shadow-md transition-shadow cursor-pointer border-l-4 ${getNotificationColor(
            notification.type,
            notification.priority,
          )} ${!notification.isRead ? "bg-muted/30" : ""}`}
          onClick={() => onView(notification)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                    {notification.isPinned && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      {notification.sender} • {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                    {notification.childName && (
                      <Badge variant="outline" className="text-xs">
                        {notification.childName}
                      </Badge>
                    )}
                    {getPriorityBadge(notification.priority)}
                    {notification.actionRequired && (
                      <Badge className="text-xs bg-orange-100 text-orange-800 border-orange-200">Action Required</Badge>
                    )}
                    {notification.dueDate && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        Due: {new Date(notification.dueDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPin(notification.id)
                  }}
                >
                  <Star className={`h-4 w-4 ${notification.isPinned ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onView(notification)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(notification.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
