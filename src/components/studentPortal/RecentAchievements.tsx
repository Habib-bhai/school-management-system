import { BookOpen, CheckCircle2, Star } from "lucide-react"

export function RecentAchievements() {
  const achievements = [
    {
      id: 1,
      title: "Perfect Attendance",
      description: "Attended all classes for 2 weeks straight",
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      date: "May 10, 2025",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Scored 100% on 3 consecutive quizzes",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      date: "May 8, 2025",
    },
    {
      id: 3,
      title: "Bookworm",
      description: "Completed 5 books this semester",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      date: "May 5, 2025",
    },
  ]

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{achievement.icon}</div>
          <div className="space-y-1">
            <p className="font-medium">{achievement.title}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
