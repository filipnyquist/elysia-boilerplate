# Elysia Boilerplate

A Bun.js Elysia and Drizzle ORM boilerplate for backend API projects.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Current Repository State

**CRITICAL**: This repository currently contains only a README.md file. It is a boilerplate repository that is intended to be scaffolded with a Bun.js + Elysia + Drizzle ORM setup, but the implementation is not yet present.

## Working Effectively

### Prerequisites and Installation
- Install Bun.js runtime (required for this project):
  ```bash
  curl -fsSL https://bun.sh/install | bash
  source ~/.bashrc  # or restart terminal
  bun --version     # verify installation
  ```

### Bootstrap New Project (Current State)
Since the repository contains only README.md, bootstrap it with:
- `bun init -y` -- takes 1-2 seconds. Creates basic Bun project structure.
- `bun add elysia drizzle-orm drizzle-kit better-sqlite3` -- takes 15-120 seconds. NEVER CANCEL. May appear to hang during dependency resolution.
- `bun add -d @biomejs/biome @types/better-sqlite3` -- takes 5-30 seconds. NEVER CANCEL.

### Development Setup (Once Implemented)
- Create project structure:
  ```bash
  mkdir -p src/db
  ```
- Set up package.json scripts (add to existing package.json):
  ```json
  "scripts": {
    "dev": "bun --watch index.ts",
    "start": "bun index.ts",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "lint": "biome lint ./src",
    "format": "biome format --write ./src",
    "check": "biome check --fix ./src"
  }
  ```

### Build and Run
- **No build step required** - Bun.js runs TypeScript directly
- Run development server: `bun run dev` -- starts immediately, includes hot reload
- Run production server: `bun run start` -- starts immediately
- Access server at: `http://localhost:3000`

### Database Operations
- Generate migrations: `bun run db:generate` -- takes 1-2 seconds
- Push schema to database: `bun run db:push` -- takes 1-2 seconds  
- Open database studio: `bun run db:studio` -- opens web UI at `http://localhost:4983`

### Code Quality
- Run linter: `bun run lint` -- takes 1-2 seconds
- Format code: `bun run format` -- takes 1-2 seconds
- Fix all issues: `bun run check` -- takes 1-2 seconds

## Validation

### Manual Testing Scenarios
**ALWAYS run these validation steps after making changes:**

1. **Basic Server Functionality:**
   - Start server: `bun run dev`
   - Test root endpoint: `curl http://localhost:3000/`
   - Test health endpoint: `curl http://localhost:3000/health`
   - Expect: Server starts within 2 seconds, endpoints return valid responses

2. **Database Integration (when implemented):**
   - Test users endpoint: `curl http://localhost:3000/users`
   - Create user: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com"}' http://localhost:3000/users`
   - Verify creation: `curl http://localhost:3000/users`
   - Expect: Empty array initially, then user object after creation

3. **Development Workflow:**
   - Make a small change to index.ts
   - Verify hot reload works (server restarts automatically)
   - Run `bun run check` to ensure code quality

### Pre-commit Validation
ALWAYS run before committing:
- `bun run check` -- fixes formatting and linting issues
- `bun run start` -- verify server starts without errors
- Test at least one API endpoint manually

## Common Tasks

### Complete Working Example Files

**index.ts** (Main application file):
```typescript
import { Elysia } from 'elysia'
import { db } from './src/db/database'
import { users } from './src/db/schema'

const app = new Elysia()
  .get('/', () => 'Hello Elysia with Drizzle ORM!')
  .get('/health', () => ({ status: 'ok', timestamp: Date.now() }))
  .get('/users', async () => {
    const allUsers = await db.select().from(users)
    return { users: allUsers }
  })
  .post('/users', async ({ body }) => {
    const newUser = await db.insert(users).values({
      name: (body as any).name,
      email: (body as any).email,
      createdAt: new Date(),
    }).returning()
    return { user: newUser[0] }
  })
  .listen(3000)

console.log(
  `🚀 Server is running at http://localhost:${app.server?.hostname}:${app.server?.port}`
)
```

**src/db/schema.ts** (Database schema):
```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
```

**src/db/database.ts** (Database connection):
```typescript
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import * as schema from './schema'

const sqlite = new Database('./database.sqlite')
export const db = drizzle(sqlite, { schema })
```

**drizzle.config.ts** (Drizzle configuration):
```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './database.sqlite',
  },
} satisfies Config;
```

### Repository Structure (Anticipated)
```
.
├── README.md                    # Project documentation
├── package.json                # Dependencies and scripts
├── bun.lockb                   # Bun lockfile
├── tsconfig.json               # TypeScript configuration
├── drizzle.config.ts           # Database configuration
├── database.sqlite             # SQLite database file
├── index.ts                    # Main application entry
├── src/
│   └── db/
│       ├── database.ts         # Database connection
│       └── schema.ts           # Database schema definitions
└── drizzle/                    # Generated migration files
```

### Key Files and Their Purpose
- `index.ts` - Main Elysia server application
- `src/db/schema.ts` - Drizzle ORM table definitions  
- `src/db/database.ts` - Database connection setup
- `drizzle.config.ts` - Drizzle Kit configuration for migrations
- `package.json` - Project dependencies and npm scripts

### Typical Dependency Versions (Validated)
- Bun: 1.2.20+
- Elysia: 1.3.15+
- Drizzle ORM: 0.44.4+
- Drizzle Kit: 0.31.4+
- Better SQLite3: 12.2.0+
- Biome: 2.2.0+

### Performance Expectations
- **NEVER CANCEL**: Dependency installation may take up to 2 minutes and can appear to hang
- `bun init`: 1-2 seconds
- `bun install` (fresh): 15-120 seconds, may pause during resolution
- `bun run dev`: Server starts in 1-2 seconds
- `bun run check`: Code quality checks in 1-2 seconds
- Database operations: 1-2 seconds each

### Troubleshooting Common Issues

**Server won't start:**
- Check if port 3000 is available: `lsof -i :3000`
- Verify Bun installation: `bun --version`
- Check for TypeScript errors in terminal output

**Database errors:**
- Ensure `better-sqlite3` is installed: `bun add better-sqlite3`
- Run migrations: `bun run db:push`
- Check `drizzle.config.ts` has correct `dialect: 'sqlite'`

**Linting/formatting issues:**
- Run `bun run check` to auto-fix most issues
- Check Biome is installed: `bun run lint`

**Dependency installation hangs:**
- `bun add` may appear to freeze during dependency resolution - wait up to 2 minutes
- If it truly hangs, cancel and retry: network issues can cause this
- Use `bun install` to reinstall from existing package.json if available

### Technology Stack Notes
- **Bun.js**: Runtime and package manager (replaces Node.js + npm)
- **Elysia**: Fast web framework built for Bun (similar to Express/Fastify)
- **Drizzle ORM**: Type-safe SQL ORM with great TypeScript integration
- **SQLite**: Lightweight database via better-sqlite3
- **Biome**: Fast linter and formatter (replaces ESLint + Prettier)

### Important Commands Quick Reference
```bash
# Setup
curl -fsSL https://bun.sh/install | bash
bun init -y
bun install

# Development
bun run dev          # Start with hot reload
bun run start        # Start production server

# Database
bun run db:generate  # Create migrations
bun run db:push      # Apply to database
bun run db:studio    # Open database UI

# Code Quality  
bun run check        # Format + lint
bun run lint         # Lint only
bun run format       # Format only
```