import { boolean, convexTable, defineRelations, defineSchema, id, index, integer, json, text, timestamp } from "better-convex/orm";

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
    activeOrganizationId: text(),
}, (t) => [
  index("token").on(t.token),
  index("userId").on(t.userId),
  index("expiresAt").on(t.expiresAt),
  index("expiresAt_userId").on(t.expiresAt, t.userId),
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
  index("accountId_providerId").on(t.accountId, t.providerId),
]);

export const verification = convexTable("verification", {
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer().notNull(),
  createdAt: timestamp(),
  updatedAt: integer(),
}, (t) => [
  index("identifier").on(t.identifier),
  index("expiresAt").on(t.expiresAt),
]);

export const jwks = convexTable("jwks", {
  publicKey: text().notNull(),
  privateKey: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const organization = convexTable("organization", {
  name: text().notNull(),
  slug: text().notNull(),
  logo: text(),
  createdAt: timestamp().notNull().defaultNow(),
  metadata: json<Record<string, unknown>>(),
}, (t) => [
  index("slug").on(t.slug),
  index("name").on(t.name),
]);

export const member = convexTable("member", {
  organizationId: id("organization").notNull(),
  userId: id("user").notNull(),
  role: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
}, (t) => [
  index("userId").on(t.userId),
  index("organizationId_role").on(t.organizationId, t.role),
  index("organizationId_userId").on(t.organizationId, t.userId),
]);

export const invitation = convexTable("invitation", {
  organizationId: id("organization").notNull(),
  inviterId: id("user").notNull(),
  email: text().notNull(),
  role: text().notNull(),
  status: text().notNull(),
  expiresAt: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
}, (t) => [
  index("email").on(t.email),
  index("status").on(t.status),
  index("email_organizationId_status").on(t.email, t.organizationId, t.status),
  index("organizationId_status").on(t.organizationId, t.status),
]);

export const tables = { user, session, account, verification, jwks, organization, member, invitation };
export default defineSchema(tables, { strict: false });

export const relations = defineRelations(tables, (r) => ({
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  organization: {
    members: r.many.member({
      from: r.organization.id,
      to: r.member.organizationId,
    }),
    invitations: r.many.invitation({
      from: r.organization.id,
      to: r.invitation.organizationId,
    }),
  },
  member: {
    organization: r.one.organization({
      from: r.member.organizationId,
      to: r.organization.id,
    }),
    user: r.one.user({
      from: r.member.userId,
      to: r.user.id,
    }),
  },
  invitation: {
    organization: r.one.organization({
      from: r.invitation.organizationId,
      to: r.organization.id,
    }),
    inviter: r.one.user({
      from: r.invitation.inviterId,
      to: r.user.id,
    }),
  },
  user: {
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.userId,
    }),
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.userId,
    }),
    members: r.many.member({
      from: r.user.id,
      to: r.member.userId,
    }),
  },
}))