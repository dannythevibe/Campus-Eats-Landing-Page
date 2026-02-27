"use client"

import { Search, SlidersHorizontal, Plus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner" // Assuming sonner or toast is available, if not I will use simple console or native alert, but I'll add a visual feedback. Alternatively I'll just rely on the button animation.
import { useState } from "react"

const CATEGORIES = [
    { id: "pastries", name: "Pastries", image: "🥐", color: "bg-orange-100" },
    { id: "drinks", name: "Drinks", image: "🥤", color: "bg-blue-100" },
    { id: "food", name: "Food", image: "🍝", color: "bg-green-100" },
]

const ITEMS = [
    { id: 1, name: "White Rice", price: 1500, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Amala & Ewedu", price: 2000, img: "https://images.unsplash.com/photo-1626509683517-c03794627254?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Coconut Rice", price: 1800, img: "https://images.unsplash.com/photo-1596560548464-f010549b8416?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Jollof Rice", price: 1600, img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f1a?auto=format&fit=crop&w=300&q=80" },
]

export default function PwaSearchPage() {
    const { addToCart } = useCart()
    const [addedItems, setAddedItems] = useState<Record<number, boolean>>({})
    const [searchQuery, setSearchQuery] = useState("")

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.img
        })
        setAddedItems(prev => ({ ...prev, [item.id]: true }))
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [item.id]: false }))
        }, 1000)
    }

    const filteredItems = ITEMS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6 space-y-8 pb-32">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Explore<span className="text-lime-500">.</span></h1>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gray-200 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white border border-gray-100/50 flex items-center p-2 rounded-2xl shadow-sm transition-transform active:scale-[0.99]">
                    <Search className="w-6 h-6 text-gray-400 ml-3" />
                    <input
                        type="text"
                        placeholder="Search food, drinks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 text-sm font-medium h-12 ml-2 outline-none"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-900 text-lg">Categories</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {CATEGORIES.map((cat, idx) => (
                        <button
                            key={cat.id}
                            className={`relative overflow-hidden rounded-[1.5rem] h-32 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 hover:shadow-lg shadow-sm group`}
                        >
                            <div className={`absolute inset-0 ${cat.color} opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                            <span className="text-4xl filter drop-shadow-md z-10 transform group-hover:scale-110 transition-transform duration-300">{cat.image}</span>
                            <span className="text-xs font-bold text-gray-900 z-10">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Popular Items Grid */}
            <div>
                <h2 className="font-bold text-gray-900 text-lg mb-4">
                    {searchQuery ? `Results for "${searchQuery}"` : "Popular now"}
                </h2>
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredItems.map((item, idx) => (
                            <div key={item.id} className="group bg-white p-3 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300">
                                <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-3">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(item);
                                        }}
                                        className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all duration-300 ${addedItems[item.id] ? 'bg-lime-500 text-white' : 'bg-white/90 backdrop-blur text-gray-900 hover:text-lime-600'}`}
                                    >
                                        {addedItems[item.id] ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : <Plus className="w-5 h-5" />}
                                    </button>
                                </div>
                                <div className="px-1">
                                    <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{item.name}</h3>
                                    <p className="text-xs font-bold text-lime-600">₦{item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No items found matching your search.
                    </div>
                )}
            </div>
        </div>
    )
}
