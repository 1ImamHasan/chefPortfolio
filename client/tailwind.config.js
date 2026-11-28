/** @type {import('tailwindcss').Config} */
const withAlpha = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      colors: {
        brand: {
          gold: withAlpha('--color-gold'),
          'gold-dark': withAlpha('--color-gold-dark'),
          dark: withAlpha('--color-dark'),
          surface: withAlpha('--color-surface'),
          raised: withAlpha('--color-raised'),
          panel: withAlpha('--color-panel'),
          deep: withAlpha('--color-deep'),
        },
      },
      boxShadow: {
        'gold-soft': '0 0 15px rgb(var(--color-gold) / 0.15)',
        'gold-mid': '0 0 20px rgb(var(--color-gold) / 0.4)',
        'gold-strong': '0 0 20px rgb(var(--color-gold) / 0.8)',
      },
    },
  },
  plugins: [],
}
