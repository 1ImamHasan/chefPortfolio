import { motion } from 'framer-motion'
import { ChefHat } from 'lucide-react'

export default function Quote() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-[#2C2C2C] relative border-y border-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}>
      <div className="container mx-auto px-6 text-center">
        <ChefHat className="w-12 h-12 text-gray-600 mx-auto mb-6 opacity-50" />
        <blockquote className="text-xl md:text-4xl font-serif italic text-gray-300 max-w-4xl mx-auto leading-relaxed">
          "Cooking is an art, but all art requires knowing something about the techniques and materials."
        </blockquote>
        <cite className="block mt-8 text-brand-gold font-sans text-xs font-bold tracking-[0.2em] uppercase">
          — Nathan Myhrvold
        </cite>
      </div>
    </motion.section>
  )
}
