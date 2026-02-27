"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { mockRestaurants, mockMenuItems } from "@/lib/mock-data"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string
}

export default function RestaurantPage() {
  const router = useRouter()
  const params = useParams()
  const restaurantId = params.id as string

  const restaurant = mockRestaurants.find((r) => r.id === restaurantId)
  const menuItems = mockMenuItems[restaurantId as keyof typeof mockMenuItems] || []

  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h1>
          <button
            onClick={() => router.push("/home")}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Get unique categories from menu items
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))]

  // Filter menu items by category
  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory)

  // Add to cart
  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  // Remove from cart
  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)

    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ))
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId))
    }
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/home")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
              </div>
              <span className="font-bold text-gray-900">Campus Eats</span>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Banner */}
      <section className="relative h-64 bg-gradient-to-br from-orange-300 to-green-300">
        <div className="absolute inset-0 flex items-center justify-center text-8xl">
          🍽️
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
            <p className="text-white/90 text-lg">{restaurant.description}</p>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="font-bold text-gray-900">{restaurant.rating} / 5.0</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🕒</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Time</p>
                <p className="font-bold text-gray-900">{restaurant.delivery_time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Fee</p>
                <p className="font-bold text-gray-900">₦{restaurant.delivery_fee}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-bold text-gray-900">{restaurant.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items in this category</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const cartItem = cart.find((c) => c.id === item.id)
              const quantity = cartItem?.quantity || 0

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Item Image */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-100 to-green-100">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      🍽️
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">₦{item.price.toLocaleString()}</span>

                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-500 font-bold hover:bg-orange-50"
                          >
                            −
                          </button>
                          <span className="font-bold text-gray-900 w-6 text-center">{quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-500 font-bold hover:bg-green-50"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => router.push(`/checkout?restaurant=${restaurantId}`)}
              className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-between px-6 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </div>
                <span className="font-bold text-lg">View Cart</span>
              </div>
              <span className="font-bold text-xl">₦{cartTotal.toLocaleString()}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
