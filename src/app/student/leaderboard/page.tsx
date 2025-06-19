import { ArrowDown, ArrowUp, Calendar, Filter, Medal, Minus, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaderboardPage() {
  // Sample leaderboard data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "AJ",
      score: 1250,
      rank: 1,
      change: "up",
      badges: ["Quiz Master", "Perfect Attendance"],
      isCurrentUser: false,
    },
    {
      id: 2,
      name: "Samantha Lee",
      avatar: "/placeholder-user.jpg",
      initials: "SL",
      score: 1180,
      rank: 2,
      change: "same",
      badges: ["Bookworm"],
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Jamie Smith",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
      score: 1050,
      rank: 3,
      change: "up",
      badges: ["Perfect Attendance"],
      isCurrentUser: true,
    },
    {
      id: 4,
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      initials: "MC",
      score: 980,
      rank: 4,
      change: "down",
      badges: [],
      isCurrentUser: false,
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      avatar: "/placeholder-user.jpg",
      initials: "ER",
      score: 920,
      rank: 5,
      change: "up",
      badges: ["Bookworm"],
      isCurrentUser: false,
    },
    {
      id: 6,
      name: "David Kim",
      avatar: "/placeholder-user.jpg",
      initials: "DK",
      score: 890,
      rank: 6,
      change: "down",
      badges: [],
      isCurrentUser: false,
    },
    {
      id: 7,
      name: "Olivia Wilson",
      avatar: "/placeholder-user.jpg",
      initials: "OW",
      score: 850,
      rank: 7,
      change: "same",
      badges: [],
      isCurrentUser: false,
    },
    {
      id: 8,
      name: "Ethan Brown",
      avatar: "/placeholder-user.jpg",
      initials: "EB",
      score: 820,
      rank: 8,
      change: "up",
      badges: [],
      isCurrentUser: false,
    },
  ]

  const currentUser = students.find((student) => student.isCurrentUser)

  return (
    <div className="container py-6 md:py-10">
      <header className="mb-8 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank among your peers</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Weekly</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>
        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
          <Input type="search" placeholder="Search students..." className="h-9" />
          <Button type="submit" size="sm" className="h-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="overall" className="w-screen md:px-10">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>
        <TabsContent value="overall" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="col-span-full md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Top Students</CardTitle>
                <CardDescription>Weekly ranking based on overall performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.slice(0, 8).map((student) => (
                    <div
                      key={student.id}
                      className={`
                        flex items-center justify-between rounded-lg p-3
                        ${student.rank <= 3 ? "bg-muted/50" : ""}
                        ${student.isCurrentUser ? "border-2 border-primary" : ""}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          flex h-8 w-8 items-center justify-center rounded-full font-medium
                          ${student.rank === 1 ? "bg-amber-500 text-white" : ""}
                          ${student.rank === 2 ? "bg-slate-400 text-white" : ""}
                          ${student.rank === 3 ? "bg-amber-700 text-white" : ""}
                          ${student.rank > 3 ? "bg-muted" : ""}
                        `}
                        >
                          {student.rank}
                        </div>
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{student.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{student.name}</p>
                            {student.isCurrentUser && (
                              <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                                You
                              </Badge>
                            )}
                          </div>
                          {student.badges.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {student.badges.map((badge) => (
                                <Badge key={badge} variant="secondary" className="text-xs px-1 py-0">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {student.change === "up" && <ArrowUp className="h-4 w-4 text-green-500" />}
                          {student.change === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
                          {student.change === "same" && <Minus className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <p className="font-medium tabular-nums">{student.score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your Ranking</CardTitle>
                  <CardDescription>Current position and stats</CardDescription>
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
                        strokeDashoffset="125.6"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-medium">{currentUser?.rank}</span>
                      <span className="text-sm text-muted-foreground">of 32</span>
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Score</span>
                      <span className="font-medium">{currentUser?.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly Change</span>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">+120</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Improve Your Ranking</CardTitle>
                  <CardDescription>Tips to boost your score</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-medium text-primary">1</span>
                      </div>
                      <p className="text-sm">Complete all pending assignments before their deadlines</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-medium text-primary">2</span>
                      </div>
                      <p className="text-sm">Participate actively in class discussions</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-medium text-primary">3</span>
                      </div>
                      <p className="text-sm">Retake quizzes to improve your scores</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="homework" className="mt-0">
          {/* Similar structure as overall tab but with homework-specific data */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Medal className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Homework Rankings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Homework rankings will be available after the current assignment period ends.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="quizzes" className="mt-0">
          {/* Similar structure as overall tab but with quiz-specific data */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Medal className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Quiz Rankings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Quiz rankings will be available after the current quiz period ends.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
