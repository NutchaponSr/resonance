import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

import { convex } from "better-convex/auth";
import { organization } from "better-auth/plugins";
import { requireActionCtx, requireRunMutationCtx } from "better-convex/server";
import { APIError, createAuthMiddleware } from "better-auth/api";

import { api, internal } from "./_generated/api";
import { defineAuth } from "./generated/auth";

import { buildEmailTemplate } from "./emailTemplates";

const VALID_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
];

const normalizeName = (name: string) => {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

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
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path ===  "/sign-up/email") {
          const email = String(ctx.body.email);
          const domain = email.split("@")[1];

          if (!VALID_DOMAINS.includes(domain)) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid email domain",
            });
          }

          const name = normalizeName(ctx.body.name);

          return {
            context: {
              ...ctx,
              body: {
                ...ctx.body,
                name,
              },
            },
          }
        }

        if (ctx.path === "/update-user") {
          const name = normalizeName(ctx.body.name);

          return {
            context: {
              ...ctx,
              body: {
                ...ctx.body,
                name,
              },
            },
          };
        }
      }),
    },
    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            try {
              const runCtx = requireRunMutationCtx(ctx);
              const org = await runCtx.runQuery(api.organization.findOne, {
                userId: session.userId,
              });
              return {
                data: {
                  ...session,
                  activeOrganizationId: org.id,
                },
              };
            } catch {
              return { data: session };
            }
          },
        },
      },
    },
    plugins: [
      convex({ authConfig }),
      organization({
        organizationLimit: 5,
        creatorRole: "owner",
        organizationHooks: {
          afterCreateOrganization: async ({ organization }) => {
            await requireRunMutationCtx(ctx).runMutation(api.database.initial, {
              organizationId: organization.id,
            });
          }  
        }
      })
    ]
  };
});
