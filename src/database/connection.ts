import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

import { env } from '../env/env'
import * as schema from './schema'

const connection = postgres(env.DATABASE_URL, {
  ssl: 'allow',
})

export const db = drizzle(connection, { schema })
