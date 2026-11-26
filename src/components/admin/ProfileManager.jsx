import { useState } from 'react'
import { Check, Download, RotateCcw, Copy, ExternalLink } from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'

export default function ProfileManager() {
  const { siteConfig, setSiteConfig, resetToDefaults, exportConfigFile } = usePortfolio()
  const [formData, setFormData] = useState({ ...siteConfig, social: { ...siteConfig.social } })
  const [savedNotice, setSavedNotice] = useState(false)
  const [copiedNotice, setCopiedNotice] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSiteConfig(formData)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(siteConfig, null, 2))
    setCopiedNotice(true)
    setTimeout(() => setCopiedNotice(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Profile Form */}
      <div className="bg-[#1f1f1f] border border-gray-800 rounded-lg p-6 sm:p-8">
        <h3 className="text-xl font-sans font-bold text-white mb-2">Chef Profile & Contact Details</h3>
        <p className="text-gray-400 text-sm mb-6">Update personal branding, contact info, and social media links.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Chef Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Hero Label / Badge</label>
              <input
                type="text"
                value={formData.heroLabel}
                onChange={(e) => setFormData({ ...formData, heroLabel: e.target.value })}
                className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Tagline / Motto</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-800 pt-6 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold font-sans">Social Media & Messaging</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">WhatsApp Direct URL</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-[#151515] border border-gray-700 p-2.5 text-white rounded text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={formData.social?.facebook || ''}
                  onChange={(e) => setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })}
                  className="w-full bg-[#151515] border border-gray-700 p-2.5 text-white rounded text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={formData.social?.instagram || ''}
                  onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                  className="w-full bg-[#151515] border border-gray-700 p-2.5 text-white rounded text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            {savedNotice ? (
              <span className="text-green-400 text-sm flex items-center gap-1.5 font-sans">
                <Check className="w-4 h-4" /> Profile updated successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-gold hover:bg-amber-600 text-white font-sans text-xs uppercase font-bold tracking-wider rounded-sm transition-all shadow-md"
            >
              <Check className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Sync & Export Tools */}
      <div className="bg-[#1f1f1f] border border-gray-800 rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-sans font-bold text-white mb-2">Data Backup & Export Tools</h3>
          <p className="text-gray-400 text-sm">
            Download your updated configuration file or reset your changes back to factory default.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={exportConfigFile}
            className="flex items-center gap-2 px-5 py-3 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-sans text-xs uppercase font-bold tracking-wider rounded transition-all"
          >
            <Download className="w-4 h-4" /> Download Updated config.js
          </button>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-2 px-5 py-3 bg-[#2a2a2a] hover:bg-gray-700 border border-gray-700 text-gray-300 font-sans text-xs uppercase font-bold tracking-wider rounded transition-all"
          >
            <Copy className="w-4 h-4" /> {copiedNotice ? 'JSON Copied!' : 'Copy Site Data JSON'}
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all dishes, recipes, and profile data to factory defaults?')) {
                resetToDefaults()
                setFormData({ ...siteConfig, social: { ...siteConfig.social } })
                alert('All data has been reset to defaults.')
              }
            }}
            className="flex items-center gap-2 px-5 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-sans text-xs uppercase font-bold tracking-wider rounded transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reset All to Defaults
          </button>
        </div>
      </div>
    </div>
  )
}
