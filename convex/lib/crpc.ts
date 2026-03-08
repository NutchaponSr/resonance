import { CRPCError } from "better-convex/server";
import { initCRPC } from "../functions/generated/server";

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

export const privateAction = c.action.use(devMiddleware).internal();