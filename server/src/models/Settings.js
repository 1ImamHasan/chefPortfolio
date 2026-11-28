import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: { type: String, default: 'Imam Hasan', trim: true },
    title: { type: String, default: 'Trainee Chef Portfolio', trim: true },
    tagline: { type: String, default: 'Where Technique Meets Taste.', trim: true },
    heroLabel: { type: String, default: 'Trainee Chef', trim: true },
    email: { type: String, default: 'mdimamhasanihr@gmail.com', trim: true },
    phone: { type: String, default: '+880 1775 488063', trim: true },
    location: { type: String, default: 'Dhaka, Bangladesh', trim: true },
    whatsapp: { type: String, default: 'https://wa.me/8801775488063', trim: true },
    heroVideo: {
      type: String,
      default: 'https://cdn.coverr.co/videos/coverr-a-chef-cooking-in-a-restaurant-kitchen-1665/1080p.mp4',
    },
    heroImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop',
    },
    cvUrl: { type: String, default: '/photosImam/resume.jpg' },
    social: {
      facebook: { type: String, default: 'https://www.facebook.com/imam.hasan.281291' },
      instagram: { type: String, default: 'https://www.instagram.com/mdimamhasanihr?igsh=b3RhY2s5dHQ2dG9i' },
      github: { type: String, default: 'https://github.com/1ImamHasan' },
      linkedin: { type: String, default: '' },
    },
    certifications: {
      type: [String],
      default: [
        'Food Safety & Hygiene Level 2',
        'Basic First Aid & Fire Safety',
        'Knife Skills Masterclass Workshop',
        'Professional Chef Course Level-1 — ICI',
      ],
    },
    timeline: {
      type: [
        {
          id: { type: String },
          date: { type: String },
          title: { type: String },
          place: { type: String },
          desc: { type: String },
          active: { type: Boolean, default: false },
        },
      ],
      default: [
        {
          id: 'current',
          date: 'Jan 2026 - Present',
          title: 'Trainee Chef',
          place: 'Available Opportunities',
          desc: 'Available for apprenticeships, private dining events, and catering services.',
          active: true,
        },
        {
          id: 'ici-course',
          date: 'Oct 2025 – Dec 2025',
          title: 'Professional Chef Course Level-1',
          place: 'International Culinary Institute (ICI)',
          desc: 'Completed with distinction. Specialized in continental cuisine and food safety management (HACCP Level 1).',
          active: false,
        },
      ],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Settings', schema)
