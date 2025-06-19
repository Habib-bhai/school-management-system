"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Edit, Save, X, Eye, MessageCircle, BookOpen, Award, Users } from "lucide-react"
import { toast } from "sonner"

interface ParentProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  occupation: string
  employer: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  joinDate: string
  avatar: string
}

interface ChildProfile {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  grade: string
  class: string
  studentId: string
  avatar: string
  enrollmentDate: string
  currentGPA: number
  attendance: number
  subjects: string[]
  achievements: string[]
  medicalInfo?: {
    allergies: string[]
    medications: string[]
    emergencyContact: string
  }
}

const mockParentProfile: ParentProfile = {
  id: "1",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Oak Street",
  city: "Springfield",
  state: "IL",
  zipCode: "62701",
  occupation: "Marketing Manager",
  employer: "Tech Solutions Inc.",
  emergencyContact: {
    name: "Michael Johnson",
    relationship: "Spouse",
    phone: "+1 (555) 234-5678",
  },
  joinDate: "2020-08-15",
  avatar: "/placeholder.svg?height=100&width=100",
}

const mockChildren: ChildProfile[] = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Johnson",
    dateOfBirth: "2010-03-15",
    grade: "8th Grade",
    class: "8A",
    studentId: "STU-2024-001",
    avatar: "/placeholder.svg?height=80&width=80",
    enrollmentDate: "2020-08-15",
    currentGPA: 3.8,
    attendance: 96,
    subjects: ["Mathematics", "Science", "English", "History", "Art"],
    achievements: ["Honor Roll", "Science Fair Winner", "Math Olympiad Participant"],
    medicalInfo: {
      allergies: ["Peanuts"],
      medications: [],
      emergencyContact: "+1 (555) 123-4567",
    },
  },
  {
    id: "2",
    firstName: "Alex",
    lastName: "Johnson",
    dateOfBirth: "2013-07-22",
    grade: "5th Grade",
    class: "5B",
    studentId: "STU-2024-002",
    avatar: "/placeholder.svg?height=80&width=80",
    enrollmentDate: "2021-08-20",
    currentGPA: 3.9,
    attendance: 98,
    subjects: ["Mathematics", "Science", "English", "Social Studies", "Art", "Music"],
    achievements: ["Perfect Attendance", "Art Competition Winner", "Reading Champion"],
    medicalInfo: {
      allergies: [],
      medications: [],
      emergencyContact: "+1 (555) 123-4567",
    },
  },
]

export default function ParentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [parentProfile, setParentProfile] = useState(mockParentProfile)
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null)

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast.success("Profile updated successfully!")
    // TODO: Implement API call to save profile
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your profile and children&apos;s information</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="parent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="parent">Parent Profile</TabsTrigger>
          <TabsTrigger value="children">Children Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="parent" className="space-y-6">
          {/* Parent Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={parentProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {parentProfile.firstName[0]}
                    {parentProfile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {parentProfile.firstName} {parentProfile.lastName}
                  </h2>
                  <p className="text-muted-foreground">{parentProfile.occupation}</p>
                  <p className="text-sm text-muted-foreground">{parentProfile.employer}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline">
                      <Calendar className="mr-1 h-3 w-3" />
                      Member since {new Date(parentProfile.joinDate).getFullYear()}
                    </Badge>
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      {mockChildren.length} Children
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic contact and personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={parentProfile.firstName}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={parentProfile.lastName}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={parentProfile.email}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={parentProfile.phone}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Your residential address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={parentProfile.address}
                  onChange={(e) => setParentProfile((prev) => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={parentProfile.city}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={parentProfile.state}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, state: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={parentProfile.zipCode}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, zipCode: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Your work and employment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={parentProfile.occupation}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, occupation: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer</Label>
                  <Input
                    id="employer"
                    value={parentProfile.employer}
                    onChange={(e) => setParentProfile((prev) => ({ ...prev, employer: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Alternative contact person in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Name</Label>
                  <Input
                    id="emergencyName"
                    value={parentProfile.emergencyContact.name}
                    onChange={(e) =>
                      setParentProfile((prev) => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, name: e.target.value },
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    value={parentProfile.emergencyContact.relationship}
                    onChange={(e) =>
                      setParentProfile((prev) => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, relationship: e.target.value },
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={parentProfile.emergencyContact.phone}
                    onChange={(e) =>
                      setParentProfile((prev) => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, phone: e.target.value },
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {mockChildren.map((child) => (
              <Card key={child.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={child.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {child.firstName[0]}
                        {child.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-muted-foreground">
                        {child.grade} • Class {child.class}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Age: {calculateAge(child.dateOfBirth)} • ID: {child.studentId}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Academic Stats */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{child.currentGPA}</div>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{child.attendance}%</div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h4 className="font-medium mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-1">
                      {child.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div>
                    <h4 className="font-medium mb-2">Recent Achievements</h4>
                    <div className="space-y-1">
                      {child.achievements.slice(0, 2).map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2 text-sm">
                          <Award className="h-3 w-3 text-yellow-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedChild(child)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Child Details Dialog */}
      <Dialog open={!!selectedChild} onOpenChange={() => setSelectedChild(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedChild && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedChild.firstName} {selectedChild.lastName}
                </DialogTitle>
                <DialogDescription>Detailed profile information for your child</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedChild.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {selectedChild.firstName[0]}
                      {selectedChild.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {selectedChild.firstName} {selectedChild.lastName}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Student ID: {selectedChild.studentId}</p>
                      <p>
                        Grade: {selectedChild.grade} • Class: {selectedChild.class}
                      </p>
                      <p>Age: {calculateAge(selectedChild.dateOfBirth)}</p>
                      <p>Enrolled: {new Date(selectedChild.enrollmentDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Performance */}
                <div>
                  <h4 className="font-medium mb-3">Academic Performance</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedChild.currentGPA}</div>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedChild.attendance}%</div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedChild.subjects.length}</div>
                      <p className="text-sm text-muted-foreground">Subjects</p>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="font-medium mb-3">Current Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChild.subjects.map((subject) => (
                      <Badge key={subject} variant="outline">
                        <BookOpen className="mr-1 h-3 w-3" />
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-medium mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {selectedChild.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medical Information */}
                {selectedChild.medicalInfo && (
                  <div>
                    <h4 className="font-medium mb-3">Medical Information</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Allergies:</p>
                        <p className="text-sm">
                          {selectedChild.medicalInfo.allergies.length > 0
                            ? selectedChild.medicalInfo.allergies.join(", ")
                            : "None reported"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Medications:</p>
                        <p className="text-sm">
                          {selectedChild.medicalInfo.medications.length > 0
                            ? selectedChild.medicalInfo.medications.join(", ")
                            : "None reported"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Emergency Contact:</p>
                        <p className="text-sm">{selectedChild.medicalInfo.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Teachers
                  </Button>
                  <Button onClick={() => setSelectedChild(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
