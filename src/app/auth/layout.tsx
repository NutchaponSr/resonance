import { AuthLayout } from "@/modules/auth/ui/layout/auth-layout";

const Layout = ({ children }: LayoutProps<"/auth">) => {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}

export default Layout;