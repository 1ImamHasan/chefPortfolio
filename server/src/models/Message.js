import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, default: '', trim: true, maxlength: 50 },
    eventType: { type: String, default: 'General Inquiry', trim: true, maxlength: 100 },
    guestCount: { type: String, default: '', trim: true, maxlength: 50 },
    eventDate: { type: String, default: '', trim: true, maxlength: 50 },
    subject: { type: String, default: '', trim: true, maxlength: 150 },
    body: { type: String, required: true, maxlength: 3000 },
    read: { type: Boolean, default: false },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.model('Message', schema)
