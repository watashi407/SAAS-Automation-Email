"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Onboarding() {
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save this information to your database
    console.log("Onboarding data:", { companyName, industry })
    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Welcome! Let's get started</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">
            Complete Onboarding
          </Button>
        </form>
      </div>
    </div>
  )
}

