"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Mail,
  Phone,
  Award,
  Users,
  AlertTriangle,
  MessageSquare,
  Send,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@student.edu",
    phone: "+1 (555) 123-4567",
    class: "Grade 9A",
    rollNumber: "G9A001",
    dateOfBirth: "2008-05-15",
    address: "123 Oak Street, Springfield",
    parentName: "Robert Johnson",
    parentPhone: "+1 (555) 987-6543",
    parentEmail: "robert.johnson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    attendance: 95,
    overallGrade: "A",
    assignments: [
      {
        id: 1,
        title: "Math Assignment 1",
        subject: "Mathematics",
        status: "completed",
        grade: "A",
        dueDate: "2024-01-15",
        submittedDate: "2024-01-14",
      },
      {
        id: 2,
        title: "Physics Lab Report",
        subject: "Physics",
        status: "completed",
        grade: "B+",
        dueDate: "2024-01-20",
        submittedDate: "2024-01-19",
      },
      {
        id: 3,
        title: "English Essay",
        subject: "English",
        status: "pending",
        grade: null,
        dueDate: "2024-01-25",
        submittedDate: null,
      },
      {
        id: 4,
        title: "History Project",
        subject: "History",
        status: "overdue",
        grade: null,
        dueDate: "2024-01-22",
        submittedDate: null,
      },
    ],
    performance: {
      mathematics: 92,
      physics: 88,
      english: 85,
      history: 78,
      chemistry: 90,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@student.edu",
    phone: "+1 (555) 234-5678",
    class: "Grade 9A",
    rollNumber: "G9A002",
    dateOfBirth: "2008-08-22",
    address: "456 Pine Avenue, Springfield",
    parentName: "Mary Smith",
    parentPhone: "+1 (555) 876-5432",
    parentEmail: "mary.smith@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    attendance: 87,
    overallGrade: "B+",
    assignments: [
      {
        id: 1,
        title: "Math Assignment 1",
        subject: "Mathematics",
        status: "completed",
        grade: "B",
        dueDate: "2024-01-15",
        submittedDate: "2024-01-15",
      },
      {
        id: 2,
        title: "Physics Lab Report",
        subject: "Physics",
        status: "overdue",
        grade: null,
        dueDate: "2024-01-20",
        submittedDate: null,
      },
      {
        id: 3,
        title: "English Essay",
        subject: "English",
        status: "pending",
        grade: null,
        dueDate: "2024-01-25",
        submittedDate: null,
      },
      {
        id: 4,
        title: "History Project",
        subject: "History",
        status: "overdue",
        grade: null,
        dueDate: "2024-01-22",
        submittedDate: null,
      },
    ],
    performance: {
      mathematics: 82,
      physics: 75,
      english: 88,
      history: 80,
      chemistry: 85,
    },
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@student.edu",
    phone: "+1 (555) 345-6789",
    class: "Grade 9B",
    rollNumber: "G9B001",
    dateOfBirth: "2008-03-10",
    address: "789 Maple Drive, Springfield",
    parentName: "James Davis",
    parentPhone: "+1 (555) 765-4321",
    parentEmail: "james.davis@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    attendance: 98,
    overallGrade: "A+",
    assignments: [
      {
        id: 1,
        title: "Math Assignment 1",
        subject: "Mathematics",
        status: "completed",
        grade: "A+",
        dueDate: "2024-01-15",
        submittedDate: "2024-01-13",
      },
      {
        id: 2,
        title: "Physics Lab Report",
        subject: "Physics",
        status: "completed",
        grade: "A",
        dueDate: "2024-01-20",
        submittedDate: "2024-01-18",
      },
      {
        id: 3,
        title: "English Essay",
        subject: "English",
        status: "completed",
        grade: "A",
        dueDate: "2024-01-25",
        submittedDate: "2024-01-24",
      },
      {
        id: 4,
        title: "History Project",
        subject: "History",
        status: "completed",
        grade: "A+",
        dueDate: "2024-01-22",
        submittedDate: "2024-01-21",
      },
    ],
    performance: {
      mathematics: 98,
      physics: 95,
      english: 92,
      history: 96,
      chemistry: 94,
    },
  },
]

const classes = [
  "All Classes",
  "Grade 9A",
  "Grade 9B",
  "Grade 10A",
  "Grade 10B",
  "Grade 11A",
  "Grade 11B",
  "Grade 12A",
  "Grade 12B",
]

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("All Classes")
  // eslint-disable-next-line
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [parentMessage, setParentMessage] = useState("")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "All Classes" || student.class === selectedClass

    return matchesSearch && matchesClass
  })

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  // eslint-disable-next-line
  const getOverdueCount = (assignments:any) => {
  // eslint-disable-next-line
    return assignments.filter((a:any) => a.status === "overdue").length
  }

    // eslint-disable-next-line
const handleNotifyParent = (student:any) => {
    if (parentMessage.trim()) {
      // Handle sending notification to parent
      console.log(`Notifying parent of ${student.name}: ${parentMessage}`)
      setParentMessage("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600 mt-1">Manage student records and track academic progress</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const overdueCount = getOverdueCount(student.assignments)
          return (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>
                        {student.class} • {student.rollNumber}
                      </CardDescription>
                    </div>
                  </div>
                  {overdueCount > 0 && <Badge variant="destructive">{overdueCount} Overdue</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Attendance: {student.attendance}%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>Grade: {student.overallGrade}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-xl font-bold">{student.name}</div>
                            <div className="text-sm text-gray-500">
                              {student.class} • {student.rollNumber}
                            </div>
                          </div>
                        </DialogTitle>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="mt-6">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="assignments">Assignments</TabsTrigger>
                          <TabsTrigger value="performance">Performance</TabsTrigger>
                          <TabsTrigger value="parent">Parent Info</TabsTrigger>
                          <TabsTrigger value="notify">Notify Parent</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Personal Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Email:</span>
                                  <span>{student.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Phone:</span>
                                  <span>{student.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Date of Birth:</span>
                                  <span>{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Address:</span>
                                  <span className="text-right">{student.address}</span>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Academic Summary</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Overall Grade:</span>
                                  <Badge variant="default">{student.overallGrade}</Badge>
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Attendance:</span>
                                    <span>{student.attendance}%</span>
                                  </div>
                                  <Progress value={student.attendance} />
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-600">Assignments Status:</span>
                                  <div className="mt-2 space-y-1">
                                    <div className="flex justify-between">
                                      <span>Completed:</span>
                                      <span className="text-green-600">
                                        {student.assignments.filter((a) => a.status === "completed").length}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Pending:</span>
                                      <span className="text-yellow-600">
                                        {student.assignments.filter((a) => a.status === "pending").length}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Overdue:</span>
                                      <span className="text-red-600">
                                        {student.assignments.filter((a) => a.status === "overdue").length}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="assignments" className="space-y-4">
                          <div className="space-y-3">
                            {student.assignments.map((assignment) => (
                              <Card key={assignment.id}>
                                <CardContent className="pt-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-3">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        <div>
                                          <h4 className="font-medium">{assignment.title}</h4>
                                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                                        </div>
                                      </div>
                                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                        {assignment.submittedDate && (
                                          <span>
                                            Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {assignment.grade && <Badge variant="outline">{assignment.grade}</Badge>}
                                      <Badge className={getAssignmentStatusColor(assignment.status)}>
                                        {assignment.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="performance" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(student.performance).map(([subject, score]) => (
                              <Card key={subject}>
                                <CardContent className="pt-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium capitalize">{subject}</span>
                                    <span className="text-lg font-bold">{score}%</span>
                                  </div>
                                  <Progress value={score} />
                                  <div className="flex items-center mt-2 text-sm">
                                    {score >= 90 ? (
                                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    ) : score >= 75 ? (
                                      <TrendingUp className="w-4 h-4 text-yellow-500 mr-1" />
                                    ) : (
                                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                    )}
                                    <span
                                      className={
                                        score >= 90
                                          ? "text-green-600"
                                          : score >= 75
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                      }
                                    >
                                      {score >= 90 ? "Excellent" : score >= 75 ? "Good" : "Needs Improvement"}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="parent" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Parent/Guardian Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{student.parentName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{student.parentPhone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{student.parentEmail}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="notify" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Notify Parent</CardTitle>
                              <CardDescription>
                                Send a notification to {student.parentName} about {student.name}&apos;s academic progress
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {getOverdueCount(student.assignments) > 0 && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    <span className="font-medium text-red-800">
                                      {getOverdueCount(student.assignments)} overdue assignments detected
                                    </span>
                                  </div>
                                  <p className="text-sm text-red-700 mt-1">
                                    Consider notifying the parent about incomplete assignments.
                                  </p>
                                </div>
                              )}

                              <div>
                                <label className="text-sm font-medium">Message to Parent</label>
                                <Textarea
                                  placeholder="Type your message to the parent..."
                                  value={parentMessage}
                                  onChange={(e) => setParentMessage(e.target.value)}
                                  rows={4}
                                  className="mt-1"
                                />
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => handleNotifyParent(student)}
                                  disabled={!parentMessage.trim()}
                                  className="flex-1"
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Notification
                                </Button>
                                <Button variant="outline">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Start Chat
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  {overdueCount > 0 && (
                    <Button variant="destructive" size="sm">
                      <AlertTriangle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">No students found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
