import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChefHat,
  UtensilsCrossed,
  BookOpen,
  User,
  ExternalLink,
  LogOut,
  Lock,
  Award,
  Users,
  Mail,
  Wifi,
  WifiOff,
  Loader2,
} from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'
import { api } from '../../api/client'
import DishManager from './DishManager'
import RecipeManager from './RecipeManager'
import ProfileManager from './ProfileManager'
import MessagesManager from './MessagesManager'

export default function AdminDashboard() {
  const { dishes, recipes, certifications, mentors, messages, serverOnline } = usePortfolio()
  const [authenticated, setAuthenticated] = useState(
    () => !!sessionStorage.getItem('chef_admin_token')
  )
  const [email, setEmail] = useState('')
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState('')
  const [logging, setLogging] = useState(false)
  const [activeTab, setActiveTab] = useState('dishes')

  const unreadCount = messages.filter((m) => !m.read).length

  const handleLogin = async (e) => {
    e.preventDefault()
    setLogging(true)
    setAuthError('')
    try {
      const data = await api.post('/auth/login', { email, password: passcode })
      if (data?.token) {
        sessionStorage.setItem('chef_admin_token', data.token)
      }
      setAuthenticated(true)
    } catch (err) {
      setAuthError(err?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
      setLogging(false)
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // ignore
    }
    sessionStorage.removeItem('chef_admin_token')
    setAuthenticated(false)
  }

  // ── Login Screen ───────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 text-gray-200">
        <div className="max-w-md w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto text-brand-gold">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-sans font-bold text-white">Chef Admin Panel</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to manage your portfolio content.</p>
          </div>

          {/* Server status pill */}
          <div className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border font-mono ${
            serverOnline
              ? 'border-green-700/50 bg-green-900/20 text-green-400'
              : 'border-gray-700 bg-gray-800/50 text-gray-500'
          }`}>
            {serverOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {serverOnline ? 'Server online' : 'Server offline (local mode)'}
          </div>

          <form onSubmit={handleLogin} className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setAuthError('') }}
                placeholder="admin@chefimam.com"
                className="w-full bg-[#121212] border border-gray-700 p-3.5 text-white rounded-sm focus:border-brand-gold focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setAuthError('') }}
                placeholder="••••••••"
                className="w-full bg-[#121212] border border-gray-700 p-3.5 text-white rounded-sm focus:border-brand-gold focus:outline-none text-sm"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-xs mt-1 font-sans">{authError}</p>
            )}

            <button
              type="submit"
              disabled={logging}
              className="w-full bg-brand-gold hover:bg-amber-600 disabled:opacity-60 text-white font-sans font-bold uppercase tracking-widest py-3.5 rounded-sm transition-all text-xs shadow-lg flex items-center justify-center gap-2"
            >
              {logging && <Loader2 className="w-4 h-4 animate-spin" />}
              {logging ? 'Signing In...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-800">
            <Link to="/" className="text-gray-500 hover:text-brand-gold text-xs font-sans transition-colors inline-flex items-center gap-1.5">
              ← Return to Live Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-dark text-gray-200 antialiased font-sans">
      {/* Top Navbar */}
      <header className="bg-[#181818] border-b border-gray-800 sticky top-0 z-30">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                Chef Imam{' '}
                <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  Admin
                </span>
              </h1>
              <p className="text-gray-500 text-[11px] flex items-center gap-1.5">
                {serverOnline ? (
                  <><Wifi className="w-2.5 h-2.5 text-green-400" /><span className="text-green-400">Live DB</span></>
                ) : (
                  <><WifiOff className="w-2.5 h-2.5 text-gray-600" /><span>Local mode</span></>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#252525] hover:bg-gray-700 text-gray-300 hover:text-white rounded text-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Dishes', value: dishes.length, Icon: UtensilsCrossed },
            { label: 'Live Recipes', value: recipes.length, Icon: BookOpen },
            { label: 'Certifications', value: certifications.length, Icon: Award },
            { label: 'Mentors', value: mentors.length, Icon: Users },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="bg-[#1f1f1f] border border-gray-800 p-5 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">{value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 mb-8 space-x-1 overflow-x-auto">
          {[
            { id: 'dishes', label: `Dishes (${dishes.length})`, Icon: UtensilsCrossed },
            { id: 'recipes', label: `Recipes (${recipes.length})`, Icon: BookOpen },
            { id: 'messages', label: `Inquiries${unreadCount ? ` (${unreadCount} new)` : ''}`, Icon: Mail },
            { id: 'profile', label: 'Profile & Settings', Icon: User },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 font-sans text-xs uppercase tracking-wider font-bold border-b-2 transition-all shrink-0 ${
                activeTab === id
                  ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === 'messages' && unreadCount > 0 && (
                <span className="bg-brand-gold text-white text-[10px] font-mono rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dishes' && <DishManager />}
        {activeTab === 'recipes' && <RecipeManager />}
        {activeTab === 'messages' && <MessagesManager />}
        {activeTab === 'profile' && <ProfileManager />}
      </main>
    </div>
  )
}
