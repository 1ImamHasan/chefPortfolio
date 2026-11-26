import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export default function Hero() {
  const { siteConfig } = usePortfolio()
  const { name, tagline, heroVideo, heroImage, heroLabel } = siteConfig
  const [videoError, setVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })
  const containerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax scroll effect using Framer Motion
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200])
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.2])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Background Media with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 scale-105"
        style={{ y: backgroundY }}
        aria-hidden="true"
      >
        {!videoError && !isMobile ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-35"
            poster={heroImage}
          >
            <source src={heroVideo} type="video/mp4" />
            <img
              src={heroImage}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
          </video>
        ) : (
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
      </motion.div>

      {/* Hero Typography & Call-To-Action */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity: opacityFade }}
      >
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-gold font-sans tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-bold"
        >
          {heroLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-4xl md:text-8xl font-sans font-bold text-white mb-6 tracking-tight leading-tight"
        >
          {name.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '6rem' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-brand-gold mx-auto mb-8 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-3xl text-gray-300 font-serif italic mb-12 font-light"
        >
          "{tagline}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="#portfolio"
            className="group relative px-8 py-4 bg-transparent border border-brand-gold text-brand-gold font-sans uppercase tracking-widest text-sm font-bold overflow-hidden inline-block transition-all hover:text-white shadow-lg hover:shadow-[0_0_25px_rgba(217,119,6,0.3)]"
          >
            <span className="absolute inset-0 w-0 bg-brand-gold transition-all duration-[250ms] ease-out group-hover:w-full" />
            <span className="relative">Explore Creations</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 w-full flex flex-col items-center gap-2 animate-bounce"
      >
        <a href="#about" className="text-gray-500 hover:text-white transition-colors" aria-label="Scroll to About">
          <ChevronDown className="w-8 h-8" />
        </a>
        <span className="text-gray-400 text-xs tracking-widest uppercase font-sans">Scroll to explore</span>
      </motion.div>
    </section>
  )
}
