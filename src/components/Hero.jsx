import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '../data/config'

export default function Hero() {
  const { name, tagline, heroVideo, heroImage } = siteConfig
  const imgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const scrollY = window.scrollY
        imgRef.current.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          ref={imgRef}
          className="w-full h-full object-cover opacity-30"
          poster={heroImage}
        >
          <source src={heroVideo} type="video/mp4" />
          <img
            src={heroImage}
            alt="Fine Dining Atmosphere"
            className="w-full h-full object-cover opacity-40"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1200">
        <p className="text-brand-gold font-sans tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-bold">
          Portfolio
        </p>
        <h1 className="text-4xl md:text-8xl font-sans font-bold text-white mb-6 tracking-tight leading-tight">
          {name.toUpperCase()}
        </h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-3xl text-gray-300 font-serif italic mb-12 font-light">
          "{tagline}"
        </p>
        <a href="#portfolio"
          className="group relative px-8 py-4 bg-transparent border border-brand-gold text-brand-gold font-sans uppercase tracking-widest text-sm font-bold overflow-hidden inline-block transition-all hover:text-white">
          <span className="absolute inset-0 w-0 bg-brand-gold transition-all duration-[250ms] ease-out group-hover:w-full"></span>
          <span className="relative">Explore Creations</span>
        </a>
      </div>

      <div className="absolute bottom-8 w-full flex flex-col items-center gap-2 animate-bounce">
        <a href="#about" className="text-gray-500 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
        <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-sans">Scroll to explore</span>
      </div>
    </section>
  )
}
