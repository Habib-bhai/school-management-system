"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  GraduationCap,
  UserCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Teachers",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: Users,
      description: "Active teaching staff",
    },
    {
      title: "Total Students",
      value: "450",
      change: "+15",
      changeType: "positive",
      icon: GraduationCap,
      description: "Enrolled students",
    },
    {
      title: "Total Parents",
      value: "380",
      change: "+12",
      changeType: "positive",
      icon: UserCheck,
      description: "Registered parents",
    },
    {
      title: "Pending Fees",
      value: "$12,450",
      change: "-$2,300",
      changeType: "negative",
      icon: DollarSign,
      description: "Outstanding payments",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "teacher",
      message: "New teacher Sarah Johnson joined Mathematics department",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "fee",
      message: "Fee payment received from John Smith ($500)",
      time: "4 hours ago",
      status: "success",
    },
    {
      id: 3,
      type: "alert",
      message: "Student attendance below 75% - Emma Wilson",
      time: "6 hours ago",
      status: "warning",
    },
    {
      id: 4,
      type: "message",
      message: "New message from parent regarding homework policy",
      time: "8 hours ago",
      status: "info",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Review teacher performance evaluations",
      priority: "high",
      dueDate: "Today",
    },
    {
      id: 2,
      task: "Process fee collection reports",
      priority: "medium",
      dueDate: "Tomorrow",
    },
    {
      id: 3,
      task: "Update student enrollment records",
      priority: "low",
      dueDate: "This week",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your school.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
          <Button>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 inline mr-1" />
                  )}
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === "success"
                      ? "bg-green-500"
                      : activity.status === "warning"
                        ? "bg-yellow-500"
                        : activity.status === "info"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                </div>
                <Badge
                  variant={
                    task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94.2%</div>
            <Progress value={94.2} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">Above target of 90%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87.5%</div>
            <Progress value={87.5} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">$12,450 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">91.8%</div>
            <Progress value={91.8} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">Excellent performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
