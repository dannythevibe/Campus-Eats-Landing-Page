"use client"

import { useState, useEffect } from "react"
import { Cookie } from "lucide-react"

export function CookieBanner() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            setTimeout(() => setShow(true), 1000)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "true")
        setShow(false)
        // Here we would trigger the "Start Algo" signal
    }

    if (!show) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-zinc-800 p-4 sm:p-6 pointer-events-auto flex flex-col sm:flex-row items-center gap-6 animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">We use cookies for smart recommendations</h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Enable our recommendation algorithm to find food you'll love based on your history.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setShow(false)}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Later
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Allow Cookies
                    </button>
                </div>
            </div>
        </div>
    )
}
