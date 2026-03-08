"use client";

import {
  ConvexReactClient,
  getConvexQueryClientSingleton,
  getQueryClientSingleton,
  useAuthStore
} from "better-convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConvexAuthProvider } from "better-convex/auth/client";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

import { CRPCProvider } from "@/lib/crpc";
import { authClient } from "@/lib/auth-client";
import { createQueryClient } from "@/lib/query-client";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function BetterConvexProvider({
  children,
  token
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const router = useRouter();
  const authStore = useAuthStore();
  
  const queryClient = getQueryClientSingleton(createQueryClient);
  const convexQueryClient = getConvexQueryClientSingleton({
    authStore,
    convex,
    queryClient,
  });

  return (
    <ConvexAuthProvider
      authClient={authClient}
      client={convex}
      initialToken={token}
      onMutationUnauthorized={() => {
        router.push("/auth/sign-in");
      }}
      onQueryUnauthorized={({ queryName }) => {
        if (process.env.NODE_ENV === "development") {
          toast.error(`${queryName} requires authentication`);
        } else {
          router.push("/auth/sign-in");
        }
      }}
    >
      <TanstackQueryClientProvider client={queryClient}>
        <CRPCProvider convexClient={convex} convexQueryClient={convexQueryClient}>
          {children}
        </CRPCProvider>
      </TanstackQueryClientProvider>
    </ConvexAuthProvider>
  );
}