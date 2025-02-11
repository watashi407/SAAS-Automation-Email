"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [leads, setLeads] = useState([])
  const [contacts, setContacts] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      // Fetch leads and contacts from your API
      // This is just a placeholder
      setLeads([{ id: 1, name: "John Doe", email: "john@example.com" }])
      setContacts([{ id: 1, name: "Jane Smith", email: "jane@example.com" }])
    }
  }, [user, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handlePremiumSubscription = () => {
    router.push("/pricing")
  }

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <div className="flex justify-between mb-6">
        <Button onClick={handleSignOut}>Sign Out</Button>
        <Button onClick={handlePremiumSubscription} variant="outline">
          Upgrade to Premium
        </Button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Leads</h2>
        {leads.map((lead: any) => (
          <div key={lead.id} className="mb-2">
            {lead.name} - {lead.email}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Contacts</h2>
        {contacts.map((contact: any) => (
          <div key={contact.id} className="mb-2">
            {contact.name} - {contact.email}
          </div>
        ))}
      </div>
    </div>
  )
}

