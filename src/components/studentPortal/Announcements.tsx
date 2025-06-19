import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "End of Year Ceremony",
      content:
        "The end of year ceremony will be held on June 15th at 2:00 PM in the main auditorium. All students and parents are invited to attend.",
      author: {
        name: "Principal Johnson",
        avatar: "/placeholder-user.jpg",
        initials: "PJ",
      },
      date: "May 10, 2025",
    },
    {
      id: 2,
      title: "Summer School Registration",
      content:
        "Registration for summer school programs is now open. Please visit the student portal to sign up for courses before May 25th.",
      author: {
        name: "Academic Office",
        avatar: "/placeholder-user.jpg",
        initials: "AO",
      },
      date: "May 9, 2025",
    },
    {
      id: 3,
      title: "Library Hours Extended",
      content:
        "The library will have extended hours during finals week. It will be open from 7:00 AM to 9:00 PM from May 20th to May 27th.",
      author: {
        name: "Library Staff",
        avatar: "/placeholder-user.jpg",
        initials: "LS",
      },
      date: "May 8, 2025",
    },
  ]

  return (
    <div className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-1 px-1">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="min-w-[300px] flex-1 snap-center">
            <CardContent className="p-4">
              <h3 className="font-medium">{announcement.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{announcement.content}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={announcement.author.avatar || "/placeholder.svg"}
                      alt={announcement.author.name}
                    />
                    <AvatarFallback>{announcement.author.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{announcement.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{announcement.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 py-1">
        {announcements.map((_, index) => (
          <div key={index} className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    </div>
  )
}
