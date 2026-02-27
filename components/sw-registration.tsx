"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                    .register("/sw.js", { scope: "/" })
                    .then((registration) => {
                        console.log("[SW] Registered successfully:", registration.scope)

                        // Check for updates on every page load
                        registration.update()
                    })
                    .catch((error) => {
                        console.error("[SW] Registration failed:", error)
                    })
            })
        }
    }, [])

    return null
}
