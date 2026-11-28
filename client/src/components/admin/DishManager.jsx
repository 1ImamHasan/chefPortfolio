import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'
import ImageUploader from './ImageUploader'

export default function DishManager() {
  const { dishes, categories, addDish, updateDish, deleteDish } = usePortfolio()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDish, setEditingDish] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Modern French',
    src: '',
    alt: '',
  })
  const [customCategory, setCustomCategory] = useState('')

  const openAddModal = () => {
    setEditingDish(null)
    setFormData({ title: '', category: 'Modern French', src: '', alt: '' })
    setCustomCategory('')
    setModalOpen(true)
  }

  const openEditModal = (dish) => {
    setEditingDish(dish)
    setFormData({
      title: dish.title,
      category: dish.category,
      src: dish.src,
      alt: dish.alt || dish.title,
    })
    setCustomCategory('')
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalCategory = formData.category === '__custom__' ? customCategory.trim() : formData.category
    if (!finalCategory) return

    const payload = {
      ...formData,
      category: finalCategory,
      alt: formData.alt || formData.title,
    }

    if (editingDish) {
      updateDish(editingDish.id, payload)
    } else {
      addDish(payload)
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1f1f1f] p-6 rounded-lg border border-gray-800">
        <div>
          <h3 className="text-xl font-sans font-bold text-white">Culinary Creations Gallery</h3>
          <p className="text-gray-400 text-sm mt-1">Manage dishes displayed on your portfolio gallery.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold hover:bg-amber-600 text-white font-sans text-xs uppercase font-bold tracking-wider rounded-sm transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Dish
        </button>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-[#1f1f1f] border border-gray-800 rounded-lg overflow-hidden group hover:border-brand-gold/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-black/50 overflow-hidden">
                <img
                  src={dish.src}
                  alt={dish.alt || dish.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'
                  }}
                />
                <span className="absolute top-3 left-3 bg-brand-gold text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow">
                  {dish.category}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-white font-sans font-bold text-base mb-1">{dish.title}</h4>
                <p className="text-gray-500 text-xs truncate">{dish.src}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-gray-800/60 mt-3 flex justify-end gap-2">
              <button
                onClick={() => openEditModal(dish)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2a2a2a] hover:bg-gray-700 text-gray-300 hover:text-white rounded text-xs transition-colors"
                title="Edit dish"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${dish.title}"?`)) {
                    deleteDish(dish.id)
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs transition-colors"
                title="Delete dish"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dish Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-sans font-bold text-white mb-6">
              {editingDish ? 'Edit Dish' : 'Add New Culinary Creation'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5 tracking-wider">
                  Dish Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Pan-Seared Duck Breast"
                  className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5 tracking-wider">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#151515] border border-gray-700 p-3 text-white rounded text-sm focus:border-brand-gold focus:outline-none"
                >
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__custom__">+ Add New Custom Category...</option>
                </select>

                {formData.category === '__custom__' && (
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category name (e.g. Molecular Gastronomy)"
                    className="w-full mt-2 bg-[#151515] border border-brand-gold p-3 text-white rounded text-sm focus:outline-none"
                  />
                )}
              </div>

              <div>
                <ImageUploader
                  label="Dish Image *"
                  value={formData.src}
                  onChange={(url) => setFormData({ ...formData, src: url })}
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
                  <Check className="w-4 h-4" /> {editingDish ? 'Save Changes' : 'Add Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
