"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Eye, EyeOff, Store, ArrowRight } from "lucide-react"

export default function VendorLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Simulate login - Replace with Supabase auth
        setTimeout(() => {
            if (email && password) {
                router.push("/vendor/dashboard")
            } else {
                setError("Please enter your email and password")
                setIsLoading(false)
            }
        }, 1000)
    }

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
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/60 to-black/70" />
            </div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-md mx-4 overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10">
                <div className="p-8 md:p-10 flex flex-col items-center">

                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                            <Store className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-white text-2xl font-bold">Vendor Portal</h2>
                        <p className="text-gray-300 text-sm mt-2 text-center">
                            Login to manage your restaurant on Campus Eats
                        </p>
                    </div>

                    {error && (
                        <div className="w-full mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="w-full space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-200 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="vendor@restaurant.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-200 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-300">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-400 bg-transparent text-orange-500 focus:ring-orange-500" />
                                Remember me
                            </label>
                            <a href="#" className="hover:text-orange-400 transition-colors">Forgot Password?</a>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-orange-500/30 mt-6 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Login to Dashboard
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-transparent text-gray-400">or continue with</span>
                            </div>
                        </div>

                        <button type="button" className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                            <span className="text-sm font-medium">Sign in with Google</span>
                        </button>

                        <div className="text-center text-sm text-gray-300 mt-6">
                            Want to partner with us?{" "}
                            <a href="/vendor-signup" className="text-orange-400 font-bold hover:underline">
                                Register your restaurant
                            </a>
                        </div>

                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-0 right-0 z-20 px-6">
                <div className="max-w-7xl mx-auto flex justify-center items-center text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5">
                            <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
                        </div>
                        <span className="text-white font-semibold">Campus Eats</span>
                        <span className="mx-2">•</span>
                        <span>Vendor Portal</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
