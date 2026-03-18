import { getSession } from "better-convex/auth";

import type { SessionUser } from "../shared/auth-shared";

import type { Id } from "../functions/_generated/dataModel";
import type { QueryCtx } from "../functions/generated/server";

import { AuthCtx } from "./crpc";

export const getSessionData = async (ctx: QueryCtx) => {
  const session = await getSession(ctx);

  if (!session) return null;

  const activeOrganizationId = session.activeOrganizationId;
  
  const [user] = await Promise.all([
    ctx.orm.query.user.findFirst({
      where: {
        id: { eq: session.userId },
      },
    }),
  ]);

  if (!user) return null;

  let activeOrganization: SessionUser["activeOrganization"] = null;

  if (activeOrganizationId) {
    const [activeOrg, currentMember] = await Promise.all([
      ctx.orm.query.organization.findFirst({
        where: {
          id: { eq: activeOrganizationId },
        },
      }),
      ctx.orm.query.member.findFirst({
        where: {
          organizationId: { eq: activeOrganizationId as Id<"organization"> },
          userId: { eq: session.userId },
        },
      }),
    ]);

    if (activeOrg && currentMember) {
      const { id, ...rest } = activeOrg;
      activeOrganization = {
        ...rest,
        id,
        role: currentMember.role,
      }
    }
  }

  return {
    activeOrganization,
    session,
    user,
  };
}

export const getSessionUser = async (ctx: QueryCtx): Promise<SessionUser | null> => {
  const data = await getSessionData(ctx);
  
  if (!data) return null;

  const {
    user,
    activeOrganization,
    session,
  } = data;
  
  const { id, ...rest } = user;

  return {
    ...rest,
    id,
    activeOrganization,
    session,
  };
}