import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDb } from '../config/db.js'
import { env } from '../config/env.js'
import Admin from '../models/Admin.js'
import mongoose from 'mongoose'

async function seedAdmin() {
  await connectDb()
  const email = (env.ADMIN_EMAIL || 'admin@chefimam.com').toLowerCase()
  const password = env.ADMIN_PASSWORD || 'ChefImam@2026'

  const passwordHash = await bcrypt.hash(password, 10)
  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  console.log(`✅ Admin account seeded: ${admin.email}`)
  console.log(`Default password: ${password}`)
  await mongoose.disconnect()
}

seedAdmin().catch((err) => {
  console.error('Failed to seed admin:', err)
  process.exit(1)
})
