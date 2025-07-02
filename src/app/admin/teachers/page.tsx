"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Mail, Phone, Award, Users, Star, Edit, MessageSquare } from "lucide-react"

const teachers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    department: "Science",
    experience: "8 years",
    qualification: "M.Sc Mathematics",
    joinDate: "2020-08-15",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Grade 9A", "Grade 9B", "Grade 10A"],
    achievements: ["Best Teacher Award 2023", "Mathematics Excellence Award", "Student Favorite Teacher"],
    performance: {
      rating: 4.8,
      studentSatisfaction: 95,
      classesCompleted: 156,
      attendanceRate: 98,
    },
    address: "123 Oak Street, Springfield",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 234-5678",
    subject: "Physics",
    department: "Science",
    experience: "12 years",
    qualification: "Ph.D Physics",
    joinDate: "2018-01-10",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Grade 11A", "Grade 11B", "Grade 12A"],
    achievements: ["Research Excellence Award", "Innovation in Teaching", "Science Fair Coordinator"],
    performance: {
      rating: 4.9,
      studentSatisfaction: 97,
      classesCompleted: 203,
      attendanceRate: 99,
    },
    address: "456 Pine Avenue, Springfield",
    emergencyContact: "Lisa Chen - +1 (555) 876-5432",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@school.edu",
    phone: "+1 (555) 345-6789",
    subject: "English Literature",
    department: "Humanities",
    experience: "6 years",
    qualification: "M.A English Literature",
    joinDate: "2021-09-01",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Grade 8A", "Grade 8B", "Grade 9A"],
    achievements: ["Creative Writing Workshop Leader", "Literary Magazine Editor", "Drama Club Supervisor"],
    performance: {
      rating: 4.7,
      studentSatisfaction: 92,
      classesCompleted: 134,
      attendanceRate: 96,
    },
    address: "789 Maple Drive, Springfield",
    emergencyContact: "Carlos Rodriguez - +1 (555) 765-4321",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@school.edu",
    phone: "+1 (555) 456-7890",
    subject: "History",
    department: "Social Studies",
    experience: "15 years",
    qualification: "M.A History",
    joinDate: "2015-03-20",
    status: "on-leave",
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Grade 10B", "Grade 11A"],
    achievements: ["History Department Head", "Model UN Coordinator", "Academic Excellence Award"],
    performance: {
      rating: 4.6,
      studentSatisfaction: 89,
      classesCompleted: 298,
      attendanceRate: 94,
    },
    address: "321 Elm Street, Springfield",
    emergencyContact: "Sarah Thompson - +1 (555) 654-3210",
  },
]

export default function AdminTeachers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
    // eslint-disable-next-line
const [selectedTeacher, setSelectedTeacher] = useState(null)

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || teacher.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const departments = [...new Set(teachers.map((t) => t.department))]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers Management</h1>
          <p className="text-gray-600 mt-1">Manage teaching staff and their assignments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search teachers by name, subject, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <CardDescription>{teacher.subject}</CardDescription>
                  </div>
                </div>
                <Badge variant={teacher.status === "active" ? "default" : "secondary"}>{teacher.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{teacher.classes.length} Classes</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{teacher.performance.rating}/5.0 Rating</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                          <AvatarFallback>
                            {teacher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xl font-bold">{teacher.name}</div>
                          <div className="text-sm text-gray-500">{teacher.subject} Teacher</div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="overview" className="mt-6">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="classes">Classes</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span>{teacher.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span>{teacher.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Department:</span>
                                <span>{teacher.department}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Experience:</span>
                                <span>{teacher.experience}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Qualification:</span>
                                <span>{teacher.qualification}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Join Date:</span>
                                <span>{new Date(teacher.joinDate).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Address:</span>
                                <p className="mt-1">{teacher.address}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Emergency Contact:</span>
                                <p className="mt-1">{teacher.emergencyContact}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="classes" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {teacher.classes.map((className, index) => (
                            <Card key={index}>
                              <CardContent className="pt-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">{className}</h4>
                                    <p className="text-sm text-gray-600">{teacher.subject}</p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Manage
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="achievements" className="space-y-4">
                        <div className="space-y-3">
                          {teacher.achievements.map((achievement, index) => (
                            <Card key={index}>
                              <CardContent className="pt-4">
                                <div className="flex items-center space-x-3">
                                  <Award className="w-5 h-5 text-yellow-500" />
                                  <span className="font-medium">{achievement}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="performance" className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Card>
                            <CardContent className="pt-4 text-center">
                              <div className="text-2xl font-bold text-blue-600">{teacher.performance.rating}</div>
                              <div className="text-sm text-gray-600">Overall Rating</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-4 text-center">
                              <div className="text-2xl font-bold text-green-600">
                                {teacher.performance.studentSatisfaction}%
                              </div>
                              <div className="text-sm text-gray-600">Student Satisfaction</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-4 text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                {teacher.performance.classesCompleted}
                              </div>
                              <div className="text-sm text-gray-600">Classes Completed</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-4 text-center">
                              <div className="text-2xl font-bold text-orange-600">
                                {teacher.performance.attendanceRate}%
                              </div>
                              <div className="text-sm text-gray-600">Attendance Rate</div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">No teachers found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
