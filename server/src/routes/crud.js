import { Router } from 'express'
import mongoose from 'mongoose'
import { optionalAuth, requireAdmin } from '../middleware/auth.js'

export function crud(Model, { publicFilter = {}, sort = { order: 1, createdAt: -1 }, filters = [] } = {}) {
  const r = Router()

  r.get('/', optionalAuth, async (req, res, next) => {
    try {
      const q = {}
      for (const f of filters) {
        if (typeof req.query[f] === 'string') {
          q[f] = f === 'featured' || f === 'visible' ? req.query[f] === 'true' : req.query[f]
        }
      }
      const admin = req.admin && req.query.all === '1'
      const filter = admin ? q : { ...q, ...publicFilter }
      res.json(await Model.find(filter).sort(sort).lean())
    } catch (e) {
      next(e)
    }
  })

  r.get('/:idOrSlug', optionalAuth, async (req, res, next) => {
    try {
      const { idOrSlug } = req.params
      const key = mongoose.isValidObjectId(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug }
      const admin = req.admin && req.query.all === '1'
      const doc = await Model.findOne(admin ? key : { ...key, ...publicFilter }).lean()
      if (!doc) return res.status(404).json({ message: 'Item not found' })
      res.json(doc)
    } catch (e) {
      next(e)
    }
  })

  r.post('/', requireAdmin, async (req, res, next) => {
    try {
      const doc = await Model.create(req.body)
      res.status(201).json(doc)
    } catch (e) {
      next(e)
    }
  })

  r.put('/:id', requireAdmin, async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id)
      if (!doc) return res.status(404).json({ message: 'Item not found' })
      doc.set(req.body)
      await doc.save()
      res.json(doc)
    } catch (e) {
      next(e)
    }
  })

  r.delete('/:id', requireAdmin, async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id)
      if (!doc) return res.status(404).json({ message: 'Item not found' })
      res.json({ ok: true, deletedId: req.params.id })
    } catch (e) {
      next(e)
    }
  })

  return r
}
