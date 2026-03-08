import { Hono } from "hono";
import { cors } from "hono/cors";
import { authMiddleware } from "better-convex/auth/http";

import { getAuth } from "./generated/auth";
import { HttpRouterWithHono } from "better-convex/server";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: process.env.SITE_URL!,
    allowHeaders: ["Content-Type", "Authorization", "Better-Auth-Cookie"],
    exposeHeaders: ["Set-Better-Auth-Cookie"],
    credentials: true,
  }),
);

app.use(authMiddleware(getAuth));

export default new HttpRouterWithHono(app);