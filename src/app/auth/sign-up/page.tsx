import { AuthScreen } from "@/modules/auth/ui/screens/auth-screen";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

const SignUpPage = () => {
  return (
    <AuthScreen title="Create an account" description="Get started with your free account">
      <SignUpView />
    </AuthScreen>
  );
}

export default SignUpPage;