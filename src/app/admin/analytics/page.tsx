"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, BookOpen, Download } from "lucide-react"

// Mock data for analytics
const studentPerformanceData = [
  { month: "Jan", average: 78, attendance: 92 },
  { month: "Feb", average: 82, attendance: 89 },
  { month: "Mar", average: 85, attendance: 94 },
  { month: "Apr", average: 79, attendance: 87 },
  { month: "May", average: 88, attendance: 91 },
  { month: "Jun", average: 91, attendance: 95 },
]

const feeCollectionData = [
  { month: "Jan", collected: 45000, pending: 8000 },
  { month: "Feb", collected: 52000, pending: 6000 },
  { month: "Mar", collected: 48000, pending: 9000 },
  { month: "Apr", collected: 55000, pending: 4000 },
  { month: "May", collected: 51000, pending: 7000 },
  { month: "Jun", collected: 58000, pending: 3000 },
]

const gradeDistribution = [
  { grade: "A+", count: 45, color: "#10b981" },
  { grade: "A", count: 78, color: "#3b82f6" },
  { grade: "B+", count: 92, color: "#8b5cf6" },
  { grade: "B", count: 67, color: "#f59e0b" },
  { grade: "C+", count: 34, color: "#ef4444" },
  { grade: "C", count: 18, color: "#6b7280" },
]

const teacherPerformanceData = [
  { name: "Sarah Johnson", rating: 4.8, classes: 6, students: 180 },
  { name: "Michael Chen", rating: 4.6, classes: 5, students: 150 },
  { name: "Emily Davis", rating: 4.9, classes: 4, students: 120 },
  { name: "David Wilson", rating: 4.5, classes: 7, students: 210 },
  { name: "Lisa Anderson", rating: 4.7, classes: 5, students: 165 },
]

const attendanceData = [
  { day: "Mon", present: 420, absent: 30 },
  { day: "Tue", present: 435, absent: 15 },
  { day: "Wed", present: 410, absent: 40 },
  { day: "Thu", present: 445, absent: 5 },
  { day: "Fri", present: 425, absent: 25 },
]

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("overview")

  const stats = [
    {
      title: "Total Students",
      value: "450",
      change: "+12",
      changeType: "increase",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Teachers",
      value: "24",
      change: "+2",
      changeType: "increase",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Fee Collection",
      value: "$58,000",
      change: "+8%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Average Grade",
      value: "B+",
      change: "+0.2",
      changeType: "increase",
      icon: BookOpen,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive school performance insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === "increase" ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Trend</CardTitle>
                <CardDescription>Average grades and attendance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    average: { label: "Average Grade", color: "#3b82f6" },
                    attendance: { label: "Attendance %", color: "#10b981" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current semester grade breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Students", color: "#8b5cf6" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ grade, count }) => `${grade}: ${count}`}
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Performance Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
                <CardDescription>Monthly average scores across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    average: { label: "Average Score", color: "#3b82f6" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={studentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="average" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest grades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Alice Johnson", grade: "A+", score: 96 },
                  { name: "Bob Smith", grade: "A+", score: 94 },
                  { name: "Carol Davis", grade: "A", score: 92 },
                  { name: "David Wilson", grade: "A", score: 90 },
                  { name: "Eva Brown", grade: "A", score: 89 },
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">Score: {student.score}%</p>
                    </div>
                    <Badge variant={student.grade === "A+" ? "default" : "secondary"}>{student.grade}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Performance Overview</CardTitle>
              <CardDescription>Performance metrics for all teaching staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherPerformanceData.map((teacher, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-gray-500">
                          {teacher.classes} classes • {teacher.students} students
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-lg font-bold text-yellow-600">{teacher.rating}/5.0</p>
                      </div>
                      <Progress value={teacher.rating * 20} className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fee Collection Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Collection Trend</CardTitle>
                <CardDescription>Monthly collection vs pending amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    collected: { label: "Collected", color: "#10b981" },
                    pending: { label: "Pending", color: "#ef4444" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feeCollectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="collected" fill="#10b981" />
                      <Bar dataKey="pending" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Current financial status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Collected</span>
                    <span className="text-lg font-bold text-green-600">$309,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending Amount</span>
                    <span className="text-lg font-bold text-red-600">$37,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Collection Rate</span>
                    <span className="text-lg font-bold text-blue-600">89.3%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Collection Progress</span>
                    <span>89.3%</span>
                  </div>
                  <Progress value={89.3} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Attendance */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
                <CardDescription>Daily attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    present: { label: "Present", color: "#10b981" },
                    absent: { label: "Absent", color: "#ef4444" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="present" fill="#10b981" />
                      <Bar dataKey="absent" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Attendance Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
                <CardDescription>Overall attendance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Attendance</span>
                    <span className="text-lg font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Best Day</span>
                    <span className="text-lg font-bold text-blue-600">Thursday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Chronic Absentees</span>
                    <span className="text-lg font-bold text-red-600">8 students</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Goal</span>
                    <span>95%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
