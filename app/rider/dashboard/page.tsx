"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Bell,
    MapPin,
    Navigation,
    Clock,
    CheckCircle2,
    Phone,
    LogOut,
    ChevronRight,
    Package,
    Wallet,
    Star,
    TrendingUp,
    User
} from "lucide-react"

// Order Types
interface DeliveryOrder {
    id: string
    restaurant: string
    restaurantAddress: string
    customerName: string
    customerLocation: string
    customerPhone: string
    earnings: number
    distance: string
    items: string
    status: 'available' | 'accepted' | 'picked_up' | 'delivering' | 'delivered'
    pickupTime?: string
    paymentMethod: 'cash' | 'paid'
}

// Mock Available Orders (Orders restaurant has marked as ready for pickup)
const AVAILABLE_ORDERS: DeliveryOrder[] = [
    {
        id: "DEL-101",
        restaurant: "Manna Palace",
        restaurantAddress: "Behind Chapel, Main Campus",
        customerName: "Adebayo J.",
        customerLocation: "Male Hostel Block A, Room 12",
        customerPhone: "08123456789",
        earnings: 500,
        distance: "0.8km",
        items: "2x Jollof Rice, 1x Coke",
        status: 'available',
        pickupTime: "Ready Now",
        paymentMethod: 'paid'
    },
    {
        id: "DEL-102",
        restaurant: "Foodmart",
        restaurantAddress: "Faculty of Engineering",
        customerName: "Sarah O.",
        customerLocation: "Science Lecture Theatre",
        customerPhone: "08198765432",
        earnings: 450,
        distance: "1.2km",
        items: "1x Meat Pie, 2x Doughnuts",
        status: 'available',
        pickupTime: "2 mins",
        paymentMethod: 'cash'
    },
    {
        id: "DEL-103",
        restaurant: "Double Portion",
        restaurantAddress: "Student Center",
        customerName: "Emmanuel N.",
        customerLocation: "Library Complex",
        customerPhone: "08156789012",
        earnings: 600,
        distance: "1.5km",
        items: "1x Fried Rice & Turkey, 1x Chapman",
        status: 'available',
        pickupTime: "5 mins",
        paymentMethod: 'paid'
    }
]

// My Active Deliveries
const MY_DELIVERIES: DeliveryOrder[] = [
    {
        id: "DEL-099",
        restaurant: "Mimi's Kitchen",
        restaurantAddress: "Near Main Gate",
        customerName: "Grace A.",
        customerLocation: "Female Hostel Old Block, Room 8",
        customerPhone: "08134567890",
        earnings: 550,
        distance: "0.6km",
        items: "1x Spaghetti Bolognese, 2x Fanta",
        status: 'picked_up',
        paymentMethod: 'paid'
    }
]

// Completed Deliveries History
const DELIVERY_HISTORY = [
    { id: "DEL-095", restaurant: "Manna Palace", earnings: 500, time: "2 hours ago", rating: 5 },
    { id: "DEL-094", restaurant: "Foodmart", earnings: 400, time: "3 hours ago", rating: 4 },
    { id: "DEL-093", restaurant: "Double Portion", earnings: 550, time: "5 hours ago", rating: 5 },
    { id: "DEL-092", restaurant: "National Kitchen", earnings: 450, time: "Yesterday", rating: 5 },
]

export default function RiderDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'available' | 'active' | 'history'>('available')
    const [isOnline, setIsOnline] = useState(true)
    const [availableOrders, setAvailableOrders] = useState(AVAILABLE_ORDERS)
    const [myDeliveries, setMyDeliveries] = useState(MY_DELIVERIES)

    // Accept a delivery
    const acceptDelivery = (orderId: string) => {
        const order = availableOrders.find(o => o.id === orderId)
        if (order) {
            setAvailableOrders(availableOrders.filter(o => o.id !== orderId))
            setMyDeliveries([...myDeliveries, { ...order, status: 'accepted' }])
            setActiveTab('active')
        }
    }

    // Update delivery status
    const updateDeliveryStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
        setMyDeliveries(myDeliveries.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ))
    }

    // Complete delivery
    const completeDelivery = (orderId: string) => {
        setMyDeliveries(myDeliveries.filter(o => o.id !== orderId))
        // Would add to history in real app
    }

    const handleSignOut = () => {
        router.push("/rider/login")
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            {/* Top Header */}
            <header className="bg-gray-900 text-white p-6 rounded-b-[2rem] shadow-xl relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-green-400 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                            🛵
                        </div>
                        <div>
                            <h1 className="font-bold text-xl">Hello, Rider!</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                                <span className="text-sm text-gray-300">{isOnline ? 'Online & Searching' : 'Offline'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Online/Offline Toggle */}
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isOnline
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                : 'bg-red-500/20 text-red-400 border border-red-500/50'
                            }`}
                    >
                        {isOnline ? '🟢 Online' : '🔴 Offline'}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-4 rounded-2xl border border-green-500/30">
                        <div className="flex items-center gap-2 mb-1">
                            <Wallet className="w-4 h-4 text-green-400" />
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Today</p>
                        </div>
                        <p className="text-2xl font-bold text-white">₦4,500</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <Package className="w-4 h-4 text-blue-400" />
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Trips</p>
                        </div>
                        <p className="text-2xl font-bold text-white">8</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Rating</p>
                        </div>
                        <p className="text-2xl font-bold text-white">4.9</p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="px-4 -mt-5 relative z-20">
                <div className="bg-white rounded-2xl shadow-lg p-1.5 flex">
                    <button
                        onClick={() => setActiveTab('available')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'available'
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <Package className="w-4 h-4" />
                        Available ({availableOrders.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'active'
                                ? 'bg-green-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <Navigation className="w-4 h-4" />
                        Active ({myDeliveries.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'history'
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <Clock className="w-4 h-4" />
                        History
                    </button>
                </div>
            </div>

            <main className="p-4 mt-4">
                {/* Available Orders Tab */}
                {activeTab === 'available' && (
                    <div className="space-y-4">
                        {!isOnline ? (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                                <div className="text-4xl mb-3">😴</div>
                                <h3 className="font-bold text-gray-900 mb-1">You're Offline</h3>
                                <p className="text-sm text-gray-600 mb-4">Go online to see available delivery requests</p>
                                <button
                                    onClick={() => setIsOnline(true)}
                                    className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold text-sm"
                                >
                                    Go Online
                                </button>
                            </div>
                        ) : availableOrders.length === 0 ? (
                            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="font-bold text-gray-900 mb-2">No deliveries available</h3>
                                <p className="text-sm text-gray-500">New orders will appear here when restaurants mark them ready</p>
                            </div>
                        ) : (
                            availableOrders.map(order => (
                                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                                    {/* Accent */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500"></div>

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 text-lg">{order.restaurant}</h3>
                                                {order.paymentMethod === 'cash' && (
                                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">CASH</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                <Clock className="w-3 h-3" />
                                                <span>Ready: {order.pickupTime}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold">
                                                ₦{order.earnings}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1">{order.distance}</p>
                                        </div>
                                    </div>

                                    {/* Route */}
                                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">Pick Up</p>
                                                <p className="text-sm font-medium text-gray-900">{order.restaurantAddress}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">Drop Off</p>
                                                <p className="text-sm font-medium text-gray-900">{order.customerLocation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 pl-3 border-l-2 border-gray-200">{order.items}</p>

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                                            Ignore
                                        </button>
                                        <button
                                            onClick={() => acceptDelivery(order.id)}
                                            className="flex-[2] py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black shadow-lg shadow-gray-900/20 active:scale-95 transition-all"
                                        >
                                            Accept Delivery
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Active Deliveries Tab */}
                {activeTab === 'active' && (
                    <div className="space-y-4">
                        {myDeliveries.length === 0 ? (
                            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="font-bold text-gray-900 mb-2">No active deliveries</h3>
                                <p className="text-sm text-gray-500">Accept orders to start delivering</p>
                            </div>
                        ) : (
                            myDeliveries.map(order => (
                                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border-2 border-green-200 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

                                    {/* Status Badge */}
                                    <div className="flex justify-between items-center mb-4 mt-2">
                                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            {order.status === 'accepted' ? 'HEADING TO PICKUP' :
                                                order.status === 'picked_up' ? 'DELIVERING' : 'IN PROGRESS'}
                                        </div>
                                        <span className="font-mono text-gray-400 text-sm">#{order.id}</span>
                                    </div>

                                    {/* Timeline */}
                                    <div className="space-y-4 relative ml-3 mb-6">
                                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-200 -ml-[5px]"></div>

                                        <div className="relative flex gap-4">
                                            <div className={`w-3 h-3 rounded-full border-2 border-white absolute -left-2 top-1.5 shadow-sm ${order.status === 'picked_up' ? 'bg-green-500' : 'bg-orange-500'
                                                }`}></div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Pick Up</p>
                                                <p className="font-bold text-gray-900">{order.restaurant}</p>
                                                <p className="text-xs text-gray-500">{order.restaurantAddress}</p>
                                            </div>
                                        </div>

                                        <div className="relative flex gap-4">
                                            <div className={`w-3 h-3 rounded-full border-2 border-white absolute -left-2 top-1.5 shadow-sm ${order.status === 'picked_up' ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'
                                                }`}></div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Drop Off</p>
                                                <p className="font-bold text-gray-900">{order.customerLocation}</p>
                                                <p className="text-sm text-gray-600">{order.customerName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order details */}
                                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                                        <p className="text-xs text-gray-400 uppercase font-bold mb-2">Order Items</p>
                                        <p className="text-sm text-gray-700">{order.items}</p>
                                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                                            <span className="text-sm text-gray-600">Your Earnings</span>
                                            <span className="text-lg font-bold text-green-600">₦{order.earnings}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <a
                                            href={`tel:${order.customerPhone}`}
                                            className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center justify-center gap-2"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Call
                                        </a>

                                        {order.status === 'accepted' && (
                                            <button
                                                onClick={() => updateDeliveryStatus(order.id, 'picked_up')}
                                                className="flex-[2] py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Package className="w-4 h-4" />
                                                Picked Up
                                            </button>
                                        )}

                                        {order.status === 'picked_up' && (
                                            <button
                                                onClick={() => completeDelivery(order.id)}
                                                className="flex-[2] py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Complete Delivery
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="space-y-4">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                            <h3 className="text-sm text-gray-400 uppercase font-bold mb-3">This Week's Summary</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-3xl font-bold">₦28,500</p>
                                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        Total Earnings
                                    </p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">42</p>
                                    <p className="text-sm text-gray-400 mt-1">Deliveries</p>
                                </div>
                            </div>
                        </div>

                        {/* History List */}
                        <div className="bg-white rounded-2xl shadow-sm">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">Recent Deliveries</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {DELIVERY_HISTORY.map((delivery) => (
                                    <div key={delivery.id} className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{delivery.restaurant}</p>
                                                <p className="text-xs text-gray-500">{delivery.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">+₦{delivery.earnings}</p>
                                            <div className="flex items-center gap-1 text-xs text-yellow-500">
                                                <Star className="w-3 h-3 fill-current" />
                                                {delivery.rating}.0
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 pb-6 flex justify-between items-center z-40 shadow-lg">
                <button
                    onClick={() => setActiveTab('available')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'available' || activeTab === 'active' ? 'text-green-500' : 'text-gray-400'}`}
                >
                    <Navigation className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Tasks</span>
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-green-500' : 'text-gray-400'}`}
                >
                    <Clock className="w-6 h-6" />
                    <span className="text-[10px] font-bold">History</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900">
                    <Bell className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Alerts</span>
                </button>
                <button
                    onClick={handleSignOut}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Logout</span>
                </button>
            </nav>
        </div>
    )
}
