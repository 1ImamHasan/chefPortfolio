import { useEffect, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setVisible(false), 600)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className={`fixed inset-0 z-[200] bg-brand-dark flex flex-col items-center justify-center transition-opacity duration-500 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Animated plate */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-brand-gold/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-brand-gold/40 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-brand-gold flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-brand-gold animate-ping"></div>
            </div>
          </div>
        </div>
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-t-2 border-brand-gold animate-spin"></div>
      </div>

      {/* Name */}
      <h1 className="text-white font-sans font-bold tracking-[0.4em] uppercase text-lg mb-2">
        Imam Hasan
      </h1>
      <p className="text-brand-gold font-serif italic text-sm tracking-widest">
        Where Technique Meets Taste.
      </p>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-[1px] bg-gray-800 overflow-hidden">
        <div className="h-full bg-brand-gold animate-[loading_2s_ease-in-out_forwards]"></div>
      </div>
    </div>
  )
}
