import { type ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-3 pb-6 px-6 sm:px-8">
          <CardTitle className="text-2xl font-semibold text-slate-800 tracking-tight">{title}</CardTitle>
          <CardDescription className="text-slate-600 text-base leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-6 sm:px-8 pb-8">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}