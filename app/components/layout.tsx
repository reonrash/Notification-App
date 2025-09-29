import { type ReactNode, useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { Button } from "~/components/ui/button"
import { supabase } from "~/lib/supabase"
import type { User } from "@supabase/supabase-js"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up'

  return (
    <div className="min-h-screen" style={{backgroundColor: 'rgb(var(--color-bg-canvas))'}}>
      <header style={{padding: '16px'}}>
        <div className="surface-card" style={{padding: '16px 32px', borderRadius: '50px', margin: '0 16px'}}>
          <div className="flex items-center justify-between">
            <Link to={user ? "/dashboard" : "/"} className="inline-block">
              <h1 className="text-2xl font-bold tracking-tight hover:opacity-80 transition-colors cursor-pointer" style={{color: 'rgb(var(--color-text-dark))'}}>
                RollCall
              </h1>
            </Link>

            <nav className="flex items-center" style={{gap: '16px'}}>
              {loading ? (
                <div className="w-20 h-9"></div>
              ) : user ? (
                <div className="flex items-center" style={{gap: '16px'}}>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </div>
              ) : !isAuthPage ? (
                <div className="flex items-center" style={{gap: '16px'}}>
                  <Link to="/sign-in">
                    <Button variant="ghost" size="sm">Sign in</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button className="btn-primary" size="sm">Sign up</Button>
                  </Link>
                </div>
              ) : null}
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto" style={{padding: '0 32px', paddingTop: '8px'}}>
        {children}
      </main>
    </div>
  )
}