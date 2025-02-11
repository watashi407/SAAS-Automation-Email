import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set in the environment variables.")
  throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

let stripe: Stripe | null = null

try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  })
  console.log("Stripe client initialized successfully")
} catch (error) {
  console.error("Error initializing Stripe client:", error)
  throw error
}

export { stripe }

