"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { mockRestaurants } from "@/lib/mock-data"
import Image from "next/image"

export default function AdminPortal() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock stats
  const stats = {
    totalOrders: 247,
    totalRevenue: 1450000,
    activeUsers: 892,
    activeVendors: 9,
    todayOrders: 43,
    todayRevenue: 125000,
    pendingOrders: 12,
    completedToday: 31,
  }

  // Mock recent orders
  const recentOrders = [
    {
      id: "CE-123456",
      customer: "John Doe",
      restaurant: "DP Restaurant",
      items: 3,
      total: 4500,
      status: "preparing",
      time: "5 mins ago",
    },
    {
      id: "CE-123455",
      customer: "Jane Smith",
      restaurant: "Luwa Cafe",
      items: 2,
      total: 2500,
      status: "delivered",
      time: "15 mins ago",
    },
    {
      id: "CE-123454",
      customer: "Mike Johnson",
      restaurant: "SOOMTA Kitchen",
      items: 4,
      total: 6200,
      status: "out_for_delivery",
      time: "23 mins ago",
    },
    {
      id: "CE-123453",
      customer: "Sarah Williams",
      restaurant: "Choplyfe",
      items: 1,
      total: 1800,
      status: "confirmed",
      time: "32 mins ago",
    },
    {
      id: "CE-123452",
      customer: "David Brown",
      restaurant: "Yellow Bus",
      items: 5,
      total: 8900,
      status: "preparing",
      time: "45 mins ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-orange-100 text-orange-700"
      case "confirmed":
        return "bg-blue-100 text-blue-700"
      case "out_for_delivery":
        return "bg-purple-100 text-purple-700"
      case "delivered":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Preparing"
      case "confirmed":
        return "Confirmed"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Campus Eats"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Campus Eats Admin</h1>
                <p className="text-xs text-gray-500">Super Administrator Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Notifications (3)
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 border-b-2 font-semibold transition-colors ${
                activeTab === "overview"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 border-b-2 font-semibold transition-colors ${
                activeTab === "orders"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`py-4 border-b-2 font-semibold transition-colors ${
                activeTab === "vendors"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Vendors
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 border-b-2 font-semibold transition-colors ${
                activeTab === "users"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 border-b-2 font-semibold transition-colors ${
                activeTab === "analytics"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    📦
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-xs text-green-600 mt-2">+12% from last week</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    💰
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">₦{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600 mt-2">+8% from last week</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">Active Users</p>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    👥
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                <p className="text-xs text-green-600 mt-2">+24% from last week</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">Active Vendors</p>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    🏪
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.activeVendors}</p>
                <p className="text-xs text-gray-600 mt-2">All online</p>
              </div>
            </div>

            {/* Today Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
                <p className="text-sm opacity-90">Today's Orders</p>
                <p className="text-4xl font-bold mt-2">{stats.todayOrders}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm opacity-90">Pending: {stats.pendingOrders}</span>
                  <span className="text-sm opacity-90">Done: {stats.completedToday}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                <p className="text-sm opacity-90">Today's Revenue</p>
                <p className="text-4xl font-bold mt-2">₦{(stats.todayRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm opacity-90 mt-4">Average: ₦{(stats.todayRevenue / stats.todayOrders).toFixed(0)} per order</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                <p className="text-sm opacity-90">Platform Activity</p>
                <p className="text-4xl font-bold mt-2">High</p>
                <p className="text-sm opacity-90 mt-4">Peak hours: 12pm - 2pm</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-semibold text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>👤 {order.customer}</span>
                          <span>•</span>
                          <span>🍽️ {order.restaurant}</span>
                          <span>•</span>
                          <span>{order.items} items</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">₦{order.total.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>
            <p className="text-gray-600">Full order management coming soon...</p>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === "vendors" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Manage Vendors</h2>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Add New Vendor
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-green-200 rounded-lg flex items-center justify-center text-3xl">
                      🍽️
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        restaurant.is_open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {restaurant.is_open ? "Open" : "Closed"}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{restaurant.location}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-semibold text-gray-900">⭐ {restaurant.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="font-semibold text-gray-900">{restaurant.total_orders}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
            <p className="text-gray-600">Advanced analytics and reporting coming soon...</p>
          </div>
        )}
      </main>
    </div>
  )
}
