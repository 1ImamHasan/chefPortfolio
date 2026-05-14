import { ChefHat } from 'lucide-react'

export default function Quote() {
  return (
    <section className="py-24 bg-[#2C2C2C] relative border-y border-gray-800" data-aos="zoom-in">
      <div className="container mx-auto px-6 text-center">
        <ChefHat className="w-12 h-12 text-gray-600 mx-auto mb-6 opacity-50" />
        <blockquote className="text-2xl md:text-4xl font-serif italic text-gray-300 max-w-4xl mx-auto leading-relaxed">
          "Cooking is an art, but all art requires knowing something about the techniques and materials."
        </blockquote>
        <cite className="block mt-8 text-brand-gold font-sans text-xs font-bold tracking-[0.2em] uppercase">
          — Nathan Myhrvold
        </cite>
      </div>
    </section>
  )
}
