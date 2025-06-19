"use client"

import type React from "react"

import { useState } from "react"
import { Award, Trophy, Star, Calendar, Users, BookOpen, TrendingUp, Medal, Target, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Achievement {
  id: string
  title: string
  description: string
  category: "academic" | "activity" | "milestone" | "recognition"
  date: string
  icon: React.ElementType
  color: string
  points: number
  badge?: string
}

export default function TeacherAchievementsPage() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Syllabus Completion Champion",
      description: "Successfully completed 100% of Physics syllabus for Grade 11 ahead of schedule",
      category: "academic",
      date: "2024-01-15",
      icon: BookOpen,
      color: "text-blue-600",
      points: 100,
      badge: "Excellence",
    },
    {
      id: "2",
      title: "Science Fair Organizer",
      description: "Organized and conducted the Annual Science Fair with 150+ student participants",
      category: "activity",
      date: "2024-01-10",
      icon: Trophy,
      color: "text-yellow-600",
      points: 150,
      badge: "Leadership",
    },
    {
      id: "3",
      title: "Student Mentor of the Year",
      description: "Recognized for exceptional mentoring of 25 students, with 95% pass rate in board exams",
      category: "recognition",
      date: "2023-12-20",
      icon: Award,
      color: "text-purple-600",
      points: 200,
      badge: "Mentor",
    },
    {
      id: "4",
      title: "Innovation in Teaching",
      description: "Implemented AR/VR technology in physics classes, improving student engagement by 40%",
      category: "academic",
      date: "2023-12-15",
      icon: Zap,
      color: "text-green-600",
      points: 120,
      badge: "Innovation",
    },
    {
      id: "5",
      title: "5 Years of Excellence",
      description: "Completed 5 years of dedicated service with consistent outstanding performance",
      category: "milestone",
      date: "2023-12-01",
      icon: Medal,
      color: "text-red-600",
      points: 250,
      badge: "Veteran",
    },
    {
      id: "6",
      title: "Research Publication",
      description: "Published research paper on 'Modern Physics Teaching Methods' in Education Journal",
      category: "academic",
      date: "2023-11-20",
      icon: Star,
      color: "text-indigo-600",
      points: 180,
      badge: "Scholar",
    },
    {
      id: "7",
      title: "Parent Satisfaction Leader",
      description: "Achieved 98% parent satisfaction rating in annual feedback survey",
      category: "recognition",
      date: "2023-11-10",
      icon: Users,
      color: "text-pink-600",
      points: 90,
      badge: "Community",
    },
    {
      id: "8",
      title: "Digital Learning Pioneer",
      description: "First teacher to fully integrate digital learning tools across all physics courses",
      category: "activity",
      date: "2023-10-25",
      icon: Target,
      color: "text-cyan-600",
      points: 110,
      badge: "Pioneer",
    },
  ])

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0)
  const categoryStats = {
    academic: achievements.filter((a) => a.category === "academic").length,
    activity: achievements.filter((a) => a.category === "activity").length,
    milestone: achievements.filter((a) => a.category === "milestone").length,
    recognition: achievements.filter((a) => a.category === "recognition").length,
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "activity":
        return "bg-green-100 text-green-800 border-green-200"
      case "milestone":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "recognition":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressLevel = (points: number) => {
    if (points >= 1000) return { level: "Master", progress: 100, color: "text-purple-600" }
    if (points >= 750) return { level: "Expert", progress: (points / 1000) * 100, color: "text-blue-600" }
    if (points >= 500) return { level: "Advanced", progress: (points / 750) * 100, color: "text-green-600" }
    if (points >= 250) return { level: "Intermediate", progress: (points / 500) * 100, color: "text-yellow-600" }
    return { level: "Beginner", progress: (points / 250) * 100, color: "text-gray-600" }
  }

  const currentLevel = getProgressLevel(totalPoints)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Teacher Achievements</h1>
        <p className="text-muted-foreground">Celebrating your teaching excellence and milestones</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold">{totalPoints}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold">{currentLevel.level}</p>
              </div>
              <Medal className={`h-8 w-8 ${currentLevel.color}`} />
            </div>
            <Progress value={currentLevel.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Achievements</p>
                <p className="text-2xl font-bold">{achievements.length}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Categories */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({achievements.length})</TabsTrigger>
          <TabsTrigger value="academic">Academic ({categoryStats.academic})</TabsTrigger>
          <TabsTrigger value="activity">Activities ({categoryStats.activity})</TabsTrigger>
          <TabsTrigger value="milestone">Milestones ({categoryStats.milestone})</TabsTrigger>
          <TabsTrigger value="recognition">Recognition ({categoryStats.recognition})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted`}>
                        <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                          {achievement.badge && <Badge variant="outline">{achievement.badge}</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">Points</p>
                      <p className="text-lg font-bold text-primary">+{achievement.points}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements
              .filter((a) => a.category === "academic")
              .map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-muted`}>
                          <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                            {achievement.badge && <Badge variant="outline">{achievement.badge}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Points</p>
                        <p className="text-lg font-bold text-primary">+{achievement.points}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Similar structure for other categories */}
        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements
              .filter((a) => a.category === "activity")
              .map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-muted`}>
                          <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                            {achievement.badge && <Badge variant="outline">{achievement.badge}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Points</p>
                        <p className="text-lg font-bold text-primary">+{achievement.points}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="milestone" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements
              .filter((a) => a.category === "milestone")
              .map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-muted`}>
                          <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                            {achievement.badge && <Badge variant="outline">{achievement.badge}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Points</p>
                        <p className="text-lg font-bold text-primary">+{achievement.points}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recognition" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements
              .filter((a) => a.category === "recognition")
              .map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-muted`}>
                          <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                            {achievement.badge && <Badge variant="outline">{achievement.badge}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Points</p>
                        <p className="text-lg font-bold text-primary">+{achievement.points}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
