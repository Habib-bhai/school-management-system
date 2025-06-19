"use client"

import { useState } from "react"
import { FileText, GraduationCap, Microscope, PenTool, Upload, Eye, Clock, AlertTriangle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AssignmentDetailDrawer } from "@/components/studentPortal/AssignmentDetailDrawer"

type HomeworkStatus = "all" | "pending" | "submitted" | "graded" | "late"

interface HomeworkListProps {
  status: HomeworkStatus
  searchQuery?: string
  selectedSubjects?: string[]
  sortBy?: string
}

export function HomeworkList({
  status,
  searchQuery = "",
  selectedSubjects = [],
  sortBy = "dueDate",
}: HomeworkListProps) {
  const [page, setPage] = useState(1)
    // eslint-disable-next-line
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const itemsPerPage = 9

  // Sample homework data
  const allHomeworkItems = [
    {
      id: 1,
      title: "Math Assignment: Calculus Problem Set",
      description:
        "Complete problems 1-20 on derivatives and integrals. Focus on applying the chain rule, product rule, and quotient rule. Show all your work and include explanations for each step of your solutions.",
      subject: "Mathematics",
      subjectId: "math",
      subjectColor: "bg-amber-500/10 text-amber-600",
      subjectIcon: <FileText className="h-4 w-4" />,
      dueDate: "Today, 11:59 PM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours from now
      status: "pending",
      progress: 75,
      isUrgent: true,
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
      dueDate: "Tomorrow, 3:00 PM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 36, // 36 hours from now
      status: "pending",
      progress: 50,
      isUrgent: false,
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
      dueDate: "May 14, 9:00 AM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 72, // 3 days from now
      status: "submitted",
      progress: 100,
      submittedDate: "May 9, 2025",
      isUrgent: false,
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
      dueDate: "May 18, 11:59 PM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 168, // 7 days from now
      status: "graded",
      progress: 100,
      grade: "A",
      feedback:
        "Excellent work! Your analysis was thorough and well-researched. Your paper demonstrates a strong understanding of the complex social and economic impacts of the Industrial Revolution. Your use of primary sources was particularly impressive.",
      isUrgent: false,
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
      dueDate: "May 5, 3:00 PM",
      dueDateTimestamp: Date.now() - 1000 * 60 * 60 * 144, // 6 days ago
      status: "graded",
      progress: 100,
      grade: "B+",
      feedback:
        "Good understanding of the concepts. Review section 3 for improvement. Your answers on electron configuration were particularly strong, but you could improve on periodic trends.",
      isUrgent: false,
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
      dueDate: "May 7, 11:59 PM",
      dueDateTimestamp: Date.now() - 1000 * 60 * 60 * 96, // 4 days ago
      status: "late",
      progress: 80,
      isUrgent: true,
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
      dueDate: "May 20, 10:00 AM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 216, // 9 days from now
      status: "pending",
      progress: 30,
      isUrgent: false,
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
      dueDate: "May 16, 11:59 PM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 120, // 5 days from now
      status: "pending",
      progress: 0,
      isUrgent: false,
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
    {
      id: 9,
      title: "English Reading: Shakespeare's Sonnets",
      description:
        "Read sonnets 18-30 and prepare to discuss themes in class. Consider the use of imagery, metaphor, and structure in each sonnet.",
      subject: "English Literature",
      subjectId: "english",
      subjectColor: "bg-primary/10 text-primary",
      subjectIcon: <GraduationCap className="h-4 w-4" />,
      dueDate: "May 13, 9:00 AM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 48, // 2 days from now
      status: "submitted",
      progress: 100,
      submittedDate: "May 10, 2025",
      isUrgent: false,
      teacherName: "Ms. Emily Parker",
      teacherInitials: "EP",
      submissionHistory: [
        {
          id: 1,
          date: "May 10, 2025",
          status: "submitted",
          files: [
            {
              id: 1,
              name: "Shakespeare_Sonnets_Notes.pdf",
              type: "PDF",
              size: "1.2 MB",
              url: "#",
            },
          ],
          comments:
            "I've included my analysis of the recurring themes across these sonnets, with particular focus on sonnets 18, 23, and 29.",
        },
      ],
    },
    {
      id: 10,
      title: "Chemistry Lab: Titration",
      description:
        "Complete the pre-lab questions and prepare for the titration experiment. Review acid-base reactions and indicators.",
      subject: "Chemistry",
      subjectId: "chemistry",
      subjectColor: "bg-red-500/10 text-red-600",
      subjectIcon: <Microscope className="h-4 w-4" />,
      dueDate: "May 15, 2:00 PM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 96, // 4 days from now
      status: "pending",
      progress: 60,
      isUrgent: false,
      teacherName: "Dr. Lisa Wong",
      teacherInitials: "LW",
      requirements: [
        "Answer all pre-lab questions",
        "Review titration procedures",
        "Understand indicators and endpoints",
        "Prepare data collection tables",
      ],
      resources: [
        {
          id: 1,
          name: "Titration_Lab_Manual.pdf",
          type: "PDF",
          size: "2.1 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Pre-Lab_Questions.docx",
          type: "Word",
          size: "350 KB",
          url: "#",
        },
      ],
    },
    {
      id: 11,
      title: "History Quiz: Ancient Civilizations",
      description:
        "Study the characteristics of ancient Egyptian, Greek, and Roman civilizations. Focus on cultural, political, and technological achievements.",
      subject: "History",
      subjectId: "history",
      subjectColor: "bg-green-500/10 text-green-600",
      subjectIcon: <PenTool className="h-4 w-4" />,
      dueDate: "May 12, 10:00 AM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 24, // 1 day from now
      status: "pending",
      progress: 90,
      isUrgent: true,
      teacherName: "Dr. Michael Thompson",
      teacherInitials: "MT",
      requirements: [
        "Study all three civilizations",
        "Focus on key historical figures",
        "Review major architectural achievements",
        "Understand political systems",
      ],
      resources: [
        {
          id: 1,
          name: "Ancient_Civilizations_Study_Guide.pdf",
          type: "PDF",
          size: "2.5 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Timeline_Reference.pdf",
          type: "PDF",
          size: "1.2 MB",
          url: "#",
        },
      ],
    },
    {
      id: 12,
      title: "Biology Research: Ecosystems",
      description:
        "Research a specific ecosystem and prepare a presentation on its characteristics. Include information on climate, flora, fauna, and human impact.",
      subject: "Biology",
      subjectId: "biology",
      subjectColor: "bg-blue-500/10 text-blue-600",
      subjectIcon: <Microscope className="h-4 w-4" />,
      dueDate: "May 22, 11:59 PM",
      dueDateTimestamp: Date.now() + 1000 * 60 * 60 * 264, // 11 days from now
      status: "pending",
      progress: 10,
      isUrgent: false,
      teacherName: "Prof. David Garcia",
      teacherInitials: "DG",
      requirements: [
        "Choose one specific ecosystem",
        "Research climate and geographical features",
        "Document key plant and animal species",
        "Analyze human impact and conservation efforts",
        "Prepare a 10-minute presentation",
      ],
      resources: [
        {
          id: 1,
          name: "Ecosystem_Research_Guidelines.pdf",
          type: "PDF",
          size: "1.4 MB",
          url: "#",
        },
        {
          id: 2,
          name: "Presentation_Template.pptx",
          type: "PowerPoint",
          size: "2.8 MB",
          url: "#",
        },
      ],
    },
  ]

  // Filter homework items based on status, search query, and selected subjects
  const filteredHomeworkItems = allHomeworkItems.filter((item) => {
    // Filter by status
    if (status !== "all" && item.status !== status) return false

    // Filter by search query
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by selected subjects
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(item.subjectId)) {
      return false
    }

    return true
  })

  // Sort homework items
  const sortedHomeworkItems = [...filteredHomeworkItems].sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        return a.dueDateTimestamp - b.dueDateTimestamp
      case "title":
        return a.title.localeCompare(b.title)
      case "subject":
        return a.subject.localeCompare(b.subject)
      case "status":
        return a.status.localeCompare(b.status)
      default:
        return a.dueDateTimestamp - b.dueDateTimestamp
    }
  })

  // Paginate homework items
  const paginatedHomeworkItems = sortedHomeworkItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const totalPages = Math.ceil(sortedHomeworkItems.length / itemsPerPage)

  // Get status badge
  const getStatusBadge = (status: string, dueDate: string, isUrgent: boolean) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className={`${isUrgent ? "bg-amber-500/10 text-amber-600 animate-pulse" : "bg-blue-500/10 text-blue-600"} hover:bg-amber-500/20 hover:text-amber-700`}
          >
            {isUrgent ? (
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>{dueDate}</span>
              </div>
            ) : (
              dueDate
            )}
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            Submitted
          </Badge>
        )
      case "graded":
        return <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
      case "late":
        return (
          <Badge variant="destructive">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Late</span>
            </div>
          </Badge>
        )
      default:
        return null
    }
  }

  // Handle assignment selection
    // eslint-disable-next-line
  const handleAssignmentSelect = (assignment: any) => {
    setSelectedAssignment(assignment)
    setIsDrawerOpen(true)
  }

  // Handle assignment submission
  // eslint-disable-next-line
  const handleAssignmentSubmit = (assignmentId: number, data: any) => {
    console.log("Assignment submitted:", assignmentId, data)
    // Here you would typically send the data to your backend
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedHomeworkItems.map((homework) => (
          <Card key={homework.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${homework.subjectColor.split(" ")[0]}`}
                  >
                    {homework.subjectIcon}
                  </div>
                  <span className="text-sm font-medium">{homework.subject}</span>
                </div>
                {homework.status === "graded" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="bg-green-500 hover:bg-green-600">{homework.grade}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{homework.feedback}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {homework.status !== "graded" && getStatusBadge(homework.status, homework.dueDate, homework.isUrgent)}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{homework.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{homework.description}</p>
                {homework.status === "pending" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{homework.progress}%</span>
                    </div>
                    <Progress value={homework.progress} className="mt-1 h-1.5" />
                  </div>
                )}
                {homework.status === "submitted" && (
                  <p className="mt-2 text-sm text-muted-foreground">Submitted on {homework.submittedDate}</p>
                )}
                {homework.status === "graded" && homework.feedback && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{homework.feedback}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-2">
              <Button
                className="w-full gap-2"
                size="sm"
                variant={homework.status === "pending" || homework.status === "late" ? "default" : "outline"}
                onClick={() => handleAssignmentSelect(homework)}
              >
                {homework.status === "pending" || homework.status === "late" ? (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Submit Assignment</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>{homework.status === "graded" ? "View Feedback" : "View Submission"}</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredHomeworkItems.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No assignments found</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground max-w-md">
            {searchQuery || selectedSubjects.length > 0
              ? "Try adjusting your filters or search query to find what you're looking for."
              : status === "all"
                ? "You don't have any assignments yet."
                : status === "pending"
                  ? "You don't have any pending assignments."
                  : status === "submitted"
                    ? "You haven't submitted any assignments yet."
                    : status === "graded"
                      ? "You don't have any graded assignments yet."
                      : "You don't have any late assignments."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

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
