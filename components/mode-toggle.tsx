"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 left-6 z-50 rounded-full h-12 w-12 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-300"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
            <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
