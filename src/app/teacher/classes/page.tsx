"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Search, Filter, BookOpen, Clock, Calendar } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface Student {
  id: string
  name: string
  rollNumber: string
  avatar?: string
  initials: string
  attendance: number
  averageGrade: string
  lastSubmission: string
  status: "active" | "absent" | "late"
}

interface Class {
  id: string
  name: string
  subject: string
  grade: string
  section: string
  totalStudents: number
  schedule: {
    days: string[]
    time: string
  }
  room: string
  students: Student[]
  averagePerformance: number
}

export default function TeacherClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")
    // eslint-disable-next-line
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  // Sample classes data
  const classes: Class[] = [
    {
      id: "class-1",
      name: "Physics Advanced",
      subject: "Physics",
      grade: "Grade 11",
      section: "A",
      totalStudents: 28,
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "9:00 AM - 10:30 AM",
      },
      room: "Lab 201",
      averagePerformance: 85,
      students: [
        {
          id: "student-1",
          name: "Jamie Smith",
          rollNumber: "2023045",
          initials: "JS",
          attendance: 95,
          averageGrade: "A-",
          lastSubmission: "2 hours ago",
          status: "active",
        },
        {
          id: "student-2",
          name: "Alex Johnson",
          rollNumber: "2023046",
          initials: "AJ",
          attendance: 88,
          averageGrade: "A",
          lastSubmission: "1 day ago",
          status: "active",
        },
        {
          id: "student-3",
          name: "Emily Rodriguez",
          rollNumber: "2023047",
          initials: "ER",
          attendance: 92,
          averageGrade: "B+",
          lastSubmission: "3 hours ago",
          status: "active",
        },
        {
          id: "student-4",
          name: "Michael Chen",
          rollNumber: "2023048",
          initials: "MC",
          attendance: 78,
          averageGrade: "B",
          lastSubmission: "5 days ago",
          status: "absent",
        },
        {
          id: "student-5",
          name: "Samantha Lee",
          rollNumber: "2023049",
          initials: "SL",
          attendance: 90,
          averageGrade: "A-",
          lastSubmission: "1 hour ago",
          status: "active",
        },
      ],
    },
    {
      id: "class-2",
      name: "Physics Fundamentals",
      subject: "Physics",
      grade: "Grade 10",
      section: "B",
      totalStudents: 32,
      schedule: {
        days: ["Tuesday", "Thursday"],
        time: "11:00 AM - 12:30 PM",
      },
      room: "Room 105",
      averagePerformance: 78,
      students: [
        {
          id: "student-6",
          name: "David Kim",
          rollNumber: "2024001",
          initials: "DK",
          attendance: 85,
          averageGrade: "B+",
          lastSubmission: "4 hours ago",
          status: "active",
        },
        {
          id: "student-7",
          name: "Olivia Wilson",
          rollNumber: "2024002",
          initials: "OW",
          attendance: 93,
          averageGrade: "A",
          lastSubmission: "2 hours ago",
          status: "active",
        },
        {
          id: "student-8",
          name: "Ethan Brown",
          rollNumber: "2024003",
          initials: "EB",
          attendance: 76,
          averageGrade: "C+",
          lastSubmission: "1 week ago",
          status: "late",
        },
      ],
    },
    {
      id: "class-3",
      name: "Physics Lab",
      subject: "Physics",
      grade: "Grade 12",
      section: "A",
      totalStudents: 24,
      schedule: {
        days: ["Friday"],
        time: "2:00 PM - 4:00 PM",
      },
      room: "Lab 301",
      averagePerformance: 88,
      students: [
        {
          id: "student-9",
          name: "Isabella Garcia",
          rollNumber: "2022015",
          initials: "IG",
          attendance: 96,
          averageGrade: "A",
          lastSubmission: "30 minutes ago",
          status: "active",
        },
        {
          id: "student-10",
          name: "Noah Martinez",
          rollNumber: "2022016",
          initials: "NM",
          attendance: 89,
          averageGrade: "A-",
          lastSubmission: "2 days ago",
          status: "active",
        },
      ],
    },
  ]

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get status color
  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "absent":
        return "bg-red-500"
      case "late":
        return "bg-amber-500"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="container py-6 md:py-10">
      <header className="md:px-10 mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium">My Classes</h1>
            <p className="text-muted-foreground">Manage your classes and students</p>
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
              placeholder="Search classes..."
              className="h-9 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="md:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>
                      {classItem.grade} - Section {classItem.section}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{classItem.totalStudents} students</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{classItem.schedule.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{classItem.room}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Class Performance</span>
                  <span className="font-medium">{classItem.averagePerformance}%</span>
                </div>
                <Progress value={classItem.averagePerformance} className="h-2" />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Schedule</p>
                <div className="flex flex-wrap gap-1">
                  {classItem.schedule.days.map((day) => (
                    <Badge key={day} variant="secondary" className="text-xs">
                      {day.slice(0, 3)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Recent Students</p>
                <div className="flex -space-x-2">
                  {classItem.students.slice(0, 5).map((student) => (
                    <div key={student.id} className="relative">
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="text-xs">{student.initials}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(student.status)}`}
                      />
                    </div>
                  ))}
                  {classItem.students.length > 5 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +{classItem.students.length - 5}
                    </div>
                  )}
                </div>
              </div>

              <Link href={`/teacher/classes/${classItem.id}`}>
                <Button className="w-full gap-2">
                  <Users className="h-4 w-4" />
                  View Students
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="md:px-10 flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No classes found</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground max-w-md">
            {searchQuery
              ? "Try adjusting your search query to find what you're looking for."
              : "You don't have any classes assigned yet."}
          </p>
        </div>
      )}
    </div>
  )
}
