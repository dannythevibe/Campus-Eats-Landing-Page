"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function PwaLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: "", password: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login
    router.push("/pwa/home")
  }

  return (
    <div className="min-h-screen bg-white px-8 pt-20 pb-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Welcome back</h1>
        <p className="text-gray-500 text-base">
          Sign in to continue your food journey
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors z-10">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-lime-500 text-gray-900 placeholder-gray-400 rounded-2xl pl-14 pr-4 py-4 outline-none transition-all font-medium text-base shadow-sm"
            />
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors z-10">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-lime-500 text-gray-900 placeholder-gray-400 rounded-2xl pl-14 pr-14 py-4 outline-none transition-all font-medium text-base shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/pwa/forgot-password" className="text-lime-600 text-sm font-semibold hover:text-lime-700">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 text-white rounded-2xl py-4 font-bold text-lg shadow-lg shadow-lime-500/25 active:scale-[0.98] transition-all hover:bg-lime-600 mt-4"
        >
          Login
        </button>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button type="button" className="p-4 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button type="button" className="p-4 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475647/apple-color.svg" alt="Apple" className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link href="/pwa/signup" className="text-lime-600 font-bold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  )
}
