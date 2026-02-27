"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, ChevronLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Data
type MenuItem = {
  id: string
  name: string
  price: number
  category: string
  image: string
  available: boolean
  addons: string[]
}

const INITIAL_MENU: MenuItem[] = [
  { id: "1", name: "Jollof Rice & Chicken", price: 2500, category: "Food", image: "🍚", available: true, addons: ["Protein", "Sides", "Drinks"] },
  { id: "2", name: "Fried Rice & Turkey", price: 3000, category: "Food", image: "🍛", available: true, addons: ["Protein", "Sides", "Drinks"] },
  { id: "3", name: "Chicken Shawarma", price: 2000, category: "Snacks", image: "🌯", available: true, addons: ["Drinks"] },
  { id: "4", name: "Cold Coke (50cl)", price: 300, category: "Drinks", image: "🥤", available: true, addons: [] },
]

const ADDON_OPTIONS = ["Protein", "Sides", "Drinks", "Extra Sauce"]

export default function VendorMenuPage() {
  const router = useRouter()
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU)
  const [isAdding, setIsAdding] = useState(false)

  // New Item Form State
  const [newItem, setNewItem] = useState<{
    name: string
    price: string
    category: string
    image: string
    addons: string[]
  }>({ name: "", price: "", category: "Food", image: "🍽️", addons: [] })

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      price: Number(newItem.price),
      category: newItem.category,
      image: newItem.image,
      available: true,
      addons: newItem.addons
    }
    setItems([item, ...items])
    setIsAdding(false)
    setNewItem({ name: "", price: "", category: "Food", image: "🍽️", addons: [] })
  }

  const toggleAvailability = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ))
  }

  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const toggleAddon = (addon: string) => {
    setNewItem(prev => {
      const addons = prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon]
      return { ...prev, addons }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Menu Management</h1>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Items</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{items.length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Active</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {items.filter(i => i.available).length}
            </p>
          </div>
        </div>

        {/* Add Item Modal/Form Overlay */}
        {isAdding && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New Item</h2>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <span className="text-xl font-bold">×</span>
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                    {newItem.image}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Item Name</label>
                      <input
                        required
                        type="text"
                        value={newItem.name}
                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="e.g. Jollof Rice"
                        className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Price (₦)</label>
                    <input
                      required
                      type="number"
                      value={newItem.price}
                      onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                    <select
                      value={newItem.category}
                      onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all"
                    >
                      <option value="Food">Food</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Drinks">Drinks</option>
                    </select>
                  </div>
                </div>

                {/* Add-ons Selection */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Allow Add-ons</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ADDON_OPTIONS.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleAddon(option)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${newItem.addons.includes(option)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-100 bg-gray-50 text-gray-500'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${newItem.addons.includes(option) ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'}`}>
                          {newItem.addons.includes(option) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm font-bold">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Add Item
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Menu List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="grid gap-4">
            {items.map(item => (
              <div key={item.id} className={`group bg-white p-4 rounded-2xl shadow-sm border-l-4 flex gap-4 transition-all duration-300 ${item.available ? 'border-l-green-500 opacity-100' : 'border-l-gray-300 opacity-75'}`}>
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-4xl pb-1 group-hover:scale-105 transition-transform">
                  {item.image}
                </div>

                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 truncate text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{item.category}</p>
                      </div>
                    </div>

                    {/* Add-ons Badges */}
                    {item.addons.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.addons.map(addon => (
                          <span key={addon} className="px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-orange-100">
                            + {addon}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 flex items-center gap-4">
                      <span className="font-bold text-lg text-gray-900">₦{item.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">

                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors w-24 text-center ${item.available
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {item.available ? 'Live' : 'Finished'}
                    </button>

                    <div className="flex gap-2 justify-end">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
