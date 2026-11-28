import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    role: { type: String, default: '', trim: true, maxlength: 100 },
    organization: { type: String, default: '', trim: true, maxlength: 100 },
    quote: { type: String, required: true, trim: true, maxlength: 1000 },
    image: { type: String, default: '', trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Review', schema)
