"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + 1, 100)
      })
    }, 8) // 8ms * 99 increments ≈ 800ms

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete()
      }, 10)

      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 flex items-center justify-center overflow-hidden">
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative w-24 h-24">
          <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1">WELCOME TO CAMPUS EATS</h2>
          <p className="text-white/90 text-lg">enjoy your experience!</p>
        </div>

        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{progress}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
