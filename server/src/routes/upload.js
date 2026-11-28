import { Router } from 'express'
import multer from 'multer'
import { cloudinary, cloudinaryReady } from '../config/cloudinary.js'
import { requireAdmin } from '../middleware/auth.js'

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(Object.assign(new Error('Only jpg, png, webp, gif or pdf allowed'), { status: 400 }))
    }
  },
})

const r = Router()

r.post('/', requireAdmin, upload.single('file'), (req, res, next) => {
  if (!cloudinaryReady) {
    return res.status(503).json({
      message: 'Cloudinary image upload is not configured. Add Cloudinary keys to .env, or paste an image URL.',
    })
  }
  if (!req.file) return res.status(400).json({ message: 'No file received' })

  const isPdf = req.file.mimetype === 'application/pdf'
  cloudinary.uploader
    .upload_stream(
      {
        folder: 'chef-portfolio',
        resource_type: isPdf ? 'raw' : 'image',
      },
      (err, result) => {
        if (err) return next(err)
        res.status(201).json({ url: result.secure_url })
      }
    )
    .end(req.file.buffer)
})

export default r
