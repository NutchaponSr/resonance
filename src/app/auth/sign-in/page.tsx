import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { AuthScreen } from "@/modules/auth/ui/screens/auth-screen";

const SignUpPage = () => {
  return (
    <AuthScreen title="Your School Workspace" description="Log in to your Resonance account">
      <SignInView />
    </AuthScreen>
  );
}

export default SignUpPage;