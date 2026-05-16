// ─── Site Configuration ───────────────────────────────────────────────────────
export const siteConfig = {
  name: 'Imam Hasan',
  title: 'Trainee Chef Portfolio',
  tagline: 'Where Technique Meets Taste.',
  heroLabel: 'Trainee Chef',
  email: 'mdimamhasanihr@gmail.com',
  phone: '+880 1775 488063',
  location: 'Dhaka, Bangladesh',
  whatsapp: 'https://wa.me/8801775488063?text=Hi%20Imam%2C%20I%27d%20love%20to%20connect!',
  heroVideo: 'https://cdn.coverr.co/videos/coverr-a-chef-cooking-in-a-restaurant-kitchen-1665/1080p.mp4',
  heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop',
  social: {
    facebook: 'https://www.facebook.com/imam.hasan.281291',
    instagram: 'https://www.instagram.com/mdimamhasanihr?igsh=b3RhY2s5dHQ2dG9i',
    github: 'https://github.com/1ImamHasan',
  },
}

export const dishes = [
  { id: 'duck-breast', src: 'https://images.unsplash.com/photo-1676300185292-e238e43b3d5d?q=80&w=800', alt: 'Pan-Seared Duck Breast', category: 'Modern French', title: 'Pan-Seared Duck' },
  { id: 'choc-tart', src: 'https://images.unsplash.com/photo-1559506974-7a81214baaf7?q=80&w=800', alt: 'Dark Chocolate Tart', category: 'Pastry', title: 'Dark Chocolate Tart' },
  { id: 'saffron-risotto', src: 'https://images.unsplash.com/photo-1626805673863-3b256b3333b6?q=80&w=800', alt: 'Saffron Risotto', category: 'Italian', title: 'Saffron Risotto' },
  { id: 'herb-lamb', src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800', alt: 'Herb Crusted Lamb', category: 'Main Course', title: 'Herb Crusted Lamb' },
  { id: 'lobster-paragon', src: '/recentDishOfMeImages/LobsterParagon.jpg', alt: 'Lobster Paragon', category: 'Seafood', title: 'Lobster Paragon' },
  { id: 'mushroom-foam', src: 'https://images.unsplash.com/photo-1569246294372-ed319c674f14?q=80&w=800', alt: 'Wild Mushroom Foam', category: 'Molecular', title: 'Wild Mushroom Foam' },
]

export const categories = ['All', ...new Set(dishes.map((d) => d.category))]

export const timeline = [
  { id: 'current', date: 'Jan 2026 - Present', title: 'Trainee Chef', place: 'Available Opportunities', desc: 'Available for apprenticeships, private dining events, and catering services.', active: true },
  { id: 'ici-course', date: 'Oct 2025 – Dec 2025', title: 'Professional Chef Course Level-1', place: 'International Culinary Institute (ICI)', desc: 'Completed with distinction. Specialized in continental cuisine and food safety management (HACCP Level 1).', active: false },
]

export const certifications = [
  'Food Safety & Hygiene Level 2',
  'Basic First Aid & Fire Safety',
  'Knife Skills Masterclass Workshop',
  'Professional Chef Course Level-1 — ICI',
]

export const mentors = [
  { id: 'daniel', quote: 'Imam possesses a rare combination of creativity and discipline. His ability to adapt quickly in a high-pressure kitchen environment is impressive.', name: 'Daniel C Gomes', role: 'Exec Chef, ICI', img: '/mentorsImages/danielCgomes.png' },
  { id: 'shamchul', quote: 'I have seen Imam grow from a student to a capable culinarian. His plating skills and understanding of flavor profiles are well beyond his years.', name: 'Shamchul Haque', role: 'Exec Chef, TasteBud', img: 'https://ui-avatars.com/api/?name=Shamchul+Haque&background=d97706&color=fff&size=200' },
]

export const recipes = [
  { id: 'beef-bourguignon', title: 'Classic Beef Bourguignon', category: 'Modern French', time: '3 hrs', difficulty: 'Advanced', image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=800', excerpt: 'A rich French braised beef stew slow-cooked in red wine with mushrooms and pearl onions.' },
  { id: 'saffron-risotto', title: 'Saffron Risotto alla Milanese', category: 'Italian', time: '45 min', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1626805673863-3b256b3333b6?q=80&w=800', excerpt: 'Creamy Arborio rice infused with saffron, finished with Parmigiano-Reggiano and butter.' },
  { id: 'choc-fondant', title: 'Dark Chocolate Fondant', category: 'Pastry', time: '30 min', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1559506974-7a81214baaf7?q=80&w=800', excerpt: 'A perfectly molten chocolate dessert with a crisp exterior and liquid center.' },
]
