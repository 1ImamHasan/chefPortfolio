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
  {
    id: 'beef-bourguignon',
    title: 'Classic Beef Bourguignon',
    category: 'Modern French',
    time: '3 hrs',
    difficulty: 'Advanced',
    servings: '4-6 Servings',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=800',
    excerpt: 'A rich French braised beef stew slow-cooked in red wine with mushrooms and pearl onions.',
    ingredients: [
      '1.2 kg Beef chuck or brisket, cut into 2-inch chunks',
      '750 ml Dry red wine (Pinot Noir or Burgundy)',
      '200 g Smoked bacon lardons',
      '300 g Cremini or button mushrooms, quartered',
      '15-20 Pearl onions, peeled',
      '3 cloves Garlic, finely minced',
      '2 tbsp Tomato paste',
      '500 ml Rich beef bone stock',
      'Fresh thyme sprigs, bay leaves, and parsley'
    ],
    instructions: [
      'Pat the beef thoroughly dry with paper towels; season generously with coarse sea salt and freshly cracked black pepper.',
      'In a heavy Dutch oven, render bacon lardons until golden and crisp. Remove bacon and set aside.',
      'Brown the beef cubes in small batches in the rendered bacon fat over high heat until a deep caramelized crust forms.',
      'Sauté aromatics, tomato paste, and garlic, then deglaze the pan with Pinot Noir, scraping all the fond from the bottom.',
      'Return beef and bacon to the pot, add beef bone stock and herb bouquet. Simmer gently on low heat or braise in a 160°C (325°F) oven for 2.5 to 3 hours until fork-tender.',
      'In the last 30 minutes, sauté the pearl onions and mushrooms separately in butter until golden, then fold them into the stew.'
    ],
    chefTip: 'Never rush the browning step. The Maillard reaction on the beef surfaces is where the profound depth of sauce flavor originates.'
  },
  {
    id: 'saffron-risotto',
    title: 'Saffron Risotto alla Milanese',
    category: 'Italian',
    time: '45 min',
    difficulty: 'Intermediate',
    servings: '3-4 Servings',
    image: 'https://images.unsplash.com/photo-1626805673863-3b256b3333b6?q=80&w=800',
    excerpt: 'Creamy Arborio rice infused with saffron, finished with Parmigiano-Reggiano and butter.',
    ingredients: [
      '320 g Carnaroli or Arborio rice',
      '0.5 g Premium Persian saffron threads (steeped in warm broth)',
      '1 liter Hot light chicken or vegetable stock',
      '1 medium Shallot, finely brunoised',
      '100 ml Dry crisp white wine',
      '60 g Cold unsalted butter, cubed',
      '80 g Parmigiano-Reggiano, freshly grated',
      'Flaky sea salt and white pepper to taste'
    ],
    instructions: [
      'Steep saffron threads in a ladle of hot stock for at least 15 minutes to extract vibrant color and aromatic oils.',
      'In a wide, heavy-bottomed pan, gently sweat the shallot in a touch of butter until translucent without color.',
      'Add the rice and toast for 2-3 minutes (tostatura) until grains are glossy and hot to the touch.',
      'Pour in white wine and simmer until completely absorbed.',
      'Gradually add simmering stock one ladle at a time, stirring constantly to release starches.',
      'Halfway through, stir in the saffron infusion.',
      'Once the rice is al dente (approx. 16-18 mins), remove from heat and perform the "mantecatura": vigorously beat in cold butter cubes and Parmigiano-Reggiano for an emulsified, wavy (all’onda) texture.'
    ],
    chefTip: 'Always use cold butter straight from the fridge during the mantecatura phase. The temperature contrast creates a silky, glossy emulsification without becoming greasy.'
  },
  {
    id: 'choc-fondant',
    title: 'Dark Chocolate Fondant',
    category: 'Pastry',
    time: '30 min',
    difficulty: 'Intermediate',
    servings: '4 Servings',
    image: 'https://images.unsplash.com/photo-1559506974-7a81214baaf7?q=80&w=800',
    excerpt: 'A perfectly molten chocolate dessert with a crisp exterior and liquid center.',
    ingredients: [
      '150 g High-grade 70% dark couverture chocolate',
      '120 g Unsalted butter',
      '3 large Free-range eggs + 2 egg yolks',
      '80 g Caster sugar',
      '40 g All-purpose flour, sifted',
      'Dutch-processed cocoa powder (for dusting ramekins)',
      'Pinch of fine sea salt',
      'Madagascan vanilla bean ice cream to serve'
    ],
    instructions: [
      'Thoroughly butter four 150ml ceramic ramekins and dust with cocoa powder, chilling them until ready.',
      'Gently melt the dark chocolate and butter together over a gentle bain-marie (water bath) until silky and smooth. Cool slightly.',
      'In a separate bowl, whisk whole eggs, yolks, and caster sugar until pale, airy, and slightly thickened.',
      'Fold the melted chocolate mixture into the eggs gently, followed by the sifted flour and a pinch of sea salt.',
      'Divide the batter evenly among chilled ramekins.',
      'Bake in a preheated oven at 200°C (390°F) for exactly 10 to 12 minutes until the tops are set but the center remains gently trembling.',
      'Rest for 1 minute, invert onto dessert plates, and serve immediately with vanilla ice cream.'
    ],
    chefTip: 'Oven calibration is everything. Even 60 seconds too long will cook through the molten core. Test one fondant first if using a new oven.'
  }
]
