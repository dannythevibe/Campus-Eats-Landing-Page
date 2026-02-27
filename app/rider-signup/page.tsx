"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RiderSignupPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-md mx-4 overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10">
                {/* Card Content */}
                <div className="p-8 md:p-10 flex flex-col items-center">

                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-16 h-16 mb-2">
                            <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
                        </div>
                        <h2 className="text-white text-xl font-bold">Rider Portal Login</h2>
                        <p className="text-gray-200 text-xs mt-1">Welcome Back! Please enter your details</p>
                    </div>

                    <form className="w-full space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-200 ml-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-200 ml-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-200">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-400 bg-transparent text-green-500 focus:ring-green-500" />
                                Remember this Device
                            </label>
                            <a href="#" className="hover:text-green-400 transition-colors">Forgot Password</a>
                        </div>

                        <Button className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white font-bold py-6 rounded-xl text-lg shadow-lg border border-white/10 mt-4 transition-all hover:scale-[1.02]">
                            Log In
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </Button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-transparent text-white">or log in with</span>
                            </div>
                        </div>

                        <button type="button" className="w-full flex justify-center py-2.5 px-4 border border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M24 12.276c0-1.16-.104-2.276-.297-3.344H12v6.33h6.73c-.29 1.55-1.167 2.87-2.48 3.75v3.116h4.018c2.35-2.164 3.707-5.352 3.707-9.852z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 24c3.24 0 5.957-1.074 7.942-2.906l-4.018-3.116c-1.076.72-2.452 1.146-3.924 1.146-3.03 0-5.594-2.046-6.51-4.796H1.474v3.018C3.475 21.326 7.425 24 12 24z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.49 14.328c-.23-.69-.36-1.428-.36-2.18s.13-1.49.36-2.18V6.95H1.474C.535 8.783 0 10.84 0 13c0 2.16.535 4.218 1.474 6.05l4.016-3.02z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M12 4.773c1.76 0 3.344.605 4.588 1.794l3.44-3.44C17.952 1.16 15.236 0 12 0 7.425 0 3.475 2.674 1.474 5.95l4.016 3.02C6.406 6.22 8.97 4.773 12 4.773z"
                                />
                            </svg>
                        </button>

                        <div className="text-center text-xs text-white">
                            Don't have an account? <a href="#" className="text-green-400 font-bold hover:underline">Apply now</a>
                        </div>

                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-0 right-0 z-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                        <div className="flex items-center gap-1 mb-1">
                            {/* Small Footer Logo */}
                            <div className="relative w-6 h-6">
                                <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
                            </div>
                            <span className="text-white font-bold text-sm">CampusEats</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] tracking-wide text-orange-400">
                            <span className="font-['Brush_Script_MT',cursive]">From</span>
                            <span className="text-white font-bold">Cafeteria</span>
                            <span className="font-['Pacifico',cursive] italic">To</span>
                            <span className="text-white font-bold">Crib</span>
                        </div>
                    </div>
                    <div>All Rights Reserved</div>
                    <div className="flex items-center gap-4">
                        <span>Socials:</span>
                        <div className="flex gap-2 text-white">
                            {/* Placeholder Icons */}
                            <span>WH</span>
                            <span>X</span>
                            <span>IN</span>
                        </div>
                    </div>
                    <div className="mt-2 md:mt-0">Terms and Conditions</div>
                </div>
            </footer>
        </div>
    )
}
