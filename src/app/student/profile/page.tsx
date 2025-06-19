import { Award, BookOpen, Calendar, CheckCircle2, Download, FileText, Pencil } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="container py-6 md:py-10">
      <header className="mb-8 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="/placeholder-user.jpg" alt="Jamie Smith" />
              <AvatarFallback className="text-xl">JS</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-medium">Jamie Smith</h1>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit Profile</span>
                </Button>
              </div>
              <p className="text-muted-foreground">Grade 11 • ID: 2023045</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <Badge variant="secondary">Perfect Attendance</Badge>
                <Badge variant="secondary">Quiz Master</Badge>
                <Badge variant="secondary">Bookworm</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
            <Button className="gap-2">
              <Pencil className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="md:px-10 w-screen grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Homework Completion</CardTitle>
            <CardDescription>Your assignment progress</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex flex-col items-center justify-center">
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
                    strokeDashoffset="50.24"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-medium">80%</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                You've completed 16 out of 20 assignments this semester.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quiz Average</CardTitle>
            <CardDescription>Your test performance</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
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
                    strokeDashoffset="75.36"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-medium">85%</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Your average score across all quizzes this semester.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Attendance Record</CardTitle>
            <CardDescription>Your class presence</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
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
                    strokeDashoffset="25.12"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-medium">95%</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                You've attended 57 out of 60 school days this semester.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader className="pb-2">
            <CardTitle>Academic History</CardTitle>
            <CardDescription>Your performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium">Spring 2025 (Current)</h3>
                  <Badge>In Progress</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                        <FileText className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="font-medium">Mathematics</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Grade</span>
                        <span className="font-medium">A-</span>
                      </div>
                      <Progress value={88} className="mt-1 h-1.5" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">English</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Grade</span>
                        <span className="font-medium">B+</span>
                      </div>
                      <Progress value={82} className="mt-1 h-1.5" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">Physics</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Grade</span>
                        <span className="font-medium">A</span>
                      </div>
                      <Progress value={92} className="mt-1 h-1.5" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                        <Calendar className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">History</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Grade</span>
                        <span className="font-medium">B</span>
                      </div>
                      <Progress value={80} className="mt-1 h-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium">Fall 2024</h3>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                        <FileText className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="font-medium">Mathematics</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Final Grade</span>
                        <span className="font-medium">A</span>
                      </div>
                      <Progress value={94} className="mt-1 h-1.5" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">English</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Final Grade</span>
                        <span className="font-medium">B+</span>
                      </div>
                      <Progress value={85} className="mt-1 h-1.5" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">Chemistry</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Final Grade</span>
                        <span className="font-medium">A-</span>
                      </div>
                      <Progress value={90} className="mt-1 h-1.5" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                        <Calendar className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">Geography</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Final Grade</span>
                        <span className="font-medium">B</span>
                      </div>
                      <Progress value={82} className="mt-1 h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader className="pb-2">
            <CardTitle>Assignment History</CardTitle>
            <CardDescription>Your recent submissions and grades</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start justify-between rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          i % 3 === 0 ? "bg-amber-500/10" : i % 3 === 1 ? "bg-purple-500/10" : "bg-primary/10"
                        }`}
                      >
                        {i % 3 === 0 ? (
                          <FileText className="h-5 w-5 text-amber-600" />
                        ) : i % 3 === 1 ? (
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {i % 3 === 0
                            ? "Math Assignment: Calculus Problem Set"
                            : i % 3 === 1
                              ? "Literature Essay: Character Analysis"
                              : "Physics Lab Report: Wave Properties"}
                        </h3>
                        <p className="text-sm text-muted-foreground">Submitted on May {10 - i}, 2025</p>
                        {(i % 3 === 0 || i % 3 === 2) && (
                          <p className="mt-2 text-sm">{i % 3 === 0 ? "Grade: A (95%)" : "Grade: B+ (88%)"}</p>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recent" className="mt-0">
                {/* Similar content as "all" tab but filtered for recent assignments */}
              </TabsContent>
              <TabsContent value="graded" className="mt-0">
                {/* Similar content as "all" tab but filtered for graded assignments */}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4">
            <Button variant="outline">Load More</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
