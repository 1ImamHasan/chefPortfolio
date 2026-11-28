import { useState, useEffect } from 'react'
import { Mail, Calendar, Users, Phone, Trash2, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'

export default function MessagesManager() {
  const { messages, loadMessages, markMessageRead, deleteMessage } = usePortfolio()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    loadMessages().finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = async () => {
    setLoading(true)
    await loadMessages()
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-sans font-bold text-white">Client Inquiries & Booking Messages</h3>
          <p className="text-gray-400 text-sm">Review messages and catering/private dining requests submitted through your website.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-3.5 py-2 bg-[#252525] hover:bg-gray-700 text-gray-300 rounded text-xs flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-12 text-center text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30 text-brand-gold" />
          <p className="text-sm">No messages received yet.</p>
          <p className="text-xs text-gray-600 mt-1">When visitors submit the contact form, inquiries will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-lg border transition-all ${
                msg.read ? 'bg-[#181818] border-gray-800 opacity-80' : 'bg-[#1f1f1f] border-brand-gold/40 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${msg.read ? 'bg-gray-600' : 'bg-brand-gold animate-pulse'}`}
                  />
                  <h4 className="text-white font-bold text-base">{msg.name}</h4>
                  <span className="text-[11px] bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded font-mono uppercase">
                    {msg.eventType || 'Inquiry'}
                  </span>
                </div>

                <div className="text-xs text-gray-400 flex items-center gap-4">
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <button
                        onClick={() => markMessageRead(msg._id)}
                        className="text-gray-400 hover:text-green-400 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-400 mb-4 bg-[#141414] p-3 rounded border border-gray-800/60">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <a href={`mailto:${msg.email}`} className="hover:text-white underline truncate">
                    {msg.email}
                  </a>
                </div>
                {msg.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <a href={`tel:${msg.phone}`} className="hover:text-white">
                      {msg.phone}
                    </a>
                  </div>
                )}
                {msg.eventDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span>Date: {msg.eventDate}</span>
                  </div>
                )}
                {msg.guestCount && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span>Guests: {msg.guestCount}</span>
                  </div>
                )}
              </div>

              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap bg-[#151515] p-3.5 rounded border border-gray-800">
                {msg.body}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
