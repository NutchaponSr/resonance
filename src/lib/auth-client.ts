import { createAuthClient } from "better-auth/react";
import { convexClient } from "better-convex/auth/client";
import { createAuthMutations } from "better-convex/react";
import { organizationClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";

import type { Auth } from "../../convex/shared/auth-shared";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
  plugins: [
    inferAdditionalFields<Auth>(), 
    convexClient(),
    organizationClient(),
  ],
});

export const {
  useSignInMutationOptions,
  useSignInSocialMutationOptions,
  useSignOutMutationOptions,
  useSignUpMutationOptions,
} = createAuthMutations(authClient);