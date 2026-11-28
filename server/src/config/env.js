import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required').default('mongodb://127.0.0.1:27017/chefPortfolio'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters').default('chef_imam_secret_jwt_key_2026_secure'),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173,http://localhost:3000'),
  COOKIE_SAMESITE: z.enum(['lax', 'strict', 'none']).default('lax'),
  ADMIN_EMAIL: z.string().optional().default('admin@chefimam.com'),
  ADMIN_PASSWORD: z.string().optional().default('ChefImam@2026'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
export const isProd = env.NODE_ENV === 'production'
