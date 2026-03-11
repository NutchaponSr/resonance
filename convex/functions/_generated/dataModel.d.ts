/* eslint-disable */
/**
 * Generated data model types.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  DocumentByName,
  TableNamesInDataModel,
  SystemTableNames,
  AnyDataModel,
} from "convex/server";
import type { GenericId } from "convex/values";

/**
 * A type describing your Convex data model.
 *
 * This type includes information about what tables you have, the type of
 * documents stored in those tables, and the indexes defined on them.
 *
 * This type is used to parameterize methods like `queryGeneric` and
 * `mutationGeneric` to make them type-safe.
 */

export type DataModel = {
  account: {
    document: {
      accessToken?: null | string;
      accessTokenExpiresAt?: null | number;
      accountId: string;
      createdAt?: number;
      idToken?: null | string;
      password?: null | string;
      providerId: string;
      refreshToken?: null | string;
      refreshTokenExpiresAt?: null | number;
      scope?: null | string;
      updatedAt: number;
      userId: Id<"user">;
      _id: Id<"account">;
      _creationTime: number;
    };
    fieldPaths:
      | "accessToken"
      | "accessTokenExpiresAt"
      | "accountId"
      | "createdAt"
      | "_creationTime"
      | "_id"
      | "idToken"
      | "password"
      | "providerId"
      | "refreshToken"
      | "refreshTokenExpiresAt"
      | "scope"
      | "updatedAt"
      | "userId";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      accountId: ["accountId", "_creationTime"];
      accountId_providerId: ["accountId", "providerId", "_creationTime"];
      userId: ["userId", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  aggregate_bucket: {
    document: {
      count: number;
      indexName: string;
      keyHash: string;
      keyParts: Array<any>;
      nonNullCountValues: Record<string, number>;
      sumValues: Record<string, number>;
      tableKey: string;
      updatedAt: number;
      _id: Id<"aggregate_bucket">;
      _creationTime: number;
    };
    fieldPaths:
      | "count"
      | "_creationTime"
      | "_id"
      | "indexName"
      | "keyHash"
      | "keyParts"
      | "nonNullCountValues"
      | `nonNullCountValues.${string}`
      | "sumValues"
      | `sumValues.${string}`
      | "tableKey"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_table_index: ["tableKey", "indexName", "_creationTime"];
      by_table_index_hash: [
        "tableKey",
        "indexName",
        "keyHash",
        "_creationTime",
      ];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  aggregate_extrema: {
    document: {
      count: number;
      fieldName: string;
      indexName: string;
      keyHash: string;
      sortKey: string;
      tableKey: string;
      updatedAt: number;
      value: any;
      valueHash: string;
      _id: Id<"aggregate_extrema">;
      _creationTime: number;
    };
    fieldPaths:
      | "count"
      | "_creationTime"
      | "fieldName"
      | "_id"
      | "indexName"
      | "keyHash"
      | "sortKey"
      | "tableKey"
      | "updatedAt"
      | "value"
      | "valueHash";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_table_index: ["tableKey", "indexName", "_creationTime"];
      by_table_index_hash_field_sort: [
        "tableKey",
        "indexName",
        "keyHash",
        "fieldName",
        "sortKey",
        "_creationTime",
      ];
      by_table_index_hash_field_value: [
        "tableKey",
        "indexName",
        "keyHash",
        "fieldName",
        "valueHash",
        "_creationTime",
      ];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  aggregate_member: {
    document: {
      docId: string;
      extremaValues: Record<string, any>;
      indexName: string;
      keyHash: string;
      keyParts: Array<any>;
      kind: string;
      nonNullCountValues: Record<string, number>;
      rankKey?: null | any;
      rankNamespace?: null | any;
      rankSumValue?: null | number;
      sumValues: Record<string, number>;
      tableKey: string;
      updatedAt: number;
      _id: Id<"aggregate_member">;
      _creationTime: number;
    };
    fieldPaths:
      | "_creationTime"
      | "docId"
      | "extremaValues"
      | `extremaValues.${string}`
      | "_id"
      | "indexName"
      | "keyHash"
      | "keyParts"
      | "kind"
      | "nonNullCountValues"
      | `nonNullCountValues.${string}`
      | "rankKey"
      | "rankNamespace"
      | "rankSumValue"
      | "sumValues"
      | `sumValues.${string}`
      | "tableKey"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_kind_table_index: ["kind", "tableKey", "indexName", "_creationTime"];
      by_kind_table_index_doc: [
        "kind",
        "tableKey",
        "indexName",
        "docId",
        "_creationTime",
      ];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  aggregate_rank_node: {
    document: {
      aggregate?: null | { count: number; sum: number };
      items: Array<{ k: any; s: number; v: any }>;
      subtrees: Array<string>;
      _id: Id<"aggregate_rank_node">;
      _creationTime: number;
    };
    fieldPaths:
      | "aggregate"
      | "aggregate.count"
      | "aggregate.sum"
      | "_creationTime"
      | "_id"
      | "items"
      | "subtrees";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  aggregate_rank_tree: {
    document: {
      aggregateName: string;
      maxNodeSize: number;
      namespace?: null | any;
      root: Id<"aggregate_rank_node">;
      _id: Id<"aggregate_rank_tree">;
      _creationTime: number;
    };
    fieldPaths:
      | "aggregateName"
      | "_creationTime"
      | "_id"
      | "maxNodeSize"
      | "namespace"
      | "root";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_aggregate_name: ["aggregateName", "_creationTime"];
      by_namespace: ["namespace", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  aggregate_state: {
    document: {
      completedAt?: null | number;
      cursor?: null | string;
      indexName: string;
      keyDefinitionHash: string;
      kind: string;
      lastError?: null | string;
      metricDefinitionHash: string;
      processed: number;
      startedAt: number;
      status: string;
      tableKey: string;
      updatedAt: number;
      _id: Id<"aggregate_state">;
      _creationTime: number;
    };
    fieldPaths:
      | "completedAt"
      | "_creationTime"
      | "cursor"
      | "_id"
      | "indexName"
      | "keyDefinitionHash"
      | "kind"
      | "lastError"
      | "metricDefinitionHash"
      | "processed"
      | "startedAt"
      | "status"
      | "tableKey"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_kind_status: ["kind", "status", "_creationTime"];
      by_kind_table_index: ["kind", "tableKey", "indexName", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  comment: {
    document: {
      authorId: Id<"user">;
      body: Array<{
        annotations: {
          bold: null | boolean;
          code: null | boolean;
          color:
            | null
            | "default"
            | "gray"
            | "brown"
            | "orange"
            | "yellow"
            | "green"
            | "blue"
            | "purple"
            | "pink"
            | "red"
            | "gray_background"
            | "brown_background"
            | "orange_background"
            | "yellow_background"
            | "green_background"
            | "blue_background"
            | "purple_background"
            | "pink_background"
            | "red_background";
          italic: null | boolean;
          strikeThrough: null | boolean;
          underline: null | boolean;
        };
        expression: null | string;
        href: null | string;
        mentionPageId: null | Id<"page">;
        text: string;
        type: "text" | "mention_user" | "mention_page" | "equation" | "code";
        userId: null | Id<"user">;
      }>;
      createdAt?: number;
      isResolved: boolean;
      pageId: Id<"page">;
      parentCommentId?: null | Id<"comment">;
      resolvedAt?: null | number;
      resolvedBy?: null | Id<"user">;
      updatedAt: number;
      _id: Id<"comment">;
      _creationTime: number;
    };
    fieldPaths:
      | "authorId"
      | "body"
      | "createdAt"
      | "_creationTime"
      | "_id"
      | "isResolved"
      | "pageId"
      | "parentCommentId"
      | "resolvedAt"
      | "resolvedBy"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      authorId: ["authorId", "_creationTime"];
      pageId: ["pageId", "_creationTime"];
      pageId_isResolved: ["pageId", "isResolved", "_creationTime"];
      parentCommentId: ["parentCommentId", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  database: {
    document: {
      coverImage?: null | string;
      createdAt?: number;
      createdBy: Id<"user">;
      description?: null | string;
      icon?: null | string;
      organizationId: Id<"organization">;
      pageId: Id<"page">;
      title?: null | string;
      updatedAt: number;
      _id: Id<"database">;
      _creationTime: number;
    };
    fieldPaths:
      | "coverImage"
      | "createdAt"
      | "createdBy"
      | "_creationTime"
      | "description"
      | "icon"
      | "_id"
      | "organizationId"
      | "pageId"
      | "title"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      createdBy: ["createdBy", "_creationTime"];
      organizationId: ["organizationId", "_creationTime"];
      pageId: ["pageId", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  invitation: {
    document: {
      createdAt?: number;
      email: string;
      expiresAt: number;
      inviterId: Id<"user">;
      organizationId: Id<"organization">;
      role: string;
      status: string;
      _id: Id<"invitation">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "email"
      | "expiresAt"
      | "_id"
      | "inviterId"
      | "organizationId"
      | "role"
      | "status";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      email: ["email", "_creationTime"];
      email_organizationId_status: [
        "email",
        "organizationId",
        "status",
        "_creationTime",
      ];
      organizationId_status: ["organizationId", "status", "_creationTime"];
      status: ["status", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  jwks: {
    document: {
      createdAt?: number;
      privateKey: string;
      publicKey: string;
      _id: Id<"jwks">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "_id"
      | "privateKey"
      | "publicKey";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  member: {
    document: {
      createdAt?: number;
      organizationId: Id<"organization">;
      role: string;
      userId: Id<"user">;
      _id: Id<"member">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "_id"
      | "organizationId"
      | "role"
      | "userId";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      organizationId_role: ["organizationId", "role", "_creationTime"];
      organizationId_userId: ["organizationId", "userId", "_creationTime"];
      userId: ["userId", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  migration_run: {
    document: {
      allowDrift: boolean;
      cancelRequested: boolean;
      completedAt?: null | number;
      currentIndex: number;
      direction: string;
      dryRun: boolean;
      lastError?: null | string;
      migrationIds: Array<string>;
      runId: string;
      startedAt: number;
      status: string;
      updatedAt: number;
      _id: Id<"migration_run">;
      _creationTime: number;
    };
    fieldPaths:
      | "allowDrift"
      | "cancelRequested"
      | "completedAt"
      | "_creationTime"
      | "currentIndex"
      | "direction"
      | "dryRun"
      | "_id"
      | "lastError"
      | "migrationIds"
      | "runId"
      | "startedAt"
      | "status"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_run_id: ["runId", "_creationTime"];
      by_status: ["status", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  migration_state: {
    document: {
      applied: boolean;
      checksum: string;
      completedAt?: null | number;
      cursor?: null | string;
      direction?: null | string;
      lastError?: null | string;
      migrationId: string;
      processed: number;
      runId?: null | string;
      startedAt?: null | number;
      status: string;
      updatedAt: number;
      writeMode: string;
      _id: Id<"migration_state">;
      _creationTime: number;
    };
    fieldPaths:
      | "applied"
      | "checksum"
      | "completedAt"
      | "_creationTime"
      | "cursor"
      | "direction"
      | "_id"
      | "lastError"
      | "migrationId"
      | "processed"
      | "runId"
      | "startedAt"
      | "status"
      | "updatedAt"
      | "writeMode";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      by_migration_id: ["migrationId", "_creationTime"];
      by_status: ["status", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  organization: {
    document: {
      createdAt?: number;
      logo?: null | string;
      metadata?: null | any;
      name: string;
      slug: string;
      _id: Id<"organization">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "_id"
      | "logo"
      | "metadata"
      | "name"
      | "slug";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      name: ["name", "_creationTime"];
      slug: ["slug", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  page: {
    document: {
      blockContent: string;
      body?: null | Array<{
        bold: null | boolean;
        code: null | boolean;
        color: null | string;
        href: null | string;
        italic: null | boolean;
        strikethrough: null | boolean;
        text: string;
        type: "text" | "mention_user" | "mention_page" | "equation";
        underline: null | boolean;
      }>;
      bookmarkTitle?: null | string;
      calloutIcon?: null | string;
      caption?: null | string;
      checked?: null | boolean;
      code?: null | string;
      color?:
        | null
        | "default"
        | "gray"
        | "brown"
        | "orange"
        | "yellow"
        | "green"
        | "blue"
        | "purple"
        | "pink"
        | "red"
        | "gray_background"
        | "brown_background"
        | "orange_background"
        | "yellow_background"
        | "green_background"
        | "blue_background"
        | "purple_background"
        | "pink_background"
        | "red_background";
      columnCount?: null | number;
      coverImage?: null | string;
      createdAt?: number;
      createdBy: Id<"user">;
      databaseId?: null | Id<"database">;
      description?: null | string;
      hasColumnHeader?: null | boolean;
      hasRowHeader?: null | boolean;
      icon?: null | string;
      isArchived: boolean;
      isToggleable?: null | boolean;
      isTrashed: boolean;
      language?:
        | null
        | "abap"
        | "arduino"
        | "bash"
        | "basic"
        | "c"
        | "clojure"
        | "coffeescript"
        | "cpp"
        | "csharp"
        | "css"
        | "dart"
        | "diff"
        | "docker"
        | "elixir"
        | "elm"
        | "erlang"
        | "flow"
        | "fortran"
        | "fsharp"
        | "gherkin"
        | "glsl"
        | "go"
        | "graphql"
        | "groovy"
        | "haskell"
        | "html"
        | "java"
        | "javascript"
        | "json"
        | "julia"
        | "kotlin"
        | "latex"
        | "less"
        | "lisp"
        | "livescript"
        | "lua"
        | "makefile"
        | "markdown"
        | "markup"
        | "matlab"
        | "mermaid"
        | "nix"
        | "objective_c"
        | "ocaml"
        | "pascal"
        | "perl"
        | "php"
        | "plain_text"
        | "powershell"
        | "prolog"
        | "protobuf"
        | "python"
        | "r"
        | "reason"
        | "ruby"
        | "rust"
        | "sass"
        | "scala"
        | "scheme"
        | "scss"
        | "shell"
        | "sql"
        | "swift"
        | "typescript"
        | "vb_net"
        | "verilog"
        | "vhdl"
        | "visual_basic"
        | "webassembly"
        | "xml"
        | "yaml"
        | "java_or_kotlin";
      lastEditedBy: Id<"user">;
      mimeType?: null | string;
      name?: null | string;
      organizationId: Id<"organization">;
      parentId?: null | Id<"page">;
      previewImage?: null | string;
      size?: null | number;
      sortOrder: string;
      syncedFromPageId?: null | Id<"page">;
      title?: null | string;
      trashedAt?: null | number;
      type:
        | "page"
        | "database"
        | "paragraph"
        | "heading_1"
        | "heading_2"
        | "heading_3"
        | "bulleted_list_item"
        | "numbered_list_item"
        | "toggle"
        | "to_do"
        | "quote"
        | "callout"
        | "divider"
        | "code"
        | "image"
        | "video"
        | "file"
        | "bookmark"
        | "embed"
        | "table"
        | "table_row"
        | "column_list"
        | "column"
        | "template"
        | "synced_block";
      updatedAt: number;
      url?: null | string;
      width?: null | number;
      _id: Id<"page">;
      _creationTime: number;
    };
    fieldPaths:
      | "blockContent"
      | "body"
      | "bookmarkTitle"
      | "calloutIcon"
      | "caption"
      | "checked"
      | "code"
      | "color"
      | "columnCount"
      | "coverImage"
      | "createdAt"
      | "createdBy"
      | "_creationTime"
      | "databaseId"
      | "description"
      | "hasColumnHeader"
      | "hasRowHeader"
      | "icon"
      | "_id"
      | "isArchived"
      | "isToggleable"
      | "isTrashed"
      | "language"
      | "lastEditedBy"
      | "mimeType"
      | "name"
      | "organizationId"
      | "parentId"
      | "previewImage"
      | "size"
      | "sortOrder"
      | "syncedFromPageId"
      | "title"
      | "trashedAt"
      | "type"
      | "updatedAt"
      | "url"
      | "width";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      createdBy: ["createdBy", "_creationTime"];
      databaseId: ["databaseId", "_creationTime"];
      isTrashed: ["isTrashed", "_creationTime"];
      organizationId: ["organizationId", "_creationTime"];
      organizationId_type: ["organizationId", "type", "_creationTime"];
      parentId: ["parentId", "_creationTime"];
      parentId_sortOrder: ["parentId", "sortOrder", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  property: {
    document: {
      createdAt?: number;
      databaseId: Id<"database">;
      expression?: null | string;
      groups?: null | Array<{ color: null | string; id: string; name: string }>;
      isHidden: boolean;
      isPrimary: boolean;
      name: string;
      numberFormat?:
        | null
        | "number"
        | "dollar"
        | "euro"
        | "pound"
        | "baht"
        | "yen"
        | "percent"
        | "rupee"
        | "won"
        | "ruble";
      options?: null | Array<{
        color: null | string;
        id: string;
        name: string;
      }>;
      propertyConfig: string;
      relationDatabaseId?: null | Id<"database">;
      relationPropertyId?: null | string;
      rollupFunction?:
        | null
        | "count"
        | "conut_values"
        | "sum"
        | "average"
        | "min"
        | "max"
        | "median"
        | "percent_empty"
        | "percent_not_empty"
        | "show_original"
        | "show_unique";
      rollupPropertyId?: null | string;
      sortOrder: string;
      syncedPropertyId?: null | string;
      type?:
        | null
        | "title"
        | "text"
        | "number"
        | "select"
        | "multi_select"
        | "status"
        | "date"
        | "person"
        | "files"
        | "checkbox"
        | "url"
        | "email"
        | "phone"
        | "formula"
        | "relation"
        | "rollup"
        | "created_time"
        | "created_by"
        | "last_edited_time"
        | "last_edited_by";
      updatedAt: number;
      _id: Id<"property">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "databaseId"
      | "expression"
      | "groups"
      | "_id"
      | "isHidden"
      | "isPrimary"
      | "name"
      | "numberFormat"
      | "options"
      | "propertyConfig"
      | "relationDatabaseId"
      | "relationPropertyId"
      | "rollupFunction"
      | "rollupPropertyId"
      | "sortOrder"
      | "syncedPropertyId"
      | "type"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      databaseId: ["databaseId", "_creationTime"];
      databaseId_type: ["databaseId", "type", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  propertyValue: {
    document: {
      checkbox?: null | boolean;
      databaseId: Id<"database">;
      detail: string;
      email?: null | string;
      end?: null | number;
      files?: null | Array<{
        mimeType: null | string;
        name: string;
        url: string;
      }>;
      number?: null | number;
      optionId?: null | string;
      optionIds?: null | Array<string>;
      pageId: Id<"page">;
      pageIds?: null | Array<Id<"page">>;
      phone?: null | string;
      propertyId: Id<"property">;
      result?: null | string;
      start?: null | number;
      text?: null | string;
      updatedAt: number;
      url?: null | string;
      userIds?: null | Array<Id<"user">>;
      _id: Id<"propertyValue">;
      _creationTime: number;
    };
    fieldPaths:
      | "checkbox"
      | "_creationTime"
      | "databaseId"
      | "detail"
      | "email"
      | "end"
      | "files"
      | "_id"
      | "number"
      | "optionId"
      | "optionIds"
      | "pageId"
      | "pageIds"
      | "phone"
      | "propertyId"
      | "result"
      | "start"
      | "text"
      | "updatedAt"
      | "url"
      | "userIds";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      databaseId: ["databaseId", "_creationTime"];
      pageId: ["pageId", "_creationTime"];
      pageId_propertyId: ["pageId", "propertyId", "_creationTime"];
      propertyId: ["propertyId", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  session: {
    document: {
      activeOrganizationId?: null | string;
      createdAt?: number;
      expiresAt: number;
      ipAddress?: null | string;
      token: string;
      updatedAt: number;
      userAgent?: null | string;
      userId: Id<"user">;
      _id: Id<"session">;
      _creationTime: number;
    };
    fieldPaths:
      | "activeOrganizationId"
      | "createdAt"
      | "_creationTime"
      | "expiresAt"
      | "_id"
      | "ipAddress"
      | "token"
      | "updatedAt"
      | "userAgent"
      | "userId";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      expiresAt: ["expiresAt", "_creationTime"];
      expiresAt_userId: ["expiresAt", "userId", "_creationTime"];
      token: ["token", "_creationTime"];
      userId: ["userId", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  user: {
    document: {
      createdAt?: number;
      email: string;
      emailVerified: boolean;
      image?: null | string;
      name: string;
      updatedAt: number;
      _id: Id<"user">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "email"
      | "emailVerified"
      | "_id"
      | "image"
      | "name"
      | "updatedAt";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      email: ["email", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
  verification: {
    document: {
      createdAt?: null | number;
      expiresAt: number;
      identifier: string;
      updatedAt?: null | number;
      value: string;
      _id: Id<"verification">;
      _creationTime: number;
    };
    fieldPaths:
      | "createdAt"
      | "_creationTime"
      | "expiresAt"
      | "_id"
      | "identifier"
      | "updatedAt"
      | "value";
    indexes: {
      by_id: ["_id"];
      by_creation_time: ["_creationTime"];
      expiresAt: ["expiresAt", "_creationTime"];
      identifier: ["identifier", "_creationTime"];
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
};

/**
 * The names of all of your Convex tables.
 */
export type TableNames = TableNamesInDataModel<DataModel>;

/**
 * The type of a document stored in Convex.
 *
 * @typeParam TableName - A string literal type of the table name (like "users").
 */
export type Doc<TableName extends TableNames> = DocumentByName<
  DataModel,
  TableName
>;

/**
 * An identifier for a document in Convex.
 *
 * Convex documents are uniquely identified by their `Id`, which is accessible
 * on the `_id` field. To learn more, see [Document IDs](https://docs.convex.dev/using/document-ids).
 *
 * Documents can be loaded using `db.get(tableName, id)` in query and mutation functions.
 *
 * IDs are just strings at runtime, but this type can be used to distinguish them from other
 * strings when type checking.
 *
 * @typeParam TableName - A string literal type of the table name (like "users").
 */
export type Id<TableName extends TableNames | SystemTableNames> =
  GenericId<TableName>;
