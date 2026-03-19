import z from "zod";

import { generateKeyBetween } from "fractional-indexing";

import { authMutation, authQuery } from "../lib/crpc";

import { database, page, property } from "./schema";
import { Id } from "./_generated/dataModel";
import { eq } from "better-convex/orm";
import { CRPCError } from "better-convex/server";

export const initial = authMutation
  .input(
    z.object({
      organizationId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const now = Date.now();

    const [pageRow] = await ctx.orm
      .insert(page)
      .values({
        organizationId: input.organizationId as Id<"organization">,
        type: "database",
        title: "Student Information System (SIS)",
        coverImage: null,
        sortOrder: generateKeyBetween(null, null),
        isArchived: false,
        isTrashed: false,
        trashedAt: null,
        color: null,
        blockContent: "database",
        createdAt: new Date(),
        updatedAt: now,
        createdBy: ctx.userId as Id<"user">,
        lastEditedBy: ctx.userId as Id<"user">,
      })
      .returning({
        id: page.id,
        name: page.title,
      });

    const [databaseRow] = await ctx.orm
      .insert(database)
      .values({
        organizationId: input.organizationId as Id<"organization">,
        pageId: pageRow.id as Id<"page">,
        title: pageRow.name,
        createdAt: new Date(),
        updatedAt: now,
        createdBy: ctx.userId as Id<"user">,
      })
      .returning({ id: database.id });

    // Link the page to the database
    await ctx.orm
      .update(page)
      .set({
        databaseId: databaseRow.id as Id<"database">,
      })
      .where(eq(page.id, pageRow.id));

    // Create the default properties
    await ctx.orm
      .insert(property)
      .values({
        databaseId: databaseRow.id as Id<"database">,
        name: "Name",
        propertyConfig: "title",
        sortOrder: generateKeyBetween(null, null),
        type: "select",
        isPrimary: true,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: now,
      });

    return databaseRow.id;
  });

export const getMany = authQuery
  .output(
    z.array(
      z.object({
        id: z.string(),
        icon: z.string().nullable().optional(),
        coverImage: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        createdAt: z.date(),
        updatedAt: z.number(),
        createdBy: z.string(),
        title: z.string().nullable().optional(),
        pageId: z.string(),
      })
    )
  )
  .query(async ({ ctx, input }) => {
    const databases = await ctx.orm.query.database.findMany({
      where: {
        organizationId: { eq: ctx.user.activeOrganization?.id as Id<"organization"> },
      },
      limit: 5,
    });

    return databases;
  });

export const getOne = authQuery
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const database = await ctx.orm.query.database.findFirst({
      where: {
        id: { eq: input.id as Id<"database"> },
      },
      with: {
        properties: {
          limit: 10,
        },
      }
    });

    if (!database) {
      throw new CRPCError({
        code: "NOT_FOUND",
        message: "Database not found",
      });
    }

    return database;
  });