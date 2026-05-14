import { useEffect, lazy, Suspense } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/pagination'

import Navbar from './components/Navbar'
import Hero from './components/Hero'

const About = lazy(() => import('./components/About'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Resume = lazy(() => import('./components/Resume'))
const Quote = lazy(() => import('./components/Quote'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 1000,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className="bg-brand-dark text-gray-300 antialiased overflow-x-hidden font-sans selection:bg-brand-gold selection:text-white">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-screen bg-brand-dark" />}>
        <About />
        <Portfolio />
        <Resume />
        <Quote />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
