import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Layout } from "~/components/layout"
import { SubscriptionManager } from "~/components/subscription-manager"
import { AlertsDisplay } from "~/components/alerts-display"
import { supabase } from "~/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Extract name from email (everything before @)
  const getUserName = (email: string) => {
    const name = email.split('@')[0]
    // Convert underscores/dots to spaces and title case
    return name.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      if (!user) {
        navigate("/sign-in")
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        if (!session?.user) {
          navigate("/sign-in")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])


  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div style={{gap: '48px'}} className="flex flex-col">
          <div>
            <h1 className="font-bold tracking-tight leading-tight" style={{color: 'rgb(var(--color-text-dark))', fontSize: '36px'}}>Control Center</h1>
            <p className="text-lg" style={{color: 'rgb(var(--color-text-light))', marginTop: '8px'}}>Stay on top of the job market, {user.email ? getUserName(user.email) : 'User'}</p>
          </div>

          <div style={{gap: '32px'}} className="flex flex-col">
            <SubscriptionManager user={user} />
            <AlertsDisplay user={user} />
          </div>
        </div>
      </div>
    </Layout>
  )
}