// ─── Site Configuration ───────────────────────────────────────────────────────
export const siteConfig = {
  name: 'Imam Hasan',
  title: 'Trainee Chef Portfolio',
  tagline: 'Where Technique Meets Taste.',
  heroLabel: 'Trainee Chef',
  email: 'mdimamhasanihr@gmail.com',
  phone: '+880 1775 488063',
  location: 'Dhaka, Bangladesh',
  whatsapp: 'https://wa.me/8801775488063',
  heroVideo: 'https://cdn.coverr.co/videos/coverr-a-chef-cooking-in-a-restaurant-kitchen-1665/1080p.mp4',
  heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop',
  social: {
    facebook: 'https://www.facebook.com/imam.hasan.281291',
    instagram: 'https://www.instagram.com/mdimamhasanihr?igsh=b3RhY2s5dHQ2dG9i',
    github: 'https://github.com/1ImamHasan',
  },
}

// ─── Portfolio Dishes ─────────────────────────────────────────────────────────
export const dishes = [
  {
    src: 'https://images.unsplash.com/photo-1676300185292-e238e43b3d5d?q=80&w=800',
    alt: 'Pan-Seared Duck Breast',
    category: 'Modern French',
    title: 'Pan-Seared Duck',
  },
  {
    src: 'https://images.unsplash.com/photo-1559506974-7a81214baaf7?q=80&w=800',
    alt: 'Dark Chocolate Tart',
    category: 'Pastry',
    title: 'Dark Chocolate Tart',
  },
  {
    src: 'https://images.unsplash.com/photo-1626805673863-3b256b3333b6?q=80&w=800',
    alt: 'Saffron Risotto',
    category: 'Italian',
    title: 'Saffron Risotto',
  },
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800',
    alt: 'Herb Crusted Lamb',
    category: 'Main Course',
    title: 'Herb Crusted Lamb',
  },
  {
    src: '/recentDishOfMeImages/LobsterParagon.jpg',
    alt: 'Lobster Paragon',
    category: 'Seafood',
    title: 'Lobster Paragon',
  },
  {
    src: 'https://images.unsplash.com/photo-1569246294372-ed319c674f14?q=80&w=800',
    alt: 'Wild Mushroom Foam',
    category: 'Molecular',
    title: 'Wild Mushroom Foam',
  },
]

// ─── Career Timeline ──────────────────────────────────────────────────────────
export const timeline = [
  {
    date: 'Jan 2026 - Present',
    title: 'Trainee Chef',
    place: 'Available Opportunities',
    desc: 'Available for apprenticeships, private dining events, and catering services.',
    active: true,
  },
  {
    date: 'OCT 2025 - Dec 2025',
    title: 'Professional Chef Course Level-1',
    place: 'International Culinary Institute (ICI)',
    // TODO: আসল মার্ক ও গ্রেড বসাও — যেমন: Grade: A+, Mark: 92/100
    desc: 'Completed with distinction. Specialized in continental cuisine and food safety management (HACCP Level 1). Grade: — | Mark: —/100',
    active: false,
  },
]

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  'Food Safety & Hygiene Level 2',
  'Basic First Aid & Fire Safety',
  'Knife Skills Masterclass Workshop',
  // TODO: Certificate পেলে গ্রেড/মার্ক যোগ করো — যেমন: 'Professional Chef Course Level-1 — ICI (Grade: A+)'
  'Professional Chef Course Level-1 — ICI (Grade: — | Mark: —/100)',
]

// ─── Mentors & References ─────────────────────────────────────────────────────
export const mentors = [
  {
    quote: 'Imam possesses a rare combination of creativity and discipline. His ability to adapt quickly in a high-pressure kitchen environment is impressive.',
    name: 'Daniel C Gomes',
    role: 'Exec Chef, ICI',
    img: '/mentorsImages/danielCgomes.png',
  },
  {
    quote: 'I have seen Imam grow from a student to a capable culinarian. His plating skills and understanding of flavor profiles are well beyond his years.',
    name: 'Shamchul Haque',
    role: 'Exec Chef, TasteBud',
    img: 'https://ui-avatars.com/api/?name=Shamchul+Haque&background=d97706&color=fff&size=200',
  },
]

// ─── Recipes / Blog ───────────────────────────────────────────────────────────
export const recipes = [
  {
    title: 'Classic Beef Bourguignon',
    category: 'Modern French',
    time: '3 hrs',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=800',
    excerpt: 'A rich French braised beef stew slow-cooked in red wine with mushrooms and pearl onions.',
  },
  {
    title: 'Saffron Risotto alla Milanese',
    category: 'Italian',
    time: '45 min',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1626805673863-3b256b3333b6?q=80&w=800',
    excerpt: 'Creamy Arborio rice infused with saffron, finished with Parmigiano-Reggiano and butter.',
  },
  {
    title: 'Dark Chocolate Fondant',
    category: 'Pastry',
    time: '30 min',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1559506974-7a81214baaf7?q=80&w=800',
    excerpt: 'A perfectly molten chocolate dessert with a crisp exterior and liquid center.',
  },
]
