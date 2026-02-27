"use client"

import { useState, useEffect } from "react"
import { X, Smartphone, Share, PlusSquare } from "lucide-react"

export function PwaModal() {
    const [showModal, setShowModal] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

    useEffect(() => {
        // Check if running in standalone mode (already installed)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone
        if (isStandalone) return

        // iOS Detection
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
        setIsIOS(isIosDevice)

        // Android/Desktop Install Prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
            // Show modal after a short delay to not annoy immediately
            setTimeout(() => setShowModal(true), 3000)
        }

        // Only show for iOS if not installed
        if (isIosDevice && !isStandalone) {
            setTimeout(() => setShowModal(true), 3000)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
            setShowModal(false)
        }
        setDeferredPrompt(null)
    }

    if (!showModal) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 pointer-events-none">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={() => setShowModal(false)} />

            <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative pointer-events-auto animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <X className="w-4 h-4 text-gray-500" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-4 text-orange-600 dark:text-orange-500">
                        <Smartphone className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Install Campus Eats
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Get the best experience! Install our app for faster ordering and real-time notifications.
                    </p>

                    {isIOS ? (
                        <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 text-sm text-left w-full space-y-3">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Share className="w-5 h-5 text-blue-500" />
                                <span>1. Tap the <strong>Share</strong> button</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <PlusSquare className="w-5 h-5 text-gray-500" />
                                <span>2. Select <strong>Add to Home Screen</strong></span>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstallClick}
                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all active:scale-95"
                        >
                            Install App
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
