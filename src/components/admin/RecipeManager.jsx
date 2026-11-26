import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Check, Clock, Utensils, ChefHat, Sparkles } from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'

export default function RecipeManager() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = usePortfolio()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    category: 'Modern French',
    time: '45 min',
    difficulty: 'Intermediate',
    servings: '4 Servings',
    image: '',
    excerpt: '',
    ingredients: [],
    instructions: [],
    chefTip: '',
  })

  const [newIngredient, setNewIngredient] = useState('')
  const [newStep, setNewStep] = useState('')

  const openAddModal = () => {
    setEditingRecipe(null)
    setFormData({
      title: '',
      category: 'Modern French',
      time: '45 min',
      difficulty: 'Intermediate',
      servings: '4 Servings',
      image: '',
      excerpt: '',
      ingredients: [],
      instructions: [],
      chefTip: '',
    })
    setNewIngredient('')
    setNewStep('')
    setModalOpen(true)
  }

  const openEditModal = (recipe) => {
    setEditingRecipe(recipe)
    setFormData({
      title: recipe.title,
      category: recipe.category,
      time: recipe.time,
      difficulty: recipe.difficulty,
      servings: recipe.servings || '4 Servings',
      image: recipe.image,
      excerpt: recipe.excerpt,
      ingredients: recipe.ingredients ? [...recipe.ingredients] : [],
      instructions: recipe.instructions ? [...recipe.instructions] : [],
      chefTip: recipe.chefTip || '',
    })
    setNewIngredient('')
    setNewStep('')
    setModalOpen(true)
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()
    if (!newIngredient.trim()) return
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, newIngredient.trim()],
    })
    setNewIngredient('')
  }

  const handleRemoveIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    })
  }

  const handleAddStep = (e) => {
    e.preventDefault()
    if (!newStep.trim()) return
    setFormData({
      ...formData,
      instructions: [...formData.instructions, newStep.trim()],
    })
    setNewStep('')
  }

  const handleRemoveStep = (index) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, formData)
    } else {
      addRecipe(formData)
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1f1f1f] p-6 rounded-lg border border-gray-800">
        <div>
          <h3 className="text-xl font-sans font-bold text-white">Culinary Recipes & Notes</h3>
          <p className="text-gray-400 text-sm mt-1">Manage interactive recipes with ingredients and preparation steps.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold hover:bg-amber-600 text-white font-sans text-xs uppercase font-bold tracking-wider rounded-sm transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Recipe
        </button>
      </div>

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-[#1f1f1f] border border-gray-800 rounded-lg overflow-hidden group hover:border-brand-gold/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-black overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-brand-gold text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                  {recipe.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-gray-300 text-[11px] px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-gold" /> {recipe.time}
                </span>
              </div>
              <div className="p-5">
                <h4 className="text-white font-sans font-bold text-lg mb-2">{recipe.title}</h4>
                <p className="text-gray-400 text-xs line-clamp-2 mb-3">{recipe.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] text-gray-500">
                  <span>{recipe.ingredients?.length || 0} Ingredients</span>
                  <span>•</span>
                  <span>{recipe.instructions?.length || 0} Steps</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800/60 flex justify-end gap-2">
              <button
                onClick={() => openEditModal(recipe)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2a2a2a] hover:bg-gray-700 text-gray-300 hover:text-white rounded text-xs transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete recipe "${recipe.title}"?`)) {
                    deleteRecipe(recipe.id)
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Recipe Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-sans font-bold text-white mb-6">
              {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Recipe Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Saffron Risotto alla Milanese"
                    className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Modern French, Italian, Pastry"
                    className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cooking Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 45 min"
                    className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Servings</label>
                  <input
                    type="text"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                    placeholder="e.g. 4 Servings"
                    className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Short Excerpt / Description</label>
                <textarea
                  rows="2"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the dish..."
                  className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Ingredients Builder */}
              <div className="bg-[#151515] p-4 rounded-lg border border-gray-800 space-y-3">
                <label className="block text-xs font-bold uppercase text-brand-gold flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" /> Ingredients List ({formData.ingredients.length})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="e.g. 320g Carnaroli rice"
                    className="flex-grow bg-[#202020] border border-gray-700 p-2 text-white rounded text-sm focus:outline-none focus:border-brand-gold"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient(e)}
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-4 py-2 bg-brand-gold text-white text-xs font-bold uppercase rounded hover:bg-amber-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-[#252525] border border-gray-700 px-3 py-1 rounded text-xs text-gray-300"
                    >
                      {ing}
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(i)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructions Builder */}
              <div className="bg-[#151515] p-4 rounded-lg border border-gray-800 space-y-3">
                <label className="block text-xs font-bold uppercase text-brand-gold flex items-center gap-1.5">
                  <ChefHat className="w-3.5 h-3.5" /> Preparation Steps ({formData.instructions.length})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    placeholder="e.g. Toast rice for 2-3 minutes until translucent..."
                    className="flex-grow bg-[#202020] border border-gray-700 p-2 text-white rounded text-sm focus:outline-none focus:border-brand-gold"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddStep(e)}
                  />
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="px-4 py-2 bg-brand-gold text-white text-xs font-bold uppercase rounded hover:bg-amber-600"
                  >
                    Add Step
                  </button>
                </div>
                <div className="space-y-2 pt-2">
                  {formData.instructions.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-3 bg-[#252525] p-2.5 rounded text-xs text-gray-300"
                    >
                      <span className="font-bold text-brand-gold">{i + 1}.</span>
                      <span className="flex-grow">{step}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(i)}
                        className="text-gray-400 hover:text-red-400 flex-shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gold flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Chef's Pro Tip
                </label>
                <input
                  type="text"
                  value={formData.chefTip}
                  onChange={(e) => setFormData({ ...formData, chefTip: e.target.value })}
                  placeholder="e.g. Always use cold butter during mantecatura for glossy texture."
                  className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-brand-gold hover:bg-amber-600 text-white rounded text-xs font-bold uppercase"
                >
                  <Check className="w-4 h-4" /> {editingRecipe ? 'Save Recipe' : 'Add Recipe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
