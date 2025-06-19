"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileText, Paperclip, Plus, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface FileWithPreview extends File {
  id: string
  preview?: string
  progress?: number
}

interface AssignmentSubmissionFormProps {
  onSubmit: (data: { files: File[]; comments: string }) => void
}

export function AssignmentSubmissionForm({ onSubmit }: AssignmentSubmissionFormProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [comments, setComments] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: FileWithPreview[] = Array.from(selectedFiles).map((file) => ({
      ...file,
      id: crypto.randomUUID(),
      progress: 0,
    }))

    // Simulate upload progress
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
        }

        setFiles((prevFiles) => prevFiles.map((f) => (f.id === file.id ? { ...f, progress } : f)))
      }, 300)
    })
  }

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  // Remove file
  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast.error("Please upload at least one file to submit.")
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      onSubmit({
        files: files as unknown as File[],
        comments,
      })
      setIsSubmitting(false)
    }, 1500)
  }

  // Handle save as draft
  const handleSaveAsDraft = () => {
    toast( "Your assignment has been saved as a draft.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Upload Files</h3>
        <div
          className={`mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Paperclip className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-center text-sm font-medium">
            Drag and drop your files here, or{" "}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-primary"
              onClick={() => fileInputRef.current?.click()}
            >
              browse
            </Button>
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            Supported formats: PDF, DOCX, PPTX, XLSX, JPG, PNG
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            accept=".pdf,.docx,.pptx,.xlsx,.jpg,.jpeg,.png"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Selected Files</h3>
            <Button type="button" variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setFiles([])}>
              Remove All
            </Button>
          </div>
          <div className="space-y-2">
            {files.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                  {typeof file.progress === "number" && file.progress < 100 && (
                    <div className="mt-2">
                      <Progress value={file.progress} className="h-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full gap-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="h-3 w-3" />
            Add More Files
          </Button>
        </div>
      )}

      <div>
        <Label htmlFor="comments">Comments (Optional)</Label>
        <Textarea
          id="comments"
          placeholder="Add any comments or notes about your submission..."
          className="mt-1 resize-none"
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={handleSaveAsDraft}>
          Save as Draft
        </Button>
        <Button type="submit" className="gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Submit Assignment
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
