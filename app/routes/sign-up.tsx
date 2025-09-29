import { useNavigate } from "react-router"
import { Layout } from "~/components/layout"
import { AuthCard } from "~/components/auth-card"
import { SignUpForm } from "~/components/sign-up-form"

export default function SignUp() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/dashboard")
  }

  return (
    <Layout>
      <AuthCard
        title="Create your Roll Call account"
        description="Sign up to get notified about job opportunities"
      >
        <SignUpForm onSuccess={handleSuccess} />
      </AuthCard>
    </Layout>
  )
}