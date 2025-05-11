import { CheckCircle } from "lucide-react"

export default function BenefitItem({ title, description }: { title: string; description: string }) {
    return (
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-3 w-3" />
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    )
  }