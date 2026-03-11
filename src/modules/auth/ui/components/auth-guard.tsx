"use client";

import { useEffect } from "react";
import { AuthLoading } from "convex/react";
import { useRouter } from "next/navigation";
import { Authenticated, useAuth } from "better-convex/react";

import { Loader } from "@/components/loader";

interface Props {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <AuthLoading>
        <Loader />
      </AuthLoading>
      <Authenticated>
        {children}
      </Authenticated>
    </>
  );
}