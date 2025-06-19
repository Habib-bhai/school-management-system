"use client"

import { useState } from "react"
import { Bell, Calendar, Clock, AlertCircle, Info, CheckCircle, Search, Filter, Pin, Eye, EyeOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AnnouncementPriority = "low" | "medium" | "high" | "urgent"
type AnnouncementCategory = "general" | "academic" | "event" | "policy" | "emergency"

interface Announcement {
  id: string
  title: string
  content: string
  category: AnnouncementCategory
  priority: AnnouncementPriority
  publishedDate: string
  expiryDate?: string
  author: string
  isRead: boolean
  isPinned: boolean
  attachments?: string[]
}

export default function TeacherAnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<AnnouncementCategory | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<AnnouncementPriority | "all">("all")

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "New Academic Calendar Released",
      content:
        "The academic calendar for the upcoming semester has been finalized. Please review the important dates including exam schedules, holidays, and parent-teacher meetings. All teachers are required to plan their syllabus accordingly.",
      category: "academic",
      priority: "high",
      publishedDate: "2024-01-15",
      expiryDate: "2024-02-15",
      author: "Dr. Michael Chen - Academic Director",
      isRead: false,
      isPinned: true,
      attachments: ["academic-calendar-2024.pdf"],
    },
    {
      id: "2",
      title: "Emergency Drill Scheduled",
      content:
        "A fire safety drill will be conducted on January 20th at 2:00 PM. All classes must participate. Teachers should ensure students follow evacuation procedures and gather at designated assembly points.",
      category: "emergency",
      priority: "urgent",
      publishedDate: "2024-01-14",
      author: "Safety Committee",
      isRead: true,
      isPinned: true,
    },
    {
      id: "3",
      title: "Professional Development Workshop",
      content:
        "Join us for a workshop on 'Modern Teaching Methodologies' on January 25th. The session will cover innovative teaching techniques, technology integration, and student engagement strategies. Registration is mandatory for all teaching staff.",
      category: "general",
      priority: "medium",
      publishedDate: "2024-01-12",
      expiryDate: "2024-01-25",
      author: "HR Department",
      isRead: true,
      isPinned: false,
      attachments: ["workshop-agenda.pdf", "registration-form.pdf"],
    },
    {
      id: "4",
      title: "Science Fair 2024 - Call for Participation",
      content:
        "The annual Science Fair will be held on February 15-16. We encourage all science teachers to motivate their students to participate. Registration deadline is January 30th. Prizes will be awarded in multiple categories.",
      category: "event",
      priority: "medium",
      publishedDate: "2024-01-10",
      expiryDate: "2024-01-30",
      author: "Science Department Head",
      isRead: false,
      isPinned: false,
    },
    {
      id: "5",
      title: "Updated Grading Policy",
      content:
        "Please note the revised grading policy effective from this semester. The continuous assessment weightage has been increased to 40%. Detailed guidelines have been shared via email. Contact the academic office for clarifications.",
      category: "policy",
      priority: "high",
      publishedDate: "2024-01-08",
      author: "Academic Committee",
      isRead: true,
      isPinned: false,
      attachments: ["grading-policy-2024.pdf"],
    },
    {
      id: "6",
      title: "Library Hours Extended",
      content:
        "The school library will now remain open until 7:00 PM on weekdays to support teachers and students. Weekend hours remain unchanged. New books on modern pedagogy have been added to the collection.",
      category: "general",
      priority: "low",
      publishedDate: "2024-01-05",
      author: "Library Committee",
      isRead: true,
      isPinned: false,
    },
  ])

  const getPriorityIcon = (priority: AnnouncementPriority) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <Info className="h-4 w-4 text-blue-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getPriorityColor = (priority: AnnouncementPriority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getCategoryColor = (category: AnnouncementCategory) => {
    switch (category) {
      case "academic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "event":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "policy":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      case "general":
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const toggleReadStatus = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id ? { ...announcement, isRead: !announcement.isRead } : announcement,
      ),
    )
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || announcement.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || announcement.priority === priorityFilter

    return matchesSearch && matchesCategory && matchesPriority
  })

  const announcementCounts = {
    all: announcements.length,
    unread: announcements.filter((a) => !a.isRead).length,
    pinned: announcements.filter((a) => a.isPinned).length,
    urgent: announcements.filter((a) => a.priority === "urgent").length,
  }

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with important announcements from administration</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Bell className="h-3 w-3" />
            <span>{announcementCounts.unread} Unread</span>
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(value: AnnouncementCategory | "all") => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priorityFilter}
              onValueChange={(value: AnnouncementPriority | "all") => setPriorityFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcement Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({announcementCounts.all})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({announcementCounts.unread})</TabsTrigger>
          <TabsTrigger value="pinned">Pinned ({announcementCounts.pinned})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent ({announcementCounts.urgent})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No announcements found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAnnouncements
                .sort((a, b) => {
                  // Sort by pinned first, then by date
                  if (a.isPinned && !b.isPinned) return -1
                  if (!a.isPinned && b.isPinned) return 1
                  return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
                })
                .map((announcement) => (
                  <Card
                    key={announcement.id}
                    className={`${!announcement.isRead ? "border-l-4 border-l-blue-500" : ""} ${isExpired(announcement.expiryDate) ? "opacity-60" : ""}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3 flex-1">
                          {announcement.isPinned && <Pin className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getPriorityIcon(announcement.priority)}
                              <h3 className={`font-semibold ${!announcement.isRead ? "text-primary" : ""}`}>
                                {announcement.title}
                              </h3>
                              {!announcement.isRead && (
                                <Badge variant="secondary" className="text-xs">
                                  New
                                </Badge>
                              )}
                              {isExpired(announcement.expiryDate) && (
                                <Badge variant="outline" className="text-xs text-muted-foreground">
                                  Expired
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                              <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-3 leading-relaxed">{announcement.content}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Published: {new Date(announcement.publishedDate).toLocaleDateString()}</span>
                                </div>
                                {announcement.expiryDate && (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </div>
                              <span className="font-medium">{announcement.author}</span>
                            </div>
                            {announcement.attachments && announcement.attachments.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <p className="text-sm font-medium mb-2">Attachments:</p>
                                <div className="flex flex-wrap gap-2">
                                  {announcement.attachments.map((attachment, index) => (
                                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                                      📎 {attachment}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReadStatus(announcement.id)}
                          className="flex-shrink-0"
                        >
                          {announcement.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <div className="space-y-4">
            {filteredAnnouncements
              .filter((a) => !a.isRead)
              .map((announcement) => (
                <Card key={announcement.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        {announcement.isPinned && <Pin className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getPriorityIcon(announcement.priority)}
                            <h3 className="font-semibold text-primary">{announcement.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3 leading-relaxed">{announcement.content}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Published: {new Date(announcement.publishedDate).toLocaleDateString()}</span>
                              </div>
                              {announcement.expiryDate && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                            <span className="font-medium">{announcement.author}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReadStatus(announcement.id)}
                        className="flex-shrink-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pinned" className="space-y-4">
          <div className="space-y-4">
            {filteredAnnouncements
              .filter((a) => a.isPinned)
              .map((announcement) => (
                <Card key={announcement.id} className={!announcement.isRead ? "border-l-4 border-l-blue-500" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <Pin className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getPriorityIcon(announcement.priority)}
                            <h3 className={`font-semibold ${!announcement.isRead ? "text-primary" : ""}`}>
                              {announcement.title}
                            </h3>
                            {!announcement.isRead && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3 leading-relaxed">{announcement.content}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Published: {new Date(announcement.publishedDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <span className="font-medium">{announcement.author}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReadStatus(announcement.id)}
                        className="flex-shrink-0"
                      >
                        {announcement.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <div className="space-y-4">
            {filteredAnnouncements
              .filter((a) => a.priority === "urgent")
              .map((announcement) => (
                <Card
                  key={announcement.id}
                  className={`border-l-4 border-l-red-500 ${!announcement.isRead ? "border-l-blue-500" : ""}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        {announcement.isPinned && <Pin className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getPriorityIcon(announcement.priority)}
                            <h3 className={`font-semibold ${!announcement.isRead ? "text-primary" : ""}`}>
                              {announcement.title}
                            </h3>
                            {!announcement.isRead && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3 leading-relaxed">{announcement.content}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Published: {new Date(announcement.publishedDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <span className="font-medium">{announcement.author}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReadStatus(announcement.id)}
                        className="flex-shrink-0"
                      >
                        {announcement.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
