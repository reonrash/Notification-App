import { useEffect } from "react"
import { useNavigate, Link } from "react-router"
import type { Route } from "./+types/home"
import { Layout } from "~/components/layout"
import { supabase } from "~/lib/supabase"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roll Call - Job Notification App" },
    { name: "description", content: "Get notified when jobs matching your keywords are posted" },
  ];
}

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        navigate("/dashboard")
      }
    }

    checkAuth()
  }, [navigate])

  return (
    <>
      <Layout>
        <div className="flex items-center pt-4 lg:pt-0 pb-8 lg:pb-0" style={{minHeight: 'calc(100vh - 160px)'}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">
            {/* Left Column - Content (Order 2 on mobile, 1 on desktop) */}
            <div className="flex flex-col justify-center order-2 lg:order-1" style={{gap: '32px'}}>
              <div style={{gap: '24px'}} className="flex flex-col">
                <h1 className="font-bold tracking-tight leading-tight" style={{color: 'rgb(var(--color-text-dark))', fontSize: '56px', lineHeight: '1.1'}}>
                  Never Miss a Job Opportunity
                </h1>
                <p className="text-xl leading-relaxed" style={{color: 'rgb(var(--color-text-light))', maxWidth: '500px'}}>
                  Roll Call delivers proven job alerts, notifications, and opportunities to job seekers and recruiters worldwide.
                </p>
              </div>

              <div style={{gap: '16px'}} className="flex">
                <Link to="/sign-up">
                  <button className="btn-primary text-base font-medium" style={{padding: '12px 24px'}}>
                    Get Started →
                  </button>
                </Link>
                <Link to="/sign-in">
                  <button className="text-base font-medium" style={{color: 'rgb(var(--color-text-dark))', padding: '12px 24px', background: 'transparent', border: 'none'}}>
                    Sign In
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Teacher Roll Call Visualization (Order 1 on mobile, 2 on desktop) */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="flex flex-col items-center" style={{gap: '48px'}}>
                {/* Teacher Container */}
                <div className="flex justify-center">
                  <div
                    className="rounded-full"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, rgb(var(--color-primary-orange)) 0%, rgba(255, 123, 0, 0.8) 100%)',
                      boxShadow: '0px 15px 30px 0px rgba(255, 123, 0, 0.4)'
                    }}
                  />
                </div>

                {/* Students Container */}
                <div className="relative" style={{width: '280px', height: '160px'}}>
                  {/* Row 1 */}
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.6)',
                      top: '0px',
                      left: '0px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.7)',
                      top: '0px',
                      left: '56px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 1s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.8)',
                      top: '0px',
                      left: '112px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 2s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.7)',
                      top: '0px',
                      left: '168px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 3s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.6)',
                      top: '0px',
                      left: '224px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 4s'
                    }}
                  />

                  {/* Row 2 */}
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.5)',
                      top: '56px',
                      left: '0px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 5s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.6)',
                      top: '56px',
                      left: '56px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 6s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.7)',
                      top: '56px',
                      left: '112px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 7s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.6)',
                      top: '56px',
                      left: '168px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 8s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.5)',
                      top: '56px',
                      left: '224px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 9s'
                    }}
                  />

                  {/* Row 3 */}
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.4)',
                      top: '112px',
                      left: '0px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 10s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.5)',
                      top: '112px',
                      left: '56px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 11s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.6)',
                      top: '112px',
                      left: '112px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 12s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.5)',
                      top: '112px',
                      left: '168px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 13s'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255, 123, 0, 0.4)',
                      top: '112px',
                      left: '224px',
                      borderRadius: '4px',
                      animation: 'studentRollCall 15s ease-in-out infinite 14s'
                    }}
                  />

                  {/* Background atmosphere for students */}
                  <div
                    className="absolute"
                    style={{
                      width: '280px',
                      height: '160px',
                      background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.05) 0%, rgba(255, 123, 0, 0.02) 100%)',
                      top: '0px',
                      left: '0px',
                      borderRadius: '15px',
                      zIndex: -1
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* Companies Section - Full Width */}
      <div style={{backgroundColor: 'rgb(var(--color-bg-canvas))', paddingTop: '60px', paddingBottom: '60px'}}>
        <div className="max-w-6xl mx-auto" style={{padding: '0 32px'}}>
          <div className="text-center" style={{marginBottom: '40px'}}>
            <p className="text-sm" style={{color: 'rgb(var(--color-text-light))', marginBottom: '12px'}}>
              Company Job Boards We Are Watching
            </p>

            {/* Vector art accent underneath */}
            <div className="flex justify-center" style={{marginBottom: '20px'}}>
              <svg width="120" height="20" viewBox="0 0 120 20" style={{overflow: 'visible'}}>
                {/* Central decorative line */}
                <line
                  x1="20" y1="10" x2="100" y2="10"
                  stroke="rgb(255, 123, 0)"
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Left geometric accent */}
                <circle
                  cx="15" cy="10" r="3"
                  fill="rgb(255, 123, 0)"
                  opacity="0.8"
                />
                <polygon
                  points="8,10 12,6 12,14"
                  fill="rgb(255, 123, 0)"
                  opacity="0.5"
                />

                {/* Right geometric accent */}
                <circle
                  cx="105" cy="10" r="3"
                  fill="rgb(255, 123, 0)"
                  opacity="0.8"
                />
                <polygon
                  points="112,10 108,6 108,14"
                  fill="rgb(255, 123, 0)"
                  opacity="0.5"
                />

                {/* Central diamond accent */}
                <polygon
                  points="60,6 64,10 60,14 56,10"
                  fill="rgb(255, 123, 0)"
                  opacity="0.7"
                />

                {/* Decorative dots */}
                <circle cx="35" cy="10" r="1.5" fill="rgb(255, 123, 0)" opacity="0.4"/>
                <circle cx="45" cy="10" r="1.5" fill="rgb(255, 123, 0)" opacity="0.4"/>
                <circle cx="75" cy="10" r="1.5" fill="rgb(255, 123, 0)" opacity="0.4"/>
                <circle cx="85" cy="10" r="1.5" fill="rgb(255, 123, 0)" opacity="0.4"/>
              </svg>
            </div>

            {/* Sliding logos container */}
            <div className="relative overflow-hidden" style={{height: '60px'}}>
              <div
                className="flex items-center"
                style={{
                  animation: 'slideLogos 20s linear infinite',
                  gap: '80px',
                  position: 'absolute',
                  whiteSpace: 'nowrap'
                }}
              >
                {/* First set of logos */}
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>CoreWeave</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Databricks</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Envoy</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Harvey</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Notion</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>OpenAI</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Ramp</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Replit</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Snowflake</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>UiPath</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Vanta</div>

                {/* Duplicate set for seamless loop */}
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>CoreWeave</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Databricks</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Envoy</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Harvey</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Notion</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>OpenAI</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Ramp</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Replit</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Snowflake</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>UiPath</div>
                <div className="text-2xl font-bold" style={{color: 'rgb(var(--color-text-dark))', opacity: '0.7'}}>Vanta</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Full Width */}
      <div style={{backgroundColor: 'rgb(var(--color-bg-canvas))', paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="max-w-6xl mx-auto" style={{padding: '0 32px'}}>
          <div style={{gap: '48px'}} className="flex flex-col">
            <div className="text-center">
              <h2 className="text-3xl font-bold" style={{color: 'rgb(var(--color-text-dark))', marginBottom: '16px'}}>Why Roll Call Works</h2>
              <p className="text-lg" style={{color: 'rgb(var(--color-text-light))', maxWidth: '600px', margin: '0 auto'}}>
                Discover how we transform your job search experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{gap: '32px'}}>
              <div className="text-center group rounded-lg transition-all" style={{backgroundColor: 'rgb(var(--color-surface-white))', boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.08)'}}>
                <div style={{padding: '32px'}}>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300" style={{marginBottom: '24px'}}>🔍</div>
                  <h3 className="text-lg font-semibold" style={{color: 'rgb(var(--color-text-dark))', marginBottom: '12px'}}>Keyword Tracking</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'rgb(var(--color-text-light))'}}>
                    Set up keywords and get notified instantly when matching jobs are posted.
                  </p>
                </div>
              </div>

              <div className="text-center group rounded-lg transition-all" style={{backgroundColor: 'rgb(var(--color-surface-white))', boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.08)'}}>
                <div style={{padding: '32px'}}>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300" style={{marginBottom: '24px'}}>⚡</div>
                  <h3 className="text-lg font-semibold" style={{color: 'rgb(var(--color-text-dark))', marginBottom: '12px'}}>Real-time Alerts</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'rgb(var(--color-text-light))'}}>
                    Receive notifications via email as soon as relevant opportunities become available.
                  </p>
                </div>
              </div>

              <div className="text-center group rounded-lg transition-all" style={{backgroundColor: 'rgb(var(--color-surface-white))', boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.08)'}}>
                <div style={{padding: '32px'}}>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300" style={{marginBottom: '24px'}}>📋</div>
                  <h3 className="text-lg font-semibold" style={{color: 'rgb(var(--color-text-dark))', marginBottom: '12px'}}>Stay Organized</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'rgb(var(--color-text-light))'}}>
                    Track your applications and manage your job search in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Architecture Section - Full Width */}
      <div style={{backgroundColor: 'rgb(var(--color-bg-canvas))', paddingTop: '60px', paddingBottom: '60px'}}>
        <div className="max-w-7xl mx-auto" style={{padding: '0 32px'}}>
          {/* Section Title */}
          <div className="text-center" style={{marginBottom: '40px'}}>
            <h2 className="text-3xl font-bold" style={{color: 'rgb(var(--color-text-dark))', marginBottom: '12px'}}>Under the Hood</h2>
            <p className="text-lg" style={{color: 'rgb(var(--color-text-light))', maxWidth: '600px', margin: '0 auto'}}>
              Discover the powerful technology stack that makes instant job discovery possible
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center" style={{gap: '24px'}}>
              <div style={{gap: '12px'}} className="flex flex-col">
                <h2 className="text-lg font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Real-Time Job Discovery</h2>
                <p style={{color: 'rgb(var(--color-text-light))', lineHeight: '1.6', maxWidth: '500px'}}>
                  Built with custom scrapers, Kafka streaming, and intelligent workers to deliver instant job alerts tailored to your keywords and preferences.
                </p>
              </div>

              {/* Horizontal line */}
              <div style={{width: '100%', height: '1px', backgroundColor: 'rgb(var(--color-border))', maxWidth: '500px'}} />

              <div style={{gap: '12px'}} className="flex flex-col">
                <h3 className="text-lg font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Custom Scrapers</h3>
                <p style={{color: 'rgb(var(--color-text-light))', lineHeight: '1.6'}}>
                  Our specialized scrapers continuously monitor major job boards including LinkedIn, Indeed, Glassdoor, and company career pages in real-time.
                </p>
              </div>

              {/* Horizontal line */}
              <div style={{width: '100%', height: '1px', backgroundColor: 'rgb(var(--color-border))', maxWidth: '500px'}} />

              <div style={{gap: '12px'}} className="flex flex-col">
                <h3 className="text-lg font-semibold" style={{color: 'rgb(var(--color-text-dark))'}}>Intelligent Processing</h3>
                <p style={{color: 'rgb(var(--color-text-light))', lineHeight: '1.6'}}>
                  Kafka streams handle high-volume job data while our ingestion workers process, filter, and match opportunities with your subscriptions using Supabase.
                </p>
              </div>
            </div>

            {/* Right Column - Abstract Geometric Art */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square" style={{maxHeight: '400px'}}>

                {/* Large central circle - brightest */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '40%',
                    height: '40%',
                    background: 'rgba(255, 123, 0, 0.4)',
                    top: '30%',
                    left: '30%',
                    borderRadius: '50%',
                    boxShadow: '0 0 40px rgba(255, 123, 0, 0.2)'
                  }}
                />

                {/* Medium orbiting circles */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '20%',
                    height: '20%',
                    background: 'rgba(255, 123, 0, 0.25)',
                    top: '10%',
                    left: '40%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '25%',
                    height: '25%',
                    background: 'rgba(255, 123, 0, 0.2)',
                    top: '70%',
                    left: '12.5%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '17.5%',
                    height: '17.5%',
                    background: 'rgba(255, 123, 0, 0.3)',
                    top: '15%',
                    left: '72.5%',
                    borderRadius: '50%'
                  }}
                />

                {/* Small accent circles with high variability */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '8.75%',
                    height: '8.75%',
                    background: 'rgba(255, 123, 0, 0.5)',
                    top: '5%',
                    left: '20%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '3.75%',
                    height: '3.75%',
                    background: 'rgba(255, 123, 0, 0.6)',
                    top: '87.5%',
                    left: '50%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '6.25%',
                    height: '6.25%',
                    background: 'rgba(255, 123, 0, 0.45)',
                    top: '45%',
                    left: '87.5%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '11.25%',
                    height: '11.25%',
                    background: 'rgba(255, 123, 0, 0.18)',
                    top: '75%',
                    left: '75%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '3%',
                    height: '3%',
                    background: 'rgba(255, 123, 0, 0.7)',
                    top: '35%',
                    left: '7.5%',
                    borderRadius: '50%'
                  }}
                />

                {/* Connecting lines with varying thickness and opacity */}
                <div
                  className="absolute"
                  style={{
                    width: '35%',
                    height: '0.75%',
                    background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.3) 0%, rgba(255, 123, 0, 0.1) 100%)',
                    top: '50%',
                    left: '30%',
                    transform: 'rotate(25deg)',
                    transformOrigin: 'left center'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '25%',
                    height: '0.5%',
                    background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.25) 0%, rgba(255, 123, 0, 0.05) 100%)',
                    top: '30%',
                    left: '50%',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'left center'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '20%',
                    height: '0.25%',
                    background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.4) 0%, rgba(255, 123, 0, 0.15) 100%)',
                    top: '25%',
                    left: '25%',
                    transform: 'rotate(70deg)',
                    transformOrigin: 'left center'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '30%',
                    height: '0.5%',
                    background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.2) 0%, rgba(255, 123, 0, 0.08) 100%)',
                    top: '62.5%',
                    left: '37.5%',
                    transform: 'rotate(-15deg)',
                    transformOrigin: 'left center'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '15%',
                    height: '0.25%',
                    background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.35) 0%, rgba(255, 123, 0, 0.12) 100%)',
                    top: '20%',
                    left: '62.5%',
                    transform: 'rotate(110deg)',
                    transformOrigin: 'left center'
                  }}
                />

                {/* Tiny detail circles for texture */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '2%',
                    height: '2%',
                    background: 'rgba(255, 123, 0, 0.4)',
                    top: '22.5%',
                    left: '47.5%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '1.5%',
                    height: '1.5%',
                    background: 'rgba(255, 123, 0, 0.5)',
                    top: '57.5%',
                    left: '70%',
                    borderRadius: '50%'
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '2.5%',
                    height: '2.5%',
                    background: 'rgba(255, 123, 0, 0.3)',
                    top: '40%',
                    left: '17.5%',
                    borderRadius: '50%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}