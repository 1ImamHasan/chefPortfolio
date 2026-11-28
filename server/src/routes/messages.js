import { Router } from 'express'
import { z } from 'zod'
import Message from '../models/Message.js'
import { requireAdmin } from '../middleware/auth.js'
import { messageLimiter } from '../middleware/rateLimit.js'

const r = Router()

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Valid email is required').max(200),
  phone: z.string().trim().max(50).optional().default(''),
  eventType: z.string().trim().max(100).optional().default('General Inquiry'),
  guestCount: z.string().trim().max(50).optional().default(''),
  eventDate: z.string().trim().max(50).optional().default(''),
  subject: z.string().trim().max(150).optional().default(''),
  body: z.string().trim().min(3, 'Message is required').max(3000),
  website: z.string().optional(), // honeypot: real users never fill this
})

r.post('/', messageLimiter, async (req, res, next) => {
  try {
    const data = schema.parse(req.body)
    if (data.website) return res.status(201).json({ ok: true }) // bot trapped
    const { name, email, phone, eventType, guestCount, eventDate, subject, body } = data
    const message = await Message.create({ name, email, phone, eventType, guestCount, eventDate, subject, body })
    res.status(201).json({ ok: true, id: message._id })
  } catch (e) {
    next(e)
  }
})

r.get('/', requireAdmin, async (_req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }).lean())
  } catch (e) {
    next(e)
  }
})

r.patch('/:id/read', requireAdmin, async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: req.body?.read !== false, status: req.body?.read === false ? 'new' : 'read' },
      { new: true }
    )
    if (!doc) return res.status(404).json({ message: 'Message not found' })
    res.json(doc)
  } catch (e) {
    next(e)
  }
})

r.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

export default r
