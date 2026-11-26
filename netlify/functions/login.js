import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { json } from './_db.js'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })
  const { password } = await req.json().catch(() => ({}))
  await new Promise((r) => setTimeout(r, 500))
  const ok = password && bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH)
  if (!ok) return json(401, { error: 'Wrong password' })
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' })
  return json(200, { token })
}

export const config = { path: '/api/login' }
