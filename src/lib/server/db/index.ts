import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { DATABASE_URL } from '$app/env/private';
import { building } from '$app/env';

if (!DATABASE_URL && !building) {
	console.warn('[DB] DATABASE_URL is not set. Database operations will fail until configured.');
}

const connectionString =
	DATABASE_URL || 'postgresql://placeholder:placeholder@localhost/placeholder';
const client = neon(connectionString);

export const db = drizzle(client, { schema });
