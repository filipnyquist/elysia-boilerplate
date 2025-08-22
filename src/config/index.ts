export const config = {
  database: {
    type: process.env.DATABASE_TYPE as 'sqlite' | 'postgresql' || 'sqlite',
    url: process.env.DATABASE_URL || './dev.db',
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0',
  },
  env: process.env.NODE_ENV || 'development',
} as const;

export const isDev = config.env === 'development';
export const isProd = config.env === 'production';