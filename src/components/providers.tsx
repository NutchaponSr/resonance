'use client';

import {
  ConvexReactClient,
  getQueryClientSingleton,
  getConvexQueryClientSingleton,
} from 'better-convex/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConvexAuthProvider } from 'better-convex/auth/client';

import { CRPCProvider } from '@/lib/crpc';
import { authClient } from '@/lib/auth-client';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthProvider authClient={authClient} client={convex}>
      <QueryProvider>{children}</QueryProvider>
    </ConvexAuthProvider>
  );
}

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClientSingleton(createQueryClient);
  const convexQueryClient = getConvexQueryClientSingleton({
    convex,
    queryClient,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CRPCProvider
        convexClient={convex}
        convexQueryClient={convexQueryClient}
      >
        {children}
      </CRPCProvider>
    </QueryClientProvider>
  );
}