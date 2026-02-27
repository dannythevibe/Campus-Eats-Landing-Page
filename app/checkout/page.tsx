"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { mockRestaurants } from "@/lib/mock-data"
import { useCart } from "@/context/cart-context" // Import useCart
import { toast } from "sonner" // For notifications
import Image from "next/image"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const restaurantId = searchParams.get("restaurant") || "1" // Default to 1 if missing for now

  // In a real app, fetching restaurant details would be dynamic
  const restaurant = {
    id: "1",
    name: "Manna Palace",
    location: "Student Center",
    delivery_time: "15-25 min",
    delivery_fee: 500
  }

  // Checkout form state
  const [deliveryLocation, setDeliveryLocation] = useState("")
  const [deliveryPhone, setDeliveryPhone] = useState("")
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Real Cart Data
  const { items, total: cartTotal, clearCart } = useCart()

  const deliveryFee = restaurant.delivery_fee
  const total = cartTotal + deliveryFee

  const paymentMethods = [
    { id: "palmpay", name: "PalmPay", icon: "💳" },
    { id: "opay", name: "OPay", icon: "💰" },
    { id: "kuda", name: "Kuda Bank", icon: "🏦" },
    { id: "moniepoint", name: "Moniepoint", icon: "💵" },
    { id: "gtbank", name: "GTBank", icon: "🏛️" },
    { id: "zenith", name: "Zenith Bank", icon: "🏛️" },
    { id: "access", name: "Access Bank", icon: "🏛️" },
    { id: "uba", name: "UBA", icon: "🏛️" },
  ]

  const handlePlaceOrder = async () => {
    if (!deliveryLocation || !deliveryPhone || !paymentMethod) {
      alert("Please fill in all required fields")
      return
    }

    if (items.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setIsProcessing(true)

    // Create Order Object
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      customer: {
        name: "Timileyin", // Mock user
        phone: deliveryPhone,
        location: deliveryLocation,
        notes: deliveryNotes
      },
      items: items,
      subtotal: cartTotal,
      deliveryFee: deliveryFee,
      total: total,
      paymentMethod: paymentMethod,
      status: 'pending', // pending -> accepted -> preparing -> ready -> delivered
      createdAt: new Date().toISOString(),
      restaurantId: restaurant.id
    }

    // Simulate Network Request & Save to "Database" (LocalStorage)
    setTimeout(() => {
      // 1. Get existing orders
      const existingOrdersStr = localStorage.getItem('campus-eats-vendor-orders')
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : []

      // 2. Add new order
      const updatedOrders = [newOrder, ...existingOrders]
      localStorage.setItem('campus-eats-vendor-orders', JSON.stringify(updatedOrders))

      // 3. Clear Cart
      clearCart()

      setIsProcessing(false)
      // toast.success("Order received!")
      router.push("/order-success")
    }, 2000)
  }

  if (items.length === 0) {
    // ... existing empty state handling if desired, or let it render with 0 items
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l-7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Restaurant Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Ordering from</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-green-200 rounded-lg flex items-center justify-center text-3xl">
                  🍽️
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.location}</p>
                  <p className="text-sm text-gray-500">{restaurant.delivery_time}</p>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Room 204, Hall A"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Any special instructions for the delivery"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${paymentMethod === method.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-3xl mb-2">{method.icon}</div>
                    <div className="text-sm font-semibold text-gray-900">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {items.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1 pr-2">
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        {item.options && (
                          <p className="text-[10px] text-gray-400 line-clamp-1">{Array.isArray(item.options) ? item.options.join(", ") : item.options}</p>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-green-600">₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !deliveryLocation || !deliveryPhone || !paymentMethod || items.length === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Place Order • ₦${total.toLocaleString()}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
