import { Router } from 'express'
import Settings from '../models/Settings.js'
import { requireAdmin } from '../middleware/auth.js'

const r = Router()

r.get('/', async (_req, res, next) => {
  try {
    let settings = await Settings.findOne().lean()
    if (!settings) {
      settings = await Settings.create({})
    }
    res.json(settings)
  } catch (e) {
    next(e)
  }
})

r.put('/', requireAdmin, async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings(req.body)
    } else {
      settings.set(req.body)
    }
    await settings.save()
    res.json(settings)
  } catch (e) {
    next(e)
  }
})

export default r
