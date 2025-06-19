"use client"
import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'

function Footer() {

    const path = usePathname()


    if (!/^\/(student|teacher|parents|admin)(\/.*)?$/.test(path) ) {

        return (
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 bg-amber-500 flex items-center justify-center">
                                    <span className="font-bold text-white text-sm">TS</span>
                                </div>
                                <span className="font-bold text-white">THE SCHOOL</span>
                            </div>
                            <p className="text-sm text-gray-400">Empowering education through innovative management solutions.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Features</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        For Students
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        For Teachers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        For Parents
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        For Administrators
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-amber-500 transition-colors">
                                        AI Assistant
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Contact Us</h4>
                            <ul className="space-y-2 text-sm">
                                <li>123 Education Street</li>
                                <li>Learning City, LC 12345</li>
                                <li>info@theschool.com</li>
                                <li>(123) 456-7890</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400 text-center">
                        <p>© {new Date().getFullYear()} The School Management System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        )

    }

    else {
        return <>
        
        </>
    }
}

export default Footer