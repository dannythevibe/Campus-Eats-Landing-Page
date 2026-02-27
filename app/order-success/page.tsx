"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OrderSuccessPage() {
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate mock order number
    const randomNumber = Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(`CE-${randomNumber}`)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce mb-4">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-6xl shadow-2xl">
              ✓
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Your food is being prepared with love
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-8 mb-6">
          {/* Order Number */}
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500">
              {orderNumber}
            </p>
            <p className="text-sm text-gray-500 mt-2">Save this number for tracking</p>
          </div>

          {/* Order Status Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Placed</p>
                  <p className="text-sm text-gray-600">Your order has been received</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 flex-shrink-0 animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Preparing</p>
                  <p className="text-sm text-gray-600">Restaurant is preparing your food</p>
                </div>
              </div>
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Out for Delivery</p>
                  <p className="text-sm text-gray-600">Your food is on the way</p>
                </div>
              </div>
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Delivered</p>
                  <p className="text-sm text-gray-600">Enjoy your meal!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery Time</p>
                <p className="text-2xl font-bold text-gray-900">20-30 minutes</p>
              </div>
              <div className="text-5xl">🕐</div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-3xl">ℹ️</div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Payment Information</p>
                <p className="text-sm text-gray-600">
                  You will receive payment instructions via SMS/Email shortly. Please complete payment to confirm your order.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/track-order?order=" + orderNumber)}
              className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Track Order
            </button>
            <button
              onClick={() => router.push("/home")}
              className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <button className="text-orange-600 font-semibold hover:text-orange-700 underline">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
