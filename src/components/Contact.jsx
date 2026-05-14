import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, Send, CheckCircle, XCircle } from 'lucide-react'
import { siteConfig } from '../data/config'

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const { email, phone, whatsapp, social } = siteConfig

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#151515]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">

          <div data-aos="fade-right">
            <h2 className="text-4xl font-sans font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              I am currently available for apprenticeships, private dining events, and collaborations.
            </p>
            <div className="space-y-6">
              <a href={`mailto:${email}`}
                className="flex items-center space-x-5 text-gray-300 hover:text-brand-gold transition-colors p-4 bg-[#1f1f1f] rounded border border-transparent hover:border-brand-gold/30">
                <Mail className="text-brand-gold w-6 h-6" />
                <span className="font-sans">{email}</span>
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center space-x-5 text-gray-300 hover:text-brand-gold transition-colors p-4 bg-[#1f1f1f] rounded border border-transparent hover:border-brand-gold/30">
                <Phone className="text-green-500 w-6 h-6" />
                <span className="font-sans">{phone} (WhatsApp)</span>
              </a>
              <div className="flex space-x-4 pt-6">
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-12 h-12 border border-gray-700 flex items-center justify-center rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all text-gray-400">
                  <FacebookIcon />
                </a>
                <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="w-12 h-12 border border-gray-700 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-all text-gray-400">
                  <GithubIcon />
                </a>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-12 h-12 border border-gray-700 flex items-center justify-center rounded-full hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] p-10 rounded-lg border border-gray-800 shadow-2xl" data-aos="fade-left">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-widest">Name</label>
                  <input type="text" name="name" required placeholder="John Doe"
                    className="w-full bg-[#151515] border border-gray-700 p-4 text-white focus:border-brand-gold focus:outline-none focus:ring-0 transition-colors text-sm rounded-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-widest">Email</label>
                  <input type="email" name="email" required placeholder="john@example.com"
                    className="w-full bg-[#151515] border border-gray-700 p-4 text-white focus:border-brand-gold focus:outline-none focus:ring-0 transition-colors text-sm rounded-sm" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-widest">Message</label>
                <textarea name="message" rows="4" required placeholder="How can I help you?"
                  className="w-full bg-[#151515] border border-gray-700 p-4 text-white focus:border-brand-gold focus:outline-none focus:ring-0 transition-colors text-sm rounded-sm"></textarea>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-3 text-green-400 bg-green-400/10 p-4 rounded border border-green-400/20">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Message sent successfully!</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded border border-red-400/20">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Something went wrong. Please try again.</span>
                </div>
              )}

              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-brand-gold text-white font-sans font-bold uppercase tracking-widest py-4 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all text-xs rounded-sm shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
