"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RiderPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to rider login page
        router.replace("/rider/login")
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to Rider Portal...</p>
            </div>
        </div>
    )
}
