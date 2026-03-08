import { AuthScreen } from "@/modules/auth/ui/screens/auth-screen";
import { ForgetPasswordView } from "@/modules/auth/ui/views/forget-password-view";

const Page = () => {
  return (
    <AuthScreen title="Forgot Password" description="Enter your email to reset your password">
      <ForgetPasswordView />
    </AuthScreen>
  )
}

export default Page;