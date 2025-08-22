import { Elysia } from 'elysia';

export const loggerMiddleware = new Elysia({ name: 'logger' })
  .onRequest(({ request, path }) => {
    console.log(`${new Date().toISOString()} - ${request.method} ${path}`);
  });