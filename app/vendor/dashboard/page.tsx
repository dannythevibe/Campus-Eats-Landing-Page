"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function VendorDashboard() {
  const router = useRouter()

  // Mock vendor user for testing
  const user = {
    id: "mock-vendor-123",
    email: "vendor@campuseats.com"
  }

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                CE
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Campus Eats</h1>
                <p className="text-xs text-gray-500">Vendor Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, Vendor! 🏪
          </h2>
          <p className="text-xl text-gray-600">
            Your restaurant dashboard is being prepared
          </p>
        </div>

        {/* Stats Grid with Circular Progress */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Today's Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
                <p className="text-xs text-green-600 mt-1">+18% vs yesterday</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
            {/* Mini bar progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Daily Goal: 30</span>
                <span>80%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₦68K</p>
                <p className="text-xs text-green-600 mt-1">+24% this week</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            {/* Mini bar progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Weekly Goal: 100K</span>
                <span>68%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Menu Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">18</p>
                <p className="text-xs text-gray-600 mt-1">15 available</p>
              </div>
              <div className="text-4xl">🍽️</div>
            </div>
            {/* Mini bar progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Availability</span>
                <span>83%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4.8 ⭐</p>
                <p className="text-xs text-gray-600 mt-1">Based on 127 reviews</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
            {/* Mini bar progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Excellence</span>
                <span>96%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Progress Charts */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Order Completion Rate */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm opacity-90">Order Completion</p>
                <p className="text-4xl font-bold mt-2">94%</p>
              </div>
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.94)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">94</span>
                </div>
              </div>
            </div>
            <div className="text-sm opacity-90">
              <p>22 of 24 orders completed today</p>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm opacity-90">Customer Satisfaction</p>
                <p className="text-4xl font-bold mt-2">88%</p>
              </div>
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.88)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">88</span>
                </div>
              </div>
            </div>
            <div className="text-sm opacity-90">
              <p>112 of 127 customers happy</p>
            </div>
          </div>

          {/* On-Time Delivery */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm opacity-90">On-Time Delivery</p>
                <p className="text-4xl font-bold mt-2">91%</p>
              </div>
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.91)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">91</span>
                </div>
              </div>
            </div>
            <div className="text-sm opacity-90">
              <p>Average: 22 mins delivery time</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Menu Management */}
          <button
            onClick={() => router.push("/vendor/menu")}
            className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 text-left"
          >
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
              Menu Management
            </h3>
            <p className="text-gray-600 mb-4">
              Add, edit, and manage your menu items and pricing
            </p>
            <div className="flex items-center gap-2 text-orange-500 font-semibold">
              <span>Manage Menu</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Orders - Active */}
          <button
            onClick={() => router.push("/vendor/orders")}
            className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 text-left"
          >
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-500 transition-colors">
              Order Management
            </h3>
            <p className="text-gray-600 mb-4">
              View and manage incoming customer orders
            </p>
            <div className="flex items-center gap-2 text-green-500 font-semibold">
              <span>View Orders</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Wallet & Revenue */}
          <button
            onClick={() => router.push("/vendor/wallet")}
            className="group bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-lime-500 hover:shadow-2xl transition-all duration-300 text-left"
          >
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors">
              Wallet & Revenue
            </h3>
            <p className="text-gray-600 mb-4">
              Manage earnings, payouts, and view history
            </p>
            <div className="flex items-center gap-2 text-lime-600 font-semibold">
              <span>View History</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Restaurant Settings (Coming Soon) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 opacity-60">
            <div className="text-5xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Restaurant Settings
            </h3>
            <p className="text-gray-600 mb-4">
              Update info, hours, and delivery settings
            </p>
            <div className="flex items-center gap-2 text-gray-500 font-semibold">
              <span>Coming Soon</span>
            </div>
          </div>

          {/* Reviews (Coming Soon) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 opacity-60">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Reviews & Ratings
            </h3>
            <p className="text-gray-600 mb-4">
              View customer feedback and ratings
            </p>
            <div className="flex items-center gap-2 text-gray-500 font-semibold">
              <span>Coming Soon</span>
            </div>
          </div>

          {/* Support (Coming Soon) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 opacity-60">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Support & Help
            </h3>
            <p className="text-gray-600 mb-4">
              Get help and contact Campus Eats support
            </p>
            <div className="flex items-center gap-2 text-gray-500 font-semibold">
              <span>Coming Soon</span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-8 max-w-md mx-auto bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="text-3xl">👤</div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Vendor Account</p>
              <p className="text-sm text-gray-600">
                ID: <code className="bg-white px-2 py-0.5 rounded font-mono text-xs">{user?.id?.slice(0, 8)}...</code>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Email: <span className="text-orange-600 font-semibold">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
