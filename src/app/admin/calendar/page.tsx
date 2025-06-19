"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Plus, Clock, Users, MapPin, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

type EventType = "meeting" | "event" | "academic" | "holiday";

interface CalendarEvent {
    id: number;
    title: string;
    date: string;  // YYYY-MM-DD format
    time: string;
    type: EventType;  // Use the defined type
    location: string;
    attendees: number;
    description: string;
    status: string;
}



type NewEventForm = {
    title: string;
    date: string;
    time: string;
    type: EventType;
    location: string;
    attendees: string;  // String for form input
    description: string;
}

// Mock data for calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Parent-Teacher Conference",
    date: "2024-01-15",
    time: "09:00 AM",
    type: "meeting",
    location: "Main Hall",
    attendees: 45,
    description: "Quarterly parent-teacher conference for all grades",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Science Fair",
    date: "2024-01-18",
    time: "10:00 AM",
    type: "event",
    location: "Science Lab",
    attendees: 120,
    description: "Annual science fair competition",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Staff Meeting",
    date: "2024-01-20",
    time: "02:00 PM",
    type: "meeting",
    location: "Conference Room",
    attendees: 24,
    description: "Monthly staff coordination meeting",
    status: "pending",
  },
  {
    id: 4,
    title: "Sports Day",
    date: "2024-01-25",
    time: "08:00 AM",
    type: "event",
    location: "Sports Ground",
    attendees: 300,
    description: "Annual sports day celebration",
    status: "confirmed",
  },
  {
    id: 5,
    title: "Exam Week",
    date: "2024-01-28",
    time: "09:00 AM",
    type: "academic",
    location: "All Classrooms",
    attendees: 450,
    description: "Mid-term examinations for all grades",
    status: "confirmed",
  },
]

const eventTypes: Record<EventType, { color: string; label: string }> = {
  meeting: { color: "bg-blue-500", label: "Meeting" },
  event: { color: "bg-green-500", label: "Event" },
  academic: { color: "bg-purple-500", label: "Academic" },
  holiday: { color: "bg-red-500", label: "Holiday" },
}

export default function AdminCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [viewMode, setViewMode] = useState("month")

  const [newEvent, setNewEvent] = useState<NewEventForm>({
    title: "",
    date: "",
    time: "",
    type: "meeting",
    location: "",
    attendees: "",
    description: "",
  })

  const handleCreateEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      attendees: Number.parseInt(newEvent.attendees) || 0,
      status: "confirmed",
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "meeting",
      location: "",
      attendees: "",
      description: "",
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteEvent = (eventId : number) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateStr)
  }

  const getDaysInMonth = (date : Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction : number) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setSelectedDate(newDate)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Calendar</h1>
          <p className="text-gray-600">Manage school events, meetings, and important dates</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Add a new event to the school calendar</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value: EventType) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attendees">Expected Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                    placeholder="Number of attendees"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event description"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </h2>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Tabs value={viewMode} onValueChange={setViewMode}>
                  <TabsList>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="day">Day</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "month" && (
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}

                  {/* Calendar days */}
                  {getDaysInMonth(selectedDate).map((day, index) => {
                    if (!day) {
                      return <div key={index} className="p-2 h-24"></div>
                    }

                    const dayEvents = getEventsForDate(day)
                    const isToday = day.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={index}
                        className={`p-2 h-24 border border-gray-200 ${
                          isToday ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                      >




                        <div className={`text-sm ${isToday ? "font-bold text-blue-600" : ""}`}>{day.getDate()}</div>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded text-white truncate cursor-pointer ${
                                eventTypes[event.type].color
                              }`}
                              onClick={() => setSelectedEvent(event)}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className={`w-3 h-3 rounded-full mt-1 ${eventTypes[event.type].color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{event.date}</span>
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                      <Users className="w-3 h-3" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Event Types Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(eventTypes).map(([type, config]) => (
                <div key={type} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <span className="text-sm">{config.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>Event Details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm text-gray-600">{selectedEvent.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Time</Label>
                  <p className="text-sm text-gray-600">{selectedEvent.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <Badge variant="secondary">{eventTypes[selectedEvent.type].label}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Attendees</Label>
                  <p className="text-sm text-gray-600">{selectedEvent.attendees}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Location</Label>
                <p className="text-sm text-gray-600">{selectedEvent.location}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button>Edit Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
