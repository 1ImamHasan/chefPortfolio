import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import Admin from '../models/Admin.js'
import { env, isProd } from '../config/env.js'
import { loginLimiter } from '../middleware/rateLimit.js'
import { requireAdmin } from '../middleware/auth.js'

const r = Router()
const cookieOpts = {
  httpOnly: true,
  secure: isProd || env.COOKIE_SAMESITE === 'none',
  sameSite: env.COOKIE_SAMESITE,
  path: '/',
}
const DUMMY_HASH = bcrypt.hashSync('dummy_fallback_password_hash', 10)

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
})

r.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const admin = await Admin.findOne({ email: email.toLowerCase() })
    const ok = await bcrypt.compare(password, admin ? admin.passwordHash : DUMMY_HASH)
    if (!admin || !ok) return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: admin.id, email: admin.email }, env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.json({ email: admin.email, token }) // returns token also for optional header fallback
  } catch (e) {
    next(e)
  }
})

r.post('/logout', (_req, res) => {
  res.clearCookie('token', cookieOpts)
  res.json({ ok: true })
})

r.get('/me', requireAdmin, (req, res) => {
  res.json({ email: req.admin.email })
})

export default r
