"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useState, useRef } from "react"

export default function PwaVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== "" && index < 3) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-white px-8 pt-12 pb-8 flex flex-col">
      <div className="flex items-center gap-4 mb-16">
        <Link href="/pwa/forgot-password" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors text-gray-900">
          <ChevronLeft className="w-8 h-8" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Verification</h1>
      </div>

      <p className="text-gray-500 text-sm mb-12 max-w-[280px]">
        We've sent a 4-digit verification code to your email. Please enter the code below.
      </p>

      <div className="flex gap-4 mb-12 justify-center">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={el => inputs.current[idx] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="w-16 h-16 bg-gray-50 border-2 border-transparent focus:border-lime-500 focus:bg-white rounded-2xl text-center text-3xl font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-500/10 transition-all shadow-sm"
          />
        ))}
      </div>

      <div className="text-center mb-auto">
        <p className="text-gray-500 text-sm">
          Didn't receive code?{" "}
          <button className="text-lime-600 font-bold hover:underline ml-1">Resend</button>
        </p>
      </div>

      <Link
        href="/pwa/login"
        className="w-full bg-lime-500 text-white rounded-2xl py-4 font-bold text-lg text-center shadow-lg shadow-lime-500/25 active:scale-[0.98] transition-all hover:bg-lime-600"
      >
        Verify Account
      </Link>
    </div>
  )
}
