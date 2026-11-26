import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChefHat,
  UtensilsCrossed,
  BookOpen,
  User,
  ExternalLink,
  LogOut,
  Lock,
  Layers,
  Award,
  Users,
  ShieldCheck,
} from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'
import DishManager from './DishManager'
import RecipeManager from './RecipeManager'
import ProfileManager from './ProfileManager'

export default function AdminDashboard() {
  const { siteConfig, dishes, recipes, certifications, mentors } = usePortfolio()
  const [authenticated, setAuthenticated] = useState(
    () => !!sessionStorage.getItem('chef_admin_token')
  )
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState(false)
  const [activeTab, setActiveTab] = useState('dishes')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      })
      if (!res.ok) throw new Error()
      const { token } = await res.json()
      sessionStorage.setItem('chef_admin_token', token)
      setAuthenticated(true)
      setAuthError(false)
    } catch {
      setAuthError(true)
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    sessionStorage.removeItem('chef_admin_token')
  }

  // Passcode Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 text-gray-200">
        <div className="max-w-md w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto text-brand-gold">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-sans font-bold text-white">Chef Admin Panel</h2>
            <p className="text-gray-400 text-sm mt-1">Enter your admin passcode to manage portfolio content.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  setAuthError(false)
                }}
                placeholder="Enter admin password"
                className="w-full bg-[#121212] border border-gray-700 p-3.5 text-center text-white tracking-widest text-lg rounded-sm focus:border-brand-gold focus:outline-none"
              />
              {authError && (
                <p className="text-red-400 text-xs mt-2 font-sans">Incorrect passcode. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold hover:bg-amber-600 text-white font-sans font-bold uppercase tracking-widest py-3.5 rounded-sm transition-all text-xs shadow-lg"
            >
              Access Dashboard
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
                Chef Imam <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">Admin</span>
              </h1>
              <p className="text-gray-500 text-[11px]">Content Management Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
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

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Quick Statistics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1f1f1f] border border-gray-800 p-5 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{dishes.length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Dishes</span>
            </div>
          </div>

          <div className="bg-[#1f1f1f] border border-gray-800 p-5 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{recipes.length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Live Recipes</span>
            </div>
          </div>

          <div className="bg-[#1f1f1f] border border-gray-800 p-5 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{certifications.length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Certifications</span>
            </div>
          </div>

          <div className="bg-[#1f1f1f] border border-gray-800 p-5 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{mentors.length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Mentors</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 mb-8 space-x-2">
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex items-center gap-2 px-6 py-3.5 font-sans text-xs uppercase tracking-wider font-bold border-b-2 transition-all ${
              activeTab === 'dishes'
                ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Dishes Gallery ({dishes.length})
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-6 py-3.5 font-sans text-xs uppercase tracking-wider font-bold border-b-2 transition-all ${
              activeTab === 'recipes'
                ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Recipes ({recipes.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3.5 font-sans text-xs uppercase tracking-wider font-bold border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Profile & Backup
          </button>
        </div>

        {/* Active Tab View */}
        {activeTab === 'dishes' && <DishManager />}
        {activeTab === 'recipes' && <RecipeManager />}
        {activeTab === 'profile' && <ProfileManager />}
      </main>
    </div>
  )
}
