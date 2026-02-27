import { createClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const role = searchParams.get("role") || "customer"
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect based on role
      if (role === "vendor") {
        return NextResponse.redirect(`${origin}/vendor/dashboard`)
      } else {
        return NextResponse.redirect(`${origin}/browse`)
      }
    }
  }

  // Return to home if something went wrong
  return NextResponse.redirect(`${origin}${next}`)
}
