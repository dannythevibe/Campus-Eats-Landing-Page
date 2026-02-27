"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Star, Clock, MapPin, Plus, Minus, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner" // Assuming sonner is installed, otherwise console.log

// Mock Data matching the Vendor Dashboard structure
const RESTAURANT = {
    id: "1",
    name: "Manna Palace",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    deliveryTime: "15-25 min",
    location: "Student Center",
    isClosed: false,
}

const MENU_ITEMS = [
    {
        id: "1",
        name: "Jollof Rice",
        price: 1500,
        description: "Smoky party jollof rice",
        image: "https://images.unsplash.com/photo-1626509683517-c03794627254?auto=format&fit=crop&w=300&q=80",
        category: "Food",
        addons: ["Protein", "Sides"]
    },
    {
        id: "2",
        name: "Fried Rice",
        price: 1800,
        description: "Rich fried rice with veggies",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f1a?auto=format&fit=crop&w=300&q=80",
        category: "Food",
        addons: ["Protein", "Sides"]
    },
    {
        id: "3",
        name: "Chicken & Chips",
        price: 2500,
        description: "Crispy chicken with fries",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80",
        category: "Snacks",
        addons: ["Drinks", "Extra Sauce"]
    },
]

const ADDON_OPTIONS: Record<string, { name: string, price: number }[]> = {
    "Protein": [
        { name: "Chicken", price: 1000 },
        { name: "Beef", price: 800 },
        { name: "Fish", price: 1200 },
        { name: "Egg", price: 300 },
    ],
    "Sides": [
        { name: "Plantain", price: 500 },
        { name: "Coleslaw", price: 400 },
        { name: "Moi Moi", price: 600 },
    ],
    "Drinks": [
        { name: "Coke", price: 300 },
        { name: "Water", price: 200 },
        { name: "Juice", price: 500 },
    ],
    "Extra Sauce": [
        { name: "Ketchup", price: 0 },
        { name: "Mayonnaise", price: 100 },
        { name: "Pepper Sauce", price: 200 },
    ]
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { addToCart } = useCart()
    const [selectedItem, setSelectedItem] = useState<any>(null)

    // Customization State
    const [selectedAddons, setSelectedAddons] = useState<Record<string, string[]>>({})

    const handleOpenItem = (item: any) => {
        setSelectedItem(item)
        setSelectedAddons({})
    }

    const toggleAddon = (category: string, addonName: string) => {
        setSelectedAddons(prev => {
            const current = prev[category] || []
            const updated = current.includes(addonName)
                ? current.filter(n => n !== addonName)
                : [...current, addonName]
            return { ...prev, [category]: updated }
        })
    }

    const calculateTotal = () => {
        if (!selectedItem) return 0
        let total = selectedItem.price

        // Add price of selected add-ons
        Object.entries(selectedAddons).forEach(([category, addons]) => {
            addons.forEach(addonName => {
                const option = ADDON_OPTIONS[category]?.find(opt => opt.name === addonName)
                if (option) total += option.price
            })
        })

        return total
    }

    const handleAddToCart = () => {
        if (!selectedItem) return

        // Flatten options for cart display
        const options = Object.entries(selectedAddons).flatMap(([cat, addons]) =>
            addons.map(addon => `${addon} (${cat})`)
        )

        addToCart({
            id: `${selectedItem.id}-${Date.now()}`, // Unique ID for varied customizations
            name: selectedItem.name,
            price: calculateTotal(),
            quantity: 1,
            image: selectedItem.image,
            restaurantId: RESTAURANT.id,
            options: options // Using stored options
        })

        setSelectedItem(null)
        // toast.success("Added to cart")
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Hero Header */}
            <div className="relative h-64 w-full">
                <img src={RESTAURANT.image} className="w-full h-full object-cover" alt="Restaurant" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h1 className="text-3xl font-black mb-2">{RESTAURANT.name}</h1>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="flex items-center gap-1 bg-green-500 px-2 py-0.5 rounded-md">
                            <Star className="w-3 h-3 fill-current" /> {RESTAURANT.rating}
                        </span>
                        <span className="flex items-center gap-1 opacity-90">
                            <Clock className="w-4 h-4" /> {RESTAURANT.deliveryTime}
                        </span>
                        <span className="flex items-center gap-1 opacity-90">
                            <MapPin className="w-4 h-4" /> {RESTAURANT.location}
                        </span>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="p-6 -mt-6 relative z-10 bg-gray-50 rounded-t-3xl space-y-8">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2 opacity-50"></div>

                {["Food", "Snacks", "Drinks"].map(category => {
                    const items = MENU_ITEMS.filter(item => item.category === category)
                    if (items.length === 0) return null

                    return (
                        <div key={category}>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 sticky top-0 bg-gray-50 py-2 z-10">{category}</h2>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleOpenItem(item)}
                                        className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="font-bold text-gray-900">₦{item.price.toLocaleString()}</span>
                                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                    <Plus className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Customization Modal / Bottom Sheet */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
                    <div className="relative bg-white w-full max-w-md rounded-t-[2.5rem] p-6 pb-8 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">

                        {/* Handle bar */}
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

                        <div className="flex gap-4 mb-6">
                            <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                                <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.name} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedItem.name}</h2>
                                <p className="text-lg font-bold text-gray-500">₦{selectedItem.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="space-y-6 mb-24">
                            {/* Render Add-ons if any */}
                            {selectedItem.addons && selectedItem.addons.map((category: string) => {
                                const options = ADDON_OPTIONS[category]
                                if (!options) return null

                                return (
                                    <div key={category} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-gray-900 text-lg">{category}</h3>
                                            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full uppercase">Optional</span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            {options.map(option => {
                                                const isSelected = selectedAddons[category]?.includes(option.name)
                                                return (
                                                    <button
                                                        key={option.name}
                                                        onClick={() => toggleAddon(category, option.name)}
                                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isSelected
                                                                ? "border-green-500 bg-green-50 shadow-sm"
                                                                : "border-gray-100 bg-white hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? "bg-green-500 border-green-500" : "border-gray-300"
                                                                }`}>
                                                                {isSelected && <Check className="w-3 h-3 text-white" />}
                                                            </div>
                                                            <span className={`font-medium ${isSelected ? "text-green-900" : "text-gray-700"}`}>
                                                                {option.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-500">
                                                            {option.price > 0 ? `+₦${option.price}` : 'Free'}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Footer Actions */}
                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:static lg:bg-transparent lg:border-0 lg:p-0">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/10 active:scale-[0.98] transition-all flex items-center justify-between px-6"
                            >
                                <span>Add to Order</span>
                                <span>₦{calculateTotal().toLocaleString()}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
