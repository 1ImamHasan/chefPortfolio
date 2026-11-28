# Chef Imam Hasan — Trainee Chef Portfolio 🍽️

A modern, responsive, and high-performance culinary portfolio web application showcasing the craft, dishes, and professional journey of **Imam Hasan (Trainee Chef)** based in Dhaka, Bangladesh.

> *"Where Technique Meets Taste."*

---

## 🌟 Key Features

- **Hero & Storytelling:** Cinematic video background hero section with quick contact actions (Email & WhatsApp).
- **Interactive Culinary Portfolio:** Categorized dish gallery (Modern French, Italian, Molecular, Seafood, Pastry) with high-definition visuals.
- **Career Timeline & Certifications:** Professional culinary education milestones (ICI - International Culinary Institute), food safety credentials, and direct CV download.
- **Mentors & Industry Endorsements:** Testimonial carousel featuring insights from Executive Chefs.
- **Featured Signature Recipes:** Interactive step-by-step recipe drawer with ingredients, cook time, and culinary tips.
- **Contact & Booking:** Working contact form integrated with EmailJS and direct social links.
- **Protected Admin Panel (`/admin`):**
  - Secured with JWT authentication and bcrypt password hashing.
  - Live management for dishes, recipes, and chef profile configurations.
  - MongoDB-backed serverless architecture via Netlify Functions.
- **Performance & SEO:** WebP image optimization, Open Graph tags, Schema.org JSON-LD structured data, responsive design across all viewports.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Sliders & Carousels:** [Swiper](https://swiperjs.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)

### Backend & Serverless
- **Functions:** [Netlify Functions](https://docs.netlify.com/functions/overview/) (`/api/*`)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Auth:** [JSON Web Token (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Email:** [EmailJS](https://www.emailjs.com/)

---

## 📂 Project Structure

```text
chefPortfolio/
├── netlify/
│   └── functions/          # Serverless endpoints (dishes, recipes, login, _db)
├── public/                 # Static assets (images, webp files, robots.txt, sitemap)
│   ├── mentorsImages/
│   ├── photosImam/
│   └── recentDishOfMeImages/
├── scripts/                # Database seeding scripts (seed.mjs)
├── src/
│   ├── components/         # Frontend UI components
│   │   ├── admin/          # Admin Dashboard & Managers (Dish, Recipe, Profile)
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Quote.jsx
│   │   ├── Recipes.jsx
│   │   └── Resume.jsx
│   ├── context/            # React Context (PortfolioContext.jsx)
│   ├── data/               # Static configuration & default data (config.js)
│   ├── App.jsx             # Main layout & lazy-loaded sections
│   ├── index.css           # Global Tailwind and font styles
│   └── main.jsx            # Application entry & router setup
├── .env.example            # Environment variables template
├── eslint.config.js        # ESLint flat configuration
├── netlify.toml            # Netlify deployment configuration
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Custom theme colors and fonts
└── vite.config.js          # Vite build configuration & chunk splitting
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd chefPortfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example `.env` file:
   ```bash
   cp .env.example .env
   ```
   Fill in your credentials:
   ```env
   # EmailJS Configuration (Client-side)
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

   # MongoDB + Admin Auth (Serverless functions)
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_long_random_secret_here
   ADMIN_PASSWORD_HASH=your_bcrypt_hash_here
   ```

---

## 💻 Available Scripts

- **`npm run dev`**: Start the Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Build the optimized production bundle into the `dist/` folder.
- **`npm run preview`**: Preview the production build locally.
- **`npm run lint`**: Run ESLint across the codebase.

---

## 🔐 Admin Panel Access

1. Navigate to `/admin` in your browser (e.g., `http://localhost:5173/admin`).
2. Enter the administrator password configured in your environment.
3. Manage dishes, recipes, and personal branding dynamically.

---

## 📄 License

Private portfolio application. All rights reserved © 2026 Imam Hasan.
