"use client";

import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

import { Main } from "./main";
import { Header } from "./header";

const Page = () => {
  const query = useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      return await authClient.organization.listMembers();
    }
  })

  return (
    <>
      <Header />
      <Main>
        <pre>
          {JSON.stringify(query.data?.data?.members, null, 2)}
        </pre>
      </Main>
    </>
  );
}

export default Page;