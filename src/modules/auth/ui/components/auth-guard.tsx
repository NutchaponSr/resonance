"use client";

import { AuthLoading } from "convex/react";
import { usePathname } from "next/navigation";
import { Authenticated } from "better-convex/react";

import { Loader } from "@/components/loader";

interface Props {
  children: React.ReactNode;
}

const MATCH_PREFIX = ["/invite", "/link"];

const matchPrefix = (pathname: string) => {
  return MATCH_PREFIX.some((prefix) => pathname.startsWith(prefix));
}

export const AuthGuard = ({ children }: Props) => {
  const pathname = usePathname();

  if (matchPrefix(pathname)) {
    return children;
  }

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