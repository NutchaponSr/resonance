import {
  boolean,
  convexTable,
  defineRelations,
  defineSchema,
  id,
  index,
  text,
} from 'better-convex/orm';

export const user = convexTable('user', {
  name: text().notNull(),
  email: text().notNull(),
});

export const posts = convexTable(
  'posts',
  {
    title: text().notNull(),
    published: boolean(),
    userId: id('user').notNull(),
  },
  (t) => [index('by_user').on(t.userId)]
);

const tables = { user, posts };
export default defineSchema(tables, { strict: false });

export const relations = defineRelations(tables, (r) => ({
  user: { posts: r.many.posts() },
  posts: { author: r.one.user({ from: r.posts.userId, to: r.user.id }) },
}));