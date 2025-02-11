import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  console.log("Received request to create-checkout-session")
  try {
    if (!stripe) {
      throw new Error("Stripe client is not initialized")
    }

    const { planId } = await req.json()

    if (!planId) {
      console.error("Plan ID is missing in the request")
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
    }

    // Get the user's session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    console.log(`Creating checkout session for plan: ${planId}`)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      client_reference_id: session.user.id, // Add the user's ID as a reference
    })

    console.log(`Checkout session created successfully: ${session.id}`)
    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}

