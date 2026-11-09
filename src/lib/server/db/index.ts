import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { DATABASE_URL } from '$app/env/private';
import { building } from '$app/env';

if (!DATABASE_URL && !building) {
	throw new Error('DATABASE_URL is not set');
}

const connectionString = DATABASE_URL || 'postgresql://build:build@localhost/build';
const client = neon(connectionString);

export const db = drizzle(client, { schema });
