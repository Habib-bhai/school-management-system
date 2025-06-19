"use client"
import React from 'react'

import { useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Edit,
    Save,
    Bell,
    MessageSquare,
    AlertTriangle,
    Clock,
    FileText,
    TrendingUp,
    Calendar,
    Award,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Assignment {
    id: string
    title: string
    subject: string
    dueDate: string
    submittedDate?: string
    status: "pending" | "submitted" | "graded" | "late"
    grade?: string
    marks?: number
    totalMarks: number
    feedback?: string
    submissionUrl?: string
}

interface Student {
    id: string
    name: string
    rollNumber: string
    email: string
    avatar?: string
    initials: string
    attendance: number
    averageGrade: string
    totalAssignments: number
    completedAssignments: number
    parentName: string
    parentEmail: string
    parentPhone: string
    class: string
    section: string
    admissionDate: string
    address: string
}
export default function StudentDetailsDynamicPage({studentId, classId}: {studentId: string, classId: string}) {
  const [editingAssignment, setEditingAssignment] = useState<string | null>(null)
    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationType, setNotificationType] = useState<"notification" | "reminder" | "warning">("notification")
    const [complaintMessage, setComplaintMessage] = useState("")



    // Sample student data - in real app, this would be fetched based on studentId
    const student: Student = {
        id: studentId,
        name: "Jamie Smith",
        rollNumber: "2023045",
        email: "jamie.smith@school.edu",
        initials: "JS",
        attendance: 95,
        averageGrade: "A-",
        totalAssignments: 12,
        completedAssignments: 11,
        parentName: "Robert Smith",
        parentEmail: "robert.smith@email.com",
        parentPhone: "+1 (555) 123-4567",
        class: "Grade 11",
        section: "A",
        admissionDate: "2023-08-15",
        address: "123 Main Street, City, State 12345",
    }

    // Sample assignments data
    const [assignments, setAssignments] = useState<Assignment[]>([
        {
            id: "assignment-1",
            title: "Physics Lab Report: Wave Properties",
            subject: "Physics",
            dueDate: "2025-01-15",
            submittedDate: "2025-01-14",
            status: "graded",
            grade: "A",
            marks: 95,
            totalMarks: 100,
            feedback:
                "Excellent work! Your analysis of wave interference patterns was particularly impressive. The experimental setup was well-designed and your conclusions were well-supported by the data.",
            submissionUrl: "#",
        },
        {
            id: "assignment-2",
            title: "Mechanics Problem Set",
            subject: "Physics",
            dueDate: "2025-01-20",
            submittedDate: "2025-01-19",
            status: "graded",
            grade: "B+",
            marks: 88,
            totalMarks: 100,
            feedback:
                "Good understanding of the concepts. Problem 5 could use more detailed explanation of the force analysis.",
            submissionUrl: "#",
        },
        {
            id: "assignment-3",
            title: "Thermodynamics Quiz",
            subject: "Physics",
            dueDate: "2025-01-25",
            submittedDate: "2025-01-24",
            status: "graded",
            grade: "A-",
            marks: 92,
            totalMarks: 100,
            feedback: "Strong performance overall. Minor calculation error in question 3, but the approach was correct.",
            submissionUrl: "#",
        },
        {
            id: "assignment-4",
            title: "Optics Experiment Report",
            subject: "Physics",
            dueDate: "2025-02-01",
            submittedDate: "2025-01-30",
            status: "submitted",
            totalMarks: 100,
            submissionUrl: "#",
        },
        {
            id: "assignment-5",
            title: "Electromagnetic Waves Assignment",
            subject: "Physics",
            dueDate: "2025-02-05",
            status: "pending",
            totalMarks: 100,
        },
        {
            id: "assignment-6",
            title: "Quantum Physics Introduction",
            subject: "Physics",
            dueDate: "2025-01-18",
            status: "late",
            totalMarks: 100,
        },
    ])

    // Handle grade assignment
    const handleGradeAssignment = (assignmentId: string, marks: number, feedback: string) => {
        setAssignments((prev) =>
            prev.map((assignment) =>
                assignment.id === assignmentId
                    ? {
                        ...assignment,
                        marks,
                        feedback,
                        status: "graded" as const,
                        grade: getGradeFromMarks(marks),
                    }
                    : assignment,
            ),
        )

        setEditingAssignment(null)
        toast("The assignment has been graded successfully.")
    }

    // Convert marks to grade
    const getGradeFromMarks = (marks: number): string => {
        if (marks >= 95) return "A+"
        if (marks >= 90) return "A"
        if (marks >= 85) return "A-"
        if (marks >= 80) return "B+"
        if (marks >= 75) return "B"
        if (marks >= 70) return "B-"
        if (marks >= 65) return "C+"
        if (marks >= 60) return "C"
        if (marks >= 55) return "C-"
        if (marks >= 50) return "D"
        return "F"
    }

    // Handle notification sending
    const handleSendNotification = () => {
        if (!notificationMessage.trim()) return

        toast(`${notificationType.charAt(0).toUpperCase() + notificationType.slice(1)} sent to ${student.name}`)

        setNotificationMessage("")
    }

    // Handle parent complaint
    const handleSendComplaint = () => {
        if (!complaintMessage.trim()) return

        toast(`Complaint sent to ${student.parentName} (${student.parentEmail})`)

        setComplaintMessage("")
    }

    // Get status badge
    const getStatusBadge = (status: Assignment["status"]) => {
        switch (status) {
            case "graded":
                return <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
            case "submitted":
                return (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                        Submitted
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                        Pending
                    </Badge>
                )
            case "late":
                return <Badge variant="destructive">Late</Badge>
            default:
                return null
        }
    }

    // Calculate student statistics
    const gradedAssignments = assignments.filter((a) => a.status === "graded")
    const averageMarks =
        gradedAssignments.length > 0
            ? Math.round(gradedAssignments.reduce((sum, a) => sum + (a.marks || 0), 0) / gradedAssignments.length)
            : 0

    return (
        <div className="container py-6 md:py-10">
            <header className="mb-8 md:px-10">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={`/teacher/classes/${classId}`}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to class</span>
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback className="text-lg">{student.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-medium">{student.name}</h1>
                            <p className="text-muted-foreground">
                                Roll: {student.rollNumber} • {student.class} - Section {student.section}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Student Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Attendance</span>
                            </div>
                            <p className="text-2xl font-bold">{student.attendance}%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Average Grade</span>
                            </div>
                            <p className="text-2xl font-bold">{student.averageGrade}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Assignments</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {student.completedAssignments}/{student.totalAssignments}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Avg. Marks</span>
                            </div>
                            <p className="text-2xl font-bold">{averageMarks}%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Bell className="h-4 w-4" />
                                Send Notification
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Notification to {student.name}</DialogTitle>
                                <DialogDescription>
                                    Send a notification, reminder, or warning directly to the student.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select value={notificationType} onValueChange={(value: 
                                          // eslint-disable-next-line
                                        any) => setNotificationType(value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="notification">Notification</SelectItem>
                                            <SelectItem value="reminder">Reminder</SelectItem>
                                            <SelectItem value="warning">Warning</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Enter your message..."
                                        value={notificationMessage}
                                        onChange={(e) => setNotificationMessage(e.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSendNotification} disabled={!notificationMessage.trim()}>
                                    Send {notificationType.charAt(0).toUpperCase() + notificationType.slice(1)}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Contact Parent
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Complaint to Parent</DialogTitle>
                                <DialogDescription>
                                    Send a complaint or concern about {student.name} to {student.parentName}.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Parent Contact</Label>
                                    <div className="text-sm text-muted-foreground">
                                        <p>{student.parentName}</p>
                                        <p>{student.parentEmail}</p>
                                        <p>{student.parentPhone}</p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="complaint">Message</Label>
                                    <Textarea
                                        id="complaint"
                                        placeholder="Describe the issue or concern..."
                                        value={complaintMessage}
                                        onChange={(e) => setComplaintMessage(e.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSendComplaint} disabled={!complaintMessage.trim()}>
                                    Send Message
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            <Tabs defaultValue="assignments" className="w-full md:px-10">
                <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="assignments" className="mt-0">
                    <div className="space-y-4">
                        {assignments.map((assignment) => (
                            <Card key={assignment.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{assignment.title}</CardTitle>
                                            <CardDescription>
                                                Due: {assignment.dueDate}
                                                {assignment.submittedDate && ` • Submitted: ${assignment.submittedDate}`}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(assignment.status)}
                                            {assignment.status === "submitted" && (
                                                <Button variant="outline" size="sm" onClick={() => setEditingAssignment(assignment.id)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Grade
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {editingAssignment === assignment.id ? (
                                        <GradeAssignmentForm
                                            assignment={assignment}
                                            onSave={(marks, feedback) => handleGradeAssignment(assignment.id, marks, feedback)}
                                            onCancel={() => setEditingAssignment(null)}
                                        />
                                    ) : (
                                        <div className="space-y-4">
                                            {assignment.status === "graded" && (
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <Label className="text-sm text-muted-foreground">Grade</Label>
                                                        <div className="flex items-center gap-2">
                                                            <Badge className="bg-green-500 hover:bg-green-600">{assignment.grade}</Badge>
                                                            <span className="text-sm">
                                                                {assignment.marks}/{assignment.totalMarks} (
                                                                {Math.round((assignment.marks! / assignment.totalMarks) * 100)}%)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm text-muted-foreground">Status</Label>
                                                        <p className="text-sm">Graded and returned to student</p>
                                                    </div>
                                                </div>
                                            )}

                                            {assignment.status === "submitted" && (
                                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-blue-600" />
                                                        <p className="text-sm text-blue-800">
                                                            This assignment is awaiting your review and grading.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {assignment.status === "pending" && (
                                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-amber-600" />
                                                        <p className="text-sm text-amber-800">
                                                            Assignment not yet submitted. Due: {assignment.dueDate}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {assignment.status === "late" && (
                                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                                    <div className="flex items-center gap-2">
                                                        <AlertTriangle className="h-4 w-4 text-red-600" />
                                                        <p className="text-sm text-red-800">Assignment is overdue. Was due: {assignment.dueDate}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {assignment.feedback && (
                                                <div>
                                                    <Label className="text-sm text-muted-foreground">Feedback</Label>
                                                    <div className="mt-1 rounded-lg border p-3 bg-muted/50">
                                                        <p className="text-sm">{assignment.feedback}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {assignment.submissionUrl && (
                                                <div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a href={assignment.submissionUrl} target="_blank" rel="noopener noreferrer">
                                                            <FileText className="mr-2 h-4 w-4" />
                                                            View Submission
                                                        </a>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="profile" className="mt-0">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Full Name</Label>
                                    <p>{student.name}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Roll Number</Label>
                                    <p>{student.rollNumber}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Email</Label>
                                    <p>{student.email}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Class & Section</Label>
                                    <p>
                                        {student.class} - Section {student.section}
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Admission Date</Label>
                                    <p>{student.admissionDate}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Address</Label>
                                    <p>{student.address}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Parent/Guardian Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Parent Name</Label>
                                    <p>{student.parentName}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Email</Label>
                                    <p>{student.parentEmail}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm text-muted-foreground">Phone</Label>
                                    <p>{student.parentPhone}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Academic Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="text-center">
                                        <div className="relative flex h-32 w-32 items-center justify-center mx-auto">
                                            <svg className="h-full w-full" viewBox="0 0 100 100">
                                                <circle className="stroke-muted" cx="50" cy="50" r="40" strokeWidth="10" fill="none" />
                                                <circle
                                                    className="stroke-primary"
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    strokeWidth="10"
                                                    fill="none"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset={251.2 - (student.attendance / 100) * 251.2}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold">{student.attendance}%</span>
                                                <span className="text-xs text-muted-foreground">Attendance</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="relative flex h-32 w-32 items-center justify-center mx-auto">
                                            <svg className="h-full w-full" viewBox="0 0 100 100">
                                                <circle className="stroke-muted" cx="50" cy="50" r="40" strokeWidth="10" fill="none" />
                                                <circle
                                                    className="stroke-green-500"
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    strokeWidth="10"
                                                    fill="none"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset={251.2 - (averageMarks / 100) * 251.2}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold">{averageMarks}%</span>
                                                <span className="text-xs text-muted-foreground">Avg. Marks</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="relative flex h-32 w-32 items-center justify-center mx-auto">
                                            <svg className="h-full w-full" viewBox="0 0 100 100">
                                                <circle className="stroke-muted" cx="50" cy="50" r="40" strokeWidth="10" fill="none" />
                                                <circle
                                                    className="stroke-amber-500"
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    strokeWidth="10"
                                                    fill="none"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset={
                                                        251.2 - (((student.completedAssignments / student.totalAssignments) * 100) / 100) * 251.2
                                                    }
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold">
                                                    {Math.round((student.completedAssignments / student.totalAssignments) * 100)}%
                                                </span>
                                                <span className="text-xs text-muted-foreground">Completion</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}



// Grade assignment form component
function GradeAssignmentForm({
    assignment,
    onSave,
    onCancel,
}: {
    assignment: Assignment
    onSave: (marks: number, feedback: string) => void
    onCancel: () => void
}) {
    const [marks, setMarks] = useState<number>(0)
    const [feedback, setFeedback] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (marks < 0 || marks > assignment.totalMarks) return
        onSave(marks, feedback)
    }

    const getGradeFromMarks = (marks: number): string => {
        if (marks >= 95) return "A+"
        if (marks >= 90) return "A"
        if (marks >= 85) return "A-"
        if (marks >= 80) return "B+"
        if (marks >= 75) return "B"
        if (marks >= 70) return "B-"
        if (marks >= 65) return "C+"
        if (marks >= 60) return "C"
        if (marks >= 55) return "C-"
        if (marks >= 50) return "D"
        return "F"
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <Label htmlFor="marks">Marks</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="marks"
                            type="number"
                            min="0"
                            max={assignment.totalMarks}
                            value={marks}
                            onChange={(e) => setMarks(Number(e.target.value))}
                            placeholder="0"
                        />
                        <span className="text-sm text-muted-foreground">/ {assignment.totalMarks}</span>
                    </div>
                    {marks > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Grade: {getGradeFromMarks((marks / assignment.totalMarks) * 100)} (
                            {Math.round((marks / assignment.totalMarks) * 100)}%)
                        </p>
                    )}
                </div>
            </div>
            <div>
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide feedback for the student..."
                    rows={4}
                />
            </div>
            <div className="flex items-center gap-2">
                <Button type="submit" size="sm" disabled={marks <= 0}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Grade
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}