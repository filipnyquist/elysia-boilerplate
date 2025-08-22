import { drizzle, BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { config } from '../config';
import * as schema from './schema';

// For PostgreSQL, we'll import dynamically when needed
type PostgreSQLDB = any;

let db: BunSQLiteDatabase<typeof schema> | PostgreSQLDB;

export async function getDatabase() {
  if (db) return db;

  if (config.database.type === 'sqlite') {
    const sqlite = new Database(config.database.url, { create: true });
    db = drizzle(sqlite, { schema });
  } else if (config.database.type === 'postgresql') {
    // Dynamic import for PostgreSQL dependencies
    const { drizzle: pgDrizzle } = await import('drizzle-orm/node-postgres');
    const postgres = await import('postgres');
    
    const client = postgres.default(config.database.url);
    db = pgDrizzle(client, { schema });
  } else {
    throw new Error(`Unsupported database type: ${config.database.type}`);
  }

  return db;
}

export { db };
export type DB = typeof db;