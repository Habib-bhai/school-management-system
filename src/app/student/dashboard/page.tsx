import { CalendarClock, CheckCircle2, Clock, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DailyQuote } from "@/components/studentPortal/DailyQuotes"
import { UpcomingDeadlines } from "@/components/studentPortal/UpCommingDeadlines"
import { RecentAchievements } from "@/components/studentPortal/RecentAchievements"
import { Announcements } from "@/components/studentPortal/Announcements"
import { StudentPortalSidebar } from "@/components/studentPortal/StudentPortalSideBar"

export default function Dashboard() {
  // Get current time to display appropriate greeting
  const currentHour = new Date().getHours()
  let greeting = "Good morning"
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon"
  } else if (currentHour >= 17) {
    greeting = "Good evening"
  }

  return (
    <div className="w-screen flex container py-6 md:py-10">
      <StudentPortalSidebar />

      <div className="md:ml-10 flex-1">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium">{greeting}, Jamie</h1>
              <p className="text-muted-foreground">Tuesday, May 11, 2025</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                <Clock className="h-4 w-4" />
                Focus Mode
              </Button>
              <Button variant="outline" size="icon" className="relative">
                <span className="sr-only">Notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-amber-500 hover:bg-amber-600">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Daily Tasks</CardTitle>
              <CardDescription>Your progress for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Math Assignment</p>
                      <p className="text-sm text-muted-foreground">Due today at 11:59 PM</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 hover:text-amber-700"
                  >
                    Pending
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Physics Quiz</p>
                      <p className="text-sm text-muted-foreground">Due today at 3:00 PM</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                    Completed
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Literature Essay</p>
                      <p className="text-sm text-muted-foreground">Due tomorrow at 9:00 AM</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 hover:text-purple-700"
                  >
                    In Progress
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="flex items-center justify-between text-sm">
                  <span>Daily Progress</span>
                  <span className="font-medium">2/3 Tasks</span>
                </div>
                <Progress value={66} className="mt-2 h-2" />
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Study Streak</CardTitle>
              <CardDescription>Keep up the momentum!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative flex h-32 w-32 items-center justify-center">
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
                    strokeDashoffset="62.8"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-medium">12</span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                You're on a 12-day streak! Keep going to beat your record of 15 days.
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Stay on top of your assignments</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <CalendarClock className="h-4 w-4" />
                  <span>View All</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <UpcomingDeadlines />
            </CardContent>
          </Card>

          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Daily Quote</CardTitle>
              <CardDescription>A bit of inspiration</CardDescription>
            </CardHeader>
            <CardContent>
              <DailyQuote />
            </CardContent>
          </Card>

          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentAchievements />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Trophy className="h-4 w-4" />
                <span>View All Achievements</span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Important updates from your school</CardDescription>
            </CardHeader>
            <CardContent>
              <Announcements />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
