import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const { email } = await req.json()

  try {
    const { error } = await supabase.auth.api.sendMagicLink({
      email,
    })

    if (error) throw error

    return NextResponse.json({ message: "Verification email sent" })
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
  }
}

