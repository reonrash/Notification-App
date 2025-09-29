import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { supabase } from "~/lib/supabase"
import type { User } from "@supabase/supabase-js"

const subscriptionSchema = z.object({
  filterString: z.string().min(1, "Filter string cannot be blank"),
  companyId: z.string().optional(),
  locationFilter: z.string().optional(),
})

type SubscriptionData = z.infer<typeof subscriptionSchema>

interface Company {
  id: number
  name: string
}

interface Subscription {
  id: number
  filter_string: string
  company_id: number | null
  location_filter: string | null
  company?: { name: string }
}

interface SubscriptionManagerProps {
  user: User
}

export function SubscriptionManager({ user }: SubscriptionManagerProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SubscriptionData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      filterString: "",
      companyId: "all",
      locationFilter: "",
    },
  })

  useEffect(() => {
    fetchCompanies()
    fetchSubscriptions()
  }, [])

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name')

      if (error) throw error
      setCompanies(data || [])
    } catch (err) {
      console.error('Error fetching companies:', err)
      setError('Failed to load companies')
    }
  }

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          id,
          filter_string,
          company_id,
          location_filter,
          companies:company_id (name)
        `)
        .eq('user_id', user.id)

      if (error) throw error
      setSubscriptions(data || [])
    } catch (err) {
      console.error('Error fetching subscriptions:', err)
      setError('Failed to load subscriptions')
    }
  }

  const onSubmit = async (data: SubscriptionData) => {
    setLoading(true)
    setError(null)

    try {
      const subscriptionData = {
        user_id: user.id,
        filter_string: data.filterString,
        company_id: data.companyId === "all" ? null : parseInt(data.companyId || "0") || null,
        location_filter: data.locationFilter?.trim() || null,
      }

      const { error } = await supabase
        .from('subscriptions')
        .insert([subscriptionData])

      if (error) throw error

      form.reset()
      fetchSubscriptions()
    } catch (err: any) {
      setError(err.message || 'Failed to create subscription')
    } finally {
      setLoading(false)
    }
  }

  const deleteSubscription = async (id: number) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
      fetchSubscriptions()
    } catch (err: any) {
      setError(err.message || 'Failed to delete subscription')
    }
  }

  return (
    <div style={{gap: '32px'}} className="flex flex-col">
      <div className="surface-card">
        <div className="spacing-md">
          <div style={{marginBottom: '24px'}}>
            <h2 className="text-base font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Create New Subscription</h2>
            <p className="text-sm" style={{color: 'rgb(var(--color-text-light))', marginTop: '8px'}}>
              Get notified when jobs matching your criteria are posted
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} style={{gap: '24px'}} className="flex flex-col">
              <FormField
                control={form.control}
                name="filterString"
                render={({ field }) => (
                  <div style={{gap: '8px'}} className="flex flex-col">
                    <label className="text-sm font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Filter String</label>
                    <FormControl>
                      <Input
                        placeholder="e.g. React, Senior Developer, Remote"
                        className="rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <div style={{gap: '8px'}} className="flex flex-col">
                    <label className="text-sm font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Company</label>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 hover:border-gray-300"
                        style={{color: 'rgb(var(--color-text-dark))'}}
                      >
                        <option value="all">All Companies</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id.toString()}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="locationFilter"
                render={({ field }) => (
                  <div style={{gap: '8px'}} className="flex flex-col">
                    <label className="text-sm font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Location Filter (Optional)</label>
                    <FormControl>
                      <Input
                        placeholder="e.g. Remote, New York, San Francisco"
                        className="rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Creating..." : "Create Subscription"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="surface-card">
        <div className="spacing-md">
          <div style={{marginBottom: '24px'}}>
            <h2 className="text-base font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Your Subscriptions</h2>
            <p className="text-sm" style={{color: 'rgb(var(--color-text-light))', marginTop: '8px'}}>
              Manage your active job notification subscriptions
            </p>
          </div>
          {subscriptions.length === 0 ? (
            <p style={{color: 'rgb(var(--color-text-light))'}}>No subscriptions yet. Create one above to get started!</p>
          ) : (
            <div style={{gap: '16px'}} className="flex flex-col">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex items-center justify-between rounded-lg"
                  style={{padding: '16px', backgroundColor: 'rgb(var(--color-surface-white))', boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.04)'}}
                >
                  <div>
                    <p className="font-medium" style={{color: 'rgb(var(--color-text-dark))'}}>"{subscription.filter_string}"</p>
                    <div style={{gap: '4px', marginTop: '8px'}} className="flex flex-col">
                      <p className="text-sm" style={{color: 'rgb(var(--color-text-light))'}}>
                        {subscription.company_id
                          ? `at ${subscription.company?.name || 'Unknown Company'}`
                          : 'at All Companies'
                        }
                      </p>
                      <p className="text-sm" style={{color: 'rgb(var(--color-text-light))'}}>
                        {subscription.location_filter
                          ? `📍 Location: ${subscription.location_filter}`
                          : '📍 All Locations'
                        }
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSubscription(subscription.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}