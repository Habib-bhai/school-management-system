"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, CheckCircle, Clock, Edit, Plus, Save, X, AlertTriangle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DailyLesson {
  id: string
  date: string
  topic: string
  description: string
  duration: number
  status: "pending" | "completed" | "in-progress"
  isEdited?: boolean
}

interface WeeklyPlan {
  week: number
  startDate: string
  endDate: string
  lessons: DailyLesson[]
  progress: number
}

interface Term {
  id: string
  name: string
  startDate: string
  endDate: string
  weeks: WeeklyPlan[]
  overallProgress: number
  status: "upcoming" | "current" | "completed"
}

export default function TeacherSyllabusPage() {
  const [selectedTerm, setSelectedTerm] = useState<string>("term-1")
  const [editingLesson, setEditingLesson] = useState<string | null>(null)
  const [pendingChanges, setPendingChanges] = useState<string[]>([])

  // Sample syllabus data
  const [syllabusData, setSyllabusData] = useState<Term[]>([
    {
      id: "term-1",
      name: "Spring Term 2025",
      startDate: "2025-01-15",
      endDate: "2025-05-30",
      overallProgress: 85,
      status: "current",
      weeks: [
        {
          week: 1,
          startDate: "2025-01-15",
          endDate: "2025-01-19",
          progress: 100,
          lessons: [
            {
              id: "lesson-1",
              date: "2025-01-15",
              topic: "Introduction to Mechanics",
              description: "Basic concepts of force, motion, and Newton's laws",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-2",
              date: "2025-01-16",
              topic: "Kinematics - Linear Motion",
              description: "Displacement, velocity, acceleration in one dimension",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-3",
              date: "2025-01-17",
              topic: "Kinematics - Projectile Motion",
              description: "Two-dimensional motion and projectile problems",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-4",
              date: "2025-01-18",
              topic: "Forces and Newton's Laws",
              description: "Application of Newton's three laws of motion",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-5",
              date: "2025-01-19",
              topic: "Lab: Motion Analysis",
              description: "Practical experiments on motion and forces",
              duration: 100,
              status: "completed",
            },
          ],
        },
        {
          week: 2,
          startDate: "2025-01-22",
          endDate: "2025-01-26",
          progress: 80,
          lessons: [
            {
              id: "lesson-6",
              date: "2025-01-22",
              topic: "Work and Energy",
              description: "Concepts of work, kinetic and potential energy",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-7",
              date: "2025-01-23",
              topic: "Conservation of Energy",
              description: "Energy conservation principles and applications",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-8",
              date: "2025-01-24",
              topic: "Momentum and Collisions",
              description: "Linear momentum and collision analysis",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-9",
              date: "2025-01-25",
              topic: "Rotational Motion",
              description: "Angular velocity, acceleration, and torque",
              duration: 50,
              status: "in-progress",
            },
            {
              id: "lesson-10",
              date: "2025-01-26",
              topic: "Lab: Energy Conservation",
              description: "Experimental verification of energy conservation",
              duration: 100,
              status: "pending",
            },
          ],
        },
        {
          week: 3,
          startDate: "2025-01-29",
          endDate: "2025-02-02",
          progress: 0,
          lessons: [
            {
              id: "lesson-11",
              date: "2025-01-29",
              topic: "Waves and Oscillations",
              description: "Simple harmonic motion and wave properties",
              duration: 50,
              status: "pending",
            },
            {
              id: "lesson-12",
              date: "2025-01-30",
              topic: "Sound Waves",
              description: "Properties of sound and wave interference",
              duration: 50,
              status: "pending",
            },
            {
              id: "lesson-13",
              date: "2025-01-31",
              topic: "Electromagnetic Waves",
              description: "Light as electromagnetic radiation",
              duration: 50,
              status: "pending",
            },
            {
              id: "lesson-14",
              date: "2025-02-01",
              topic: "Optics - Reflection and Refraction",
              description: "Laws of reflection and refraction",
              duration: 50,
              status: "pending",
            },
            {
              id: "lesson-15",
              date: "2025-02-02",
              topic: "Lab: Wave Properties",
              description: "Experiments with waves and optics",
              duration: 100,
              status: "pending",
            },
          ],
        },
      ],
    },
    {
      id: "term-2",
      name: "Fall Term 2024",
      startDate: "2024-09-01",
      endDate: "2024-12-20",
      overallProgress: 100,
      status: "completed",
      weeks: [
        {
          week: 1,
          startDate: "2024-09-01",
          endDate: "2024-09-05",
          progress: 100,
          lessons: [
            {
              id: "lesson-16",
              date: "2024-09-01",
              topic: "Thermodynamics Introduction",
              description: "Heat, temperature, and thermal equilibrium",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-17",
              date: "2024-09-02",
              topic: "Laws of Thermodynamics",
              description: "First and second laws of thermodynamics",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-18",
              date: "2024-09-03",
              topic: "Heat Engines",
              description: "Efficiency and Carnot cycle",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-19",
              date: "2024-09-04",
              topic: "Kinetic Theory of Gases",
              description: "Molecular motion and gas laws",
              duration: 50,
              status: "completed",
            },
            {
              id: "lesson-20",
              date: "2024-09-05",
              topic: "Lab: Thermal Properties",
              description: "Measuring thermal conductivity and specific heat",
              duration: 100,
              status: "completed",
            },
          ],
        },
      ],
    },
  ])

  const currentTerm = syllabusData.find((term) => term.id === selectedTerm)

  // Handle lesson editing
  const handleEditLesson = (lessonId: string, updatedLesson: Partial<DailyLesson>) => {
    setSyllabusData((prev) =>
      prev.map((term) => ({
        ...term,
        weeks: term.weeks.map((week) => ({
          ...week,
          lessons: week.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, ...updatedLesson, isEdited: true } : lesson,
          ),
        })),
      })),
    )

    if (!pendingChanges.includes(lessonId)) {
      setPendingChanges((prev) => [...prev, lessonId])
    }

    setEditingLesson(null)
    toast("Changes saved locally. Submit for admin approval.")
  }

  // Submit changes for approval
  const handleSubmitForApproval = () => {
    toast("Your syllabus changes have been sent to admin for approval.")
    setPendingChanges([])
  }

  // Get status badge
  const getStatusBadge = (status: DailyLesson["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="container py-6 md:py-10">
      <header className="md:px-10 mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium">Syllabus Management</h1>
            <p className="text-muted-foreground">Plan and track your curriculum progress</p>
          </div>
          <div className="flex items-center gap-2">
            {pendingChanges.length > 0 && (
              <Button onClick={handleSubmitForApproval} className="gap-2">
                <Save className="h-4 w-4" />
                Submit for Approval ({pendingChanges.length})
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Lesson</DialogTitle>
                  <DialogDescription>Create a new lesson plan for your syllabus.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" placeholder="Enter lesson topic" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter lesson description" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="50" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Lesson</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {pendingChanges.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <p className="text-sm text-amber-800">
                You have {pendingChanges.length} pending change(s) that require admin approval.
              </p>
            </div>
          </div>
        )}
      </header>

      <Tabs value={selectedTerm} onValueChange={setSelectedTerm} className="w-full md:px-10">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          {syllabusData.map((term) => (
            <TabsTrigger key={term.id} value={term.id}>
              {term.name.split(" ")[0]} {term.name.split(" ")[1]}
            </TabsTrigger>
          ))}
        </TabsList>

        {syllabusData.map((term) => (
          <TabsContent key={term.id} value={term.id} className="mt-0">
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{term.name}</CardTitle>
                      <CardDescription>
                        {term.startDate} to {term.endDate}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={term.status === "current" ? "default" : "outline"}
                      className={
                        term.status === "completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : term.status === "current"
                            ? ""
                            : "bg-blue-500/10 text-blue-600"
                      }
                    >
                      {term.status === "current" ? "Current" : term.status === "completed" ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Progress</span>
                      <span className="font-medium">{term.overallProgress}%</span>
                    </div>
                    <Progress value={term.overallProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {term.weeks.map((week) => (
                <Card key={week.week}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Week {week.week}</CardTitle>
                        <CardDescription>
                          {week.startDate} to {week.endDate}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{week.progress}% Complete</div>
                        <Progress value={week.progress} className="mt-1 h-1.5 w-24" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {week.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`rounded-lg border p-4 ${lesson.isEdited ? "border-amber-200 bg-amber-50" : ""}`}
                        >
                          {editingLesson === lesson.id ? (
                            <EditLessonForm
                              lesson={lesson}
                              onSave={(updatedLesson) => handleEditLesson(lesson.id, updatedLesson)}
                              onCancel={() => setEditingLesson(null)}
                            />
                          ) : (
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{lesson.date}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{lesson.duration} min</span>
                                  {lesson.isEdited && (
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                                      Pending Approval
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="font-medium">{lesson.topic}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(lesson.status)}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => setEditingLesson(lesson.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit lesson</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// Edit lesson form component
function EditLessonForm({
  lesson,
  onSave,
  onCancel,
}: {
  lesson: DailyLesson
  onSave: (lesson: Partial<DailyLesson>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    topic: lesson.topic,
    description: lesson.description,
    date: lesson.date,
    duration: lesson.duration,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  )
}
