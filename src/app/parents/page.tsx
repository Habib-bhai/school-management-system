import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Users,
  Bell,
  Calendar,
  TrendingUp,
  MessageCircle,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function ParentDashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Sarah! Here&apos;s what&apos;s happening with your children.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Teachers
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across both children</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">1 urgent message</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Children Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Children Overview</CardTitle>
            <CardDescription>Academic progress and recent activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">EJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Emma Johnson</p>
                    <p className="text-sm text-muted-foreground">Grade 8A</p>
                  </div>
                </div>
                <Badge variant="secondary">92% Average</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <CheckCircle className="mr-1 h-3 w-3" />3 Completed
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <Clock className="mr-1 h-3 w-3" />2 Pending
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">AJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">Grade 5B</p>
                  </div>
                </div>
                <Badge variant="secondary">88% Average</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <CheckCircle className="mr-1 h-3 w-3" />4 Completed
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <Clock className="mr-1 h-3 w-3" />1 Pending
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest updates about your children</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-red-200 bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-900">Fee Payment Due</p>
                  <p className="text-sm text-red-700">Monthly fee payment is due by Dec 15th</p>
                  <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Message from Ms. Davis</p>
                  <p className="text-sm text-muted-foreground">Emma&apos;s math assignment feedback is ready</p>
                  <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <Award className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Achievement Unlocked</p>
                  <p className="text-sm text-muted-foreground">Alex completed Science project with excellence</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Parent-Teacher Meeting</p>
                  <p className="text-sm text-muted-foreground">Scheduled for Dec 20th at 3:00 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/parents/notifications">View All Notifications</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/parents/childsAssignments">
                <BookOpen className="h-6 w-6" />
                <span>View Assignments</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/parents/teachers">
                <MessageCircle className="h-6 w-6" />
                <span>Message Teachers</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/parents/notifications">
                <Bell className="h-6 w-6" />
                <span>Check Notifications</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/parents/profile">
                <Users className="h-6 w-6" />
                <span>Manage Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
