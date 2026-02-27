"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Search, ShoppingBag, MessageSquare, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PwaMainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()

    const navItems = [
        { icon: Home, label: "Home", path: "/pwa/home" },
        { icon: Search, label: "Search", path: "/pwa/search" },
        { icon: ShoppingBag, label: "Cart", path: "/pwa/cart" },
        { icon: MessageSquare, label: "Support", path: "/pwa/support" },
        { icon: User, label: "Profile", path: "/pwa/profile" },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <main className="flex-1 overflow-y-auto scrollbar-hide pb-32">
                {children}
            </main>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%]">
                <nav className="bg-[#111111] px-2 py-2 rounded-full shadow-2xl shadow-black/30 flex items-center gap-1.5 backdrop-blur-md">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path
                        return (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ${isActive ? "bg-white" : "text-gray-500 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <item.icon
                                        className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-black fill-current' : 'text-gray-400'}`}
                                        strokeWidth={isActive ? 0 : 2}
                                    />
                                    <AnimatePresence mode="popLayout">
                                        {isActive && (
                                            <motion.span
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "auto", opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                className="text-sm font-bold text-black whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </button>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
