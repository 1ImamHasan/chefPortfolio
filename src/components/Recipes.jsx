import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChefHat, Utensils, X, Sparkles, ChevronRight } from 'lucide-react'
import { recipes } from '../data/config'

const difficultyColor = {
  Beginner: 'text-green-400 border-green-400/30 bg-green-400/10',
  Intermediate: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  Advanced: 'text-red-400 border-red-400/30 bg-red-400/10',
}

export default function Recipes() {
  const [activeRecipe, setActiveRecipe] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActiveRecipe(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeRecipe ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeRecipe])

  return (
    <section id="recipes" className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">Recipes & Notes</h2>
          <div className="h-0.5 w-16 bg-brand-gold mx-auto" />
          <p className="mt-4 text-gray-400 italic font-serif">Techniques and recipes from my culinary journey. Click any dish for full instructions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, i) => (
            <motion.div key={recipe.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => setActiveRecipe(recipe)}
              className="bg-[#1f1f1f] border border-gray-800 rounded-lg overflow-hidden group hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(217,119,6,0.15)] flex flex-col justify-between">
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img loading="lazy" src={recipe.image} alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-black/30" />
                  <span className="absolute top-4 left-4 text-[10px] font-sans font-bold uppercase tracking-widest text-white bg-brand-gold px-3 py-1 rounded-sm shadow-md">
                    {recipe.category}
                  </span>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs text-brand-gold font-sans font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Recipe</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-sans font-bold text-xl mb-3 group-hover:text-brand-gold transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{recipe.excerpt}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Utensils className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{recipe.servings}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded border text-[11px] font-semibold ${difficultyColor[recipe.difficulty]}`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {activeRecipe && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveRecipe(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeRecipe.title}
          >
            <motion.div
              className="bg-[#1a1a1a] border border-gray-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img src={activeRecipe.image} alt={activeRecipe.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
                
                <button
                  onClick={() => setActiveRecipe(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-brand-gold text-white rounded-full transition-colors z-10 shadow-lg"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-gold bg-black/70 px-3 py-1 rounded inline-block mb-2">
                    {activeRecipe.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                    {activeRecipe.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Meta details bar */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-[#222] rounded-lg border border-gray-800 text-center">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Prep & Cook</span>
                    <span className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" /> {activeRecipe.time}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Servings</span>
                    <span className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-brand-gold" /> {activeRecipe.servings}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Skill Level</span>
                    <span className="text-sm font-bold text-brand-gold mt-0.5 flex items-center justify-center gap-1">
                      <ChefHat className="w-3.5 h-3.5" /> {activeRecipe.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-base leading-relaxed italic font-serif">
                  "{activeRecipe.excerpt}"
                </p>

                {/* Ingredients & Method */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {/* Ingredients */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-gold" /> Ingredients
                    </h4>
                    <ul className="space-y-2.5 text-sm text-gray-300">
                      {activeRecipe.ingredients.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 pb-2 border-b border-gray-800/60">
                          <span className="text-brand-gold font-bold text-xs mt-0.5">✓</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="md:col-span-3 space-y-4">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-gold" /> Preparation Steps
                    </h4>
                    <ol className="space-y-4 text-sm text-gray-300">
                      {activeRecipe.instructions.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3.5">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 flex items-center justify-center text-xs font-bold font-sans">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Chef's Pro Tip */}
                {activeRecipe.chefTip && (
                  <div className="p-5 bg-brand-gold/10 border border-brand-gold/30 rounded-lg flex items-start gap-3.5">
                    <Sparkles className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1 font-sans">Chef's Pro Tip</h5>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-serif italic">
                        {activeRecipe.chefTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
