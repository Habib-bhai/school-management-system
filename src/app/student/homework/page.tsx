    "use client"

import { useState, useEffect } from "react"
import { CalendarDays, ChevronDown, Filter, List, Search, SortAsc, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeworkList } from "@/components/studentPortal/HomeWorkList"
import { HomeworkCalendar } from "@/components/studentPortal/HomeWorkCalendar"

// Sample subject data
const subjects = [
  { id: "math", name: "Mathematics", color: "bg-amber-500/10 text-amber-600" },
  { id: "physics", name: "Physics", color: "bg-purple-500/10 text-purple-600" },
  { id: "english", name: "English Literature", color: "bg-primary/10 text-primary" },
  { id: "history", name: "History", color: "bg-green-500/10 text-green-600" },
  { id: "chemistry", name: "Chemistry", color: "bg-red-500/10 text-red-600" },
  { id: "biology", name: "Biology", color: "bg-blue-500/10 text-blue-600" },
]

export default function HomeworkPage() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [status, setStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("dueDate")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle subject selection
  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedSubjects([])
    setSearchQuery("")
    setSortBy("dueDate")
    setStatus("all")
  }

  return (
    <div className="w-screen container py-6 md:py-10">
      <header className="md:px-10 mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium">Homework</h1>
            <p className="text-muted-foreground">Manage your assignments</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  {selectedSubjects.length > 0 && (
                    <Badge variant="secondary" className="ml-1 rounded-full px-1 text-xs">
                      {selectedSubjects.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter Assignments</h4>
                    <p className="text-sm text-muted-foreground">Select subjects and status to filter assignments</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="graded">Graded</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Subjects</Label>
                      {selectedSubjects.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-muted-foreground"
                          onClick={() => setSelectedSubjects([])}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <Badge
                          key={subject.id}
                          variant={selectedSubjects.includes(subject.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleSubject(subject.id)}
                        >
                          {subject.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Reset All
                    </Button>
                    <Button size="sm">Apply Filters</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SortAsc className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Sort By</h4>
                  <div className="grid gap-2">
                    <Button
                      variant={sortBy === "dueDate" ? "default" : "ghost"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setSortBy("dueDate")}
                    >
                      Due Date
                    </Button>
                    <Button
                      variant={sortBy === "title" ? "default" : "ghost"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setSortBy("title")}
                    >
                      Title
                    </Button>
                    <Button
                      variant={sortBy === "subject" ? "default" : "ghost"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setSortBy("subject")}
                    >
                      Subject
                    </Button>
                    <Button
                      variant={sortBy === "status" ? "default" : "ghost"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setSortBy("status")}
                    >
                      Status
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-1 rounded-md border p-1">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setView("calendar")}
              >
                <CalendarDays className="h-4 w-4" />
                <span className="sr-only">Calendar View</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="h-9 pl-8 pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>

          {/* Active filters display */}
          {(selectedSubjects.length > 0 || status !== "all" || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {status !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status: {status}
                  <Button variant="ghost" size="icon" className="h-3 w-3 p-0 ml-1" onClick={() => setStatus("all")}>
                    <X className="h-2 w-2" />
                    <span className="sr-only">Remove status filter</span>
                  </Button>
                </Badge>
              )}
              {selectedSubjects.map((subjectId) => {
                const subject = subjects.find((s) => s.id === subjectId)
                return (
                  <Badge key={subjectId} variant="secondary" className="gap-1">
                    {subject?.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 p-0 ml-1"
                      onClick={() => toggleSubject(subjectId)}
                    >
                      <X className="h-2 w-2" />
                      <span className="sr-only">Remove subject filter</span>
                    </Button>
                  </Badge>
                )
              })}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  &quot;{searchQuery}&quot;
                  <Button variant="ghost" size="icon" className="h-3 w-3 p-0 ml-1" onClick={() => setSearchQuery("")}>
                    <X className="h-2 w-2" />
                    <span className="sr-only">Remove search filter</span>
                  </Button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </header>

      <Tabs defaultValue="all" className="w-screen md:px-10" value={status} onValueChange={setStatus}>
        <TabsList className="mb-6 grid w-full grid-cols-4 ">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b p-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-2">
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                  <div className="border-t p-3">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-0 w-fll overflow-x-hidden">
              {view === "list" ? (
                <HomeworkList
                  status="all"
                  searchQuery={searchQuery}
                  selectedSubjects={selectedSubjects}
                  sortBy={sortBy}
                />
              ) : (
                <HomeworkCalendar status="all" selectedSubjects={selectedSubjects} />
              )}
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              {view === "list" ? (
                <HomeworkList
                  status="pending"
                  searchQuery={searchQuery}
                  selectedSubjects={selectedSubjects}
                  sortBy={sortBy}
                />
              ) : (
                <HomeworkCalendar status="pending" selectedSubjects={selectedSubjects} />
              )}
            </TabsContent>
            <TabsContent value="submitted" className="mt-0">
              {view === "list" ? (
                <HomeworkList
                  status="submitted"
                  searchQuery={searchQuery}
                  selectedSubjects={selectedSubjects}
                  sortBy={sortBy}
                />
              ) : (
                <HomeworkCalendar status="submitted" selectedSubjects={selectedSubjects} />
              )}
            </TabsContent>
            <TabsContent value="graded" className="mt-0">
              {view === "list" ? (
                <HomeworkList
                  status="graded"
                  searchQuery={searchQuery}
                  selectedSubjects={selectedSubjects}
                  sortBy={sortBy}
                />
              ) : (
                <HomeworkCalendar status="graded" selectedSubjects={selectedSubjects} />
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
