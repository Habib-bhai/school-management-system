import { CalendarDays, FileText, GraduationCap, Microscope } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      title: "Math Assignment: Calculus Problem Set",
      subject: "Mathematics",
      dueDate: "Today, 11:59 PM",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-amber-500/10 text-amber-600",
      urgency: "high",
    },
    {
      id: 2,
      title: "Physics Lab Report: Wave Properties",
      subject: "Physics",
      dueDate: "Tomorrow, 3:00 PM",
      icon: <Microscope className="h-5 w-5" />,
      color: "bg-purple-500/10 text-purple-600",
      urgency: "medium",
    },
    {
      id: 3,
      title: "Literature Essay: Character Analysis",
      subject: "English Literature",
      dueDate: "May 14, 9:00 AM",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-primary/10 text-primary",
      urgency: "low",
    },
    {
      id: 4,
      title: "History Research Paper: Industrial Revolution",
      subject: "History",
      dueDate: "May 18, 11:59 PM",
      icon: <CalendarDays className="h-5 w-5" />,
      color: "bg-primary/10 text-primary",
      urgency: "low",
    },
  ]

  return (
    <div className="space-y-4">
      {deadlines.map((deadline) => (
        <div key={deadline.id} className="flex items-start gap-3 rounded-lg border p-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${deadline.color.split(" ")[0]}`}
          >
            {deadline.icon}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{deadline.title}</p>
              <Badge
                variant="outline"
                className={`${deadline.color} ${deadline.urgency === "high" ? "animate-pulse" : ""}`}
              >
                {deadline.dueDate}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{deadline.subject}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
