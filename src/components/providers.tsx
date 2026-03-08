import { caller, HydrateClient } from "@/lib/rsc";

import { Toaster } from "@/components/ui/sonner";

import { BetterConvexProvider } from "@/components/convex-provider";

export const Providers = async ({ children }: { children: React.ReactNode }) => {
  const token = await caller.getToken();

  return (
    <BetterConvexProvider token={token}>
      <HydrateClient>
        {children}
        <Toaster richColors position="bottom-center" />
      </HydrateClient>
    </BetterConvexProvider>
  );
}