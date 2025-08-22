import { pgTable, serial, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sqliteTable, integer, text as sqliteText } from 'drizzle-orm/sqlite-core';
import { config } from '../config';

// PostgreSQL schema
export const pgUsers = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  bio: text('bio'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pgPosts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: serial('author_id').references(() => pgUsers.id),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// SQLite schema
export const sqliteUsers = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: sqliteText('name').notNull(),
  email: sqliteText('email').notNull().unique(),
  bio: sqliteText('bio'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const sqlitePosts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: sqliteText('title').notNull(),
  content: sqliteText('content').notNull(),
  authorId: integer('author_id').references(() => sqliteUsers.id),
  published: integer('published', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Export the appropriate schema based on database type
export const users = config.database.type === 'postgresql' ? pgUsers : sqliteUsers;
export const posts = config.database.type === 'postgresql' ? pgPosts : sqlitePosts;