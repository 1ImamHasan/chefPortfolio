import { lazy, Suspense } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'

const About    = lazy(() => import('./components/About'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Resume   = lazy(() => import('./components/Resume'))
const Quote    = lazy(() => import('./components/Quote'))
const Recipes  = lazy(() => import('./components/Recipes'))
const Contact  = lazy(() => import('./components/Contact'))
const Footer   = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      <CustomCursor />
      <Loader />
      <div className="bg-brand-dark text-gray-300 antialiased overflow-x-hidden font-sans selection:bg-brand-gold selection:text-white">
        <Navbar />
        <Hero />
        <Suspense fallback={<div className="h-screen bg-brand-dark" />}>
          <About />
          <Portfolio />
          <Resume />
          <Quote />
          <Recipes />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default App
