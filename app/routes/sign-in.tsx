import { useNavigate } from "react-router"
import { Layout } from "~/components/layout"
import { AuthCard } from "~/components/auth-card"
import { SignInForm } from "~/components/sign-in-form"

export default function SignIn() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/dashboard")
  }

  return (
    <Layout>
      <AuthCard
        title="Sign in to Roll Call"
        description="Enter your email and password to access your account"
      >
        <SignInForm onSuccess={handleSuccess} />
      </AuthCard>
    </Layout>
  )
}