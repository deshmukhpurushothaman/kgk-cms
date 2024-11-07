import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(client, { schema });