import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { OrganizationGuard } from "@/modules/organizations/ui/components/organization-guard";

const Layout = ({ children }: LayoutProps<"/">) => {
  return (
    <AuthGuard>
      <OrganizationGuard>
        {children}
      </OrganizationGuard>
    </AuthGuard>
  );
}

export default Layout;