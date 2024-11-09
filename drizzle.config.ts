import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
export default {
  schema: './db/schema.ts',
  out: './drizzle-migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT as string) || 5432,
    database: process.env.DATABASE_NAME || 'cms',
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'deshmukh123',
    ssl: false,
  },
} satisfies Config;
