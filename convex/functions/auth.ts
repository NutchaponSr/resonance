import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

import { convex } from "better-convex/auth";
import { requireActionCtx } from "better-convex/server";

import { internal } from "./_generated/api";
import { defineAuth } from "./generated/auth";

import { buildEmailTemplate } from "./emailTemplates";

export default defineAuth((ctx) => {
  return {
    baseURL: process.env.SITE_URL!,
    trustedOrigins: [process.env.SITE_URL || "http://localhost:3000"],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 20,
      password: {
        hash: async (password) => {
          const salt = await bcrypt.genSalt(12);

          return await bcrypt.hash(password, salt);
        },
        verify: async ({ password, hash }) => {
          return await bcrypt.compare(password, hash);
        },
      },
      sendResetPassword: async ({ user, url, token }) => {
        const actionCtx = requireActionCtx(ctx);
        await actionCtx.scheduler.runAfter(
          0,
          internal.email.sendEmail,
          {
            to: user.email,
            ...buildEmailTemplate(
              url, 
              "Reset Your Password", 
              "Please click the button below to reset your password."
            ),
          },
        );
      },
    },
    emailVerification: {
      expiresIn: 60 * 60,
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        const link = new URL(url);

        link.searchParams.set("callbackURL", "/auth/verify");

        const actionCtx = requireActionCtx(ctx);
        await actionCtx.scheduler.runAfter(
          0,
          internal.email.sendEmail,
          {
            to: user.email,
            ...buildEmailTemplate(
              link.toString(),
              "Verify Your Email Address", 
              "Please verify your email address by using the code below or clicking the verification button."
            ),
          },
        );
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "github", "email-password"],
      }
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24 * 15, // 15 days
    },
    plugins: [
      convex({
        authConfig,
      }),
    ],
  };
});
