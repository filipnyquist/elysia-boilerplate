# Elysia Drizzle ORM Boilerplate

A high-performance, production-ready API boilerplate built with **Bun.JS**, **Elysia**, and **Drizzle ORM**. Supports both **PostgreSQL** and **SQLite** databases with seamless switching between them.

## 🚀 Features

- ⚡ **Bun.JS Runtime** - Lightning-fast JavaScript runtime with built-in bundling and testing
- 🦊 **Elysia Framework** - Ergonomic and performant web framework for Bun
- 🗄️ **Drizzle ORM** - Type-safe SQL ORM with excellent TypeScript support
- 🔄 **Dual Database Support** - Switch between PostgreSQL and SQLite with environment variables
- 📝 **Auto-generated API Documentation** - Swagger/OpenAPI integration
- 🔧 **TypeScript First** - Full TypeScript support with strict typing
- 🛡️ **Input Validation** - Built-in request validation using Elysia's type system
- 🚦 **Middleware Support** - CORS, logging, error handling, and more
- 📊 **Database Migrations** - Automatic schema migrations with Drizzle Kit
- 🎯 **Production Ready** - Structured codebase following best practices

## 📦 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Web Framework**: [Elysia](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Databases**: PostgreSQL, SQLite
- **Language**: TypeScript
- **API Documentation**: Swagger/OpenAPI

## 🛠️ Installation

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- PostgreSQL (if using PostgreSQL database)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/filipnyquist/elysia-boilerplate.git
   cd elysia-boilerplate
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables in `.env`:
   
   **For SQLite (default):**
   ```env
   DATABASE_TYPE=sqlite
   DATABASE_URL=./dev.db
   PORT=3000
   NODE_ENV=development
   ```
   
   **For PostgreSQL:**
   ```env
   DATABASE_TYPE=postgresql
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   PORT=3000
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Generate migration files
   bun run db:generate
   
   # Run migrations
   bun run db:migrate
   ```

5. **Start Development Server**
   ```bash
   bun run dev
   ```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run start` | Start production server |
| `bun run build` | Build the application |
| `bun run db:generate` | Generate database migrations |
| `bun run db:migrate` | Run database migrations |
| `bun run db:studio` | Open Drizzle Studio (database GUI) |
| `bun run db:push` | Push schema changes directly to database |

## 🏗️ Project Structure

```
├── src/
│   ├── config/           # Configuration files
│   │   └── index.ts      # Environment and app configuration
│   ├── db/               # Database setup
│   │   ├── index.ts      # Database connection
│   │   └── schema.ts     # Database schema definitions
│   ├── middleware/       # Custom middleware
│   │   ├── error.ts      # Error handling middleware
│   │   └── logger.ts     # Request logging middleware
│   ├── routes/           # API routes
│   │   ├── users.ts      # User management endpoints
│   │   └── posts.ts      # Post management endpoints
│   ├── services/         # Business logic services
│   │   ├── userService.ts # User-related operations
│   │   └── postService.ts # Post-related operations
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # Shared types and interfaces
│   ├── index.ts          # Main application entry point
│   └── migrate.ts        # Database migration runner
├── migrations/           # Generated migration files
├── .env.example          # Environment variables template
├── drizzle.config.ts     # Drizzle ORM configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🔌 API Endpoints

### Base URL
- Development: `http://localhost:3000`
- API Documentation: `http://localhost:3000/swagger`

### Health Check
- `GET /` - API information
- `GET /health` - Health check endpoint

### Users (`/api/v1/users`)
- `GET /api/v1/users` - Get all users (with pagination)
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user
- `PATCH /api/v1/users/:id/toggle-status` - Toggle user active status

### Posts (`/api/v1/posts`)
- `GET /api/v1/posts` - Get all posts with authors
- `GET /api/v1/posts/published` - Get published posts only
- `GET /api/v1/posts/:id` - Get post by ID
- `POST /api/v1/posts` - Create new post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post
- `PATCH /api/v1/posts/:id/publish` - Publish post
- `PATCH /api/v1/posts/:id/unpublish` - Unpublish post

## 📊 Database Schema

### Users Table
```typescript
{
  id: number (Primary Key)
  name: string
  email: string (Unique)
  bio: string (Optional)
  isActive: boolean (Default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Posts Table
```typescript
{
  id: number (Primary Key)
  title: string
  content: string
  authorId: number (Foreign Key → users.id)
  published: boolean (Default: false)
  createdAt: Date
  updatedAt: Date
}
```

## 🔄 Database Switching

This boilerplate supports seamless switching between PostgreSQL and SQLite:

1. **Change the `DATABASE_TYPE` in your `.env` file**
2. **Update the `DATABASE_URL` accordingly**
3. **Regenerate migrations if schema changes are needed**
4. **Run migrations**

The application automatically uses the appropriate database driver based on your configuration.

## 🧪 Example API Usage

### Create a User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Software Developer"
  }'
```

### Create a Post
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello World",
    "content": "This is my first post!",
    "authorId": 1
  }'
```

### Get All Posts with Authors
```bash
curl http://localhost:3000/api/v1/posts
```

## 🚀 Deployment

### Production Build
```bash
bun run build
```

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_TYPE=postgresql
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3000
HOST=0.0.0.0
```

### Docker (Optional)
```dockerfile
FROM oven/bun:latest

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
```

## 🔧 Customization

### Adding New Endpoints
1. Create route files in `src/routes/`
2. Add services in `src/services/`
3. Register routes in `src/index.ts`

### Database Schema Changes
1. Modify `src/db/schema.ts`
2. Generate migrations: `bun run db:generate`
3. Run migrations: `bun run db:migrate`

### Adding Middleware
1. Create middleware in `src/middleware/`
2. Register in `src/index.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

## 🙋 Support

For questions and support:
- Open an issue on GitHub
- Check the [Elysia documentation](https://elysiajs.com/)
- Check the [Drizzle ORM documentation](https://orm.drizzle.team/)
- Check the [Bun documentation](https://bun.sh/docs)

---

**Built with ❤️ using Bun.JS, Elysia, and Drizzle ORM**
