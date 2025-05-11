import { SignUp } from "@/types/formTypes";

export default function RoleCard({
    id,
    title,
    description,
    icon,
    setFormData,
    formData
  }: { id: string; title: string; description: string; icon: React.ReactNode, setFormData: (object: SignUp) => void, formData: SignUp }) {
    return (
      <div className="relative">
        <input type="radio" value={title} id={id} name="role" className="peer sr-only"
        onChange={(e)=> setFormData({...formData, role: e.target.value})}
        
        />
        <label
          htmlFor={id}
          className="flex flex-col h-full p-4 bg-white border rounded-lg cursor-pointer hover:border-amber-500 peer-checked:border-amber-500 peer-checked:bg-amber-50"
        >
          <div className="mb-2">{icon}</div>
          <div className="font-medium mb-1">{title}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </label>
        <div className="absolute hidden w-4 h-4 peer-checked:flex justify-center items-center bg-amber-500 rounded-full top-3 right-3">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
    )
  }