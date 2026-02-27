"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import LoadingScreen from "@/components/loading-screen"
import FeatureCard from "@/components/feature-card"
import StepCard from "@/components/step-card"
import { ModeToggle } from "@/components/mode-toggle"

export default function LandingPage() {

  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [clouds, setClouds] = useState<
    Array<{ id: number; x: number; y: number; speed: number; opacity: number; direction: number }>
  >([])
  const cloudsRef = useRef<HTMLDivElement>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    setIsLoaded(true)

    const initialClouds = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: i * 20 + Math.random() * 10, // Spread clouds evenly across screen
      y: i * 12 + Math.random() * 8, // Vertical spacing
      speed: (Math.random() * 0.04 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
      opacity: Math.random() * 0.3 + 0.5,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))
    setClouds(initialClouds)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const animateClouds = () => {
      setClouds((prevClouds) =>
        prevClouds.map((cloud) => {
          const newX = cloud.x + cloud.speed
          if (cloud.direction > 0 && newX > 120) {
            return {
              ...cloud,
              x: -20,
              y: Math.random() * 60 + 5,
              speed: Math.random() * 0.04 + 0.02,
            }
          } else if (cloud.direction < 0 && newX < -20) {
            return {
              ...cloud,
              x: 120,
              y: Math.random() * 60 + 5,
              speed: -(Math.random() * 0.04 + 0.02),
            }
          }
          return { ...cloud, x: newX }
        }),
      )
    }

    const interval = setInterval(animateClouds, 50)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100

    setClouds((prevClouds) =>
      prevClouds.map((cloud) => {
        const distX = mouseX - cloud.x
        const distY = mouseY - cloud.y
        const distance = Math.sqrt(distX * distX + distY * distY)

        if (distance < 25) {
          // Larger interaction radius
          return {
            ...cloud,
            x: cloud.x - distX * 1.2, // Stronger push effect
            y: cloud.y - distY * 1.2,
            opacity: Math.max(0, cloud.opacity - 0.8), // Faster fade out
          }
        }
        return { ...cloud, opacity: Math.min(0.8, cloud.opacity + 0.05) } // Faster fade in
      }),
    )
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo Section - Left */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
            </div>
            <span className="font-semibold text-base">Campus Eats</span>
          </div>

          <nav className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("why-we-exist")}
              className="rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md px-6 py-5 text-base"
            >
              About Us
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md px-6 py-5 text-base"
            >
              <a href="/home">Order Now</a>
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("faq")}
              className="rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md px-6 py-5 text-base"
            >
              FAQ
            </Button>
          </nav>

          <Button
            asChild
            className="rounded-full bg-orange-500 text-white border-0 hover:bg-orange-600 hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md px-8 py-5 text-base font-semibold"
          >
            <a href="/home">Get Started</a>
          </Button>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div
          ref={cloudsRef}
          className="absolute inset-0 z-[1] pointer-events-auto overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {clouds.map((cloud) => (
            <svg
              key={cloud.id}
              className="absolute transition-all duration-700 ease-out"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: "500px",
                height: "200px",
                opacity: cloud.opacity,
                transform: `scale(${cloud.opacity})`, // Scale with opacity for better effect
              }}
              viewBox="0 0 300 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id={`blur-${cloud.id}`}>
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
              </defs>
              <ellipse
                cx="60"
                cy="60"
                rx="50"
                ry="35"
                fill="rgba(255, 255, 255, 0.9)"
                filter={`url(#blur-${cloud.id})`}
              />
              <ellipse
                cx="100"
                cy="50"
                rx="60"
                ry="40"
                fill="rgba(255, 255, 255, 0.95)"
                filter={`url(#blur-${cloud.id})`}
              />
              <ellipse
                cx="150"
                cy="55"
                rx="55"
                ry="38"
                fill="rgba(255, 255, 255, 0.9)"
                filter={`url(#blur-${cloud.id})`}
              />
              <ellipse
                cx="190"
                cy="60"
                rx="50"
                ry="35"
                fill="rgba(255, 255, 255, 0.85)"
                filter={`url(#blur-${cloud.id})`}
              />
              <ellipse
                cx="120"
                cy="70"
                rx="80"
                ry="30"
                fill="rgba(255, 255, 255, 0.95)"
                filter={`url(#blur-${cloud.id})`}
              />
            </svg>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 pointer-events-none">
          <div className="flex flex-col items-center">
            <span
              className={`font-['Brush_Script_MT',cursive] text-orange-500 text-5xl md:text-7xl mb-4 self-start ml-8 ${isLoaded ? "animate-pop-up" : "opacity-0"}`}
            >
              From
            </span>
            <h1 className="text-6xl md:text-8xl font-bold flex items-center gap-4 flex-wrap justify-center">
              <span className={`text-white ${isLoaded ? "animate-pop-up-delay-1" : "opacity-0"}`}>Cafeteria</span>
              <span
                className={`font-['Pacifico',cursive] text-orange-500 text-7xl md:text-9xl mr-16 ${isLoaded ? "animate-pop-up-delay-2" : "opacity-0"}`}
                style={{
                  textShadow: "3px 3px 6px rgba(255, 140, 0, 0.4)",
                  fontStyle: "italic",
                  transform: "rotate(-5deg)",
                }}
              >
                To
              </span>
              <div className={`relative inline-flex items-center ${isLoaded ? "animate-pop-up-delay-3" : "opacity-0"}`}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-150">
                  <Image src="/crib-design.png" alt="" width={250} height={250} className="object-contain" />
                </div>
                <span className="text-white relative z-10">Crib</span>
              </div>
            </h1>
          </div>
        </div>

        <div
          className="absolute bottom-10 right-6 md:bottom-20 md:right-12 text-white p-6 max-w-xs backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-2xl border border-white/20"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(30, 30, 30, 0.6) 100%)",
            borderRadius: "40px 10px 40px 10px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 20px rgba(255, 255, 255, 0.05)",
          }}
        >
          <p className="text-sm leading-relaxed mb-3">
            Order from DP, Manna Palace, Foodmart, Mimi's, National Kitchen and more
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-3" />
          <p className="text-xs text-gray-300">All delivered straight to your door</p>
        </div>
      </section >

      <div className="relative h-32 overflow-hidden fog-divider-container group cursor-pointer">
        <div className="absolute inset-0 fog-layer fog-layer-1" />
        <div className="absolute inset-0 fog-layer fog-layer-2" />
        <div className="absolute inset-0 fog-layer fog-layer-3" />
      </div>

      {/* Grid Pattern Background Container */}
      <div className="relative">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/50 dark:from-black dark:via-transparent dark:to-black/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#ffedd5,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_200px,#1a1a1a,transparent)] opacity-40"></div>
        </div>

        {/* Content sections with relative positioning */}
        <div className="relative z-10">
          <section id="why-we-exist" className="py-20 px-6 bg-transparent">
            {/* ... Content of Why We Exist section ... */}
            <div className="container mx-auto max-w-5xl">
              <div
                className="relative rounded-3xl p-12 md:p-16 shadow-2xl transition-all duration-1800 hover:shadow-3xl overflow-hidden group cursor-pointer"
                style={{
                  backgroundImage: "url(/why-we-exist-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `translateY(${Math.max(0, (scrollY - 600) * -0.08)}px)`,
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-1800" />

                {/* Whip pan animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1800 whip-pan-animation" />

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      <div className="relative w-10 h-10">
                        <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
                      </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-center group-hover:scale-105 transition-transform duration-300">
                      Why <span className="text-orange-500">We</span> Exist
                    </h2>
                  </div>

                  <div className="text-center text-white space-y-4">
                    <p className="text-lg md:text-xl leading-relaxed">
                      We know campus life is hectic, finding time to eat{" "}
                      <span className="text-pink-400 font-semibold">shouldn't be a struggle</span>.
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed">
                      Campus Eats saves you time and energy by delivering your favorite meals
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed">
                      straight <span className="text-green-400 font-semibold">from</span> your cafeteria{" "}
                      <span className="text-green-400 font-semibold">to</span> your location
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-transparent">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-8">
                <FeatureCard
                  icon="⚡"
                  title="Fast & Efficient"
                  description="Get your food delivered hot and on time. No long waits, No stress"
                />
                <FeatureCard
                  icon="🍴"
                  title="Wide Selection"
                  description="From DP, Manna Palace, Foodmart, Mimi's, National Kitchen, Foodmart, and Mimi's all your go-to spots are in one place."
                />
                <FeatureCard
                  icon="📱"
                  title="Seamless Experience"
                  description="Simple navigation, quick checkout, and mobile-friendly ordering. Reorder your faves with one click."
                />
                <FeatureCard
                  icon="🔒"
                  title="Secure & Reliable"
                  description="Register, log in, and pay with confidence. We've built Campus Eats with your privacy and convenience in mind."
                />
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-20 px-6 bg-transparent">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-5xl md:text-6xl font-bold mb-16 dark:text-white">
                How <span className="text-orange-500">it</span> Works
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <StepCard
                  title="Browse"
                  description="Explore menus from your favorite campus restaurants."
                  bgColor="bg-black"
                  textColor="text-green-400"
                />
                <StepCard
                  title="Order"
                  description="Choose your meal, customize and checkout in seconds."
                  bgColor="bg-gray-600"
                  textColor="text-green-400"
                />
                <StepCard
                  title="Enjoy"
                  description="Get it delivered straight to your hostel, class or hangout spot."
                  bgColor="bg-[#5C1F1F]"
                  textColor="text-yellow-400"
                />
              </div>

              <div className="flex justify-end">
                <a
                  href="/home"
                  className="inline-block bg-white border-2 border-orange-500 text-orange-500 px-12 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl text-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          </section>

          {/* Mobile App Section */}
          <section className="py-20 px-6 bg-transparent">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
                {/* Laptop Mockup */}
                <div className="w-full md:w-2/3 flex justify-center">
                  <Image
                    src="/laptop-mockup.png"
                    alt="Campus Eats on Laptop"
                    width={720}
                    height={540}
                    className="object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </div>
                {/* Mobile Mockup */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src="/mobile-mockup.png"
                    alt="Campus Eats Mobile App"
                    width={250}
                    height={500}
                    className="object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </div>
              </div>

              {/* Download Button with Dropdown */}
              <div className="flex justify-center">
                <div className="relative">
                  <button
                    onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-lg"
                  >
                    Download Our Mobile App
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${showDownloadDropdown ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showDownloadDropdown && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                      <a
                        href="#"
                        className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700"
                      >
                        <svg className="w-8 h-8 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Download for iOS</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <svg className="w-8 h-8 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Download for Android</div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* New Join Network Section */}
          <section className="py-20 px-6 bg-transparent">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Vendor Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] border-2 border-orange-100 dark:border-gray-700 p-8 flex flex-col items-center text-center transition-all hover:scale-105 duration-300 shadow-xl hover:shadow-orange-500/20 hover:border-orange-500 overflow-hidden group">
                  <div className="relative w-64 h-64 mb-6">
                    <Image
                      src="/chef-illustration.png"
                      alt="Chef cooking"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 font-['Geist'] text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">Start selling</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                    Do you own a restaurant or store? Join our network to reach more customers across campus easily.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 rounded-full text-lg shadow-md transition-all hover:shadow-lg group border-0"
                  >
                    <a href="/vendor-signup" className="flex items-center justify-center gap-2">
                      Create vendor account
                      <div className="bg-white/20 rounded-full p-1 transition-transform group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  </Button>
                </div>

                {/* Rider Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] border-2 border-orange-100 dark:border-gray-700 p-8 flex flex-col items-center text-center transition-all hover:scale-105 duration-300 shadow-xl hover:shadow-green-500/20 hover:border-green-500 overflow-hidden group">
                  <div className="relative w-64 h-64 mb-6">
                    <Image
                      src="/rider-illustration.png"
                      alt="Delivery rider"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 font-['Geist'] text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">Deliver & earn</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                    Join our team of elite delivery riders, delivering smiles to customers while earning a steady income to fuel your dreams.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-full text-lg shadow-md transition-all hover:shadow-lg group border-0"
                  >
                    <a href="/rider-signup" className="flex items-center justify-center gap-2">
                      Create rider account
                      <div className="bg-white/20 rounded-full p-1 transition-transform group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <ModeToggle />
          </section>

          <section id="faq" ref={faqRef} className="py-20 bg-transparent">
            <div className="container mx-auto px-6 mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-center dark:text-white">
                Frequently Asked <span className="text-orange-500">Questions</span>
              </h2>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
              <div className="space-y-4">
                {[
                  {
                    question: "How does it work?",
                    answer:
                      "Simply browse menus from your favorite campus restaurants, place your order through our platform, and we'll deliver it straight to your location - whether that's your dorm room, classroom, or favorite hangout spot on campus.",
                  },
                  {
                    question: "What restaurants are available?",
                    answer:
                      "We partner with popular campus eateries including DP, Manna Palace, Foodmart, Mimi's, National Kitchen, and more. We're constantly adding new restaurants to give you more choices.",
                  },
                  {
                    question: "How much does delivery cost?",
                    answer:
                      "Delivery fees vary based on your location and the restaurant you're ordering from. You'll see the exact delivery fee before you complete your order, so there are no surprises.",
                  },
                  {
                    question: "How long does delivery take?",
                    answer:
                      "Most deliveries arrive within 20-30 minutes, depending on the restaurant's preparation time and your location on campus. You can track your order in real-time through the app.",
                  },
                  {
                    question: "Is there a minimum order amount?",
                    answer:
                      "Minimum order amounts may vary by restaurant. You'll see any minimum requirements when browsing the menu. Some restaurants may not have a minimum order requirement.",
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept all major mobile payment options. All transactions are secure and encrypted for your safety.",
                  },
                ].map((faq, index) => {
                  const isActive = activeFaq === index
                  return (
                    <div
                      key={index}
                      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${isActive ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <button
                        onClick={() => setActiveFaq(isActive ? null : index)}
                        className={`w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}
                      >
                        <span className={`text-lg md:text-xl font-semibold pr-4 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                          {faq.question}
                        </span>
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-green-500 rotate-180" : "bg-orange-500"
                            }`}
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>



          <footer className="py-12 px-6">
            <div className="relative w-full bg-[#1a1a1a]/80 backdrop-blur-xl text-white py-12 px-8 transition-all duration-500 hover:shadow-2xl hover:bg-[#1a1a1a]/90 overflow-hidden group">
              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none noise-texture" />

              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  {/* Logo and Tagline */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
                      </div>
                      <div className="font-bold text-xl">CampusEats</div>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="font-['Brush_Script_MT',cursive] text-orange-500">From</span>
                      <span>Cafeteria</span>
                      <span className="font-['Pacifico',cursive] text-orange-500" style={{ fontStyle: "italic" }}>
                        To
                      </span>
                      <div className="relative inline-flex items-center">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-125">
                          <Image
                            src="/crib-design.png"
                            alt=""
                            width={80}
                            height={80}
                            className="object-contain opacity-50"
                          />
                        </div>
                        <span className="relative z-10">Crib</span>
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">COMPANY</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">About us</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Team</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Careers</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Blog</a></li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">CONTACT</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Help & Support</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Partner with us</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Ride with us</a></li>
                    </ul>
                  </div>

                  {/* Legal */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">LEGAL</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Terms & Conditions</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Refund & Cancellation</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Cookie Policy</a></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-400">
                    All Rights Reserved © {new Date().getFullYear()} CampusEats
                  </div>

                  {/* Follow Us / Social Icons */}
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-sm font-semibold text-gray-300">FOLLOW US</span>
                    <div className="flex gap-6">
                      <a
                        href="https://www.instagram.com/the_campuseats?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:scale-110 transform"
                        aria-label="Instagram"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:scale-110 transform"
                        aria-label="X (Twitter)"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href="https://snapchat.com/t/cNgjnHRD"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:scale-110 transform"
                        aria-label="Snapchat"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.206.793c.99 0 1.99.084 2.946.251.958.166 1.857.443 2.668.827 1.622.768 2.926 1.956 3.873 3.523.947 1.567 1.424 3.399 1.424 5.437 0 1.506-.259 2.881-.772 4.088-.513 1.206-1.22 2.244-2.1 3.082-.88.838-1.917 1.476-3.082 1.894-1.165.418-2.413.628-3.707.628-.605 0-1.21-.042-1.8-.126a7.94 7.94 0 0 1-1.665-.377c-.52-.168-1.006-.377-1.447-.628-.44-.251-.826-.543-1.144-.88-.318-.335-.547-.71-.693-1.123a3.03 3.03 0 0 1-.21-1.144c0-.502.126-.964.377-1.383.252-.418.586-.785.997-1.081.418-.293.88-.543 1.383-.754.502-.21 1.04-.377 1.603-.502-.063-.126-.126-.251-.168-.377-.042-.126-.063-.251-.063-.377 0-.314.063-.586.189-.817.126-.23.293-.418.502-.565.21-.146.461-.251.754-.314.293-.063.606-.126.922-.168-.126-.377-.23-.754-.293-1.123-.063-.377-.084-.754-.084-1.123 0-.648.105-1.27.314-1.853.21-.586.502-1.102.88-1.54.377-.44.838-.796 1.362-1.06.524-.272 1.123-.419 1.77-.419zm0 1.665c-.293 0-.565.063-.817.189-.251.126-.46.293-.628.502-.168.21-.293.46-.377.754-.084.293-.126.606-.126.922 0 .251.021.502.063.754.042.251.105.502.189.754.084.251.189.502.314.754.126.251.272.481.44.691.125-.21.23-.44.314-.691.084-.252.147-.502.189-.754.042-.252.063-.502.063-.754 0-.314-.042-.628-.126-.922-.084-.293-.21-.543-.377-.754-.168-.21-.377-.377-.628-.502-.252-.126-.524-.189-.817-.189zm-.126 6.387c-.293.063-.565.147-.817.251-.251.105-.481.23-.691.377-.21.147-.377.314-.502.502-.126.189-.189.398-.189.628 0 .126.021.251.063.377.042.126.084.23.147.335l.42-.126c.168-.042.335-.063.502-.063.314 0 .606.063.88.189.272.126.502.293.691.502.189.21.335.461.44.754.104.293.147.606.147.922 0 .419-.084.817-.251 1.186-.168.377-.398.691-.691.964-.293.272-.628.481-1.002.628-.377.147-.775.21-1.186.21-.251 0-.502-.021-.754-.063-.251-.042-.502-.105-.754-.189-.251-.084-.481-.189-.691-.314-.21-.126-.377-.272-.502-.44l-.063.126c-.084.168-.147.335-.189.502-.042.168-.063.335-.063.502 0 .377.105.691.314.964.21.272.481.502.817.691.335.189.712.335 1.123.44.419.104.838.147 1.27.147 1.04 0 1.998-.168 2.863-.502.88-.335 1.625-.796 2.244-1.383.628-.586 1.102-1.27 1.447-2.058.335-.785.502-1.623.502-2.5 0-1.665-.377-3.082-1.123-4.256-.754-1.165-1.728-2.037-2.926-2.605-1.186-.565-2.5-.838-3.915-.838z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div >
  )
}
