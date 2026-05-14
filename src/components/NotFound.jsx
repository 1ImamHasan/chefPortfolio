import { motion } from 'framer-motion'
import { ChefHat, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      <div className="text-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <ChefHat className="w-24 h-24 text-brand-gold opacity-30" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[10rem] font-sans font-bold text-white leading-none tracking-tight"
        >
          4<span className="text-brand-gold">0</span>4
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '4rem' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-0.5 bg-brand-gold mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-400 font-serif italic text-xl mb-2"
        >
          "This dish is not on the menu."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-600 text-sm font-sans uppercase tracking-widest mb-12"
        >
          Page not found
        </motion.p>

        <motion.a
          href="/"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="group relative px-8 py-4 bg-transparent border border-brand-gold text-brand-gold font-sans uppercase tracking-widest text-sm font-bold overflow-hidden inline-flex items-center gap-3 hover:text-white transition-all"
        >
          <span className="absolute inset-0 w-0 bg-brand-gold transition-all duration-[250ms] ease-out group-hover:w-full"></span>
          <Home className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Back to Home</span>
        </motion.a>

      </div>
    </div>
  )
}
