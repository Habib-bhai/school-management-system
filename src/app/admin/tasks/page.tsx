"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  CalendarIcon,
  Clock,
  Flag,
  CheckCircle,
  Circle,
  AlertCircle,
  Edit,
  Trash2,
  Search,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: "Review Q1 Budget Reports",
    description: "Analyze quarterly budget reports and prepare summary for board meeting",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-20",
    category: "finance",
    createdDate: "2024-01-15",
    completed: false,
    tags: ["budget", "reports", "urgent"],
  },
  {
    id: 2,
    title: "Schedule Parent-Teacher Conferences",
    description: "Coordinate with teachers to schedule upcoming parent-teacher conferences",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-25",
    category: "events",
    createdDate: "2024-01-14",
    completed: false,
    tags: ["conferences", "scheduling"],
  },
  {
    id: 3,
    title: "Update School Website Content",
    description: "Review and update school website with latest announcements and events",
    priority: "low",
    status: "pending",
    dueDate: "2024-01-30",
    category: "communication",
    createdDate: "2024-01-13",
    completed: false,
    tags: ["website", "content"],
  },
  {
    id: 4,
    title: "Approve New Teacher Applications",
    description: "Review and process applications for new teaching positions",
    priority: "high",
    status: "completed",
    dueDate: "2024-01-18",
    category: "hr",
    createdDate: "2024-01-10",
    completed: true,
    tags: ["hiring", "teachers"],
  },
  {
    id: 5,
    title: "Prepare Monthly Newsletter",
    description: "Compile and prepare monthly newsletter for parents and students",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-28",
    category: "communication",
    createdDate: "2024-01-12",
    completed: false,
    tags: ["newsletter", "communication"],
  },
]

type TaskPriority = "high" | "medium" | "low";

const priorityConfig: Record<TaskPriority, { label: string; color: string; textColor: string; bgColor: string }> = {
  high: { label: "High", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" },
  medium: { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" },
  low: { label: "Low", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" },
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-gray-500", icon: Circle },
  "in-progress": { label: "In Progress", color: "bg-blue-500", icon: Clock },
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle },
  overdue: { label: "Overdue", color: "bg-red-500", icon: AlertCircle },
}

type TaskCategory = "finance" | "events" | "communication" | "hr" | "academic" | "maintenance";

const categoryConfig: Record<TaskCategory, { label: string; color: string }> = {
  finance: { label: "Finance", color: "bg-purple-100 text-purple-800" },
  events: { label: "Events", color: "bg-blue-100 text-blue-800" },
  communication: { label: "Communication", color: "bg-green-100 text-green-800" },
  hr: { label: "HR", color: "bg-orange-100 text-orange-800" },
  academic: { label: "Academic", color: "bg-indigo-100 text-indigo-800" },
  maintenance: { label: "Maintenance", color: "bg-gray-100 text-gray-800" },
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    // eslint-disable-next-line
  const [selectedTask, setSelectedTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  // eslint-disable-next-line
  const [selectedDate, setSelectedDate] = useState(null)

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "academic",
    dueDate: "",
    tags: "",
  })

  const handleCreateTask = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      completed: false,
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }
    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "academic",
      dueDate: "",
      tags: "",
    })
    setIsCreateDialogOpen(false)
  }

    // eslint-disable-next-line
const handleToggleComplete = (taskId: any) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, status: task.completed ? "pending" : "completed" }
          : task,
      ),
    )
  }

    // eslint-disable-next-line
const handleDeleteTask = (taskId: any) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.completed).length,
    overdue: tasks.filter((t) => new Date(t.dueDate) < new Date() && !t.completed).length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Manage your personal administrative tasks</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your personal task list</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  placeholder="urgent, meeting, review"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
              </div>
              <Circle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{taskStats.pending}</p>
              </div>
              <Circle className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{taskStats.overdue}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task: typeof mockTasks[number]) => {
          const StatusIcon = statusConfig[task.status as keyof typeof statusConfig].icon
          const isOverdue = new Date(task.dueDate) < new Date() && !task.completed
          type StatusKey = keyof typeof statusConfig;
          const actualStatus: StatusKey = isOverdue ? "overdue" : (task.status as StatusKey);

          return (
            <Card key={task.id} className={cn("hover:shadow-md transition-shadow", task.completed && "opacity-75")}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleComplete(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={cn("text-lg font-semibold", task.completed && "line-through text-gray-500")}>
                        <Badge className={priorityConfig[task.priority as TaskPriority].color}>
                          <Flag className="w-3 h-3 mr-1" />
                          {priorityConfig[task.priority as TaskPriority].label}
                        <Badge variant="outline" className={categoryConfig[task.category as TaskCategory].color}>
                          {categoryConfig[task.category as TaskCategory].label}
                        </Badge>
                          {categoryConfig[task.category as TaskCategory].label}
                        </Badge>
                        </h3>
                      </div>
                      <p className={cn("text-gray-600 mb-3", task.completed && "line-through")}>{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <StatusIcon
                            className={cn("w-4 h-4", statusConfig[actualStatus].color.replace("bg-", "text-"))}
                          />
                          <span>{statusConfig[actualStatus].label}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span className={cn(isOverdue && !task.completed && "text-red-600 font-medium")}>
                            Due: {task.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Created: {task.createdDate}</span>
                        </div>
                      </div>
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Circle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                ? "Try adjusting your filters or search query"
                : "Create your first task to get started"}
            </p>
            {!searchQuery && filterStatus === "all" && filterPriority === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
