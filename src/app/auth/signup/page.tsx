"use client"

import type React from "react"
import Link from "next/link"
import { User, Mail, Lock, EyeOff, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import RoleCard from "@/helper_components/RoleCard"
import BenefitItem from "@/helper_components/BenefitItem"
import { useState } from "react"
import { type SignUp } from "@/types/formTypes"
import SignUpSchema  from "@/schema/signUpFormSchema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export default function SignUp() {
  const [formData, setFormData] = useState<SignUp>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    role: "",
  })

  const [IsTermChecked, setIsTermChecked] = useState(false)
  const router = useRouter()

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const signUpSchemaValidated = await SignUpSchema.safeParseAsync(formData);

    if (!signUpSchemaValidated.success) {
      const errorMessage = signUpSchemaValidated.error.errors[0]?.message || "Validation failed";
      toast.error(errorMessage);
      return; 
    }

    // If validation succeeds, proceed with API call or further logic
    toast.success("Data validated successfully");

    // Example: Send data to an API
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpSchemaValidated.data),
    });

    const data = await response.json();
    
    if (!response.ok){
      toast.error(data.error);
      return 
    }  
    
    if(response.ok){
      toast.success("Account created successfully");
      router.push("/auth/signin")

    }

  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error during validation:", error);
    toast.error("An unexpected error occurred. Please try again.");
  }
};

  return (
    <div className="min-h-screen grid md:grid-cols-5">
      {/* Left Side - Form */}
      <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 bg-amber-500 flex items-center justify-center">
              <span className="font-bold text-white text-sm">TS</span>
            </div>
            <span className="font-bold">THE SCHOOL</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-2">Create your account</h1>
          <p className="text-gray-500 mb-6">Join our school management system to get started</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                    <Input type="text" placeholder="First name" className="pl-10 bg-gray-50 border-gray-200"
                      value={formData.FirstName}
                      onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input type="text" placeholder="Last name" className="bg-gray-50 border-gray-200"
                      value={formData.LastName}
                      onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}

                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input type="email" placeholder="Email address" className="pl-10 bg-gray-50 border-gray-200"
                    value={formData.Email}
                    onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input type="password" placeholder="Create password" className="pl-10 bg-gray-50 border-gray-200"
                    value={formData.Password}
                    onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                    <EyeOff className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-gray-500">Password must be at least 8 characters long</div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">I am registering as a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <RoleCard
                    id="student"
                    title="Student"
                    description="Access homework, quizzes, and track your progress"
                    icon={<StudentIcon />}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <RoleCard
                    id="teacher"
                    title="Teacher"
                    description="Manage classes, syllabus, and student performance"
                    icon={<TeacherIcon />}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <RoleCard
                    id="parent"
                    title="Parent"
                    description="Monitor your child's progress and communicate with teachers"
                    icon={<ParentIcon />}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <RoleCard
                    id="admin"
                    title="Administrator"
                    description="Manage the entire school system and operations"
                    icon={<AdminIcon />}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms"
                  checked={IsTermChecked}
                  onCheckedChange={(checked) => setIsTermChecked(!!checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-amber-600 hover:text-amber-700 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button className="w-full bg-amber-500 hover:bg-amber-600"
                disabled={!IsTermChecked}
                type="submit"
              >Create account</Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-amber-600 hover:text-amber-700 font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <div className="h-full flex flex-col justify-between p-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Benefits of joining our platform</h2>

            <div className="space-y-6">
              <BenefitItem
                title="Streamlined Communication"
                description="Connect with teachers, students, and parents in one unified platform"
              />
              <BenefitItem
                title="Performance Tracking"
                description="Monitor academic progress with detailed analytics and insights"
              />
              <BenefitItem
                title="Resource Access"
                description="Get access to learning materials, assignments, and educational resources"
              />
              <BenefitItem
                title="Smart Notifications"
                description="Stay updated with important announcements and reminders"
              />
            </div>
          </div>

          <div className="mt-auto pt-12">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">Trusted by 500+ schools</div>
                <div className="text-white/70 text-sm">Join our growing educational community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components




function StudentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-amber-500"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function TeacherIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-amber-500"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function ParentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-amber-500"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function AdminIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-amber-500"
    >
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
      <path d="M16 8V5c0-1.1.9-2 2-2" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    </svg>
  )
}
