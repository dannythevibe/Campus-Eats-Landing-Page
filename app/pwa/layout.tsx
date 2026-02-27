import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Campus Eats Mobile",
  description: "Mobile experience for Campus Eats",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
}

export default function PwaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans md:max-w-md md:mx-auto relative shadow-2xl overflow-x-hidden">
      {/* Consistently center on desktop, full width on mobile */}
      {children}
    </div>
  )
}
