"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { loadStripe } from "@stripe/stripe-js"

const plans = [{ id: "price_1NXBxXXXXXXXXXXXXXXXXXXX", name: "Premium", price: 19.99 }]

export default function Pricing() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubscribe = async (planId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create checkout session")
      }

      const { sessionId } = await response.json()
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (!stripe) {
        throw new Error("Failed to load Stripe")
      }
      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        throw error
      }
    } catch (error) {
      console.error("Error:", error)
      setError(error.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Upgrade to Premium</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full max-w-md">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">${plan.price}/month</p>
            <Button onClick={() => handleSubscribe(plan.id)} disabled={loading} className="w-full">
              {loading ? "Processing..." : "Subscribe Now"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

