import { getHeaders } from "better-convex/auth";
import { CRPCError } from "better-convex/server";
import type { Auth } from "convex/server";

import { getAuth } from "../functions/generated/auth";
import { initCRPC, MutationCtx, OrmCtx, QueryCtx } from "../functions/generated/server";

import { getSessionUser } from "./helper";
import type { SessionUser } from "../shared/auth-shared";

export type AuthCtx<Ctx extends MutationCtx | QueryCtx = QueryCtx> =
  OrmCtx<Ctx> & {
    auth: Auth & ReturnType<typeof getAuth> & { headers: Headers };
    user: SessionUser;
    userId: string;
  };

const c = initCRPC
  .meta<{
    dev?: boolean;
    rateLimit?: string;
    auth?: "optional" | "required";
  }>()
  .create();

export const publicQuery = c.query;
export const publicMutation = c.mutation;

const devMiddleware = c.middleware<object>(({ meta, next, ctx }) => {
  if (!meta.dev && process.env.DEPLOY_KEY !== "development") {
    throw new CRPCError({
      code: "FORBIDDEN",
      message: "This function is only available in development mode."
    })
  }

  return next({ ctx });
});

function requireAuth<T>(user: T | null): T {
  if (!user) {
    throw new CRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return user;
}

export const privateAction = c.action.use(devMiddleware).internal();

export const authMutation = c.mutation
  .meta({ auth: "required" })
  .use(devMiddleware)
  .use(async ({ ctx, next }) => {
    const user = requireAuth(await getSessionUser(ctx));

    return next({
      ctx: {
        ...ctx,
        auth: {
          ...ctx.auth,
          ...getAuth(ctx),
          headers: await getHeaders(ctx, user.session),
        },
        user,
        userId: user.id,
      },
    });
  });

export const authQuery = c.query
  .meta({ auth: "required" })
  .use(devMiddleware)
  .use(async ({ ctx, next }) => {
    const user = requireAuth(await getSessionUser(ctx));

    return next({
      ctx: {
        ...ctx,
        auth: {
          ...ctx.auth,
          ...getAuth(ctx),
          headers: await getHeaders(ctx, user.session),
        },
        user,
        userId: user.id,
      }
    })
  })