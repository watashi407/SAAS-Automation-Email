import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-blue-100 to-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 text-center sm:px-20">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-600">WATASHI CRM</span>
        </h1>
        <p className="mt-3 text-xl sm:text-2xl max-w-2xl">
          Revolutionize your workflow with intelligent email automation. Streamline processes, boost productivity, and
          elevate client relationships.
        </p>
        <div className="flex flex-col sm:flex-row mt-8 gap-4">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Log In
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

