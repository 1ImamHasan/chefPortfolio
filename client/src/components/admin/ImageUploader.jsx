import { useState, useRef } from 'react'
import { Upload, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import { api } from '../../api/client'

export default function ImageUploader({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const res = await api.upload(file)
      if (res?.url) {
        onChange(res.url)
      } else {
        throw new Error('Upload did not return an image URL')
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Failed to upload image. You can also paste an image URL below.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase text-gray-400">{label}</label>
        {value && (
          <span className="text-[11px] text-green-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Image set
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL (https://...) or upload →"
            className="w-full bg-[#151515] border border-gray-700 p-2.5 text-white rounded text-xs focus:border-brand-gold focus:outline-none pr-10"
          />
          {value && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded overflow-hidden border border-gray-700 bg-black">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3.5 py-2.5 bg-[#252525] hover:bg-brand-gold hover:text-white text-gray-300 rounded text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50"
          title="Upload to Cloudinary"
        >
          {uploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="text-[11px] text-amber-400 mt-1">{error}</p>}

      {value && (
        <div className="mt-2 p-2 bg-[#121212] border border-gray-800 rounded flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-black border border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
            {value ? (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <p className="text-[11px] text-gray-400 truncate flex-1 font-mono">{value}</p>
        </div>
      )}
    </div>
  )
}
