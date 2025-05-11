import Image from "next/image"
import { ArrowRight, BookOpen, Users, GraduationCap, UserCog, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
     
      {/* Hero Section */}
      <section className="flex-1">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 py-12 md:py-20 items-center">
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-green-500">BETTER</span> <br />
                <span className="text-amber-500">FUTURE</span> <span className="text-purple-500">FOR</span> <br />
                <span className="text-blue-500">YOUR KIDS</span>
              </h1>
              <p className="mt-6 text-gray-600 max-w-md">
                Our comprehensive school management system empowers students, teachers, and parents with tools designed
                to enhance learning, communication, and administration.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-amber-500 hover:bg-amber-600">JOIN US TODAY</Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-100">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  Watch our demo video
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <Image
                  src="/placeholder.svg?height=40&width=80"
                  alt="IELTS"
                  width={80}
                  height={40}
                  className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
                <Image
                  src="/placeholder.svg?height=40&width=80"
                  alt="TOEFL"
                  width={80}
                  height={40}
                  className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-3xl -rotate-3 transform"></div>
              <div className="relative bg-blue-200 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: `${Math.random() * 40 + 20}px`,
                        height: `${Math.random() * 40 + 20}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.3,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="p-8 md:p-12 relative z-10">
                  <Image
                    src="/images/hero_sec_image/hero.png"
                    alt="Student"
                    width={400}
                    height={500}
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Management System</h2>
            <p className="text-gray-600">
              Our platform offers tailored experiences for students, teachers, parents, and administrators, creating a
              seamless educational ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Student Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Homework submission portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Interactive quizzes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Performance leaderboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Personalized profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Smart notifications</span>
                </li>
              </ul>
            </div>

            {/* Teacher Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Teachers</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Syllabus management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Class management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Parent communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Request management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Achievements tracking</span>
                </li>
              </ul>
            </div>

            {/* Parent Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Parents</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Assignment tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Teacher communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Child&apos;s profile access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Important notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Fee payment tracking</span>
                </li>
              </ul>
            </div>

            {/* Admin Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <UserCog className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Administrators</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Teacher management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Announcement system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Student records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Fee collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>AI-powered assistant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Feature */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block bg-amber-500/20 text-amber-500 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  EXCLUSIVE FEATURE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">AI-Powered Management Assistant</h2>
                <p className="text-gray-300 mb-8">
                  Our advanced AI agent allows administrators and teachers to control everything through a simple chat
                  interface. Manage classes, check student progress, and handle administrative tasks with natural
                  language commands.
                </p>
                <div>
                  <Button className="bg-amber-500 hover:bg-amber-600">Learn More</Button>
                </div>
              </div>
              <div className="relative h-full min-h-[300px] md:min-h-0">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="w-3/4 h-3/4 bg-gray-700 rounded-lg p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-gray-900 rounded p-4 text-gray-300 font-mono text-sm overflow-hidden">
                      <div className="mb-2">
                        <span className="text-green-400">Admin:</span> Show me attendance for Class 10A
                      </div>
                      <div className="mb-2">
                        <span className="text-blue-400">AI:</span> Fetching attendance for Class 10A...
                      </div>
                      <div className="mb-2">
                        <span className="text-blue-400">AI:</span> Attendance rate: 92% today. 3 students absent: John,
                        Emma, Michael.
                      </div>
                      <div className="mb-2">
                        <span className="text-green-400">Admin:</span> Send reminder to their parents
                      </div>
                      <div>
                        <span className="text-blue-400">AI:</span> Reminders sent successfully to all 3 parents.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your school management?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of schools already using our platform to streamline education management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-amber-500 hover:bg-amber-600 px-8">Get Started</Button>
              <Button variant="outline">Request Demo</Button>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
