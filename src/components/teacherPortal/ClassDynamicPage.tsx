"use client"
import React from 'react'
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Users, TrendingUp, Calendar, Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    totalAssignments: number
    completedAssignments: number
    email: string
    parentContact: string
}


function ClassDynamicPage({classId}:{classId: string}) {
  const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilter, setSelectedFilter] = useState<string>("all")


    // Sample class data - in real app, this would be fetched based on classId
    const classData = {
        id: classId,
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
    }

    // Sample students data
    const students: Student[] = [
        {
            id: "student-1",
            name: "Jamie Smith",
            rollNumber: "2023045",
            initials: "JS",
            attendance: 95,
            averageGrade: "A-",
            lastSubmission: "2 hours ago",
            status: "active",
            totalAssignments: 12,
            completedAssignments: 11,
            email: "jamie.smith@school.edu",
            parentContact: "parent1@email.com",
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
            totalAssignments: 12,
            completedAssignments: 12,
            email: "alex.johnson@school.edu",
            parentContact: "parent2@email.com",
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
            totalAssignments: 12,
            completedAssignments: 10,
            email: "emily.rodriguez@school.edu",
            parentContact: "parent3@email.com",
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
            totalAssignments: 12,
            completedAssignments: 8,
            email: "michael.chen@school.edu",
            parentContact: "parent4@email.com",
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
            totalAssignments: 12,
            completedAssignments: 11,
            email: "samantha.lee@school.edu",
            parentContact: "parent5@email.com",
        },
        {
            id: "student-6",
            name: "David Kim",
            rollNumber: "2023050",
            initials: "DK",
            attendance: 85,
            averageGrade: "B+",
            lastSubmission: "4 hours ago",
            status: "active",
            totalAssignments: 12,
            completedAssignments: 9,
            email: "david.kim@school.edu",
            parentContact: "parent6@email.com",
        },
        {
            id: "student-7",
            name: "Olivia Wilson",
            rollNumber: "2023051",
            initials: "OW",
            attendance: 93,
            averageGrade: "A",
            lastSubmission: "2 hours ago",
            status: "active",
            totalAssignments: 12,
            completedAssignments: 12,
            email: "olivia.wilson@school.edu",
            parentContact: "parent7@email.com",
        },
        {
            id: "student-8",
            name: "Ethan Brown",
            rollNumber: "2023052",
            initials: "EB",
            attendance: 76,
            averageGrade: "C+",
            lastSubmission: "1 week ago",
            status: "late",
            totalAssignments: 12,
            completedAssignments: 7,
            email: "ethan.brown@school.edu",
            parentContact: "parent8@email.com",
        },
    ]

    // Filter students based on search query and filter
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.rollNumber.includes(searchQuery)

        const matchesFilter = selectedFilter === "all" || student.status === selectedFilter

        return matchesSearch && matchesFilter
    })

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

    // Get status badge
    const getStatusBadge = (status: Student["status"]) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
            case "absent":
                return <Badge variant="destructive">Absent</Badge>
            case "late":
                return (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                        Late
                    </Badge>
                )
            default:
                return null
        }
    }

    // Calculate class statistics
    const classStats = {
        averageAttendance: Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length),
        activeStudents: students.filter((s) => s.status === "active").length,
        absentStudents: students.filter((s) => s.status === "absent").length,
        averageCompletion: Math.round(
            students.reduce((sum, student) => sum + (student.completedAssignments / student.totalAssignments) * 100, 0) /
            students.length,
        ),
    }

    return (
        <div className=" container py-6 md:py-10">
            <header className="md:px-10 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/teacher/classes">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to classes</span>
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-medium">{classData.name}</h1>
                        <p className="text-muted-foreground">
                            {classData.grade} - Section {classData.section} • {classData.room}
                        </p>
                    </div>
                </div>

                {/* Class Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Total Students</span>
                            </div>
                            <p className="text-2xl font-bold">{classData.totalStudents}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Avg. Attendance</span>
                            </div>
                            <p className="text-2xl font-bold">{classStats.averageAttendance}%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Active Today</span>
                            </div>
                            <p className="text-2xl font-bold">{classStats.activeStudents}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Avg. Completion</span>
                            </div>
                            <p className="text-2xl font-bold">{classStats.averageCompletion}%</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students..."
                                className="h-9 pl-8 w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                    </div>
                </div>
            </header>

            <Tabs defaultValue="all" className="w-full md:px-10">
                <TabsList className="mb-6 grid w-full max-w-md grid-cols-4">
                    <TabsTrigger value="all" onClick={() => setSelectedFilter("all")}>
                        All ({students.length})
                    </TabsTrigger>
                    <TabsTrigger value="active" onClick={() => setSelectedFilter("active")}>
                        Active ({classStats.activeStudents})
                    </TabsTrigger>
                    <TabsTrigger value="absent" onClick={() => setSelectedFilter("absent")}>
                        Absent ({classStats.absentStudents})
                    </TabsTrigger>
                    <TabsTrigger value="late" onClick={() => setSelectedFilter("late")}>
                        Late ({students.filter((s) => s.status === "late").length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        {filteredStudents.map((student) => (
                            <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                                    <AvatarFallback>{student.initials}</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(student.status)}`}
                                                />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{student.name}</CardTitle>
                                                <CardDescription>Roll: {student.rollNumber}</CardDescription>
                                            </div>
                                        </div>
                                        {getStatusBadge(student.status)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Attendance</p>
                                            <p className="font-medium">{student.attendance}%</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Avg. Grade</p>
                                            <p className="font-medium">{student.averageGrade}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Assignment Progress</span>
                                            <span className="font-medium">
                                                {student.completedAssignments}/{student.totalAssignments}
                                            </span>
                                        </div>
                                        <Progress value={(student.completedAssignments / student.totalAssignments) * 100} className="h-2" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Last submission: {student.lastSubmission}</p>
                                    </div>

                                    <Link href={`/teacher/classes/${classId}/students/${student.id}`}>
                                        <Button className="w-full" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="active" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredStudents
                            .filter((s) => s.status === "active")
                            .map((student) => (
                                <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                                        <AvatarFallback>{student.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(student.status)}`}
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base">{student.name}</CardTitle>
                                                    <CardDescription>Roll: {student.rollNumber}</CardDescription>
                                                </div>
                                            </div>
                                            {getStatusBadge(student.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Attendance</p>
                                                <p className="font-medium">{student.attendance}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Avg. Grade</p>
                                                <p className="font-medium">{student.averageGrade}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Assignment Progress</span>
                                                <span className="font-medium">
                                                    {student.completedAssignments}/{student.totalAssignments}
                                                </span>
                                            </div>
                                            <Progress
                                                value={(student.completedAssignments / student.totalAssignments) * 100}
                                                className="h-2"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">Last submission: {student.lastSubmission}</p>
                                        </div>

                                        <Link href={`/teacher/classes/${classId}/students/${student.id}`}>
                                            <Button className="w-full" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="absent" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredStudents
                            .filter((s) => s.status === "absent")
                            .map((student) => (
                                <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                                        <AvatarFallback>{student.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(student.status)}`}
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base">{student.name}</CardTitle>
                                                    <CardDescription>Roll: {student.rollNumber}</CardDescription>
                                                </div>
                                            </div>
                                            {getStatusBadge(student.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Attendance</p>
                                                <p className="font-medium">{student.attendance}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Avg. Grade</p>
                                                <p className="font-medium">{student.averageGrade}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Assignment Progress</span>
                                                <span className="font-medium">
                                                    {student.completedAssignments}/{student.totalAssignments}
                                                </span>
                                            </div>
                                            <Progress
                                                value={(student.completedAssignments / student.totalAssignments) * 100}
                                                className="h-2"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">Last submission: {student.lastSubmission}</p>
                                        </div>

                                        <Link href={`/teacher/classes/${classId}/students/${student.id}`}>
                                            <Button className="w-full" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="late" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredStudents
                            .filter((s) => s.status === "late")
                            .map((student) => (
                                <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                                        <AvatarFallback>{student.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(student.status)}`}
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base">{student.name}</CardTitle>
                                                    <CardDescription>Roll: {student.rollNumber}</CardDescription>
                                                </div>
                                            </div>
                                            {getStatusBadge(student.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Attendance</p>
                                                <p className="font-medium">{student.attendance}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Avg. Grade</p>
                                                <p className="font-medium">{student.averageGrade}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Assignment Progress</span>
                                                <span className="font-medium">
                                                    {student.completedAssignments}/{student.totalAssignments}
                                                </span>
                                            </div>
                                            <Progress
                                                value={(student.completedAssignments / student.totalAssignments) * 100}
                                                className="h-2"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">Last submission: {student.lastSubmission}</p>
                                        </div>

                                        <Link href={`/teacher/classes/${classId}/students/${student.id}`}>
                                            <Button className="w-full" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>

            {filteredStudents.length === 0 && (
                <div className="md:px-10 flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No students found</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground max-w-md">
                        {searchQuery
                            ? "Try adjusting your search query to find what you're looking for."
                            : "No students match the selected filter."}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ClassDynamicPage