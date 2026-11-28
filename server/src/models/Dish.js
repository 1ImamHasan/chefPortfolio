import mongoose from 'mongoose'
import { slugify } from '../utils/slugify.js'

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true, default: 'Main Course' },
    src: { type: String, required: true, trim: true },
    alt: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true, maxlength: 600 },
    price: { type: String, default: '', trim: true },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

schema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title) + '-' + Date.now().toString(36)
  }
  next()
})

export default mongoose.model('Dish', schema)
