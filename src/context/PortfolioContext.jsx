import { createContext, useContext, useState, useEffect } from 'react'
import * as initialData from '../data/config'

const PortfolioContext = createContext(null)

const STORAGE_KEYS = {
  CONFIG: 'chef_imam_site_config',
  DISHES: 'chef_imam_dishes',
  RECIPES: 'chef_imam_recipes',
  TIMELINE: 'chef_imam_timeline',
  CERTIFICATIONS: 'chef_imam_certifications',
  MENTORS: 'chef_imam_mentors',
}

export function PortfolioProvider({ children }) {
  // Load initial data from localStorage or fallback to config.js
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG)
      return saved ? JSON.parse(saved) : initialData.siteConfig
    } catch {
      return initialData.siteConfig
    }
  })

  const [dishes, setDishes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DISHES)
      return saved ? JSON.parse(saved) : initialData.dishes
    } catch {
      return initialData.dishes
    }
  })

  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECIPES)
      return saved ? JSON.parse(saved) : initialData.recipes
    } catch {
      return initialData.recipes
    }
  })

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

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig))
      localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes))
      localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes))
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timeline))
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications))
      localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(mentors))
    } catch (e) {
      console.warn('Unable to persist to localStorage:', e)
    }
  }, [siteConfig, dishes, recipes, timeline, certifications, mentors])

  // Dynamic categories computed from active dishes
  const categories = ['All', ...new Set(dishes.map((d) => d.category))]

  // Dish actions
  const addDish = (dish) => {
    const id = dish.id || dish.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now()
    setDishes((prev) => [ { ...dish, id }, ...prev ])
  }

  const updateDish = (id, updated) => {
    setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)))
  }

  const deleteDish = (id) => {
    setDishes((prev) => prev.filter((d) => d.id !== id))
  }

  // Recipe actions
  const addRecipe = (recipe) => {
    const id = recipe.id || recipe.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now()
    setRecipes((prev) => [ { ...recipe, id }, ...prev ])
  }

  const updateRecipe = (id, updated) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)))
  }

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id))
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

  // Export current configuration as config.js
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
        setSiteConfig,
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
        resetToDefaults,
        exportConfigFile,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    // Graceful fallback to static initialData if outside provider
    return {
      siteConfig: initialData.siteConfig,
      dishes: initialData.dishes,
      categories: initialData.categories,
      recipes: initialData.recipes,
      timeline: initialData.timeline,
      certifications: initialData.certifications,
      mentors: initialData.mentors,
    }
  }
  return context
}
