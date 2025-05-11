"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { SignInSchema } from "@/schema/signInFormSchema"
import { toast } from "sonner"
import { type SignIn } from "@/types/formTypes"

export default function SignIn() {

  const [FormData, setFormData] = useState<SignIn>({
    Email: "",
    Password: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {

      const validatedResponse = await SignInSchema.safeParseAsync(FormData)

      if (!validatedResponse.success) {
        const errorMessage = validatedResponse.error.errors[0]?.message || "Validation failed"
        console.log(errorMessage)
        toast.error(errorMessage)
        return
      }

      toast.success("Data validated successfully")

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedResponse.data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        try {
          toast.error(responseData.error)
        } catch {
          toast.error(responseData.error || "Login failed")
        }
        return
      }

      toast.success("Login successful")


    }
    catch (error: any) {
      toast.error(error.message)
    }

  }

  return (

    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 bg-amber-500 flex items-center justify-center">
              <span className="font-bold text-white text-sm">TS</span>
            </div>
            <span className="font-bold">THE SCHOOL</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-6">Welcome back</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input type="email" placeholder="Email address" className="pl-10 bg-gray-50 border-gray-200"
                    value={FormData.Email}
                    onChange={(e) => setFormData({ ...FormData, Email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input type="password" placeholder="Password" className="pl-10 bg-gray-50 border-gray-200"
                    value={FormData.Password}
                    onChange={(e) => setFormData({ ...FormData, Password: e.target.value })}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                    <EyeOff className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-amber-600 hover:text-amber-700">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">Sign in</Button>

              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div> */}

              {/* <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Image src="/placeholder.svg?height=20&width=20" alt="Google" width={20} height={20} className="mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Microsoft"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Microsoft
                </Button>
              </div> */}

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-amber-600 hover:text-amber-700 font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex relative bg-amber-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 z-0"></div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-amber-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-amber-400 rounded-full opacity-20"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="max-w-md">
            <div className="mb-8">
              <div className="inline-block bg-white p-3 rounded-xl shadow-sm">
                <div className="h-16 w-16 bg-amber-500 rounded-lg flex items-center justify-center">
                  <GraduationCapIcon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Access Your Educational Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Sign in to access your personalized dashboard and unlock all the features of our school management system.
            </p>

            <div className="space-y-4">
              <FeatureItem icon={<BookIcon />} title="Track Assignments" />
              <FeatureItem icon={<UsersIcon />} title="Communicate with Teachers" />
              <FeatureItem icon={<BellIcon />} title="Get Important Notifications" />
              <FeatureItem icon={<BarChartIcon />} title="Monitor Performance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function BookIcon() {
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
      className="h-5 w-5 text-amber-500"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function UsersIcon() {
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
      className="h-5 w-5 text-amber-500"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function BellIcon() {
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
      className="h-5 w-5 text-amber-500"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function BarChartIcon() {
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
      className="h-5 w-5 text-amber-500"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}

function FeatureItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
      <div className="flex-shrink-0">{icon}</div>
      <div className="font-medium">{title}</div>
    </div>
  )
}
