import { AuthScreen } from "@/modules/auth/ui/screens/auth-screen";
import { ResetPasswordView } from "@/modules/auth/ui/views/reset-password-view";

interface Props {
  searchParams: Promise<{ token: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return (
    <AuthScreen title="Reset Password" description="Enter your new password">
      <ResetPasswordView token={token} />
    </AuthScreen>
  )
}

export default Page;