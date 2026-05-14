import { UtensilsCrossed, Flame, Award, ChefHat } from 'lucide-react'
import { siteConfig } from '../data/config'

const skills = [
  { icon: <UtensilsCrossed />, title: 'Knife Skills', desc: 'Precision cuts & butchery' },
  { icon: <Flame />, title: 'Sauté & Grill', desc: 'Temperature control' },
  { icon: <Award />, title: 'Plating', desc: 'Visual composition' },
  { icon: <ChefHat />, title: 'Menu Planning', desc: 'Costing & seasonality' },
]

export default function About() {
  const { name } = siteConfig

  return (
    <section id="about" className="py-16 md:py-24 bg-[#1f1f1f]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

          <div className="w-full md:w-1/2 relative group" data-aos="fade-right">
            <div className="absolute inset-0 border-2 border-brand-gold transform translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 hidden md:block"></div>
            <img
              src="/photosImam/resume.jpg"
              alt={`${name} Chef Profile`}
              loading="lazy"
              className="w-full h-[500px] object-cover relative z-10 shadow-2xl transition-all duration-500"
            />
          </div>

          <div className="w-full md:w-1/2" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">
              The Chef's Table
            </h2>
            <div className="h-0.5 w-16 bg-brand-gold mb-8 transition-all duration-700"></div>
            <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light">
              Hello, I'm{' '}
              <span className="text-brand-gold font-bold">{name}</span>. As a
              dedicated Trainee Chef, I focus on the intersection of classic
              tradition and modern innovation. My journey is defined by a
              relentless pursuit of flavor balance, precise technique, and the
              art of plating.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {skills.map((skill) => (
                <div key={skill.title}
                  className="flex items-center space-x-4 bg-brand-dark p-4 rounded border-l-2 border-transparent hover:border-brand-gold hover:shadow-[0_0_15px_rgba(217,119,6,0.15)] transition-all duration-300 hover:-translate-y-2 group">
                  <div className="text-brand-gold group-hover:scale-110 transition-transform w-7 h-7">
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-sans font-bold uppercase text-xs tracking-wider">{skill.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
