import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PwaModal } from "@/components/pwa-modal"
import { CookieBanner } from "@/components/cookie-banner"
import { CartProvider } from "@/context/cart-context"
import { ServiceWorkerRegistration } from "@/components/sw-registration"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const viewport: Viewport = {
  themeColor: "#f97316",
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Campus Eats",
  description: "Fast food delivery for students",
  manifest: "/manifest.json",
  icons: {
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Campus Eats",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
            <ServiceWorkerRegistration />
            <PwaModal />
            <CookieBanner />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
