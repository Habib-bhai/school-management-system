"use client"

import { useState } from "react"
import { AlertCircle, Calendar, CheckCircle, Clock, Download, FileText, Paperclip, Upload, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AssignmentSubmissionForm } from "@/components/studentPortal/AssignmentSubmissionForm"
import { toast } from "sonner"

// Define the assignment status type
type AssignmentStatus = "pending" | "submitted" | "graded" | "late"

// Define the assignment interface
interface Assignment {
  id: number
  title: string
  description: string
  subject: string
  subjectId: string
  subjectColor: string
  dueDate: string
  dueDateTimestamp: number
  status: AssignmentStatus
  progress: number
  isUrgent: boolean
  submittedDate?: string
  grade?: string
  feedback?: string
  resources?: {
    id: number
    name: string
    type: string
    size: string
    url: string
  }[]
  requirements?: string[]
  teacherName?: string
  teacherAvatar?: string
  teacherInitials?: string
  submissionHistory?: {
    id: number
    date: string
    status: "submitted" | "graded" | "returned"
    files?: {
      id: number
      name: string
      type: string
      size: string
      url: string
    }[]
    comments?: string
    grade?: string
    feedback?: string
  }[]
}

interface AssignmentDetailDrawerProps {
  assignment: Assignment | null
  open: boolean
  onOpenChange: (open: boolean) => void
    // eslint-disable-next-line
  onSubmit?: (assignmentId: number, data: any) => void
}

export function AssignmentDetailDrawer({ assignment, open, onOpenChange, onSubmit }: AssignmentDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<string>("details")

  // Handle submission
    // eslint-disable-next-line
  const handleSubmit = (data: any) => {
    if (assignment) {
      // Call the onSubmit callback with the assignment ID and form data
      onSubmit?.(assignment.id, data)

      // Show success toast
      toast("Your work has been successfully submitted.")

      // Close the drawer after submission
      onOpenChange(false)
    }
  }

  // Get status badge
  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Submitted
          </Badge>
        )
      case "graded":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Graded
          </Badge>
        )
      case "late":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" />
            Late
          </Badge>
        )
      default:
        return null
    }
  }

  if (!assignment) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{assignment.title}</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={`${assignment.subjectColor} flex items-center gap-1`}>
              <FileText className="h-3 w-3" />
              {assignment.subject}
            </Badge>
            {getStatusBadge(assignment.status)}
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Due: {assignment.dueDate}
            </Badge>
          </div>
        </SheetHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="submit">{assignment.status === "graded" ? "Feedback" : "Submit"}</TabsTrigger>
            <TabsTrigger value="history" disabled={!assignment.submissionHistory?.length}>
              History
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <TabsContent value="details" className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{assignment.description}</p>
              </div>

              {assignment.requirements && assignment.requirements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Requirements</h3>
                  <ul className="mt-1 space-y-1">
                    {assignment.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {assignment.resources && assignment.resources.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Resources</h3>
                  <div className="mt-2 space-y-2">
                    {assignment.resources.map((resource) => (
                      <Card key={resource.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Paperclip className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{resource.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {resource.type} • {resource.size}
                                </p>
                              </div>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download resource</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {assignment.teacherName && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Assigned by</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={assignment.teacherAvatar || "/placeholder.svg"} alt={assignment.teacherName} />
                      <AvatarFallback>{assignment.teacherInitials}</AvatarFallback>
                    </Avatar>
                    <span>{assignment.teacherName}</span>
                  </div>
                </div>
              )}

              {assignment.status === "pending" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Progress</h3>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Completion</span>
                      <span>{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="mt-1 h-2" />
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full gap-2" onClick={() => setActiveTab("submit")}>
                  <Upload className="h-4 w-4" />
                  <span>
                    {assignment.status === "graded"
                      ? "View Feedback"
                      : assignment.status === "submitted"
                        ? "View Submission"
                        : "Submit Assignment"}
                  </span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="submit" className="mt-4 space-y-4">
              {assignment.status === "graded" ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Grade</h3>
                    <div className="mt-4 flex items-center justify-center">
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
                            strokeDashoffset={
                              251.2 -
                              ((assignment.grade === "A"
                                ? 95
                                : assignment.grade === "A-"
                                  ? 90
                                  : assignment.grade === "B+"
                                    ? 85
                                    : assignment.grade === "B"
                                      ? 80
                                      : 75) /
                                100) *
                                251.2
                            }
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-3xl font-medium">{assignment.grade}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Feedback</h3>
                    <div className="mt-2 rounded-lg border p-3">
                      <p>{assignment.feedback}</p>
                    </div>
                  </div>

                  {assignment.submissionHistory && assignment.submissionHistory.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Your Submission</h3>
                      <div className="mt-2 space-y-2">
                        {assignment.submissionHistory[0].files?.map((file) => (
                          <Card key={file.id}>
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                    <FileText className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {file.type} • {file.size}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      {assignment.submissionHistory[0].comments && (
                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-muted-foreground">Your Comments</h4>
                          <p className="mt-1 text-sm">{assignment.submissionHistory[0].comments}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : assignment.status === "submitted" ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium">Assignment Submitted</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You submitted this assignment on {assignment.submittedDate}.
                    </p>
                  </div>

                  {assignment.submissionHistory && assignment.submissionHistory.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Your Submission</h3>
                      <div className="mt-2 space-y-2">
                        {assignment.submissionHistory[0].files?.map((file) => (
                          <Card key={file.id}>
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                    <FileText className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {file.type} • {file.size}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      {assignment.submissionHistory[0].comments && (
                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-muted-foreground">Your Comments</h4>
                          <p className="mt-1 text-sm">{assignment.submissionHistory[0].comments}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <Separator />

                  <div>
                    <Button variant="outline" className="w-full">
                      Resubmit Assignment
                    </Button>
                  </div>
                </div>
              ) : (
                <AssignmentSubmissionForm onSubmit={handleSubmit} />
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-4 space-y-4">
              {assignment.submissionHistory && assignment.submissionHistory.length > 0 ? (
                <div className="space-y-6">
                  {assignment.submissionHistory.map((submission) => (
                    <div key={submission.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Submission on {submission.date}</h3>
                        <Badge
                          variant={submission.status === "graded" ? "default" : "outline"}
                          className={
                            submission.status === "graded"
                              ? "bg-green-500"
                              : submission.status === "returned"
                                ? "bg-amber-500/10 text-amber-600"
                                : "bg-primary/10 text-primary"
                          }
                        >
                          {submission.status === "graded"
                            ? "Graded"
                            : submission.status === "returned"
                              ? "Returned for Revision"
                              : "Submitted"}
                        </Badge>
                      </div>

                      {submission.files && submission.files.length > 0 && (
                        <div className="space-y-2">
                          {submission.files.map((file) => (
                            <Card key={file.id}>
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                      <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{file.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {file.type} • {file.size}
                                      </p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {submission.comments && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground">Your Comments</h4>
                          <p className="mt-1 text-sm">{submission.comments}</p>
                        </div>
                      )}

                      {submission.grade && (
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-medium text-muted-foreground">Grade:</h4>
                          <Badge>{submission.grade}</Badge>
                        </div>
                      )}

                      {submission.feedback && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground">Teacher Feedback</h4>
                          <div className="mt-1 rounded-lg border p-3">
                            <p className="text-sm">{submission.feedback}</p>
                          </div>
                        </div>
                      )}

                      <Separator />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No submission history</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    You haven&apos;t submitted this assignment yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
