"use client";

import { AuthLoading } from "convex/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Authenticated, Unauthenticated } from "better-convex/react";

import { useSignOutMutationOptions } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import { Loader } from "@/components/loader";

export default function UserPage() {
  const router = useRouter();
  const signOut = useMutation(useSignOutMutationOptions({
    onSuccess: () => {
      router.refresh();
    }
  }));

  return (
    <>
      <AuthLoading>
        <Loader />
      </AuthLoading>
      <Authenticated>
        <Button onClick={() => signOut.mutate()}>Sign Out</Button>
      </Authenticated>
      <Unauthenticated>
        <Loader />
      </Unauthenticated>
    </>
  );
}