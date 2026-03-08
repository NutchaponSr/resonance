"use client";

import { authClient } from "@/lib/auth-client";

const Page = () => {
  const auth = authClient.useActiveOrganization();

  return (
    <pre>
      {JSON.stringify(auth.data, null, 2)}
    </pre>
  );
}

export default Page;