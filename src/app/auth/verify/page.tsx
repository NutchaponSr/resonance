import { VerifyView } from "@/modules/auth/ui/views/verify-view";
import { AuthScreen } from "@/modules/auth/ui/screens/auth-screen";

const Page = async () => {
  return (
    <AuthScreen
      title="Verify your email"
      description="We sent a verification email to your inbox. Please click the link to verify your email."
    >
      <VerifyView />
    </AuthScreen>
  );
}

export default Page;