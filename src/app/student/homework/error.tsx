"use client"

import { useEffect } from "react"
import { FileX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center py-12">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-xl font-medium">Something went wrong!</h2>
      <p className="mt-2 text-center text-muted-foreground max-w-md">
        We encountered an error while loading your assignments. Please try again or contact support if the problem
        persists.
      </p>
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go to Dashboard
        </Button>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  )
}
