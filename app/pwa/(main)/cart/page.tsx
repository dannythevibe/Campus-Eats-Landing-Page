"use client"

import { ChevronLeft, Trash2, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export default function PwaCartPage() {
    const [activeTab, setActiveTab] = useState<'cart' | 'ongoing' | 'completed'>('cart')
    const { items, updateQuantity, removeFromCart, total, clearCart } = useCart()
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white flex flex-col pb-32">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 bg-white sticky top-0 z-10 border-b border-gray-50">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 hover:bg-gray-50 rounded-full text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Orders</h1>
                    {items.length > 0 && activeTab === 'cart' && (
                        <button
                            onClick={clearCart}
                            className="ml-auto text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-full transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="bg-gray-100/80 p-1.5 rounded-2xl flex gap-1">
                    {['cart', 'ongoing', 'completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-3 text-xs font-bold rounded-xl capitalize transition-all duration-300 ${activeTab === tab
                                ? 'bg-white text-black shadow-lg shadow-gray-200/50'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab === 'cart' ? `Cart (${items.length})` : tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                <AnimatePresence mode="wait">
                    {items.length === 0 && activeTab === 'cart' ? (
                        // Empty State
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full -mt-10"
                        >
                            <div className="relative w-56 h-56 mb-8">
                                <div className="absolute inset-0 bg-lime-400 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
                                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center transform hover:rotate-6 transition-transform duration-500 border border-white">
                                    <span className="text-7xl filter drop-shadow-2xl">🛒</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Your cart is empty</h2>
                            <p className="text-gray-400 text-sm font-medium text-center max-w-[240px] mb-10 leading-relaxed">
                                Looks like you haven't made your choice yet. Explore our menus to find something delicious!
                            </p>
                            <button
                                onClick={() => router.push('/pwa/search')}
                                className="px-10 py-5 bg-[#1a1a1a] text-white font-bold rounded-2xl shadow-xl shadow-gray-500/20 active:scale-95 transition-all hover:bg-black w-full max-w-xs"
                            >
                                Start Ordering
                            </button>
                        </motion.div>
                    ) : activeTab === 'cart' ? (
                        // Cart Items List
                        <div className="space-y-4">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white p-3 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-4"
                                >
                                    <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-sm truncate pr-4">{item.name}</h3>
                                        {item.options && item.options.length > 0 && (
                                            <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">
                                                {item.options.join(", ")}
                                            </p>
                                        )}
                                        <p className="text-lime-600 font-bold text-sm mt-1">₦{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-6 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-6 bg-[#1a1a1a] text-white rounded-lg shadow-sm flex items-center justify-center active:scale-90 transition-transform"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="mt-8 pt-6 border-t border-dashed border-gray-200 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-900">₦{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 font-medium">Delivery Fee</span>
                                    <span className="font-bold text-gray-900">₦500</span>
                                </div>
                                <div className="flex justify-between items-center text-lg mt-4">
                                    <span className="font-black text-gray-900">Total</span>
                                    <span className="font-black text-lime-600">₦{(total + 500).toLocaleString()}</span>
                                </div>

                                <button className="w-full mt-6 bg-lime-500 text-white font-bold py-5 rounded-2xl shadow-xl shadow-lime-500/30 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                                    Checkout
                                    <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px]">₦{(total + 500).toLocaleString()}</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <p>No orders in {activeTab} yet.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
