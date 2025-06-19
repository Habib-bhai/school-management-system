// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// // import { DatePickerWithRange } from "@/components/ui/date-range-picker"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   Download,
//   FileText,
//   BarChart3,
//   Users,
//   GraduationCap,
//   DollarSign,
//   Calendar,
//   Filter,
//   Eye,
//   Share,
//   Clock,
//   CheckCircle,
// } from "lucide-react"

// // Mock data for reports
// const reportTemplates = [
//   {
//     id: 1,
//     name: "Student Performance Report",
//     description: "Comprehensive academic performance analysis",
//     category: "academic",
//     frequency: "monthly",
//     lastGenerated: "2024-01-15",
//     status: "active",
//     icon: GraduationCap,
//   },
//   {
//     id: 2,
//     name: "Fee Collection Summary",
//     description: "Financial collection and pending dues report",
//     category: "financial",
//     frequency: "weekly",
//     lastGenerated: "2024-01-14",
//     status: "active",
//     icon: DollarSign,
//   },
//   {
//     id: 3,
//     name: "Teacher Performance Analysis",
//     description: "Teaching staff evaluation and metrics",
//     category: "staff",
//     frequency: "quarterly",
//     lastGenerated: "2024-01-01",
//     status: "active",
//     icon: Users,
//   },
//   {
//     id: 4,
//     name: "Attendance Analytics",
//     description: "Student attendance patterns and trends",
//     category: "attendance",
//     frequency: "daily",
//     lastGenerated: "2024-01-16",
//     status: "active",
//     icon: Calendar,
//   },
//   {
//     id: 5,
//     name: "Parent Engagement Report",
//     description: "Parent-teacher communication and involvement",
//     category: "engagement",
//     frequency: "monthly",
//     lastGenerated: "2024-01-10",
//     status: "draft",
//     icon: Users,
//   },
// ]

// const generatedReports = [
//   {
//     id: 1,
//     name: "Q4 Academic Performance Report",
//     type: "Student Performance",
//     generatedDate: "2024-01-15",
//     generatedBy: "Admin User",
//     size: "2.4 MB",
//     format: "PDF",
//     downloads: 12,
//     status: "completed",
//   },
//   {
//     id: 2,
//     name: "January Fee Collection",
//     type: "Financial Report",
//     generatedDate: "2024-01-14",
//     generatedBy: "Finance Admin",
//     size: "1.8 MB",
//     format: "Excel",
//     downloads: 8,
//     status: "completed",
//   },
//   {
//     id: 3,
//     name: "Teacher Evaluation Q1",
//     type: "Staff Report",
//     generatedDate: "2024-01-12",
//     generatedBy: "HR Admin",
//     size: "3.2 MB",
//     format: "PDF",
//     downloads: 5,
//     status: "completed",
//   },
//   {
//     id: 4,
//     name: "Weekly Attendance Summary",
//     type: "Attendance Report",
//     generatedDate: "2024-01-16",
//     generatedBy: "Admin User",
//     size: "856 KB",
//     format: "PDF",
//     downloads: 15,
//     status: "processing",
//   },
// ]

// const reportCategories = {
//   academic: { label: "Academic", color: "bg-blue-500" },
//   financial: { label: "Financial", color: "bg-green-500" },
//   staff: { label: "Staff", color: "bg-purple-500" },
//   attendance: { label: "Attendance", color: "bg-orange-500" },
//   engagement: { label: "Engagement", color: "bg-pink-500" },
// }

// export default function AdminReportsPage() {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [selectedTemplate, setSelectedTemplate] = useState(null)
//   const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
//   const [reportConfig, setReportConfig] = useState({
//     format: "pdf",
//     dateRange: null,
//     includeCharts: true,
//     includeDetails: true,
//     recipients: [],
//   })

//   const filteredTemplates =
//     selectedCategory === "all"
//       ? reportTemplates
//       : reportTemplates.filter((template) => template.category === selectedCategory)

//   const handleGenerateReport = () => {
//     // Simulate report generation
//     console.log("Generating report with config:", reportConfig)
//     setIsGenerateDialogOpen(false)
//     // Reset config
//     setReportConfig({
//       format: "pdf",
//       dateRange: null,
//       includeCharts: true,
//       includeDetails: true,
//       recipients: [],
//     })
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Reports Center</h1>
//           <p className="text-gray-600">Generate and manage comprehensive school reports</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//             <SelectTrigger className="w-48">
//               <Filter className="w-4 h-4 mr-2" />
//               <SelectValue placeholder="Filter by category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               <SelectItem value="academic">Academic</SelectItem>
//               <SelectItem value="financial">Financial</SelectItem>
//               <SelectItem value="staff">Staff</SelectItem>
//               <SelectItem value="attendance">Attendance</SelectItem>
//               <SelectItem value="engagement">Engagement</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button>
//             <FileText className="w-4 h-4 mr-2" />
//             Create Custom Report
//           </Button>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Reports</p>
//                 <p className="text-2xl font-bold text-gray-900">24</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">This Month</p>
//                 <p className="text-2xl font-bold text-gray-900">8</p>
//               </div>
//               <Calendar className="w-8 h-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Downloads</p>
//                 <p className="text-2xl font-bold text-gray-900">156</p>
//               </div>
//               <Download className="w-8 h-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Processing</p>
//                 <p className="text-2xl font-bold text-gray-900">2</p>
//               </div>
//               <Clock className="w-8 h-8 text-orange-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <Tabs defaultValue="templates" className="space-y-6">
//         <TabsList>
//           <TabsTrigger value="templates">Report Templates</TabsTrigger>
//           <TabsTrigger value="generated">Generated Reports</TabsTrigger>
//           <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
//         </TabsList>

//         <TabsContent value="templates" className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTemplates.map((template) => (
//               <Card key={template.id} className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className={`p-2 rounded-lg ${reportCategories[template.category].color} text-white`}>
//                         <template.icon className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <CardTitle className="text-lg">{template.name}</CardTitle>
//                         <CardDescription className="text-sm">{template.description}</CardDescription>
//                       </div>
//                     </div>
//                     <Badge variant={template.status === "active" ? "default" : "secondary"}>{template.status}</Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-500">Frequency:</span>
//                       <span className="font-medium capitalize">{template.frequency}</span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-500">Last Generated:</span>
//                       <span className="font-medium">{template.lastGenerated}</span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-500">Category:</span>
//                       <Badge variant="outline" className="text-xs">
//                         {reportCategories[template.category].label}
//                       </Badge>
//                     </div>
//                     <div className="flex space-x-2 pt-2">
//                       <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
//                         <DialogTrigger asChild>
//                           <Button size="sm" className="flex-1" onClick={() => setSelectedTemplate(template)}>
//                             <BarChart3 className="w-4 h-4 mr-2" />
//                             Generate
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[500px]">
//                           <DialogHeader>
//                             <DialogTitle>Generate Report</DialogTitle>
//                             <DialogDescription>Configure and generate {selectedTemplate?.name}</DialogDescription>
//                           </DialogHeader>
//                           <div className="grid gap-4 py-4">
//                             <div className="grid gap-2">
//                               <Label htmlFor="format">Output Format</Label>
//                               <Select
//                                 value={reportConfig.format}
//                                 onValueChange={(value) => setReportConfig({ ...reportConfig, format: value })}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="pdf">PDF Document</SelectItem>
//                                   <SelectItem value="excel">Excel Spreadsheet</SelectItem>
//                                   <SelectItem value="csv">CSV File</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div className="grid gap-2">
//                               <Label>Date Range</Label>
//                               <DatePickerWithRange />
//                             </div>
//                             <div className="space-y-3">
//                               <Label>Report Options</Label>
//                               <div className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id="charts"
//                                   checked={reportConfig.includeCharts}
//                                   onCheckedChange={(checked) =>
//                                     setReportConfig({ ...reportConfig, includeCharts: checked })
//                                   }
//                                 />
//                                 <Label htmlFor="charts" className="text-sm">
//                                   Include Charts and Graphs
//                                 </Label>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id="details"
//                                   checked={reportConfig.includeDetails}
//                                   onCheckedChange={(checked) =>
//                                     setReportConfig({ ...reportConfig, includeDetails: checked })
//                                   }
//                                 />
//                                 <Label htmlFor="details" className="text-sm">
//                                   Include Detailed Data
//                                 </Label>
//                               </div>
//                             </div>
//                             <div className="grid gap-2">
//                               <Label htmlFor="recipients">Email Recipients (Optional)</Label>
//                               <Input
//                                 id="recipients"
//                                 placeholder="Enter email addresses separated by commas"
//                                 value={reportConfig.recipients.join(", ")}
//                                 onChange={(e) =>
//                                   setReportConfig({
//                                     ...reportConfig,
//                                     recipients: e.target.value.split(", ").filter(Boolean),
//                                   })
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
//                               Cancel
//                             </Button>
//                             <Button onClick={handleGenerateReport}>Generate Report</Button>
//                           </DialogFooter>
//                         </DialogContent>
//                       </Dialog>
//                       <Button variant="outline" size="sm">
//                         <Eye className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="generated" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Generated Reports</CardTitle>
//               <CardDescription>Recently generated reports and their status</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Report Name</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Generated Date</TableHead>
//                     <TableHead>Generated By</TableHead>
//                     <TableHead>Size</TableHead>
//                     <TableHead>Downloads</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {generatedReports.map((report) => (
//                     <TableRow key={report.id}>
//                       <TableCell className="font-medium">{report.name}</TableCell>
//                       <TableCell>{report.type}</TableCell>
//                       <TableCell>{report.generatedDate}</TableCell>
//                       <TableCell>{report.generatedBy}</TableCell>
//                       <TableCell>{report.size}</TableCell>
//                       <TableCell>{report.downloads}</TableCell>
//                       <TableCell>
//                         <Badge variant={report.status === "completed" ? "default" : "secondary"}>
//                           {report.status === "completed" ? (
//                             <CheckCircle className="w-3 h-3 mr-1" />
//                           ) : (
//                             <Clock className="w-3 h-3 mr-1" />
//                           )}
//                           {report.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button variant="outline" size="sm">
//                             <Download className="w-4 h-4" />
//                           </Button>
//                           <Button variant="outline" size="sm">
//                             <Share className="w-4 h-4" />
//                           </Button>
//                           <Button variant="outline" size="sm">
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="scheduled" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Scheduled Reports</CardTitle>
//               <CardDescription>Automated report generation schedule</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {reportTemplates
//                   .filter((t) => t.status === "active")
//                   .map((template) => (
//                     <div key={template.id} className="flex items-center justify-between p-4 rounded-lg border">
//                       <div className="flex items-center space-x-4">
//                         <div className={`p-2 rounded-lg ${reportCategories[template.category].color} text-white`}>
//                           <template.icon className="w-5 h-5" />
//                         </div>
//                         <div>
//                           <p className="font-medium">{template.name}</p>
//                           <p className="text-sm text-gray-500">
//                             Runs {template.frequency} • Next:{" "}
//                             {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Badge variant="outline">{template.frequency}</Badge>
//                         <Button variant="outline" size="sm">
//                           Edit Schedule
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page