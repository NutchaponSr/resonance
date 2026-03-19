import { Suspense } from "react";

import { crpc, HydrateClient, prefetch } from "@/lib/rsc";

import { Sidebar } from "@/components/sidebar";

import { SidebarProvider } from "@/components/contexts/sidebar-context";

import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { OrganizationGuard } from "@/modules/organizations/ui/components/organization-guard";

const Layout = async ({ children }: LayoutProps<"/">) => {
  prefetch(crpc.database.getMany.queryOptions());
  prefetch(crpc.organization.getOne.queryOptions());
  prefetch(crpc.organization.getMany.queryOptions());

  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider>
          <HydrateClient>
            <Suspense fallback={<p>Loading</p>}>
              <Sidebar />
            </Suspense>
          </HydrateClient>
          <div className="order-3 flex flex-col w-full overflow-hidden isolation-auto relative">
            {children}
          </div>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
}

export default Layout;