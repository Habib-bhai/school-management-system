"use client"

import { useState } from "react"
import { Calendar, Clock, Mail, Phone, MapPin, Edit, Save, X, BookOpen, Users, Award, TrendingUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"


export default function TeacherProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Prof. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Academic Street, Education City, EC 12345",
    bio: "Passionate physics teacher with 8 years of experience in making complex concepts accessible to students. Specialized in quantum mechanics and thermodynamics.",
    subjects: ["Physics", "Advanced Physics", "Quantum Mechanics"],
    qualifications: ["Ph.D. in Physics - MIT", "M.Sc. in Theoretical Physics - Stanford", "B.Sc. in Physics - Harvard"],
    experience: "8 years",
    joinDate: "September 2016",
  })

  const teachingStats = [
    { label: "Total Students", value: 156, icon: Users, color: "text-blue-600" },
    { label: "Classes Teaching", value: 8, icon: BookOpen, color: "text-green-600" },
    { label: "Syllabus Progress", value: 85, icon: TrendingUp, color: "text-purple-600", isProgress: true },
    { label: "Achievements", value: 12, icon: Award, color: "text-yellow-600" },
  ]

  const schedule = [
    {
      day: "Monday",
      periods: ["9:00-10:00 Physics (Grade 11)", "11:00-12:00 Advanced Physics (Grade 12)", "2:00-3:00 Lab Session"],
    },
    {
      day: "Tuesday",
      periods: [
        "9:00-10:00 Physics (Grade 10)",
        "10:00-11:00 Quantum Mechanics (Grade 12)",
        "1:00-2:00 Physics (Grade 11)",
      ],
    },
    {
      day: "Wednesday",
      periods: ["9:00-10:00 Physics (Grade 11)", "11:00-12:00 Advanced Physics (Grade 12)", "3:00-4:00 Extra Classes"],
    },
    {
      day: "Thursday",
      periods: ["9:00-10:00 Physics (Grade 10)", "10:00-11:00 Quantum Mechanics (Grade 12)", "2:00-3:00 Lab Session"],
    },
    {
      day: "Friday",
      periods: [
        "9:00-10:00 Physics (Grade 11)",
        "11:00-12:00 Advanced Physics (Grade 12)",
        "1:00-2:00 Faculty Meeting",
      ],
    },
  ]

  const handleSave = () => {
    // TODO: Implement API call to update profile
    setIsEditing(false)
    toast("Your profile has been successfully updated.")
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and teaching details</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback className="text-lg">SJ</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground">Physics Department</p>
                  <Badge variant="secondary">Teacher ID: T2023012</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{profileData.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.experience}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.address}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your qualifications and subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Subjects Teaching</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Qualifications</Label>
                <ul className="mt-2 space-y-1">
                  {profileData.qualifications.map((qualification, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {qualification}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined: {profileData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Schedule */}
        <div className="space-y-6">
          {/* Teaching Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Teaching Statistics</CardTitle>
              <CardDescription>Your current teaching metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teachingStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    {stat.isProgress ? (
                      <div className="space-y-1">
                        <span className="text-sm font-bold">{stat.value}%</span>
                        <Progress value={stat.value} className="w-16 h-1" />
                      </div>
                    ) : (
                      <span className="text-sm font-bold">{stat.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your teaching timetable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map((day, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-sm">{day.day}</h4>
                  <div className="space-y-1">
                    {day.periods.map((period, periodIndex) => (
                      <div key={periodIndex} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        {period}
                      </div>
                    ))}
                  </div>
                  {index < schedule.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
