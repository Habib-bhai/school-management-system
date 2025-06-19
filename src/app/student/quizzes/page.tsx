import { Clock, Filter, Search, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QuizzesPage() {
  // Sample quiz data
  const quizzes = [
    {
      id: 1,
      title: "Calculus: Derivatives",
      subject: "Mathematics",
      subjectColor: "bg-amber-500/10 text-amber-600",
      timeLimit: "45 minutes",
      questionCount: 20,
      difficulty: 4,
      previousScore: null,
      status: "available",
      dueDate: "May 12, 2025",
    },
    {
      id: 2,
      title: "Physics: Wave Properties",
      subject: "Physics",
      subjectColor: "bg-purple-500/10 text-purple-600",
      timeLimit: "30 minutes",
      questionCount: 15,
      difficulty: 3,
      previousScore: "85%",
      status: "completed",
      completedDate: "May 8, 2025",
    },
    {
      id: 3,
      title: "Literature: Shakespeare",
      subject: "English Literature",
      subjectColor: "bg-primary/10 text-primary",
      timeLimit: "60 minutes",
      questionCount: 25,
      difficulty: 5,
      previousScore: null,
      status: "available",
      dueDate: "May 15, 2025",
    },
    {
      id: 4,
      title: "Chemistry: Periodic Table",
      subject: "Chemistry",
      subjectColor: "bg-red-500/10 text-red-600",
      timeLimit: "20 minutes",
      questionCount: 10,
      difficulty: 2,
      previousScore: "92%",
      status: "completed",
      completedDate: "May 5, 2025",
    },
    {
      id: 5,
      title: "History: Industrial Revolution",
      subject: "History",
      subjectColor: "bg-green-500/10 text-green-600",
      timeLimit: "40 minutes",
      questionCount: 18,
      difficulty: 3,
      previousScore: null,
      status: "available",
      dueDate: "May 20, 2025",
    },
    {
      id: 6,
      title: "Biology: Cell Structure",
      subject: "Biology",
      subjectColor: "bg-blue-500/10 text-blue-600",
      timeLimit: "35 minutes",
      questionCount: 15,
      difficulty: 3,
      previousScore: "78%",
      status: "completed",
      completedDate: "May 3, 2025",
    },
  ]

  const availableQuizzes = quizzes.filter((quiz) => quiz.status === "available")
  const completedQuizzes = quizzes.filter((quiz) => quiz.status === "completed")

  return (
    <div className="container py-6 md:py-10">
      <header className="mb-8 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium">Quizzes</h1>
            <p className="text-muted-foreground">Test your knowledge</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <SortAsc className="h-4 w-4" />
              <span className="hidden sm:inline">Sort</span>
            </Button>
          </div>
        </div>
        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
          <Input type="search" placeholder="Search quizzes..." className="h-9" />
          <Button type="submit" size="sm" className="h-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="available" className="w-full md:px-10">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden">
                <CardHeader className="border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${quiz.subjectColor.split(" ")[0]}`} />
                    <span className="text-sm">{quiz.subject}</span>
                  </div>
                  <h3 className="font-medium">{quiz.title}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Time Limit</p>
                      <p className="font-medium">{quiz.timeLimit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Questions</p>
                      <p className="font-medium">{quiz.questionCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Difficulty</p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 w-1.5 rounded-full ${i < quiz.difficulty ? "bg-primary" : "bg-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{quiz.dueDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-2">
                  <Button className="w-full gap-2" size="sm">
                    <Clock className="h-4 w-4" />
                    <span>Start Quiz</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedQuizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden">
                <CardHeader className="border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${quiz.subjectColor.split(" ")[0]}`} />
                    <span className="text-sm">{quiz.subject}</span>
                  </div>
                  <h3 className="font-medium">{quiz.title}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="relative flex h-24 w-24 items-center justify-center">
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
                          strokeDashoffset={251.2 - (Number.parseInt(quiz.previousScore!) / 100) * 251.2}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-xl font-medium">{quiz.previousScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-medium">{quiz.completedDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Questions</p>
                      <p className="font-medium">{quiz.questionCount}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-2">
                  <Button variant="outline" className="w-full" size="sm">
                    View Results
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
