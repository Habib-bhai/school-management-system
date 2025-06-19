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
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Download,
  Send,
  Receipt,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from "lucide-react"


type Status = "paid" | "partial" | "overdue" | "pending"

interface FeeBreakdown {
  tuition: number;
  books: number;
  activities: number;
  transport: number;
  meals: number;
}

interface PaymentHistoryItem {
  id: number;
  amount: number;
  date: string;
  method: string;
  reference: string;
  status: string;
}

interface ChildInfo {
  name: string;
  class: string;
  rollNumber: string;
}

export interface FeeRecord {
  id: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  avatar: string;
  children: ChildInfo[];
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: Status;
  paymentHistory: PaymentHistoryItem[];
  feeBreakdown: FeeBreakdown;
}

const feeRecords: FeeRecord[] = [
  {
    id: 1,
    parentName: "Robert Johnson",
    parentEmail: "robert.johnson@email.com",
    parentPhone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        name: "Alice Johnson",
        class: "Grade 9A",
        rollNumber: "G9A001",
      },
    ],
    totalFee: 5000,
    paidAmount: 3000,
    dueAmount: 2000,
    dueDate: "2024-02-15",
    status: "partial",
    paymentHistory: [
      {
        id: 1,
        amount: 1500,
        date: "2024-01-15",
        method: "Bank Transfer",
        reference: "TXN001",
        status: "completed",
      },
      {
        id: 2,
        amount: 1500,
        date: "2024-01-30",
        method: "Credit Card",
        reference: "TXN002",
        status: "completed",
      },
    ],
    feeBreakdown: {
      tuition: 3500,
      books: 500,
      activities: 300,
      transport: 400,
      meals: 300,
    },
  },
  {
    id: 2,
    parentName: "Mary Smith",
    parentEmail: "mary.smith@email.com",
    parentPhone: "+1 (555) 876-5432",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        name: "Bob Smith",
        class: "Grade 9A",
        rollNumber: "G9A002",
      },
    ],
    totalFee: 4800,
    paidAmount: 4800,
    dueAmount: 0,
    dueDate: "2024-01-31",
    status: "paid",
    paymentHistory: [
      {
        id: 1,
        amount: 4800,
        date: "2024-01-20",
        method: "Bank Transfer",
        reference: "TXN003",
        status: "completed",
      },
    ],
    feeBreakdown: {
      tuition: 3500,
      books: 500,
      activities: 300,
      transport: 500,
      meals: 0,
    },
  },
  {
    id: 3,
    parentName: "James Davis",
    parentEmail: "james.davis@email.com",
    parentPhone: "+1 (555) 765-4321",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        name: "Carol Davis",
        class: "Grade 9B",
        rollNumber: "G9B001",
      },
    ],
    totalFee: 5200,
    paidAmount: 0,
    dueAmount: 5200,
    dueDate: "2024-01-31",
    status: "overdue",
    paymentHistory: [],
    feeBreakdown: {
      tuition: 3500,
      books: 500,
      activities: 400,
      transport: 400,
      meals: 400,
    },
  },
  {
    id: 4,
    parentName: "Linda Wilson",
    parentEmail: "linda.wilson@email.com",
    parentPhone: "+1 (555) 654-3210",
    avatar: "/placeholder.svg?height=40&width=40",
    children: [
      {
        name: "David Wilson",
        class: "Grade 10A",
        rollNumber: "G10A001",
      },
      {
        name: "Emma Wilson",
        class: "Grade 8A",
        rollNumber: "G8A001",
      },
    ],
    totalFee: 9600,
    paidAmount: 5000,
    dueAmount: 4600,
    dueDate: "2024-02-28",
    status: "partial",
    paymentHistory: [
      {
        id: 1,
        amount: 5000,
        date: "2024-01-10",
        method: "Cash",
        reference: "CASH001",
        status: "completed",
      },
    ],
    feeBreakdown: {
      tuition: 7000,
      books: 1000,
      activities: 600,
      transport: 800,
      meals: 200,
    },
  },
]




export default function AdminFeeCollection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  // eslint-disable-next-line
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentReference, setPaymentReference] = useState("")
  const [paymentNotes, setPaymentNotes] = useState("")

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch =
      record.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.parentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.children.some(
        (child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.class.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    const matchesStatus = statusFilter === "all" || record.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status : Status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />
      case "partial":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }



  const handlePaymentUpdate = (record: FeeRecord) => {
    if (paymentAmount && paymentMethod) {
      // Handle payment update logic
      console.log("Payment updated:", {
        recordId: record.id,
        amount: paymentAmount,
        method: paymentMethod,
        reference: paymentReference,
        notes: paymentNotes,
      })

      // Reset form
      setPaymentAmount("")
      setPaymentMethod("")
      setPaymentReference("")
      setPaymentNotes("")
    }
  }

  const totalCollected = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0)
  const totalDue = feeRecords.reduce((sum, record) => sum + record.dueAmount, 0)
  const totalFees = feeRecords.reduce((sum, record) => sum + record.totalFee, 0)
  const collectionRate = (totalCollected / totalFees) * 100

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Collection</h1>
          <p className="text-gray-600 mt-1">Manage student fees and payment tracking</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Receipt className="w-4 h-4 mr-2" />
            Generate Receipt
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Academic year 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{collectionRate.toFixed(1)}% collection rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalDue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pending collection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {feeRecords.filter((r) => r.status === "overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">Accounts overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Collection Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Progress</CardTitle>
          <CardDescription>Overall fee collection status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Collected: ${totalCollected.toLocaleString()}</span>
              <span>Target: ${totalFees.toLocaleString()}</span>
            </div>
            <Progress value={collectionRate} className="h-2" />
            <div className="text-sm text-gray-600">{collectionRate.toFixed(1)}% of total fees collected</div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by parent name, email, or child's name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.parentName} />
                    <AvatarFallback>
                      {record.parentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{record.parentName}</h3>
                    <p className="text-sm text-gray-600">{record.parentEmail}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {record.children.map((child, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {child.name} - {child.class}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getStatusColor(record.status)}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1 capitalize">{record.status}</span>
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>
                      Total: <span className="font-medium">${record.totalFee.toLocaleString()}</span>
                    </div>
                    <div>
                      Paid: <span className="font-medium text-green-600">${record.paidAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      Due: <span className="font-medium text-red-600">${record.dueAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      Due Date: <span className="font-medium">{new Date(record.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex-1">
                  <Progress value={(record.paidAmount / record.totalFee) * 100} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {((record.paidAmount / record.totalFee) * 100).toFixed(1)}% paid
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.parentName} />
                            <AvatarFallback>
                              {record.parentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-xl font-bold">{record.parentName}</div>
                            <div className="text-sm text-gray-500">Fee Management</div>
                          </div>
                        </DialogTitle>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="mt-6">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="breakdown">Fee Breakdown</TabsTrigger>
                          <TabsTrigger value="history">Payment History</TabsTrigger>
                          <TabsTrigger value="update">Update Payment</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Payment Summary</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Fee:</span>
                                  <span className="font-medium">${record.totalFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Amount Paid:</span>
                                  <span className="font-medium text-green-600">
                                    ${record.paidAmount.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Amount Due:</span>
                                  <span className="font-medium text-red-600">${record.dueAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Due Date:</span>
                                  <span className="font-medium">{new Date(record.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="pt-2">
                                  <Progress value={(record.paidAmount / record.totalFee) * 100} />
                                  <div className="text-xs text-gray-500 mt-1">
                                    {((record.paidAmount / record.totalFee) * 100).toFixed(1)}% completed
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Student Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {record.children.map((child, index) => (
                                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="font-medium">{child.name}</div>
                                    <div className="text-sm text-gray-600">{child.class}</div>
                                    <div className="text-sm text-gray-600">Roll: {child.rollNumber}</div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="breakdown" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Fee Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {Object.entries(record.feeBreakdown).map(([category, amount]) => (
                                  <div key={category} className="flex justify-between items-center">
                                    <span className="capitalize">{category}:</span>
                                    <span className="font-medium">${amount.toLocaleString()}</span>
                                  </div>
                                ))}
                                <div className="border-t pt-3 flex justify-between items-center font-semibold">
                                  <span>Total:</span>
                                  <span>${record.totalFee.toLocaleString()}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="history" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Payment History</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {record.paymentHistory.length > 0 ? (
                                <div className="space-y-3">
                                  {record.paymentHistory.map((payment) => (
                                    <div
                                      key={payment.id}
                                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                          <div className="font-medium">${payment.amount.toLocaleString()}</div>
                                          <div className="text-sm text-gray-600">{payment.method}</div>
                                          <div className="text-xs text-gray-500">Ref: {payment.reference}</div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm font-medium">
                                          {new Date(payment.date).toLocaleDateString()}
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                          {payment.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500">No payment history available</div>
                              )}
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="update" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Update Payment</CardTitle>
                              <CardDescription>Record a new payment for {record.parentName}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Payment Amount</label>
                                  <Input
                                    type="number"
                                    placeholder="Enter amount..."
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    max={record.dueAmount}
                                  />
                                  <div className="text-xs text-gray-500 mt-1">
                                    Outstanding: ${record.dueAmount.toLocaleString()}
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Payment Method</label>
                                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cash">Cash</SelectItem>
                                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                      <SelectItem value="credit-card">Credit Card</SelectItem>
                                      <SelectItem value="debit-card">Debit Card</SelectItem>
                                      <SelectItem value="check">Check</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Reference Number</label>
                                <Input
                                  placeholder="Transaction reference..."
                                  value={paymentReference}
                                  onChange={(e) => setPaymentReference(e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium">Notes (Optional)</label>
                                <Textarea
                                  placeholder="Additional notes..."
                                  value={paymentNotes}
                                  onChange={(e) => setPaymentNotes(e.target.value)}
                                  rows={3}
                                />
                              </div>

                              <Button
                                onClick={() => handlePaymentUpdate(record)}
                                disabled={!paymentAmount || !paymentMethod}
                                className="w-full"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Record Payment
                              </Button>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  {record.dueAmount > 0 && (
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      Remind
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">No fee records found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
