"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const query = useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      return await authClient.organization.listMembers();
    }
  })

  return (
    <pre>
      {JSON.stringify(query.data?.data?.members, null, 2)}
    </pre>
  );
}

export default Page;