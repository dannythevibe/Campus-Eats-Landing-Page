"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PwaWelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white px-8 py-8 relative overflow-hidden">

      <div className="absolute top-8 right-8 z-20">
        <Link href="/pwa/home" className="text-lime-600 text-sm font-semibold hover:opacity-80 transition-opacity">
          Continue as guest
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pt-10 z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">From Cafeteria</h1>
          <h2 className="text-5xl font-black text-orange-500 mb-4">To</h2>
          <div className="flex items-center justify-center gap-4">
            <span className="text-lime-400 text-4xl font-light">/</span>
            <h2 className="text-6xl font-black text-lime-500 tracking-tighter">Crib</h2>
            <span className="text-lime-400 text-4xl font-light">/</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-[320px] aspect-square mb-12"
        >
          <div className="absolute inset-0 bg-yellow-100 rounded-full scale-90 opacity-50 blur-2xl"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src="/rider-illustration.png"
              alt="Delivery"
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-6"
        >
          <Link
            href="/pwa/login"
            className="block w-full py-4 bg-lime-500 text-white rounded-2xl text-xl font-bold text-center shadow-lg shadow-lime-500/30 active:scale-95 transition-all hover:bg-lime-600"
          >
            Get started
          </Link>

          <p className="text-center text-sm text-gray-600 font-medium">
            Already have an account?{" "}
            <Link href="/pwa/login" className="text-lime-600 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
