"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PwaSplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/pwa/welcome")
    }, 2500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-40 h-40 mb-8"
      >
        <Image
          src="/logo.png"
          alt="Campus Eats"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-3"
      >
        <h1 className="text-3xl font-black tracking-widest text-gray-900 uppercase">
          <span className="text-orange-500">Campus</span> Eats
        </h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-medium">
          From Cafeteria to Your Crib
        </p>
      </motion.div>
    </div>
  )
}
