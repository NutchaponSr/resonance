import { boolean, convexTable, defineSchema, id, index, integer, text, timestamp } from "better-convex/orm";

export const user = convexTable("user", {
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean().notNull(),
  image: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: integer().notNull(),
}, (t) => [
  index("email").on(t.email),
]);

export const session = convexTable("session", {
    token: text().notNull(),
    expiresAt: integer().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: integer().notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: id("user").notNull(),
}, (t) => [
  index("token").on(t.token),
  index("userId").on(t.userId),
]);

export const account = convexTable("account", {
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: id("user").notNull(),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: integer(),
  refreshTokenExpiresAt: integer(),
  scope: text(),
  password: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: integer().notNull(),
}, (t) => [
  index("accountId").on(t.accountId),
  index("userId").on(t.userId),
]);

export const verification = convexTable("verification", {
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer().notNull(),
  createdAt: timestamp(),
  updatedAt: integer(),
}, (t) => [
  index("identifier").on(t.identifier),
]);

export const jwks = convexTable("jwks", {
  publicKey: text().notNull(),
  privateKey: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const tables = { user, session, account, verification, jwks };
export default defineSchema(tables, { strict: false });