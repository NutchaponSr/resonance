import {
  arrayOf,
  boolean,
  convexTable,
  defineRelations,
  defineSchema,
  discriminator,
  id,
  index,
  integer,
  json,
  objectOf,
  text,
  textEnum,
  timestamp
} from "better-convex/orm";

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
  link: text().notNull().$defaultFn(() => crypto.randomUUID()),
  code: text().notNull().$defaultFn(() => Array.from(
    { length: 6 },
    () =>
      "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("")),
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

export const database = convexTable("database", {
  organizationId: id("organization").notNull(),
  pageId: id("page").notNull(),
  title: text(),
  icon: text(),
  coverImage: text(),
  description: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: integer().notNull(),
  createdBy: id("user").notNull(),
}, (t) => [
  index("organizationId").on(t.organizationId),
  index("pageId").on(t.pageId),
  index("createdBy").on(t.createdBy),
]);

export const property = convexTable("property", {
  databaseId: id("database").notNull(),
  name: text().notNull(),
  type: textEnum([
    "title",
    "text",
    "number",
    "select",
    "multi_select",
    "status",
    "date",
    "person",
    "files",
    "checkbox",
    "url",
    "email",
    "phone",
    "formula",
    "relation",
    "rollup",
    "created_time",
    "created_by",
    "last_edited_time",
    "last_edited_by",
  ]),
  propertyConfig: discriminator({
    as: "config",
    variants: {
      select: {
        options: arrayOf(objectOf({
          id: text().notNull(),
          name: text().notNull(),
          color: text(),
        })).notNull(),
      },
      multi_select: {
        options: arrayOf(objectOf({
          id: text().notNull(),
          name: text().notNull(),
          color: text(),
        })).notNull(),
      },
      status: {
        options: arrayOf(objectOf({
          id: text().notNull(),
          name: text().notNull(),
          color: text(),
        })).notNull(),
        groups: arrayOf(objectOf({
          id: text().notNull(),
          name: text().notNull(),
          color: text(),
        })).notNull(),
      },
      number: {
        numberFormat: textEnum([
          "number",
          "dollar",
          "euro",
          "pound",
          "baht",
          "yen",
          "percent",
          "rupee",
          "won",
          "ruble"
        ] as const).notNull(),
      },
      formula: {
        expression: text().notNull(),
      },
      relation: {
        relationDatabaseId: id("database").notNull(),
        syncedPropertyId: text(),
      },
      rollup: {
        relationPropertyId: text().notNull(),
        rollupPropertyId: text().notNull(),
        rollupFunction: textEnum([
          "count",
          "conut_values",
          "sum",
          "average",
          "min",
          "max",
          "median",
          "percent_empty",
          "percent_not_empty",
          "show_original",
          "show_unique",
        ] as const).notNull(),
      },
      title: {},
      text: {},
      date: {},
      person: {},
      files: {},
      checkbox: {},
      url: {},
      email: {},
      phone: {},
      created_time: {},
      created_by: {},
      last_edited_time: {},
      last_edited_by: {},
    },
  }),
  sortOrder: text().notNull(),
  isPrimary: boolean().notNull(),
  isHidden: boolean().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: integer().notNull(),
}, (t) => [
  index("databaseId").on(t.databaseId),
  index("databaseId_type").on(t.databaseId, t.type),
]);

export const propertyValue = convexTable("propertyValue", {
  pageId: id("page").notNull(),
  propertyId: id("property").notNull(),
  databaseId: id("database").notNull(),
  updatedAt: integer().notNull(),
  detail: discriminator({
    as: "value",
    variants: {
      title: {
        text: text().notNull(),
      },
      text: {
        text: text().notNull(),
      },
      number: {
        number: integer().notNull(),
      },
      checkbox: {
        checkbox: boolean().notNull(),
      },
      select: {
        optionId: text().notNull(),
      },
      multi_select: {
        optionIds: arrayOf(text().notNull()).notNull(),
      },
      date: {
        start: timestamp().notNull(),
        end: timestamp(),
      },
      person: {
        userIds: arrayOf(id("user").notNull()).notNull(),
      },
      files: {
        files: arrayOf(objectOf({
          name: text().notNull(),
          url: text().notNull(),
          mimeType: text(),
        })).notNull(),
      },
      url: {
        url: text().notNull(),
      },
      email: {
        email: text().notNull(),
      },
      phone: {
        phone: text().notNull(),
      },
      formula: {
        result: text().notNull(),
      },
      relation: {
        pageIds: arrayOf(id("page").notNull()).notNull(),
      },
      rollup: {
        result: text().notNull(),
      },
      created_time: {},
      created_by: {},
      last_edited_time: {},
      last_edited_by: {},
      status: {
        optionId: text().notNull(),
      },
    },
  }),
}, (t) => [
  index("pageId").on(t.pageId),
  index("propertyId").on(t.propertyId),
  index("pageId_propertyId").on(t.pageId, t.propertyId),
  index("databaseId").on(t.databaseId),
]);

const richTextSpan = objectOf({
  type: textEnum(["text", "mention_user", "mention_page", "equation"] as const).notNull(),
  text: text().notNull(),
  href: text(),
  bold: boolean(),
  italic: boolean(),
  strikethrough: boolean(),
  underline: boolean(),
  code: boolean(),
  color: text(),
});

const richTextBody = arrayOf(richTextSpan);

export const page = convexTable(
  "page",
  {
    organizationId: id("organization").notNull(),
    parentId: id("page"),
    databaseId: id("database"),

    type: textEnum([
      "page", "database",
      "paragraph", "heading_1", "heading_2", "heading_3",
      "bulleted_list_item", "numbered_list_item", "toggle", "to_do",
      "quote", "callout", "divider", "code",
      "image", "video", "file", "bookmark", "embed",
      "table", "table_row", "column_list", "column",
      "template", "synced_block",
    ] as const).notNull(),

    title: text(),
    icon: text(),
    coverImage: text(),
    sortOrder: text().notNull(),
    isArchived: boolean().notNull(),
    isTrashed: boolean().notNull(),
    trashedAt: timestamp(),
    color: textEnum([
      "default", "gray", "brown", "orange", "yellow",
      "green", "blue", "purple", "pink", "red",
      "gray_background", "brown_background", "orange_background",
      "yellow_background", "green_background", "blue_background",
      "purple_background", "pink_background", "red_background",
    ] as const),

    blockContent: discriminator({
      as: "block",
      variants: {
        // ── no content ──────────────────────────
        page: {},
        database: {},
        divider: {},
        column_list: {},
        column: {},
        table_row: {},
        template: {},

        // ── rich text blocks ────────────────────
        paragraph: {
          body: richTextBody,
        },
        heading_1: {
          body: richTextBody,
          isToggleable: boolean(),
        },
        heading_2: {
          body: richTextBody,
          isToggleable: boolean(),
        },
        heading_3: {
          body: richTextBody,
          isToggleable: boolean(),
        },
        bulleted_list_item: {
          body: richTextBody,
        },
        numbered_list_item: {
          body: richTextBody,
        },
        toggle: {
          body: richTextBody,
        },
        quote: {
          body: richTextBody,
        },
        callout: {
          body: richTextBody,
          calloutIcon: text(), // emoji or image url
        },

        // ── to_do ───────────────────────────────
        to_do: {
          body: richTextBody,
          checked: boolean().notNull(),
        },

        // ── code ────────────────────────────────
        code: {
          code: text().notNull(),
          language: textEnum([
            "abap", "arduino", "bash", "basic", "c", "clojure", "coffeescript",
            "cpp", "csharp", "css", "dart", "diff", "docker", "elixir", "elm",
            "erlang", "flow", "fortran", "fsharp", "gherkin", "glsl", "go",
            "graphql", "groovy", "haskell", "html", "java", "javascript", "json",
            "julia", "kotlin", "latex", "less", "lisp", "livescript", "lua",
            "makefile", "markdown", "markup", "matlab", "mermaid", "nix",
            "objective_c", "ocaml", "pascal", "perl", "php", "plain_text",
            "powershell", "prolog", "protobuf", "python", "r", "reason", "ruby",
            "rust", "sass", "scala", "scheme", "scss", "shell", "sql", "swift",
            "typescript", "vb_net", "verilog", "vhdl", "visual_basic", "webassembly",
            "xml", "yaml", "java_or_kotlin",
          ] as const).notNull(),
          caption: text(),
        },

        // ── media ───────────────────────────────
        image: {
          url: text().notNull(),
          caption: text(),
          width: integer(),
        },
        video: {
          url: text().notNull(),
          caption: text(),
        },
        file: {
          url: text().notNull(),
          name: text().notNull(),
          mimeType: text(),
          size: integer(), // bytes
          caption: text(),
        },

        // ── link / embed ─────────────────────────
        bookmark: {
          url: text().notNull(),
          bookmarkTitle: text(),
          description: text(),
          previewImage: text(),
        },
        embed: {
          url: text().notNull(),
          caption: text(),
        },

        // ── table ────────────────────────────────
        table: {
          columnCount: integer().notNull(),
          hasColumnHeader: boolean().notNull(),
          hasRowHeader: boolean().notNull(),
        },

        // ── synced block ─────────────────────────
        synced_block: {
          syncedFromPageId: id("page"), // null = original source
        },
      },
    }),

    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: integer().notNull(),
    createdBy: id("user").notNull(),
    lastEditedBy: id("user").notNull(),
  },
  (t) => [
    index("organizationId").on(t.organizationId),
    index("parentId").on(t.parentId),
    index("databaseId").on(t.databaseId),
    index("organizationId_type").on(t.organizationId, t.type),
    index("parentId_sortOrder").on(t.parentId, t.sortOrder),
    index("createdBy").on(t.createdBy),
    index("isTrashed").on(t.isTrashed),
  ]
);

export const comment = convexTable("comment", {
  pageId: id("page").notNull(),
  parentCommentId: id("comment"),
  authorId: id("user").notNull(),
  body: arrayOf(
    objectOf({
      type: textEnum([
        "text",
        "mention_user",
        "mention_page",
        "equation",
        "code",
      ] as const).notNull(),
      text: text().notNull(),
      annotations: objectOf({
        bold: boolean(),
        italic: boolean(),
        strikeThrough: boolean(),
        underline: boolean(),
        code: boolean(),
        color: textEnum([
          "default",
          "gray",
          "brown",
          "orange",
          "yellow",
          "green",
          "blue",
          "purple",
          "pink",
          "red",
          "gray_background",
          "brown_background",
          "orange_background",
          "yellow_background",
          "green_background",
          "blue_background",
          "purple_background",
          "pink_background",
          "red_background",
        ] as const),
      }),
      userId: id("user"),
      mentionPageId: id("page"),
      expression: text(),
      href: text(),
    })
  ).notNull(),
  isResolved: boolean().notNull(),
  resolvedAt: timestamp(),
  resolvedBy: id("user"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: integer().notNull(),
}, (t) => [
  index("pageId").on(t.pageId),
  index("pageId_isResolved").on(t.pageId, t.isResolved),
  index("parentCommentId").on(t.parentCommentId),
  index("authorId").on(t.authorId),
]);

// export const favorite = convexTable("favorite", {
//   userId: id("user").notNull(),
//   pageId: id("page").notNull(),
//   organizationId: id("organization").notNull(),
//   createdAt: timestamp().notNull().defaultNow(),
// }, (t) => [
//   index("userId_organizationId").on(t.userId, t.organizationId),
//   index("userId_pageId").on(t.userId, t.pageId),
// ]);

export const tables = {
  user,
  session,
  account,
  verification,
  jwks,
  organization,
  member,
  invitation,
  database,
  property,
  propertyValue,
  comment,
  page,
};
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
    databases: r.many.database({
      from: r.organization.id,
      to: r.database.organizationId,
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
    comments: r.many.comment({
      from: r.user.id,
      to: r.comment.authorId,
    }),
  },
  page: {
    parent: r.one.page({
      from: r.page.parentId,
      to: r.page.id,
    }),
    children: r.many.page({
      from: r.page.id,
      to: r.page.parentId,
    }),
    database: r.one.database({
      from: r.page.databaseId,
      to: r.database.id,
    }),
    propertyValues: r.many.propertyValue({
      from: r.page.id,
      to: r.propertyValue.pageId,
    }),
    comments: r.many.comment({
      from: r.page.id,
      to: r.comment.pageId,
    }),
  },
  database: {
    page: r.one.page({
      from: r.database.pageId,
      to: r.page.id,
    }),
    properties: r.many.property({
      from: r.database.id,
      to: r.property.databaseId,
    }),
    rows: r.many.page({
      from: r.database.id,
      to: r.page.databaseId,
    }),
  },
  property: {
    database: r.one.database({
      from: r.property.databaseId,
      to: r.database.id,
    }),
    values: r.many.propertyValue({
      from: r.property.id,
      to: r.propertyValue.propertyId,
    }),
  },
  propertyValue: {
    page: r.one.page({ from: r.propertyValue.pageId, to: r.page.id }),
    property: r.one.property({
      from: r.propertyValue.propertyId,
      to: r.property.id,
    }),
    database: r.one.database({
      from: r.propertyValue.databaseId,
      to: r.database.id,
    }),
  },
  comment: {
    page: r.one.page({ from: r.comment.pageId, to: r.page.id }),
    author: r.one.user({ from: r.comment.authorId, to: r.user.id }),
    parent: r.one.comment({
      from: r.comment.parentCommentId,
      to: r.comment.id,
    }),
    replies: r.many.comment({
      from: r.comment.id,
      to: r.comment.parentCommentId,
    }),
  },
}))