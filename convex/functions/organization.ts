import z from "zod";

import { CRPCError } from "better-convex/server";

import { AuthCtx, authMutation, authQuery, publicQuery } from "../lib/crpc";
import { MutationCtx } from "./generated/server";
import { Id } from "./_generated/dataModel";

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
  .output(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    logo: z.string().nullable().optional(),
  }))
  .query(async ({ ctx }) => {
    const org = await ctx.orm.query.organization.findFirst({
      where: {
        id: { eq: ctx.user.activeOrganization?.id as Id<"organization"> },
      },
    });

    return { id: org?.id, name: org?.name, logo: org?.logo };
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