import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as initialData from '../data/config'
import { api } from '../api/client'

const PortfolioContext = createContext(null)

const STORAGE_KEYS = {
  CONFIG: 'chef_imam_site_config',
  DISHES: 'chef_imam_dishes',
  RECIPES: 'chef_imam_recipes',
  TIMELINE: 'chef_imam_timeline',
  CERTIFICATIONS: 'chef_imam_certifications',
  MENTORS: 'chef_imam_mentors',
}

function normalizeItem(item) {
  if (!item) return item
  return {
    ...item,
    id: item._id || item.slug || item.id,
  }
}

export function PortfolioProvider({ children }) {
  // 1. Core State
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG)
      return saved ? JSON.parse(saved) : initialData.siteConfig
    } catch {
      return initialData.siteConfig
    }
  })

  const [dishes, setDishes] = useState(initialData.dishes)
  const [recipes, setRecipes] = useState(initialData.recipes)

  const [timeline, setTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMELINE)
      return saved ? JSON.parse(saved) : initialData.timeline
    } catch {
      return initialData.timeline
    }
  })

  const [certifications, setCertifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS)
      return saved ? JSON.parse(saved) : initialData.certifications
    } catch {
      return initialData.certifications
    }
  })

  const [mentors, setMentors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENTORS)
      return saved ? JSON.parse(saved) : initialData.mentors
    } catch {
      return initialData.mentors
    }
  })

  const [messages, setMessages] = useState([])
  const [serverOnline, setServerOnline] = useState(false)

  // 2. Load live data from Express Server
  const loadFromApi = useCallback(async () => {
    try {
      const [d, r, rev, s] = await Promise.all([
        api.get('/dishes?all=1').catch(() => null),
        api.get('/recipes?all=1').catch(() => null),
        api.get('/reviews').catch(() => null),
        api.get('/settings').catch(() => null),
      ])

      let connected = false

      if (Array.isArray(d) && d.length > 0) {
        setDishes(d.map(normalizeItem))
        connected = true
      }
      if (Array.isArray(r) && r.length > 0) {
        setRecipes(r.map(normalizeItem))
        connected = true
      }
      if (Array.isArray(rev) && rev.length > 0) {
        setMentors(
          rev.map((m) => ({
            id: m._id || m.id,
            name: m.name,
            role: m.role,
            quote: m.quote,
            img: m.image || m.img,
          }))
        )
        connected = true
      }
      if (s && s.name) {
        setSiteConfig((prev) => ({
          ...prev,
          name: s.name || prev.name,
          title: s.title || prev.title,
          tagline: s.tagline || prev.tagline,
          heroLabel: s.heroLabel || prev.heroLabel,
          email: s.email || prev.email,
          phone: s.phone || prev.phone,
          location: s.location || prev.location,
          whatsapp: s.whatsapp || prev.whatsapp,
          heroVideo: s.heroVideo || prev.heroVideo,
          heroImage: s.heroImage || prev.heroImage,
          cvUrl: s.cvUrl || prev.cvUrl,
          social: { ...prev.social, ...s.social },
        }))
        if (Array.isArray(s.certifications) && s.certifications.length) {
          setCertifications(s.certifications)
        }
        if (Array.isArray(s.timeline) && s.timeline.length) {
          setTimeline(s.timeline)
        }
        connected = true
      }

      setServerOnline(connected)
    } catch {
      setServerOnline(false)
    }
  }, [])

  useEffect(() => {
    loadFromApi()
  }, [loadFromApi])

  // Local storage persistence fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig))
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timeline))
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications))
      localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(mentors))
    } catch (e) {
      console.warn('Unable to persist to localStorage:', e)
    }
  }, [siteConfig, timeline, certifications, mentors])

  // Dynamic categories computed from active dishes
  const categories = ['All', ...new Set(dishes.map((d) => d.category))]

  // 3. API Actions for Admin Management
  const addDish = async (dish) => {
    try {
      await api.post('/dishes', dish)
      await loadFromApi()
    } catch {
      // Local fallback
      const newDish = { ...dish, id: dish.id || `dish-${Date.now()}` }
      setDishes((prev) => [newDish, ...prev])
    }
  }

  const updateDish = async (id, updates) => {
    try {
      await api.put(`/dishes/${id}`, updates)
      await loadFromApi()
    } catch {
      // Local fallback
      setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)))
    }
  }

  const deleteDish = async (id) => {
    try {
      await api.delete(`/dishes/${id}`)
      await loadFromApi()
    } catch {
      // Local fallback
      setDishes((prev) => prev.filter((d) => d.id !== id))
    }
  }

  const addRecipe = async (recipe) => {
    try {
      await api.post('/recipes', recipe)
      await loadFromApi()
    } catch {
      const newRecipe = { ...recipe, id: recipe.id || `recipe-${Date.now()}` }
      setRecipes((prev) => [newRecipe, ...prev])
    }
  }

  const updateRecipe = async (id, updates) => {
    try {
      await api.put(`/recipes/${id}`, updates)
      await loadFromApi()
    } catch {
      setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)))
    }
  }

  const deleteRecipe = async (id) => {
    try {
      await api.delete(`/recipes/${id}`)
      await loadFromApi()
    } catch {
      setRecipes((prev) => prev.filter((r) => r.id !== id))
    }
  }

  const saveSettings = async (newConfig) => {
    setSiteConfig(newConfig)
    try {
      await api.put('/settings', {
        ...newConfig,
        certifications,
        timeline,
      })
      await loadFromApi()
    } catch {
      // localStorage takes over
    }
  }

  const loadMessages = async () => {
    try {
      const msgs = await api.get('/messages')
      setMessages(msgs)
      return msgs
    } catch {
      return []
    }
  }

  const markMessageRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`, { read: true })
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true, status: 'read' } : m)))
    } catch {
      // local fallback
    }
  }

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`)
      setMessages((prev) => prev.filter((m) => m._id !== id))
    } catch {
      // local fallback
    }
  }

  // Reset to original data
  const resetToDefaults = () => {
    setSiteConfig(initialData.siteConfig)
    setDishes(initialData.dishes)
    setRecipes(initialData.recipes)
    setTimeline(initialData.timeline)
    setCertifications(initialData.certifications)
    setMentors(initialData.mentors)
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k))
  }

  // Export configuration as config.js
  const exportConfigFile = () => {
    const content = `// ─── Site Configuration ───────────────────────────────────────────────────────
export const siteConfig = ${JSON.stringify(siteConfig, null, 2)}

export const dishes = ${JSON.stringify(dishes, null, 2)}

export const categories = ['All', ...new Set(dishes.map((d) => d.category))]

export const timeline = ${JSON.stringify(timeline, null, 2)}

export const certifications = ${JSON.stringify(certifications, null, 2)}

export const mentors = ${JSON.stringify(mentors, null, 2)}

export const recipes = ${JSON.stringify(recipes, null, 2)}
`
    const blob = new Blob([content], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'config.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <PortfolioContext.Provider
      value={{
        siteConfig,
        setSiteConfig: saveSettings,
        dishes,
        categories,
        addDish,
        updateDish,
        deleteDish,
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        timeline,
        setTimeline,
        certifications,
        setCertifications,
        mentors,
        setMentors,
        messages,
        loadMessages,
        markMessageRead,
        deleteMessage,
        serverOnline,
        resetToDefaults,
        exportConfigFile,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    return {
      siteConfig: initialData.siteConfig,
      dishes: initialData.dishes,
      categories: initialData.categories,
      recipes: initialData.recipes,
      timeline: initialData.timeline,
      certifications: initialData.certifications,
      mentors: initialData.mentors,
      messages: [],
      loadMessages: async () => [],
      markMessageRead: async () => {},
      deleteMessage: async () => {},
      serverOnline: false,
    }
  }
  return context
}
