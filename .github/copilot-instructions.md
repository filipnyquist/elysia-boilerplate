# Elysia Boilerplate
A Bun.js Elysia and Drizzle ORM boilerplate for backend API projects.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- Install Bun.js runtime (required for all operations):
  - `curl -fsSL https://bun.sh/install | bash`
  - `source ~/.bashrc` (or restart terminal)
  - `bun --version` (verify installation)
- Install project dependencies:
  - `bun install` -- takes 2 seconds to 10+ minutes depending on network conditions. NEVER CANCEL. Set timeout to 15+ minutes for safety.
- Run development server:
  - `bun run dev` -- starts watch mode server on port 3000. NEVER CANCEL when testing.
  - Alternative: `bun run src/index.ts` -- direct execution
- TypeScript type checking:
  - `bun run --bun tsc --noEmit` -- takes ~1-2 seconds. NEVER CANCEL. Set timeout to 60+ seconds.

## Bun.js Specific Commands
- Package management: Use `bun add <package>` instead of `npm install <package>`
- Dev dependencies: Use `bun add -D <package>` instead of `npm install --save-dev <package>`
- Execute scripts: Use `bun run <script>` instead of `npm run <script>`
- Direct execution: Use `bun <file.ts>` instead of `node <file.js>`

## Drizzle ORM Integration
When working with database functionality:
- Install Drizzle dependencies:
  - `bun add drizzle-orm @libsql/client` -- takes ~2 seconds. NEVER CANCEL.
  - `bun add -D drizzle-kit` -- takes ~2 seconds. NEVER CANCEL.
- Available Drizzle commands:
  - `bunx drizzle-kit generate` -- generate migrations
  - `bunx drizzle-kit migrate` -- run migrations
  - `bunx drizzle-kit push` -- push schema to database
  - `bunx drizzle-kit studio` -- open Drizzle Studio (database GUI)
  - `bunx drizzle-kit introspect` -- introspect existing database

## Validation
- ALWAYS test the application manually after making changes by:
  1. Running `bun run dev`
  2. Making a GET request to `http://localhost:3000` to verify it returns "Hello Elysia"
  3. Stopping the server with Ctrl+C
- The development server starts instantly and serves on `localhost:3000`
- ALWAYS run TypeScript checks before committing: `bun run --bun tsc --noEmit`
- Test any new API endpoints you create by making HTTP requests using curl or similar

## Project Structure
Typical Elysia project structure (when fully developed):
```
├── src/
│   ├── index.ts          # Main application entry point
│   ├── routes/           # API route handlers
│   ├── db/              # Database schema and connection
│   └── types/           # TypeScript type definitions
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── drizzle.config.ts    # Drizzle ORM configuration (if using database)
├── bun.lockb           # Bun lockfile (binary format)
└── README.md           # Project documentation
```

## Environment Setup
- Node.js is available but Bun.js must be installed separately
- Bun.js installation is required and takes ~30 seconds via curl script
- All package operations use Bun instead of npm/yarn
- Bun uses binary lockfiles (bun.lockb) instead of package-lock.json

## Common Tasks
The following commands are validated to work:

### Fresh Setup
```bash
# Install Bun if not present
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Install dependencies
bun install

# Start development
bun run dev
```

### Development Workflow
```bash
# Type check
bun run --bun tsc --noEmit

# Start with watch mode (auto-reload on changes)
bun run dev

# Direct execution
bun run src/index.ts
```

### Adding Dependencies
```bash
# Runtime dependency
bun add <package-name>

# Development dependency  
bun add -D <package-name>
```

## Performance Characteristics
- Bun installation: ~30 seconds via curl
- Dependency installation: 2 seconds to 10+ minutes depending on network conditions and package resolution
- TypeScript compilation: ~1-2 seconds
- Application startup: Instant (< 1 second)
- Hot reload: Instant when using `bun run dev`

## Troubleshooting
- If `bun` command not found: Run `source ~/.bashrc` or restart terminal after installation
- If port 3000 is busy: The default Elysia app runs on port 3000, stop existing processes
- If TypeScript errors: Run `bun run --bun tsc --noEmit` to see detailed type checking
- If `bun install` hangs on "Resolving dependencies": This may indicate network connectivity issues. Wait up to 15 minutes as it may resolve itself, or check network connectivity with `ping 8.8.8.8`

## Repository Status
This repository is currently a minimal boilerplate containing only a README. When fully developed, it will contain:
- Complete Elysia server setup with routing
- Drizzle ORM configuration and schema
- TypeScript configuration optimized for Bun
- Development and build scripts
- Database migration setup

Always validate your changes work with the complete development workflow above.