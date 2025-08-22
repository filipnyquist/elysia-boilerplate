import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { config } from './config';
import { loggerMiddleware } from './middleware/logger';
import { errorHandler } from './middleware/error';
import { userRoutes } from './routes/users';
import { postRoutes } from './routes/posts';

const app = new Elysia()
  // Add middleware
  .use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
  .use(swagger({
    documentation: {
      info: {
        title: 'Elysia Drizzle Boilerplate API',
        version: '1.0.0',
        description: 'A high-performance API built with Elysia and Drizzle ORM, supporting both PostgreSQL and SQLite',
      },
      servers: [
        {
          url: `http://localhost:${config.server.port}`,
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'users', description: 'User management endpoints' },
        { name: 'posts', description: 'Post management endpoints' },
      ],
    },
  }))
  .use(loggerMiddleware)
  
  // Health check endpoint
  .get('/', () => ({
    success: true,
    message: 'Elysia Drizzle Boilerplate API',
    version: '1.0.0',
    database: config.database.type,
    timestamp: new Date().toISOString(),
  }))
  
  // Health check endpoint
  .get('/health', () => ({
    success: true,
    status: 'healthy',
    database: config.database.type,
    timestamp: new Date().toISOString(),
  }))
  
  // API routes
  .group('/api/v1', (app) =>
    app
      .use(userRoutes)
      .use(postRoutes)
  )
  
  // Error handling
  .onError(({ error }) => errorHandler(error))
  
  .listen({
    hostname: config.server.host,
    port: config.server.port,
  });

console.log(`🦊 Elysia server is running at http://${config.server.host}:${config.server.port}`);
console.log(`📊 Database type: ${config.database.type}`);
console.log(`📚 API Documentation: http://${config.server.host}:${config.server.port}/swagger`);

export type App = typeof app;