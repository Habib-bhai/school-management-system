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
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Eye,
  Download,
  MessageCircle,
} from "lucide-react"

interface Assignment {
  id: string
  title: string
  subject: string
  teacher: string
  child: string
  childClass: string
  dueDate: string
  submittedDate?: string
  status: "pending" | "submitted" | "reviewed" | "completed" | "overdue"
  grade?: string
  feedback?: string
  description: string
  attachments?: string[]
  submissionFiles?: string[]
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Math Problem Set Chapter 5",
    subject: "Mathematics",
    teacher: "Ms. Davis",
    child: "Emma Johnson",
    childClass: "Grade 8A",
    dueDate: "2024-12-20",
    submittedDate: "2024-12-18",
    status: "completed",
    grade: "A-",
    feedback: "Excellent work! Great understanding of algebraic concepts.",
    description: "Complete problems 1-20 from Chapter 5: Linear Equations",
    attachments: ["math_chapter5.pdf"],
    submissionFiles: ["emma_math_homework.pdf"],
  },
  {
    id: "2",
    title: "Science Lab Report - Chemical Reactions",
    subject: "Science",
    teacher: "Mr. Thompson",
    child: "Emma Johnson",
    childClass: "Grade 8A",
    dueDate: "2024-12-22",
    submittedDate: "2024-12-21",
    status: "reviewed",
    feedback: "Good observations, but needs more detailed analysis in conclusion.",
    description: "Write a detailed lab report on the chemical reactions experiment conducted in class",
    attachments: ["lab_report_template.pdf"],
    submissionFiles: ["emma_lab_report.pdf"],
  },
  {
    id: "3",
    title: "English Essay - My Summer Vacation",
    subject: "English",
    teacher: "Mrs. Wilson",
    child: "Alex Johnson",
    childClass: "Grade 5B",
    dueDate: "2024-12-25",
    status: "pending",
    description: "Write a 300-word essay about your summer vacation experiences",
    attachments: ["essay_guidelines.pdf"],
  },
  {
    id: "4",
    title: "History Project - Ancient Civilizations",
    subject: "History",
    teacher: "Mr. Brown",
    child: "Emma Johnson",
    childClass: "Grade 8A",
    dueDate: "2024-12-18",
    status: "overdue",
    description: "Create a presentation about ancient Egyptian civilization",
    attachments: ["project_requirements.pdf"],
  },
  {
    id: "5",
    title: "Art Portfolio Submission",
    subject: "Art",
    teacher: "Ms. Garcia",
    child: "Alex Johnson",
    childClass: "Grade 5B",
    dueDate: "2024-12-30",
    submittedDate: "2024-12-19",
    status: "submitted",
    description: "Submit 5 best artwork pieces from this semester",
    submissionFiles: ["alex_art_portfolio.zip"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "submitted":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "reviewed":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "pending":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "submitted":
      return <Clock className="h-4 w-4" />
    case "reviewed":
      return <Eye className="h-4 w-4" />
    case "pending":
      return <AlertTriangle className="h-4 w-4" />
    case "overdue":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function ChildsAssignments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)

  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChild = selectedChild === "all" || assignment.child === selectedChild
    const matchesSubject = selectedSubject === "all" || assignment.subject === selectedSubject

    return matchesSearch && matchesChild && matchesSubject
  })

  const getAssignmentsByStatus = (status: string) => {
    return filteredAssignments.filter((assignment) => assignment.status === status)
  }

  const getOverallProgress = () => {
    const completed = filteredAssignments.filter((a) => a.status === "completed").length
    const total = filteredAssignments.length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Child's Assignments</h1>
          <p className="text-muted-foreground">Track homework and assignments for all your children</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            {getOverallProgress()}% Completed
          </Badge>
        </div>
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
                  placeholder="Search assignments..."
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
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Art">Art</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getAssignmentsByStatus("completed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getAssignmentsByStatus("submitted").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{getAssignmentsByStatus("pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getAssignmentsByStatus("overdue").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AssignmentsList assignments={filteredAssignments} onViewDetails={setSelectedAssignment} />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <AssignmentsList assignments={getAssignmentsByStatus("pending")} onViewDetails={setSelectedAssignment} />
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <AssignmentsList assignments={getAssignmentsByStatus("submitted")} onViewDetails={setSelectedAssignment} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <AssignmentsList assignments={getAssignmentsByStatus("completed")} onViewDetails={setSelectedAssignment} />
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <AssignmentsList assignments={getAssignmentsByStatus("overdue")} onViewDetails={setSelectedAssignment} />
        </TabsContent>
      </Tabs>

      {/* Assignment Details Dialog */}
      <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAssignment.title}</DialogTitle>
                <DialogDescription>
                  {selectedAssignment.subject} • {selectedAssignment.teacher} • {selectedAssignment.child}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedAssignment.status)}>
                    {getStatusIcon(selectedAssignment.status)}
                    <span className="ml-1 capitalize">{selectedAssignment.status}</span>
                  </Badge>
                  {selectedAssignment.grade && <Badge variant="outline">Grade: {selectedAssignment.grade}</Badge>}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Assignment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>{new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      {selectedAssignment.submittedDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Submitted:</span>
                          <span>{new Date(selectedAssignment.submittedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Class:</span>
                        <span>{selectedAssignment.childClass}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.feedback && (
                  <div>
                    <h4 className="font-medium mb-2">Teacher Feedback</h4>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{selectedAssignment.feedback}</p>
                    </div>
                  </div>
                )}

                {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Assignment Files</h4>
                    <div className="space-y-2">
                      {selectedAssignment.attachments.map((file, index) => (
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

                {selectedAssignment.submissionFiles && selectedAssignment.submissionFiles.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Submitted Files</h4>
                    <div className="space-y-2">
                      {selectedAssignment.submissionFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{file}</span>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Teacher
                  </Button>
                  <Button onClick={() => setSelectedAssignment(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AssignmentsList({
  assignments,
  onViewDetails,
}: {
  assignments: Assignment[]
  onViewDetails: (assignment: Assignment) => void
}) {
  if (assignments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No assignments found</h3>
          <p className="text-muted-foreground text-center">No assignments match your current filters.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">{assignment.title}</h3>
                  <Badge className={getStatusColor(assignment.status)}>
                    {getStatusIcon(assignment.status)}
                    <span className="ml-1 capitalize">{assignment.status}</span>
                  </Badge>
                  {assignment.grade && <Badge variant="outline">Grade: {assignment.grade}</Badge>}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {assignment.subject}
                  </span>
                  <span>{assignment.teacher}</span>
                  <span>
                    {assignment.child} • {assignment.childClass}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>

                {assignment.submittedDate && (
                  <p className="text-sm text-green-600">
                    Submitted on {new Date(assignment.submittedDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => onViewDetails(assignment)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message Teacher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
