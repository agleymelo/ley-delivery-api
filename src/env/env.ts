import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  AUTH_SECRET: z.string().min(1),
  CLOUDFLARE_ENDPOINT: z.string().url().min(1),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().min(1),
  CLOUDFLARE_URL_STORAGE: z.string().url().min(1),
})

export const env = envSchema.parse(process.env)
