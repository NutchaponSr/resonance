import "server-only";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import {
  createServerCRPCProxy,
  getServerQueryClientOptions
} from "better-convex/rsc";
import { cache } from "react";
import { api } from "@convex/api";
import { headers } from "next/headers";
import type { FetchQueryOptions } from "@tanstack/react-query";

import { hydrationConfig } from "@/lib/query-client";
import { createContext, createCaller } from "@/lib/auth";

export const crpc = createServerCRPCProxy({ api });

const createRSCContext = cache(async () => createContext({
  headers: await headers(),
}));

export const caller = createCaller(createRSCContext);

function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      ...hydrationConfig,
      ...getServerQueryClientOptions({
        getToken: caller.getToken,
      }),
    },
  });
}

export const getQueryClient = cache(createServerQueryClient);

export function prefetch<T extends { queryKey: readonly unknown[] }>(queryOptions: T): void {
  void getQueryClient().prefetchQuery(queryOptions);
}

export function preloadQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): Promise<TData> {
  return getQueryClient().fetchQuery(options);
}

export function HydrateClient({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}