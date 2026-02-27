"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    ChevronLeft,
    Clock,
    CheckCircle2,
    XCircle,
    ChefHat,
    Package,
    Bell,
    Filter,
    Search,
    Phone,
    MapPin,
    RefreshCw
} from "lucide-react"

// Order Status Types
type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled'

interface OrderItem {
    id: string
    name: string
    quantity: number
    price: number
    notes?: string
}

interface Order {
    id: string
    customerName: string
    customerPhone: string
    items: OrderItem[]
    totalAmount: number
    deliveryFee: number
    deliveryAddress: string
    status: OrderStatus
    paymentMethod: string
    paymentStatus: 'pending' | 'paid' | 'failed'
    createdAt: string
    estimatedPickup?: string
}

// Mock Orders Data - This would come from Supabase in production
const MOCK_ORDERS: Order[] = [
    {
        id: "ORD-001",
        customerName: "Adebayo Johnson",
        customerPhone: "08123456789",
        items: [
            { id: "1", name: "Jollof Rice & Chicken", quantity: 2, price: 2500, notes: "Extra pepper" },
            { id: "2", name: "Cold Coke (50cl)", quantity: 2, price: 300 }
        ],
        totalAmount: 5600,
        deliveryFee: 500,
        deliveryAddress: "Male Hostel Block A, Room 12",
        status: "pending",
        paymentMethod: "card",
        paymentStatus: "paid",
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        estimatedPickup: "15 mins"
    },
    {
        id: "ORD-002",
        customerName: "Sarah Okonkwo",
        customerPhone: "08198765432",
        items: [
            { id: "3", name: "Fried Rice & Turkey", quantity: 1, price: 3000 },
            { id: "4", name: "Chicken Shawarma", quantity: 2, price: 2000 }
        ],
        totalAmount: 7000,
        deliveryFee: 450,
        deliveryAddress: "Science Faculty Building, Room 201",
        status: "accepted",
        paymentMethod: "transfer",
        paymentStatus: "paid",
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        estimatedPickup: "10 mins"
    },
    {
        id: "ORD-003",
        customerName: "Emmanuel Nnamdi",
        customerPhone: "08156789012",
        items: [
            { id: "5", name: "Meat Pie", quantity: 3, price: 500 },
            { id: "6", name: "Doughnuts", quantity: 6, price: 200 }
        ],
        totalAmount: 2700,
        deliveryFee: 350,
        deliveryAddress: "Library Complex, Reading Hall",
        status: "preparing",
        paymentMethod: "cash",
        paymentStatus: "pending",
        createdAt: new Date(Date.now() - 25 * 60000).toISOString()
    },
    {
        id: "ORD-004",
        customerName: "Grace Adekunle",
        customerPhone: "08134567890",
        items: [
            { id: "7", name: "Jollof Rice & Chicken", quantity: 1, price: 2500 }
        ],
        totalAmount: 2500,
        deliveryFee: 400,
        deliveryAddress: "Female Hostel Block C, Room 45",
        status: "ready_for_pickup",
        paymentMethod: "wallet",
        paymentStatus: "paid",
        createdAt: new Date(Date.now() - 35 * 60000).toISOString()
    }
]

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
    pending: { label: "New Order", color: "text-orange-600", bgColor: "bg-orange-100", icon: <Bell className="w-4 h-4" /> },
    accepted: { label: "Accepted", color: "text-blue-600", bgColor: "bg-blue-100", icon: <CheckCircle2 className="w-4 h-4" /> },
    preparing: { label: "Preparing", color: "text-purple-600", bgColor: "bg-purple-100", icon: <ChefHat className="w-4 h-4" /> },
    ready_for_pickup: { label: "Ready", color: "text-green-600", bgColor: "bg-green-100", icon: <Package className="w-4 h-4" /> },
    out_for_delivery: { label: "Out for Delivery", color: "text-cyan-600", bgColor: "bg-cyan-100", icon: <Package className="w-4 h-4" /> },
    delivered: { label: "Delivered", color: "text-gray-600", bgColor: "bg-gray-100", icon: <CheckCircle2 className="w-4 h-4" /> },
    cancelled: { label: "Cancelled", color: "text-red-600", bgColor: "bg-red-100", icon: <XCircle className="w-4 h-4" /> }
}

export default function VendorOrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
    const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Filter orders based on selected filter and search
    const filteredOrders = orders.filter(order => {
        const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    // Count orders by status
    const orderCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        accepted: orders.filter(o => o.status === 'accepted').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready_for_pickup: orders.filter(o => o.status === 'ready_for_pickup').length
    }

    // Update order status
    const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
        if (selectedOrder?.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
    }

    // Load orders from LocalStorage (simulating DB)
    useEffect(() => {
        const fetchOrders = () => {
            const storedOrdersStr = localStorage.getItem('campus-eats-vendor-orders')
            if (storedOrdersStr) {
                const storedOrders = JSON.parse(storedOrdersStr)
                // Map localStorage format to component Order format if needed
                const formattedStoredOrders = storedOrders.map((o: any) => ({
                    id: o.id,
                    customerName: o.customer.name,
                    customerPhone: o.customer.phone,
                    items: o.items.map((i: any) => ({
                        id: i.id,
                        name: i.name,
                        quantity: i.quantity,
                        price: i.price,
                        notes: i.options ? (Array.isArray(i.options) ? i.options.join(", ") : i.options) : ""
                    })),
                    totalAmount: o.total,
                    deliveryFee: o.deliveryFee,
                    deliveryAddress: o.customer.location,
                    status: o.status,
                    paymentMethod: o.paymentMethod,
                    paymentStatus: 'paid', // Assume paid for now
                    createdAt: o.createdAt,
                    estimatedPickup: "15 mins"
                }))

                // Merge with mock orders, avoiding duplicates
                const allOrders = [...formattedStoredOrders, ...MOCK_ORDERS]
                // Filter unique by ID
                const uniqueOrders = Array.from(new Map(allOrders.map(item => [item.id, item])).values())

                setOrders(uniqueOrders)
            }
        }

        fetchOrders()
        const interval = setInterval(fetchOrders, 3000) // Poll every 3s
        return () => clearInterval(interval)
    }, [])

    const handleRefresh = () => {
        setIsRefreshing(true)
        // Manual trigger
        const storedOrdersStr = localStorage.getItem('campus-eats-vendor-orders')
        if (storedOrdersStr) {
            const storedOrders = JSON.parse(storedOrdersStr)
            const formattedStoredOrders = storedOrders.map((o: any) => ({
                id: o.id,
                customerName: o.customer.name,
                customerPhone: o.customer.phone,
                items: o.items.map((i: any) => ({
                    id: i.id,
                    name: i.name,
                    quantity: i.quantity,
                    price: i.price,
                    notes: i.options ? (Array.isArray(i.options) ? i.options.join(", ") : i.options) : ""
                })),
                totalAmount: o.total,
                deliveryFee: o.deliveryFee,
                deliveryAddress: o.customer.location,
                status: o.status,
                paymentMethod: o.paymentMethod,
                paymentStatus: 'paid',
                createdAt: o.createdAt,
                estimatedPickup: "15 mins"
            }))
            const allOrders = [...formattedStoredOrders, ...MOCK_ORDERS]
            const uniqueOrders = Array.from(new Map(allOrders.map(item => [item.id, item])).values())
            setOrders(uniqueOrders)
        }
        setTimeout(() => setIsRefreshing(false), 500)
    }

    // Get time ago string
    const getTimeAgo = (dateString: string) => {
        const diff = Date.now() - new Date(dateString).getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 1) return 'Just now'
        if (mins < 60) return `${mins}m ago`
        const hours = Math.floor(mins / 60)
        return `${hours}h ago`
    }

    // Get next status action
    const getNextStatusAction = (status: OrderStatus): { label: string; nextStatus: OrderStatus; color: string } | null => {
        switch (status) {
            case 'pending': return { label: 'Accept Order', nextStatus: 'accepted', color: 'bg-blue-500 hover:bg-blue-600' }
            case 'accepted': return { label: 'Start Preparing', nextStatus: 'preparing', color: 'bg-purple-500 hover:bg-purple-600' }
            case 'preparing': return { label: 'Ready for Pickup', nextStatus: 'ready_for_pickup', color: 'bg-green-500 hover:bg-green-600' }
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/vendor/dashboard')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
                            <p className="text-xs text-gray-500">Manage incoming orders</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className={`p-2 hover:bg-gray-100 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 pb-24">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white">
                        <p className="text-xs opacity-80 uppercase font-bold tracking-wider">New Orders</p>
                        <p className="text-3xl font-bold mt-1">{orderCounts.pending}</p>
                        <p className="text-xs opacity-80 mt-1">Awaiting response</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-4 text-white">
                        <p className="text-xs opacity-80 uppercase font-bold tracking-wider">Preparing</p>
                        <p className="text-3xl font-bold mt-1">{orderCounts.preparing}</p>
                        <p className="text-xs opacity-80 mt-1">In kitchen</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white">
                        <p className="text-xs opacity-80 uppercase font-bold tracking-wider">Ready</p>
                        <p className="text-3xl font-bold mt-1">{orderCounts.ready_for_pickup}</p>
                        <p className="text-xs opacity-80 mt-1">Awaiting rider</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-4 text-white">
                        <p className="text-xs opacity-80 uppercase font-bold tracking-wider">Total Today</p>
                        <p className="text-3xl font-bold mt-1">{orderCounts.all}</p>
                        <p className="text-xs opacity-80 mt-1">All orders</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by Order ID or Customer name..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {(['all', 'pending', 'preparing', 'ready_for_pickup'] as const).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedFilter === filter
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {filter === 'all' ? 'All' : filter === 'ready_for_pickup' ? 'Ready' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    <span className="ml-1 text-xs opacity-70">
                                        ({filter === 'all' ? orderCounts.all : orderCounts[filter]})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredOrders.length === 0 ? (
                        <div className="col-span-full bg-white rounded-2xl p-12 text-center">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-500">
                                {searchQuery ? 'Try a different search term' : 'New orders will appear here'}
                            </p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => {
                            const statusConfig = STATUS_CONFIG[order.status]
                            const nextAction = getNextStatusAction(order.status)

                            return (
                                <div
                                    key={order.id}
                                    className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all hover:shadow-lg ${order.status === 'pending' ? 'border-orange-300 animate-pulse-subtle' : 'border-gray-100'
                                        }`}
                                >
                                    {/* Order Header */}
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-mono text-sm font-bold text-gray-900">{order.id}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusConfig.bgColor} ${statusConfig.color}`}>
                                                {statusConfig.icon}
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {getTimeAgo(order.createdAt)}
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.paymentStatus === 'paid' ? '✓ Paid' : 'Cash on Delivery'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-4 border-b border-gray-100">
                                        <p className="text-xs text-gray-400 uppercase font-bold mb-2">Order Items</p>
                                        <div className="space-y-2">
                                            {order.items.slice(0, 3).map((item) => (
                                                <div key={item.id} className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-900">
                                                        <span className="font-bold text-orange-500">{item.quantity}x</span> {item.name}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-700">₦{(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <p className="text-xs text-gray-400">+{order.items.length - 3} more items</p>
                                            )}
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Total</span>
                                            <span className="text-lg font-bold text-gray-900">₦{order.totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="p-4 bg-gray-50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="font-bold text-gray-900">{order.customerName}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {order.deliveryAddress}
                                                </div>
                                            </div>
                                            <a
                                                href={`tel:${order.customerPhone}`}
                                                className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                                            >
                                                <Phone className="w-5 h-5" />
                                            </a>
                                        </div>

                                        {/* Action Buttons */}
                                        {nextAction && (
                                            <div className="flex gap-2 mt-4">
                                                {order.status === 'pending' && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                        className="flex-1 py-3 border-2 border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
                                                    >
                                                        Decline
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, nextAction.nextStatus)}
                                                    className={`flex-[2] py-3 text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all ${nextAction.color}`}
                                                >
                                                    {nextAction.label}
                                                </button>
                                            </div>
                                        )}

                                        {order.status === 'ready_for_pickup' && (
                                            <div className="mt-4 p-3 bg-green-100 rounded-xl text-center">
                                                <p className="text-sm font-bold text-green-700">⏳ Waiting for rider pickup</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </main>

            {/* Add custom animation */}
            <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}
