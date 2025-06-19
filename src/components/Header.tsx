"use client"
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'

function Header() {

    const path =  usePathname()
    if (!/^\/(student|teacher|parents|admin)(\/.*)?$/.test(path)) {
        return (
            <header className="z-50 border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-amber-500 flex items-center justify-center">
                                <span className="font-bold text-white">TS</span>
                            </div>
                            <span className="font-bold text-xl">THE SCHOOL</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="#" className="text-gray-700 hover:text-amber-500 transition-colors">
                                Programs
                            </Link>
                            <Link href="#" className="text-gray-700 hover:text-amber-500 transition-colors">
                                Extra-Curricular
                            </Link>
                            <Link href="#" className="text-gray-700 hover:text-amber-500 transition-colors">
                                Our Staff
                            </Link>
                            <Link href="#" className="text-gray-700 hover:text-amber-500 transition-colors">
                                Gallery
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
    else {
        return <></>
    } 

}

export default Header