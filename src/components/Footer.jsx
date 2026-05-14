import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { siteConfig } from '../data/config'

export default function Footer() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="border-t border-gray-800 py-8 bg-[#151515] text-center">
        <p className="text-gray-600 text-sm font-sans tracking-wider">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
        </p>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-20 md:bottom-8 right-6 p-4 bg-brand-gold text-white rounded-full shadow-2xl z-40 hover:bg-amber-700 transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
  )
}
