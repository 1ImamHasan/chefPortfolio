import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['Home', 'About', 'Portfolio', 'Resume', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-brand-dark/95 backdrop-blur-md py-4 border-b border-gray-800 shadow-xl'
        : 'bg-transparent py-6 border-b border-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-brand-gold font-sans font-bold text-2xl tracking-widest border-2 border-brand-gold p-2 hover:bg-brand-gold hover:text-white transition-colors">
          IH
        </a>

        <div className="hidden md:flex space-x-8 font-sans text-xs tracking-[0.2em] uppercase font-bold">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-brand-gold transition-colors py-2"
            >
              {link}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white hover:text-brand-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1f1f1f] absolute w-full top-full left-0 shadow-2xl border-t border-gray-800">
          <div className="flex flex-col items-center py-6 space-y-6 font-sans uppercase tracking-widest text-sm font-bold">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={closeMenu}
                className="w-full text-center py-2 hover:text-brand-gold hover:bg-white/5 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
