import mongoose from 'mongoose'
import { slugify } from '../utils/slugify.js'

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, default: '', trim: true },
    category: { type: String, default: 'General', trim: true },
    prepTime: { type: String, default: '20 mins', trim: true },
    cookTime: { type: String, default: '45 mins', trim: true },
    servings: { type: String, default: '2-4 portions', trim: true },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    chefTips: { type: String, default: '', trim: true, maxlength: 1000 },
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

export default mongoose.model('Recipe', schema)
