import type { Config } from 'drizzle-kit';

const databaseType = process.env.DATABASE_TYPE || 'sqlite';
const databaseUrl = process.env.DATABASE_URL || './dev.db';

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: databaseType === 'postgresql' ? 'postgresql' : 'sqlite',
  dbCredentials: databaseType === 'postgresql' 
    ? { url: databaseUrl }
    : { url: databaseUrl },
  verbose: true,
  strict: true,
} satisfies Config;