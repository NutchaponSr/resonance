import z from "zod";

import { CRPCError } from "better-convex/server";

import { AuthCtx, authMutation, authQuery, publicMutation, publicQuery } from "../lib/crpc";

import { Id } from "./_generated/dataModel";
import { MutationCtx } from "./generated/server";
import { invitation, member, organization } from "./schema";
import { eq, id } from "better-convex/orm";

const MEMBER_LIMIT = 5;
const DEFAULT_LIST_LIMIT = 100;

export const findOne = publicQuery
  .input(
    z.object({
      userId: z.string()
    })
  )
  .output(z.object({
    id: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    const member = await ctx.orm.query.member.findFirst({
      where: {
        userId: { eq: input.userId as Id<"user"> },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!member) {
      throw new CRPCError({
        code: "NOT_FOUND",
        message: "Member not found",
      });
    }

    const org = await ctx.orm.query.organization.findFirst({
      where: {
        id: { eq: member.organizationId as Id<"organization"> },
      },
    });

    if (!org) {
      throw new CRPCError({
        code: "NOT_FOUND",
        message: "Organization not found",
      });
    }

    return { id: org.id };
  });

export const getMany = authQuery
  .output(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        logo: z.string().nullable().optional(),
      })
    )
  )
  .query(async ({ ctx }) => {
    const members = await ctx.orm.query.member.findMany({
      where: {
        userId: { eq: ctx.userId as Id<"user"> },
      },
      limit: 20,
      orderBy: {
        createdAt: "asc",
      },
      with: {
        organization: true,
      },
    });

    if (!members.length) {
      return [];
    }

    return members.map((member) => {
      const organization = member.organization;

      if (!organization) {
        throw new CRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      return {
        id: organization.id,
        name: organization.name,
        logo: organization.logo,
      };
    });
  });

export const getOne = authQuery
  .output(
    z.object({
      id: z.string(),
      name: z.string(),
      logo: z.string().nullable(),
      link: z.string(),
      code: z.string(),
      createdAt: z.date(),
      isMember: z.boolean(),
    }).nullable()
  )
  .query(async ({ ctx }) => {
    const org = await ctx.orm.query.organization.findFirst({
      where: {
        id: { eq: ctx.user.activeOrganization?.id as Id<"organization"> },
      },
    });

    if (!org) {
      return null;
    }

    const member = await ctx.orm.query.member.findFirst({
      where: {
        organizationId: org.id as Id<"organization">,
        userId: ctx.user.id as Id<"user">,
      },
    });

    return {
      id: org.id,
      name: org.name,
      logo: org.logo ?? null,
      link: org.link,
      code: org.code,
      createdAt: org.createdAt,
      isMember: !!member,
    };
  })

export const create = authMutation
  .meta({ rateLimit: "organization/create" })
  .input(
    z.object({
      name: z.string(),
      slug: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const org = await ctx.auth.api.createOrganization({
      body: {
        name: input.name,
        slug: input.slug,
      },
      headers: ctx.auth.headers,
    });

    if (!org) {
      throw new CRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create organization",
      });
    }

    await setActiveOrganizationHandler(ctx, { organizationId: org.id });

    return { id: org.id };
  });

export const invite = authMutation
  .input(
    z.object({
      email: z.email(),
      role: z.enum(["member", "owner", "admin"]),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const members = await ctx.orm.query.member.findMany({
      where: {
        organizationId: { eq: ctx.user.activeOrganization?.id as Id<"organization"> },
      },
      limit: DEFAULT_LIST_LIMIT,
    });

    const currentMemberCount = members.length;
    const pendingInvitations = await ctx.orm.query.invitation.findMany({
      where: {
        organizationId: { eq: ctx.user.activeOrganization?.id as Id<"organization"> },
        status: { eq: "pending" },
      },
      limit: DEFAULT_LIST_LIMIT,
    });

    const pendingCount = pendingInvitations?.length || 0;
    const totalCount = currentMemberCount + pendingCount;

    if (totalCount >= MEMBER_LIMIT) {
      throw new CRPCError({
        code: "FORBIDDEN",
        message: `Organization member limit reached. Maximum ${MEMBER_LIMIT} members allowed (${currentMemberCount} current, ${pendingCount} pending invitations).`,
      });
    }

    // Check for existing pending invitations and cancel them
    // Using the email_organizationId_status index for efficient lookup
    const existingInvitations = await ctx.orm.query.invitation.findMany({
      where: {
        email: input.email,
        organizationId: ctx.user.activeOrganization?.id as Id<"organization">,
        status: "pending",
      },
      limit: DEFAULT_LIST_LIMIT,
    });

    // Cancel existing invitations by updating their status
    for (const existingInvitation of existingInvitations) {
      await ctx.orm
        .update(invitation)
        .set({ status: "canceled" })
        .where(eq(invitation.id, existingInvitation.id));
    }

    // Check if user is already a member.
    // Look up the user by email, then membership by (organizationId, userId) which is indexed.
    const existingUser = await ctx.orm.query.user.findFirst({
      where: { email: input.email },
    });
    if (existingUser) {
      const existingMember = await ctx.orm.query.member.findFirst({
        where: {
          organizationId: ctx.user.activeOrganization?.id as Id<"organization">,
          userId: existingUser.id as Id<"user">,
        },
      });
      if (existingMember) {
        throw new CRPCError({
          code: "CONFLICT",
          message: `${input.email} is already a member of this organization`,
        });
      }
    }

    // Create new invitation via Better Auth API (triggers configured email)
    // Create new invitation directly
    try {
      const { id: invitationId } = await ctx.auth.api.createInvitation({
        body: {
          email: input.email,
          organizationId: ctx.user.activeOrganization?.id as Id<"organization">,
          role: input.role,
        },
        headers: ctx.auth.headers,
      });

      if (!invitationId) {
        throw new CRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create invitation",
        });
      }
    } catch (error) {
      throw new CRPCError({
        code: "BAD_REQUEST",
        message: `Failed to send invitation: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  });

export const accept = authMutation
  .input(
    z.object({
      invitationId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const invitation = await ctx.orm.query.invitation.findFirstOrThrow({
      where: {
        id: input.invitationId as Id<"invitation">,
        email: ctx.user.email,
      },
    }).catch(() => {
      throw new CRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found",
      });
    });

    if (invitation.status !== "pending") {
      throw new CRPCError({
        code: "BAD_REQUEST",
        message: "This invitation has already been processed",
      });
    }

    await ctx.auth.api.acceptInvitation({
      body: {
        invitationId: input.invitationId,
      },
      headers: ctx.auth.headers,
    });
  });

export const reject = authMutation
  .input(
    z.object({
      invitationId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const invitation = await ctx.orm.query.invitation.findFirstOrThrow({
      where: {
        id: input.invitationId as Id<"invitation">,
        email: ctx.user.email,
      },
    }).catch(() => {
      throw new CRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found",
      });
    });

    if (invitation.status !== "pending") {
      throw new CRPCError({
        code: "BAD_REQUEST",
        message: "This invitation has already been processed",
      });
    }

    await ctx.auth.api.rejectInvitation({
      body: {
        invitationId: input.invitationId,
      },
      headers: ctx.auth.headers,
    });
  });

export const addMember = authMutation
  .meta({ rateLimit: "organization/addMember" })
  .input(
    z.object({
      members: z.array(
        z.object({
          email: z.email(),
          role: z.enum(["member", "owner", "admin"]),
        })
      ),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // IF NOT HAVE USER CREATE INVITATION ELSE ADD MEMBER
    for (const { email, role } of input.members) {
      const existingUser = await ctx.orm.query.user.findFirst({
        where: {
          email,
        },
      });

      if (!existingUser) {
        await ctx.auth.api.createInvitation({
          body: {
            email,
            organizationId: ctx.user.activeOrganization?.id as Id<"organization">,
            role,
            resend: false,
          },
          headers: ctx.auth.headers,
        });
      } else {
        const alreadyMember = await ctx.orm.query.member.findFirst({
          where: {
            organizationId: ctx.user.activeOrganization?.id as Id<"organization">,
            userId: existingUser.id as Id<"user">,
          },
        });

        if (alreadyMember) continue;

        await ctx.auth.api.addMember({
          body: {
            userId: existingUser.id,
            role,
            organizationId: ctx.user.activeOrganization?.id as Id<"organization">,
          },
          headers: ctx.auth.headers,
        });
      }
    }
  });

export const generateLink = authMutation
  .mutation(async ({ ctx }) => {
    return await ctx.orm
      .update(organization)
      .set({
        link: crypto.randomUUID(),
        code: Array.from(
          { length: 6 },
          () =>
            "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
        ).join(""),
      })
      .where(eq(organization.id, ctx.user.activeOrganization?.id as Id<"organization">));
  });

export const join = authMutation
  .input(
    z.object({
      joinCode: z.string(),
      link: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const organization = await ctx.orm.query.organization.findFirst({
      where: {
        link: input.link,
      },
    });

    if (!organization) {
      throw new CRPCError({
        code: "NOT_FOUND",
        message: "Organization not found",
      });
    }

    if (organization.code !== input.joinCode.toLowerCase()) {
      throw new CRPCError({
        code: "BAD_REQUEST",
        message: "Invalid join code",
      });
    }

    const alreadyMember = await ctx.orm.query.member.findFirst({
      where: {
        organizationId: organization.id as Id<"organization">,
        userId: ctx.user.id as Id<"user">,
      },
    });

    if (alreadyMember) {
      throw new CRPCError({
        code: "CONFLICT",
        message: "You are already a member of this organization",
      });
    }

    await ctx.auth.api.addMember({
      body: {
        userId: ctx.user.id,
        role: "member",
        organizationId: organization.id,
      },
      headers: ctx.auth.headers,
    });

    await setActiveOrganizationHandler(ctx, { organizationId: organization.id });
  })

const setActiveOrganizationHandler = async (
  ctx: AuthCtx<MutationCtx>,
  args: { organizationId: string }
) => {
  await ctx.auth.api.setActiveOrganization({
    body: {
      organizationId: args.organizationId,
    },
    headers: ctx.auth.headers,
  });
}