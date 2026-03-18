"use client";

import { authClient } from "@/lib/auth-client";

import { Loader } from "@/components/loader";

import { OrganizationView } from "@/modules/organizations/ui/views/organization-view";
import { useCRPC } from "@/lib/crpc";
import { useQuery } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

export const OrganizationGuard = ({ children }: Props) => {
  const crpc = useCRPC();
  const {
    data: organization,
    isPending: isLoadingOrganization,
  } = useQuery(crpc.organization.getOne.queryOptions());

  if (isLoadingOrganization) {
    return <Loader label="Getting setup..." />;
  }

  if (!organization) {
    return <OrganizationView />
  }

  return children;
}
  