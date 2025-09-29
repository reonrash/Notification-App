import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { supabase } from "~/lib/supabase"
import type { User } from "@supabase/supabase-js"

interface Alert {
  id: number
  created_at: string
  read_at: string | null
  job: {
    id: number
    title: string
    location: string | null
    normalized_location: string | null
    url: string
    company: {
      name: string
    }
  }
}

interface AlertsDisplayProps {
  user: User
}

export function AlertsDisplay({ user }: AlertsDisplayProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          id,
          created_at,
          read_at,
          jobs:job_id (
            id,
            title,
            location,
            normalized_location,
            url,
            companies:company_id (
              name
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error

      // Transform the data to match our interface
      const transformedAlerts = data?.map(alert => ({
        id: alert.id,
        created_at: alert.created_at,
        read_at: alert.read_at,
        job: {
          id: alert.jobs.id,
          title: alert.jobs.title,
          location: alert.jobs.location,
          normalized_location: alert.jobs.normalized_location,
          url: alert.jobs.url,
          company: {
            name: alert.jobs.companies.name
          }
        }
      })) || []

      setAlerts(transformedAlerts)
    } catch (err: any) {
      console.error('Error fetching alerts:', err)
      setError('Failed to load job alerts')
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort alerts based on read status
  const filteredAlerts = showUnreadOnly
    ? alerts.filter(alert => !alert.read_at)
    : alerts.sort((a, b) => {
        // Unread alerts (no read_at) come first
        if (!a.read_at && b.read_at) return -1
        if (a.read_at && !b.read_at) return 1
        // Within same read status, sort by created_at descending
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })

  const markAsRead = async (alertId: number) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ read_at: new Date().toISOString() })
        .eq('id', alertId)
        .eq('user_id', user.id)

      if (error) throw error

      // Update the local state
      setAlerts(prev => prev.map(alert =>
        alert.id === alertId
          ? { ...alert, read_at: new Date().toISOString() }
          : alert
      ))
    } catch (err: any) {
      console.error('Error marking alert as read:', err)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recent Job Alerts</CardTitle>
          <CardDescription>Jobs that match your subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">Loading alerts...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="surface-card">
      <div className="spacing-md">
        <div className="flex items-center justify-between" style={{marginBottom: '24px'}}>
          <div>
            <h2 className="text-base font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Recent Job Alerts</h2>
            <p className="text-sm" style={{color: 'rgb(var(--color-text-light))', marginTop: '8px'}}>
              Jobs that match your subscriptions ({filteredAlerts.length} alerts)
            </p>
          </div>
          <div className="flex items-center" style={{gap: '8px'}}>
            <Button
              variant={showUnreadOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={showUnreadOnly ? "btn-primary" : ""}
            >
              {showUnreadOnly ? "Show All" : "Unread Only"}
            </Button>
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg border border-red-200" style={{padding: '16px', marginBottom: '16px'}}>
            {error}
          </div>
        )}

        {filteredAlerts.length === 0 ? (
          <p style={{color: 'rgb(var(--color-text-light))'}}>
            {showUnreadOnly ? "No unread alerts!" : "No job alerts yet. Create some subscriptions to start receiving notifications!"}
          </p>
        ) : (
          <div style={{gap: '16px'}} className="flex flex-col">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg transition-all"
                style={{
                  padding: '16px',
                  backgroundColor: alert.read_at ? 'rgb(248, 250, 252)' : 'rgb(var(--color-surface-white))',
                  boxShadow: alert.read_at ? '0px 2px 8px 0px rgba(0, 0, 0, 0.04)' : '0px 4px 15px 0px rgba(0, 0, 0, 0.08)',
                  borderLeft: alert.read_at ? 'none' : '6px solid rgb(var(--color-primary-orange))'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between" style={{gap: '16px'}}>
                  <div className="flex-1">
                    <div className="flex items-center" style={{gap: '8px', marginBottom: '8px'}}>
                      <h3 className="font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>
                        {alert.job.title}
                      </h3>
                    </div>

                    <div style={{gap: '4px'}} className="flex flex-col text-sm">
                      <p style={{color: 'rgb(var(--color-text-light))'}}>🏢 {alert.job.company.name}</p>
                      <p style={{color: 'rgb(var(--color-text-light))'}}>
                        📍 {alert.job.normalized_location || alert.job.location || 'Location not specified'}
                      </p>
                      <p className="text-xs" style={{color: 'rgb(var(--color-text-light))'}}>
                        🕒 {formatDate(alert.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row w-full sm:w-auto" style={{gap: '8px'}}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(alert.job.url, '_blank')}
                      className="w-full sm:w-auto"
                    >
                      View Job
                    </Button>
                    {!alert.read_at && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(alert.id)}
                        className="w-full sm:w-auto"
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}