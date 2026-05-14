import { useState } from 'react'
import { ZoomIn, X } from 'lucide-react'
import { dishes } from '../data/config'

const categories = ['All', ...new Set(dishes.map(d => d.category))]

export default function Portfolio() {
  const [modal, setModal] = useState(null)
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? dishes : dishes.filter(d => d.category === active)

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">Culinary Creations</h2>
          <div className="h-0.5 w-0 bg-brand-gold mx-auto transition-all duration-700 group-hover:w-16 aos-animate:w-16"></div>
          <p className="mt-4 text-gray-400 italic font-serif">A selection of my recent work. Click to enlarge.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs font-sans font-bold uppercase tracking-widest border transition-all duration-300 rounded-sm ${
                active === cat
                  ? 'bg-brand-gold border-brand-gold text-white'
                  : 'border-gray-600 text-gray-400 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((dish, i) => (
            <div
              key={dish.title}
              className="group relative h-80 overflow-hidden cursor-pointer bg-black"
              data-aos="fade-up"
              data-aos-delay={(i % 3 + 1) * 100}
              onClick={() => setModal(dish)}
            >
              <img loading="lazy" src={dish.src} alt={dish.alt}
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center bg-black/60 backdrop-blur-[2px]">
                <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase mb-3">{dish.category}</span>
                <h3 className="text-white text-2xl font-serif italic mb-3">{dish.title}</h3>
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex justify-center items-center backdrop-blur-sm"
          onClick={() => setModal(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-brand-gold p-2 bg-black/50 rounded-full"
            onClick={() => setModal(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={modal.src} alt={modal.alt}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl border border-gray-800 rounded-sm select-none"
            onClick={e => e.stopPropagation()} />
          <p className="absolute bottom-6 text-gray-400 text-sm tracking-widest uppercase">Tap outside to close</p>
        </div>
      )}
    </section>
  )
}
