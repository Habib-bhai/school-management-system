import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="container py-6 md:py-10">
      <header className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton className="h-9 w-full max-w-sm" />
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all" disabled>
            All
          </TabsTrigger>
          <TabsTrigger value="pending" disabled>
            Pending
          </TabsTrigger>
          <TabsTrigger value="submitted" disabled>
            Submitted
          </TabsTrigger>
          <TabsTrigger value="graded" disabled>
            Graded
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b p-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-2">
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                  <div className="border-t p-3">
                    <Skeleton className="h-8 w-full" />
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
