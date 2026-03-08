"use client";

import { AuthLoading } from "convex/react";
import { Authenticated, Unauthenticated } from "better-convex/react";

import { Loader } from "@/components/loader";

interface Props {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  return (
    <>
      <AuthLoading>
        <Loader />
      </AuthLoading>
      <Authenticated>
        {children}
      </Authenticated>
      <Unauthenticated>
        <Loader />
      </Unauthenticated>
    </>
  );
}