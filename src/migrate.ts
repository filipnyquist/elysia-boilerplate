import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { getDatabase } from './db';
import { config } from './config';

async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    const db = await getDatabase();
    
    if (config.database.type === 'sqlite') {
      await migrate(db as any, { migrationsFolder: './migrations' });
    } else if (config.database.type === 'postgresql') {
      // Dynamic import for PostgreSQL migration
      const { migrate: pgMigrate } = await import('drizzle-orm/node-postgres/migrator');
      await pgMigrate(db as any, { migrationsFolder: './migrations' });
    }
    
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();