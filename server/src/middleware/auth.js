import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import Admin from '../models/Admin.js'

function extractToken(req) {
  // Check cookie first, then Bearer Authorization header
  if (req.cookies?.token) return req.cookies.token
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) return auth.split(' ')[1]
  return null
}

export async function requireAdmin(req, res, next) {
  try {
    const token = extractToken(req)
    if (!token) return res.status(401).json({ message: 'Authentication required' })

    const decoded = jwt.verify(token, env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id).select('-passwordHash')
    if (!admin) return res.status(401).json({ message: 'Admin account not found' })

    req.admin = admin
    next()
  } catch (_e) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export async function optionalAuth(req, _res, next) {
  try {
    const token = extractToken(req)
    if (token) {
      const decoded = jwt.verify(token, env.JWT_SECRET)
      const admin = await Admin.findById(decoded.id).select('-passwordHash')
      if (admin) req.admin = admin
    }
  } catch (_e) {
    // Ignore invalid token on optionalAuth
  }
  next()
}
