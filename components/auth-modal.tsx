"use client"

import { useState } from "react"
import { X, Mail, Lock, User, ArrowRight, Loader2, Github } from "lucide-react"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (userData: { name: string; email: string }) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call to Supabase Auth
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            // For now, we simulate a successful auth user object
            // In production, this would come from: const { data, error } = await supabase.auth.signUp(...)
            const mockUser = {
                name: isLogin ? "Danny Student" : formData.name,
                email: formData.email
            }

            onLogin(mockUser)
            onClose()
        } catch (error) {
            alert("Authentication failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Decorative Header Background */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-orange-400 to-red-500 opacity-10 dark:opacity-20" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-gray-100/50 dark:bg-black/20 backdrop-blur-sm rounded-full hover:bg-gray-100 dark:hover:bg-black/40 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>

                <div className="relative p-8 pt-12">
                    {/* Header Texts */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {isLogin ? "Welcome Back!" : "Join Campus Eats"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {isLogin
                                ? "Hungry? Log in to access your favorites."
                                : "Create an account to start ordering."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl text-gray-900 dark:text-white border-2 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="student@university.edu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl text-gray-900 dark:text-white border-2 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    minLength={6}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl text-gray-900 dark:text-white border-2 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {isLogin ? "Logging in..." : "Creating Account..."}
                                </>
                            ) : (
                                <>
                                    {isLogin ? "Log In" : "Create Account"}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8 text-center">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 dark:bg-zinc-700"></div>
                        <span className="relative bg-white dark:bg-zinc-900 px-4 text-xs font-medium text-gray-400 uppercase">Or continue with</span>
                    </div>

                    {/* Social Auth */}
                    <div className="flex gap-4">
                        <button className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-red-500"></div>
                            <span className="font-medium text-sm dark:text-white">Google</span>
                        </button>
                    </div>

                    {/* Toggle Login/Signup */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-bold text-orange-500 hover:underline"
                        >
                            {isLogin ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
