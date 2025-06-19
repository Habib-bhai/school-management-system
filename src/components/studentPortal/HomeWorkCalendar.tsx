"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, FileText, GraduationCap, Microscope, PenTool } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { AssignmentDetailDrawer } from "@/components/studentPortal/AssignmentDetailDrawer"

type HomeworkStatus = "all" | "pending" | "submitted" | "graded" | "late"

interface HomeworkCalendarProps {
  status: HomeworkStatus
  selectedSubjects?: string[]
}

export function HomeworkCalendar({ status, selectedSubjects = [] }: HomeworkCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Get current date info
  const today = new Date()
  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay()

  // Format month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })
  const monthYear = `${monthName} ${currentYear}`

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonthIndex - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonthIndex + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Sample homework data
  const homeworkItems = [
    {
      id: 1,
      title: "Math Assignment: Calculus Problem Set",
      description:
        "Complete problems 1-20 on derivatives and integrals. Focus on applying the chain rule, product rule, and quotient rule. Show all your work and include explanations for each step of your solutions.",
      subject: "Mathematics",
      subjectId: "math",
      subjectColor: "bg-amber-500/10 text-amber-600",
      subjectIcon: <FileText className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 11), // May 11, 2025
      status: "pending",
      progress: 75,
      teacherName: "Dr. Robert Chen",
      teacherInitials: "RC",
      requirements: [
        "Complete all 20 problems",
        "Show all work and steps",
        "Include explanations for each solution",
        "Submit as a single PDF file",
      ],
      resources: [
        {
          id: 1,
          name: "Calculus_Problems.pdf",
          type: "PDF",
          size: "1.2 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Lecture_Notes_Week5.pdf",
          type: "PDF",
          size: "3.5 MB",
          url: "#",
        },
      ],
    },
    {
      id: 2,
      title: "Physics Lab Report: Wave Properties",
      description:
        "Write a detailed report on the wave properties experiment conducted in lab. Include your observations, data analysis, and conclusions.",
      subject: "Physics",
      subjectId: "physics",
      subjectColor: "bg-purple-500/10 text-purple-600",
      subjectIcon: <Microscope className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 12), // May 12, 2025
      status: "pending",
      progress: 50,
      teacherName: "Prof. Sarah Johnson",
      teacherInitials: "SJ",
      requirements: [
        "Include introduction, methods, results, and discussion sections",
        "Attach all data tables and graphs",
        "Analyze experimental errors",
        "Maximum 5 pages (excluding figures)",
      ],
      resources: [
        {
          id: 1,
          name: "Lab_Manual_Wave_Properties.pdf",
          type: "PDF",
          size: "2.3 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Data_Collection_Template.xlsx",
          type: "Excel",
          size: "450 KB",
          url: "#",
        },
      ],
    },
    {
      id: 3,
      title: "Literature Essay: Character Analysis",
      description:
        "Analyze the main character's development throughout the novel. Focus on key moments of change and growth.",
      subject: "English Literature",
      subjectId: "english",
      subjectColor: "bg-primary/10 text-primary",
      subjectIcon: <GraduationCap className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 14), // May 14, 2025
      status: "submitted",
      progress: 100,
      submittedDate: "May 9, 2025",
      teacherName: "Ms. Emily Parker",
      teacherInitials: "EP",
      submissionHistory: [
        {
          id: 1,
          date: "May 9, 2025",
          status: "submitted",
          files: [
            {
              id: 1,
              name: "Character_Analysis_Essay.docx",
              type: "Word",
              size: "1.8 MB",
              url: "#",
            },
          ],
          comments: "I focused on the protagonist's journey and how their perspective changes throughout the novel.",
        },
      ],
    },
    {
      id: 4,
      title: "History Research Paper: Industrial Revolution",
      description:
        "Research and write a 5-page paper on the impacts of the Industrial Revolution. Consider social, economic, and environmental effects.",
      subject: "History",
      subjectId: "history",
      subjectColor: "bg-green-500/10 text-green-600",
      subjectIcon: <PenTool className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 18), // May 18, 2025
      status: "graded",
      progress: 100,
      grade: "A",
      feedback:
        "Excellent work! Your analysis was thorough and well-researched. Your paper demonstrates a strong understanding of the complex social and economic impacts of the Industrial Revolution. Your use of primary sources was particularly impressive.",
      teacherName: "Dr. Michael Thompson",
      teacherInitials: "MT",
      submissionHistory: [
        {
          id: 1,
          date: "May 5, 2025",
          status: "submitted",
          files: [
            {
              id: 1,
              name: "Industrial_Revolution_Research.docx",
              type: "Word",
              size: "2.4 MB",
              url: "#",
            },
            {
              id: 2,
              name: "Bibliography.pdf",
              type: "PDF",
              size: "350 KB",
              url: "#",
            },
          ],
          comments: "I've included a separate bibliography with annotated sources.",
        },
        {
          id: 2,
          date: "May 8, 2025",
          status: "graded",
          grade: "A",
          feedback:
            "Excellent work! Your analysis was thorough and well-researched. Your paper demonstrates a strong understanding of the complex social and economic impacts of the Industrial Revolution. Your use of primary sources was particularly impressive.",
        },
      ],
    },
    {
      id: 5,
      title: "Chemistry Quiz: Periodic Table",
      description:
        "Study the periodic table elements and their properties for the upcoming quiz. Focus on trends and patterns.",
      subject: "Chemistry",
      subjectId: "chemistry",
      subjectColor: "bg-red-500/10 text-red-600",
      subjectIcon: <Microscope className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 5), // May 5, 2025
      status: "graded",
      progress: 100,
      grade: "B+",
      feedback:
        "Good understanding of the concepts. Review section 3 for improvement. Your answers on electron configuration were particularly strong, but you could improve on periodic trends.",
      teacherName: "Dr. Lisa Wong",
      teacherInitials: "LW",
      submissionHistory: [
        {
          id: 1,
          date: "May 5, 2025",
          status: "submitted",
          files: [
            {
              id: 1,
              name: "Periodic_Table_Quiz.pdf",
              type: "PDF",
              size: "1.1 MB",
              url: "#",
            },
          ],
        },
        {
          id: 2,
          date: "May 7, 2025",
          status: "graded",
          grade: "B+",
          feedback:
            "Good understanding of the concepts. Review section 3 for improvement. Your answers on electron configuration were particularly strong, but you could improve on periodic trends.",
        },
      ],
    },
    {
      id: 6,
      title: "Biology Assignment: Cell Structure",
      description:
        "Draw and label the parts of a plant cell and an animal cell. Include a comparison table of their structures and functions.",
      subject: "Biology",
      subjectId: "biology",
      subjectColor: "bg-blue-500/10 text-blue-600",
      subjectIcon: <Microscope className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 7), // May 7, 2025
      status: "late",
      progress: 80,
      teacherName: "Prof. David Garcia",
      teacherInitials: "DG",
      requirements: [
        "Include detailed diagrams of both cell types",
        "Label all major organelles",
        "Create a comparison table",
        "Explain at least 3 key differences between the cells",
      ],
      resources: [
        {
          id: 1,
          name: "Cell_Structure_Guide.pdf",
          type: "PDF",
          size: "1.5 MB",
          url: "#",
        },
      ],
    },
    {
      id: 7,
      title: "Math Quiz: Trigonometry",
      description:
        "Practice trigonometric functions and identities for the quiz. Be prepared to solve problems involving sine, cosine, and tangent.",
      subject: "Mathematics",
      subjectId: "math",
      subjectColor: "bg-amber-500/10 text-amber-600",
      subjectIcon: <FileText className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 20), // May 20, 2025
      status: "pending",
      progress: 30,
      teacherName: "Dr. Robert Chen",
      teacherInitials: "RC",
      requirements: [
        "Study all trigonometric functions",
        "Practice solving equations",
        "Memorize key identities",
        "Review unit circle concepts",
      ],
      resources: [
        {
          id: 1,
          name: "Trigonometry_Practice_Problems.pdf",
          type: "PDF",
          size: "1.3 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Unit_Circle_Reference.pdf",
          type: "PDF",
          size: "500 KB",
          url: "#",
        },
      ],
    },
    {
      id: 8,
      title: "Physics Problem Set: Mechanics",
      description:
        "Solve problems related to Newton's laws of motion and conservation of energy. Show all work and include free-body diagrams where appropriate.",
      subject: "Physics",
      subjectId: "physics",
      subjectColor: "bg-purple-500/10 text-purple-600",
      subjectIcon: <Microscope className="h-4 w-4" />,
      dueDate: new Date(2025, 4, 16), // May 16, 2025
      status: "pending",
      progress: 0,
      teacherName: "Prof. Sarah Johnson",
      teacherInitials: "SJ",
      requirements: [
        "Complete all 15 problems",
        "Include free-body diagrams",
        "Show all calculations",
        "Explain your reasoning for each solution",
      ],
      resources: [
        {
          id: 1,
          name: "Mechanics_Problem_Set.pdf",
          type: "PDF",
          size: "1.7 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Newton_Laws_Reference.pdf",
          type: "PDF",
          size: "900 KB",
          url: "#",
        },
      ],
    },
  ]

  // Filter homework items based on status and selected subjects
  const filteredHomeworkItems = homeworkItems.filter((item) => {
    // Filter by status
    if (status !== "all" && item.status !== status) return false

    // Filter by selected subjects
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(item.subjectId)) {
      return false
    }

    // Filter by current month
    if (item.dueDate.getMonth() !== currentMonthIndex || item.dueDate.getFullYear() !== currentYear) {
      return false
    }

    return true
  })

  // Group homework items by date
  const homeworkByDate = filteredHomeworkItems.reduce(
    (acc, item) => {
      const date = item.dueDate.getDate()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {} as Record<number, typeof filteredHomeworkItems>,
  )

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ date: null })
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonthIndex, day)
    const isToday = date.toDateString() === today.toDateString()
    const assignments = homeworkByDate[day] || []

    calendarDays.push({
      date: day,
      isToday,
      assignments,
    })
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500"
      case "submitted":
        return "bg-primary"
      case "graded":
        return "bg-green-500"
      case "late":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  // Handle assignment selection
  const handleAssignmentSelect = (assignment: any) => {
    setSelectedAssignment(assignment)
    setIsDrawerOpen(true)
  }

  // Handle assignment submission
  const handleAssignmentSubmit = (assignmentId: number, data: any) => {
    console.log("Assignment submitted:", assignmentId, data)
    // Here you would typically send the data to your backend
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-medium">{monthYear}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center rounded-md border">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-none" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Month</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Month</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-24 border-b border-r p-1 last:border-r-0 ${index % 7 === 6 ? "border-r-0" : ""} ${Math.floor(index / 7) === Math.floor((calendarDays.length - 1) / 7) ? "border-b-0" : ""}`}
            >
              {day.date !== null && (
                <div className="h-full">
                  <div className="flex justify-between">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        day.isToday ? "bg-primary text-primary-foreground font-medium" : ""
                      }`}
                    >
                      {day.date}
                    </span>
                    {day.assignments.length > 2 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-5 px-1 text-xs">
                            +{day.assignments.length - 1}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-0">
                          <div className="p-3">
                            <h4 className="font-medium">Assignments for May {day.date}, 2025</h4>
                            <p className="text-sm text-muted-foreground">{day.assignments.length} assignments due</p>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto">
                            {day.assignments.map((assignment) => (
                              <div
                                key={assignment.id}
                                className="border-t p-3 cursor-pointer hover:bg-muted/50"
                                onClick={() => handleAssignmentSelect(assignment)}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`h-2 w-2 rounded-full ${getStatusColor(assignment.status)}`} />
                                  <span className="text-sm font-medium">{assignment.title}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">{assignment.subject}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {assignment.status}
                                  </Badge>
                                </div>
                                {assignment.status === "pending" && (
                                  <div className="mt-2">
                                    <Progress value={assignment.progress} className="h-1" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>

                  <div className="mt-1 space-y-1">
                    {day.assignments.slice(0, 2).map((assignment) => (
                      <HoverCard key={assignment.id} openDelay={300}>
                        <HoverCardTrigger asChild>
                          <div
                            className={`
                              flex items-center gap-1 rounded px-1 py-0.5 text-xs
                              ${assignment.subjectColor}
                              cursor-pointer truncate
                            `}
                            onClick={() => handleAssignmentSelect(assignment)}
                          >
                            <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(assignment.status)}`} />
                            <span className="truncate">{assignment.title}</span>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-72">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${assignment.subjectColor.split(" ")[0]}`}
                              >
                                {assignment.subjectIcon}
                              </div>
                              <span>{assignment.subject}</span>
                            </div>
                            <Badge variant="outline">{assignment.status}</Badge>
                          </div>
                          <h4 className="mt-2 font-medium">{assignment.title}</h4>
                          {assignment.status === "pending" && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Progress</span>
                                <span>{assignment.progress}%</span>
                              </div>
                              <Progress value={assignment.progress} className="mt-1 h-1.5" />
                            </div>
                          )}
                          {assignment.status === "graded" && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-sm">Grade:</span>
                              <Badge>{assignment.grade}</Badge>
                            </div>
                          )}
                          <div className="mt-3 flex justify-end">
                            <Button size="sm" onClick={() => handleAssignmentSelect(assignment)}>
                              View Details
                            </Button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="text-sm">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm">Submitted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Graded</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-sm">Late</span>
        </div>
      </div>

      {/* Assignment Detail Drawer */}
      <AssignmentDetailDrawer
        assignment={selectedAssignment}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSubmit={handleAssignmentSubmit}
      />
    </div>
  )
}
