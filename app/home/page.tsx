"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  Search,
  Bell,
  ShoppingCart,
  Heart,
  Star,
  Settings,
  HelpCircle,
  LayoutDashboard,
  ChevronRight,
  Plus,
  Minus,
  X,
  CreditCard,
  User,
  LogOut,
  Moon,
  Sun,
  Shield,
  MessageSquare,
  Building2,
  Banknote
} from "lucide-react"
import { AuthModal } from "@/components/auth-modal"


// Data
const CATEGORIES = [
  { id: "all", name: "All Menu", icon: "🍽️", active: true },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "food", name: "Food", icon: "🍲" },
  { id: "pastries", name: "Pastries", icon: "🥐" },
  { id: "parfait", name: "Parfait", icon: "🍨" },
]

const MENU_ITEMS = [
  { id: "m1", name: "Jollof Rice & Chicken", price: 2500, image: "🍚", restaurant: "Double Portion", rating: 4.8, category: "food" },
  { id: "m2", name: "Pasta Carbonara", price: 3500, image: "🍝", restaurant: "Insta Pasta", rating: 4.5, category: "food" },
  { id: "m3", name: "Chicken Shawarma", price: 2000, image: "🌯", restaurant: "Manna Palace", rating: 4.7, category: "food" },
  { id: "m4", name: "Fried Rice & Turkey", price: 3000, image: "🍛", restaurant: "National Kitchen", rating: 4.3, category: "food" },
  { id: "m5", name: "Burger Combo", price: 2800, image: "🍔", restaurant: "Bitepoint", rating: 4.6, category: "food" },
  { id: "m6", name: "Parfait Special", price: 1500, image: "🍨", restaurant: "Soomta Kitchen", rating: 4.9, category: "parfait" },
  { id: "m7", name: "Coke", price: 300, image: "🥤", restaurant: "Mimi's", rating: 4.9, category: "drinks" },
  { id: "m8", name: "Meat Pie", price: 500, image: "🥐", restaurant: "Foodmart", rating: 4.2, category: "pastries" },
]

const RESTAURANTS = [
  { id: "r1", name: "Double Portion", image: "🍽️", rating: 4.8, deliveryTime: "20-30 min" },
  { id: "r2", name: "Numbers", image: "🔢", rating: 4.5, deliveryTime: "25-35 min" },
  { id: "r3", name: "Manna Palace", image: "👑", rating: 4.7, deliveryTime: "15-25 min" },
  { id: "r4", name: "Foodmart", image: "🛒", rating: 4.2, deliveryTime: "10-20 min" },
  { id: "r5", name: "Mimi's", image: "🏪", rating: 4.6, deliveryTime: "20-30 min" },
  { id: "r6", name: "National Kitchen", image: "🇳🇬", rating: 4.3, deliveryTime: "30-45 min" },
  { id: "r7", name: "Sizzle", image: "🥘", rating: 4.7, deliveryTime: "20-35 min" },
  { id: "r8", name: "Toasties", image: "🥪", rating: 4.5, deliveryTime: "15-25 min" },
  { id: "r9", name: "Exquisite Kitchen", image: "🍲", rating: 4.4, deliveryTime: "30-45 min" },
]

const PAYMENT_METHODS = [
  { id: "debit", name: "Debit Card", icon: CreditCard },
  { id: "transfer", name: "Transfer", icon: Building2 },
  { id: "cash", name: "Cash", icon: Banknote },
]

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}



function HomeContent() {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParams = useSearchParams()

  // -- STATE --
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeNav, setActiveNav] = useState("dashboard")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState("debit")

  // Auth State
  const [user, setUser] = useState<{ name: string, email: string } | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [pendingCheckout, setPendingCheckout] = useState(false)

  // Feature State
  const [wishlist, setWishlist] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [purchaseHistory, setPurchaseHistory] = useState<Record<string, number>>({})
  const [notifications, setNotifications] = useState<string[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // ... (logic)

  const handleCheckout = () => {
    // 1. Check Authentication
    if (!user) {
      setPendingCheckout(true)
      setShowAuthModal(true)
      return
    }

    if (selectedPayment === "debit" || selectedPayment === "transfer") {
      setShowPaymentModal(true)
    } else {
      // Cash Payment Logic
      // In a real app, this would create a pending order in the database
      processPurchase()
      setCart([])
      // router.push('/order-success') // Would be the real flow
      alert("Order successfully placed! Please pay cash upon delivery.")
    }
  }

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // API Call Simulation (Replace with actual payment gateway SDK)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      processPurchase()
      setCart([])
      setShowPaymentModal(false)
      alert("Payment Successful! Your food is on the way.")
    } catch (error) {
      alert("Payment Failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTransferPayment = async () => {
    setIsProcessing(true)
    try {
      // Here we would verify the transaction hash or poll the backend for receipt
      await new Promise(resolve => setTimeout(resolve, 2000))
      processPurchase()
      setCart([])
      setShowPaymentModal(false)
      alert("Transfer Verified! Your order is confirmed.")
    } catch (error) {
      alert("Verification Failed. Please contact support.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = cart.length > 0 ? 500 : 0
  const total = subtotal + deliveryFee

  // Filtering
  const filteredMenu = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory ||
      (activeCategory === "drinks" && item.category === "drinks")
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // -- VIEWS --

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Featured Banner */}
      <div className="bg-white rounded-3xl h-48 shadow-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-green-100 opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-2">PROMO</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Fat Discount Friday!</h2>
          <p className="text-gray-600">Get 20% off all Debit Card orders today.</p>
        </div>
      </div>

      {/* Categories */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
        <div className="flex gap-4 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl transition-all duration-300 ${activeCategory === category.id
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 shadow-sm hover:shadow-md hover:scale-102"
                }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Menu</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group relative border border-transparent dark:border-zinc-700"
            >
              {/* Wishlist Toggle - Increased Z-Index */}
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-3 right-3 z-30 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-300"}`} />
              </button>

              {/* Image Area */}
              <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center relative">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{item.image}</span>
              </div>

              {/* Details */}
              <div className="p-4 relative">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{item.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                  <span>{item.restaurant}</span> • <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {item.rating}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-xl text-gray-900 dark:text-white">₦{item.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-10 h-10 bg-orange-100 hover:bg-orange-500 text-orange-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm relative z-30 cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Restaurants</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANTS.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-4 group cursor-pointer border border-transparent hover:border-orange-100"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {restaurant.image}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{restaurant.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>{restaurant.rating}</span>
                  <span>•</span>
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderWishlist = () => {
    const wishlistItems = MENU_ITEMS.filter(item => wishlist.includes(item.id))

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist ❤️</h2>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">No items in your wishlist yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{item.image}</span>
                  <button onClick={() => toggleWishlist(item.id)}>
                    <X className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{item.restaurant}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">₦{item.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(item)} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderFavorites = () => {
    const items = MENU_ITEMS.filter(item => favorites.includes(item.id))

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Favorites ⭐</h2>

        {/* Notifications Area */}
        {notifications.length > 0 && (
          <div className="space-y-2 mb-6">
            {notifications.map((note, idx) => (
              <div key={idx} className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top fade-in duration-500">
                <div className="bg-white p-2 rounded-full"><Star className="w-4 h-4 text-orange-500 fill-orange-500" /></div>
                <p className="font-medium text-sm">{note}</p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8 text-center">
          <h4 className="font-bold text-orange-800 mb-2">How Favorites Work</h4>
          <p className="text-sm text-orange-700">Our algorithm tracks your tastes! Buy any meal 5 times, and it automatically gets crowned as a Favorite here.</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl">
            <Star className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">Buy a meal 5 times to see it here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 shadow-sm border border-orange-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">TOP PICK</div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl drop-shadow-sm">{item.image}</span>
                </div>
                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{item.restaurant}</p>
                <p className="text-xs text-gray-400 mb-4">Ordered {purchaseHistory[item.id]} times</p>
                <button onClick={() => addToCart(item)} className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black shadow-lg">
                  Order Again
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-medium">Account Information</p>
              <p className="text-sm text-gray-500">Update your profile details</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-500">Manage your alerts</p>
            </div>
          </div>
          <div className="bg-green-500 w-12 h-6 rounded-full relative cursor-pointer"><div className="bg-white w-4 h-4 rounded-full absolute right-1 top-1"></div></div>
        </div>

        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-medium">Privacy & Security</p>
              <p className="text-sm text-gray-500">Change password, 2FA</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Moon className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-medium dark:text-gray-200">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle app theme</p>
            </div>
          </div>
          <div
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${theme === 'dark' ? 'bg-orange-500' : 'bg-gray-200'}`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <div className={`bg-white w-4 h-4 rounded-full absolute top-1 shadow-sm transition-all duration-300 ${theme === 'dark' ? 'left-7' : 'left-1'}`}></div>
          </div>
        </div>

        <button className="flex items-center gap-2 text-red-500 font-medium mt-4">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  )

  const renderHelp = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>

      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="font-bold text-lg mb-2">How can we help?</h3>
        <p className="text-gray-500 mb-6">Our team is available 24/7 to assist you with any issues.</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">Chat with Support</button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-800">FAQs</h3>
        {["How do I track my order?", "Can I change my payment method?", "How to apply a promo code?"].map((q, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <span className="font-medium">{q}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-black font-sans flex transition-colors duration-300">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 flex flex-col fixed left-0 top-0 h-screen z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r dark:border-zinc-800 transition-colors duration-300">
        {/* Main Menu Header */}
        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight dark:text-white">CampusEats</span>
          </div>
          <h2 className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-4 pl-4">Main Menu</h2>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'wishlist', icon: Heart, label: 'Wishlist' },
              { id: 'favorite', icon: Star, label: 'Favorites' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 group ${activeNav === item.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon className={`w-5 h-5 ${activeNav === item.id ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Others Section */}
        <div className="px-8 mt-auto mb-8">
          <h2 className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-4 pl-4">Others</h2>
          <nav className="space-y-2">
            {[
              { id: 'settings', icon: Settings, label: 'Settings' },
              { id: 'help', icon: HelpCircle, label: 'Help & Support' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 group ${activeNav === item.id
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon className={`w-5 h-5 ${activeNav === item.id ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 mr-96 p-8 min-h-screen">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex-1 max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 capitalize">{activeNav.replace('-', ' ')}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : "Welcome! Please log in to order."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 dark:text-white rounded-xl text-sm border-none shadow-sm focus:ring-2 focus:ring-orange-500 outline-none w-64 transition-colors"
                disabled={!user} 
              />
            </div>

            {user ? (
              // Logged In View
              <>
                <button className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-sm relative hover:scale-105 transition-transform">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-800"></span>
                </button>
                <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-zinc-700">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full border-2 border-white dark:border-zinc-800 shadow-sm flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                    {user.name.charAt(0)}
                  </div>
                </div>
              </>
            ) : (
              // Logged Out View - Profile Button
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform group"
                title="Log In / Sign Up"
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-orange-500 transition-colors" />
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="animate-in fade-in duration-500">
          {activeNav === 'dashboard' && renderDashboard()}
          {activeNav === 'wishlist' && renderWishlist()}
          {activeNav === 'favorite' && renderFavorites()}
          {activeNav === 'settings' && renderSettings()}
          {activeNav === 'help' && renderHelp()}
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false)
            setPendingCheckout(false)
          }}
          onLogin={(userData) => {
            setUser(userData)
            setShowAuthModal(false)
            if (pendingCheckout) {
              setPendingCheckout(false)
              setShowPaymentModal(true)
            }
          }}
        />
      </main>

      {/* Right Sidebar - Order Summary */}
      <aside className="w-96 bg-white dark:bg-zinc-900 fixed right-0 top-0 h-screen z-40 flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.02)] border-l border-gray-50 dark:border-zinc-800 transition-colors duration-300">
        <div className="p-8 border-b border-gray-50 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Order</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <p className="font-medium text-gray-900">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1 max-w-[150px]">Looks like you haven't added any food yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center group">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{item.name}</h4>
                    <p className="text-gray-500 text-xs mb-2">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">-</button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-gray-50">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Delivery</span>
              <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</h3>
            <div className="flex gap-2">
              {PAYMENT_METHODS.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${selectedPayment === method.id ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                >
                  <method.icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button disabled={cart.length === 0} onClick={handleCheckout} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            Checkout
          </button>
        </div>
      </aside>

      {/* -- PAYMENT MODAL -- */}
      {
        showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}></div>
            <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPayment === 'debit' ? 'Card Details' : 'Bank Transfer'}
                </h2>
                <button onClick={() => setShowPaymentModal(false)} className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                  <X className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              {selectedPayment === 'transfer' ? (
                <div className="space-y-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50 rounded-2xl p-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Amount to Transfer</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">₦{total.toLocaleString()}</p>
                    <p className="text-xs text-orange-500 font-medium">Use order ID as reference</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bank Name</p>
                        <p className="font-bold text-gray-900 dark:text-white">CampusPay Bank</p>
                      </div>
                      <Building2 className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 group cursor-pointer hover:border-orange-500 transition-colors"
                      onClick={() => { navigator.clipboard.writeText("1234567890"); alert("Copied!") }}>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account Number</p>
                        <p className="font-mono font-bold text-xl text-gray-900 dark:text-white tracking-widest">1234567890</p>
                      </div>
                      <div className="px-2 py-1 bg-white dark:bg-zinc-700 rounded text-xs font-bold text-gray-500 dark:text-gray-300 group-hover:text-orange-500">COPY</div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account Name</p>
                        <p className="font-bold text-gray-900 dark:text-white">Campus Eats Ltd</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex gap-3 items-start">
                    <div className="mt-1 bg-yellow-100 dark:bg-yellow-900/50 p-1 rounded-full">
                      <Shield className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <p className="text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed">
                      Please click the button below only after you have made the transfer. Transfers are typically verified within 5 minutes.
                    </p>
                  </div>

                  <button
                    onClick={handleTransferPayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Verifying Transfer..." : "I Have Sent the Money"}
                  </button>
                </div>
              ) : (
                <>
                  {/* FATTER ORANGE CARD UI */}
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden aspect-[1.6/1]">
                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

                    <div className="flex flex-col justify-between h-full relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-8 bg-yellow-400/80 rounded-lg flex items-center gap-2 px-2">
                          <div className="w-0.5 h-full bg-black/10"></div>
                          <div className="w-0.5 h-full bg-black/10"></div>
                        </div>
                        <span className="font-mono text-lg tracking-widest opacity-80">DEBIT</span>
                      </div>

                      <div className="space-y-6">
                        <div className="font-mono text-3xl tracking-widest drop-shadow-md">
                          •••• •••• •••• 4242
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Card Holder</div>
                            <div className="font-bold tracking-wide">DANNY STUDENT</div>
                          </div>
                          <div>
                            <div className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Expires</div>
                            <div className="font-bold tracking-wide">12/28</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleCardPayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input required type="text" placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl font-mono text-gray-900 dark:text-white border-2 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-700 transition-all outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                        <input required type="text" placeholder="MM/YY" className="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl font-mono text-gray-900 dark:text-white border-2 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-700 transition-all outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                        <input required type="text" placeholder="123" maxLength={3} className="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl font-mono text-gray-900 dark:text-white border-2 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-700 transition-all outline-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-5 bg-gray-900 dark:bg-white dark:text-black text-white rounded-2xl font-bold text-lg hover:bg-black dark:hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing Payment..." : `Pay ₦${total.toLocaleString()}`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )
      }
    </div >
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
