import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Award, FileDown, Quote } from 'lucide-react'
import { timeline, certifications, mentors } from '../data/config'

export default function Resume() {
  return (
    <section id="resume" className="py-24 bg-[#222]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">Career & Credentials</h2>
          <div className="h-0.5 w-16 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div data-aos="fade-right">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-serif italic text-white">Professional Journey</h3>
              {/* <a href="#" className="flex items-center gap-2 text-brand-gold border border-brand-gold px-4 py-2 text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all font-bold">
  <FileDown className="w-4 h-4" /> Download CV
</a> */}
            </div>

            {timeline.map((item, i) => (
              <div key={i} className="border-l-2 border-brand-gold/30 pl-8 pb-10 relative">
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${
                  item.active
                    ? 'bg-brand-gold shadow-[0_0_20px_rgba(217,119,6,0.8)]'
                    : 'bg-[#2C2C2C] border-2 border-brand-gold'
                }`}></div>
                <span className="text-xs font-sans tracking-widest text-gray-500 uppercase font-bold">{item.date}</span>
                <h4 className="text-xl text-white font-bold mt-2">{item.title}</h4>
                <p className="text-brand-gold text-sm mb-3 font-serif italic">{item.place}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}

            <div className="bg-brand-dark p-6 border border-gray-800 mt-8 rounded shadow-lg">
              <h4 className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest mb-4">
                <Award className="text-brand-gold w-5 h-5" /> Certifications
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-gold mt-1 text-xs">●</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-aos="fade-left">
            <h3 className="text-2xl font-serif italic text-white mb-10">References & Mentors</h3>
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              grabCursor={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              className="pb-14"
            >
              {mentors.map((m, i) => (
                <SwiperSlide key={i}>
                  <figure className="bg-brand-dark p-8 relative rounded-lg shadow-xl border border-gray-800 flex flex-col">
                    <Quote className="absolute top-6 right-6 text-gray-700 w-8 h-8 opacity-50" />
                    <blockquote className="text-gray-400 italic mb-6 leading-relaxed flex-grow">"{m.quote}"</blockquote>
                    <figcaption className="flex items-center gap-4 border-t border-gray-800 pt-6">
                      <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <img loading="lazy" src={m.img} alt={m.name} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm uppercase">{m.name}</h5>
                        <p className="text-brand-gold text-[10px] tracking-widest uppercase">{m.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
