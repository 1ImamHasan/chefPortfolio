import { lazy, Suspense } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Loader from './components/Loader'

const About    = lazy(() => import('./components/About'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Resume   = lazy(() => import('./components/Resume'))
const Quote    = lazy(() => import('./components/Quote'))
const Recipes  = lazy(() => import('./components/Recipes'))
const Contact  = lazy(() => import('./components/Contact'))
const Footer   = lazy(() => import('./components/Footer'))

const SectionFallback = () => <div className="h-64 bg-brand-dark animate-pulse" aria-hidden="true" />

function App() {
  return (
    <>
      <Loader />
      <div className="bg-brand-dark text-gray-300 antialiased overflow-x-hidden font-sans selection:bg-brand-gold selection:text-white">
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Portfolio /></Suspense>
        <Suspense fallback={<SectionFallback />}><Resume /></Suspense>
        <Suspense fallback={<SectionFallback />}><Quote /></Suspense>
        <Suspense fallback={<SectionFallback />}><Recipes /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
        <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
      </div>
    </>
  )
}
export default App
