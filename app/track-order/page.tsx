"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered"

interface OrderDetails {
  orderNumber: string
  status: OrderStatus
  restaurant: {
    name: string
    location: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  deliveryLocation: string
  deliveryPhone: string
  subtotal: number
  deliveryFee: number
  total: number
  estimatedTime: string
  placedAt: string
}

export default function TrackOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderParam = searchParams.get("order")

  const [orderNumber, setOrderNumber] = useState("")
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (orderParam) {
      setOrderNumber(orderParam)
      handleTrackOrder(orderParam)
    }
  }, [orderParam])

  const handleTrackOrder = async (trackingNumber?: string) => {
    const numberToTrack = trackingNumber || orderNumber

    if (!numberToTrack) {
      alert("Please enter an order number")
      return
    }

    setLoading(true)

    // Simulate API call - Replace with actual Supabase query
    setTimeout(() => {
      // Mock order data
      setOrder({
        orderNumber: numberToTrack,
        status: "preparing", // pending, confirmed, preparing, ready, out_for_delivery, delivered
        restaurant: {
          name: "DP Restaurant",
          location: "D Hall, Main Campus",
        },
        items: [
          { name: "Jollof Rice & Chicken", quantity: 2, price: 1500 },
          { name: "Coca-Cola", quantity: 1, price: 200 },
        ],
        deliveryLocation: "Room 204, Hall A",
        deliveryPhone: "08012345678",
        subtotal: 3200,
        deliveryFee: 200,
        total: 3400,
        estimatedTime: "20-30 min",
        placedAt: new Date().toLocaleString(),
      })
      setLoading(false)
    }, 1000)
  }

  const getStatusStep = (status: OrderStatus): number => {
    const steps = {
      pending: 0,
      confirmed: 1,
      preparing: 2,
      ready: 3,
      out_for_delivery: 4,
      delivered: 5,
    }
    return steps[status] || 0
  }

  const currentStep = order ? getStatusStep(order.status) : 0

  const statusSteps = [
    { key: "pending", label: "Order Placed", icon: "📝", description: "Your order has been received" },
    { key: "confirmed", label: "Confirmed", icon: "✅", description: "Restaurant confirmed your order" },
    { key: "preparing", label: "Preparing", icon: "👨‍🍳", description: "Your food is being prepared" },
    { key: "ready", label: "Ready", icon: "🍱", description: "Your order is ready for pickup" },
    { key: "out_for_delivery", label: "Out for Delivery", icon: "🏍️", description: "On the way to you" },
    { key: "delivered", label: "Delivered", icon: "🎉", description: "Enjoy your meal!" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Track Order</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        {!order && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h2>
              <p className="text-gray-600">Enter your order number to see real-time updates</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. CE-123456"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg font-mono"
                />
                <button
                  onClick={() => handleTrackOrder()}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "..." : "Track"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500">
                    {order.orderNumber}
                  </p>
                </div>
                <button
                  onClick={() => setOrder(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400"
                >
                  Track Different Order
                </button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <p>Placed at: {order.placedAt}</p>
                <p>Est. Time: {order.estimatedTime}</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Status</h3>

              {/* Progress Bar */}
              <div className="relative mb-12">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>

                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= currentStep
                    const isCurrent = index === currentStep

                    return (
                      <div key={step.key} className="flex flex-col items-center" style={{ width: `${100 / statusSteps.length}%` }}>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 transition-all duration-300 ${isCompleted
                              ? "bg-gradient-to-r from-orange-500 to-green-500 text-white scale-110 shadow-lg"
                              : "bg-gray-200 text-gray-400"
                            } ${isCurrent ? "animate-pulse ring-4 ring-orange-200" : ""}`}
                        >
                          {step.icon}
                        </div>
                        <p className={`text-xs font-semibold text-center ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                          {step.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Current Status Message */}
              <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="text-4xl animate-bounce">{statusSteps[currentStep].icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{statusSteps[currentStep].label}</p>
                    <p className="text-gray-600">{statusSteps[currentStep].description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant & Delivery Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Restaurant</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-green-200 rounded-lg flex items-center justify-center text-3xl">
                    🍽️
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{order.restaurant.name}</p>
                    <p className="text-sm text-gray-600">{order.restaurant.location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery To</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <p className="text-gray-900">{order.deliveryLocation}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-900">{order.deliveryPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₦{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-gray-900">₦{order.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-green-600">₦{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/home")}
                className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-orange-500 hover:shadow-xl transition-all duration-300"
              >
                Order Again
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300">
                Contact Delivery
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
