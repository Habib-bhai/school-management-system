"use client"

import { useState } from "react"
import { Plus, Send, Clock, CheckCircle, XCircle, AlertCircle, Filter, Search, Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type RequestStatus = "pending" | "approved" | "rejected" | "under_review"
type RequestType = "leave" | "class_related" | "resource" | "review" | "other"

interface Request {
  id: string
  type: RequestType
  title: string
  description: string
  status: RequestStatus
  submittedDate: string
  responseDate?: string
  adminResponse?: string
  priority: "low" | "medium" | "high"
}

export default function TeacherRequestsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all")
  const [typeFilter, setTypeFilter] = useState<RequestType | "all">("all")

  const [newRequest, setNewRequest] = useState({
    type: "" as RequestType,
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  })

  const [requests] = useState<Request[]>([
    {
      id: "1",
      type: "leave",
      title: "Medical Leave Request",
      description: "Requesting 3 days medical leave due to flu symptoms. Will arrange substitute teacher.",
      status: "approved",
      submittedDate: "2024-01-15",
      responseDate: "2024-01-16",
      adminResponse: "Approved. Please coordinate with substitute teacher Ms. Anderson.",
      priority: "high",
    },
    {
      id: "2",
      type: "resource",
      title: "Laboratory Equipment Request",
      description:
        "Need additional microscopes for advanced biology practical sessions. Current equipment insufficient for class size.",
      status: "under_review",
      submittedDate: "2024-01-10",
      priority: "medium",
    },
    {
      id: "3",
      type: "class_related",
      title: "Extra Class Permission",
      description: "Request permission to conduct weekend revision classes for Grade 12 students before board exams.",
      status: "pending",
      submittedDate: "2024-01-08",
      priority: "medium",
    },
    {
      id: "4",
      type: "review",
      title: "Curriculum Review Feedback",
      description:
        "Suggestions for updating physics curriculum to include more practical applications and modern physics concepts.",
      status: "rejected",
      submittedDate: "2024-01-05",
      responseDate: "2024-01-12",
      adminResponse: "Thank you for the feedback. Curriculum changes are planned for next academic year.",
      priority: "low",
    },
  ])

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "under_review":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
    }
  }

  const handleSubmitRequest = () => {
    if (!newRequest.type || !newRequest.title || !newRequest.description) {
      toast("Please fill in all required fields.")
      return
    }

    // TODO: Implement API call to submit request
    toast("Your request has been submitted to the admin department.")

    setIsDialogOpen(false)
    setNewRequest({
      type: "" as RequestType,
      title: "",
      description: "",
      priority: "medium",
    })
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const requestCounts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    under_review: requests.filter((r) => r.status === "under_review").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Requests</h1>
          <p className="text-muted-foreground">Submit and track your requests to the administration</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Request</DialogTitle>
              <DialogDescription>Fill out the form below to submit a request to the administration</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Request Type *</Label>
                  <Select
                    value={newRequest.type}
                    onValueChange={(value: RequestType) => setNewRequest({ ...newRequest, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leave">Leave Request</SelectItem>
                      <SelectItem value="class_related">Class Related</SelectItem>
                      <SelectItem value="resource">Resource Request</SelectItem>
                      <SelectItem value="review">Review/Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newRequest.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setNewRequest({ ...newRequest, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Brief title for your request"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Detailed description of your request"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRequest}>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value: RequestStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(value: RequestType | "all") => setTypeFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
                <SelectItem value="class_related">Class Related</SelectItem>
                <SelectItem value="resource">Resource</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Request Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({requestCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({requestCounts.pending})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({requestCounts.under_review})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({requestCounts.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({requestCounts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No requests found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(request.status)}
                          <h3 className="font-semibold">{request.title}</h3>
                          <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{request.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                          </div>
                          {request.responseDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Responded: {new Date(request.responseDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        {request.adminResponse && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-1">Admin Response:</p>
                            <p className="text-sm text-muted-foreground">{request.adminResponse}</p>
                          </div>
                        )}
                      </div>
                      <Badge className={getStatusColor(request.status)}>{request.status.replace("_", " ")}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Other tab contents would filter by status */}
        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {filteredRequests
              .filter((r) => r.status === "pending")
              .map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(request.status)}
                          <h3 className="font-semibold">{request.title}</h3>
                          <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{request.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(request.status)}>{request.status.replace("_", " ")}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Similar structure for other tabs */}
      </Tabs>
    </div>
  )
}
