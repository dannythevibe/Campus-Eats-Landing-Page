"use client"

import Link from "next/link"
import { ChevronLeft, Mail } from "lucide-react"

export default function PwaForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white px-8 pt-12 pb-8 flex flex-col">
      <div className="flex items-center gap-4 mb-16">
        <Link href="/pwa/login" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors text-gray-900">
          <ChevronLeft className="w-8 h-8" />
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Forgot Password</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
          Enter your email address and we will send you a code to reset your password.
        </p>
      </div>

      <form className="space-y-8">
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-lime-500 text-gray-900 placeholder-gray-400 rounded-2xl pl-14 pr-4 py-4 outline-none transition-all font-medium text-base"
          />
        </div>

        <Link
          href="/pwa/verification"
          className="block w-full bg-lime-500 text-white rounded-2xl py-4 font-bold text-lg text-center shadow-lg shadow-lime-500/25 active:scale-[0.98] transition-all hover:bg-lime-600"
        >
          Send Code
        </Link>
      </form>
    </div>
  )
}
