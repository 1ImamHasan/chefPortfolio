import { Clock, ChefHat } from 'lucide-react'
import { recipes } from '../data/config'

const difficultyColor = {
  Beginner: 'text-green-400',
  Intermediate: 'text-yellow-400',
  Advanced: 'text-red-400',
}

export default function Recipes() {
  return (
    <section id="recipes" className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">
            Recipes & Notes
          </h2>
          <div className="h-0.5 w-16 bg-brand-gold mx-auto"></div>
          <p className="mt-4 text-gray-400 italic font-serif">
            Techniques and recipes from my culinary journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={(i % 3 + 1) * 100}
              className="bg-[#1f1f1f] border border-gray-800 rounded-lg overflow-hidden group hover:border-brand-gold/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  loading="lazy"
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] to-transparent"></div>
                <span className="absolute top-4 left-4 text-[10px] font-sans font-bold uppercase tracking-widest text-white bg-brand-gold px-3 py-1 rounded-sm">
                  {recipe.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-white font-sans font-bold text-lg mb-3 group-hover:text-brand-gold transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {recipe.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ChefHat className="w-3 h-3 text-gray-500" />
                    <span className={difficultyColor[recipe.difficulty] || 'text-gray-400'}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
