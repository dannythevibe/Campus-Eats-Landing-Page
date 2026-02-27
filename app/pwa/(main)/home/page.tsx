"use client"

import Link from "next/link"
import { Search, SlidersHorizontal, Bell } from "lucide-react"

const RESTAURANTS = [
    { id: 1, name: "Manna Palace", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "FoodMart", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Double Portion", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Mimi's", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "National Kitchen", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80" },
]

export default function PwaHomePage() {
    return (
        <div className="p-6 space-y-8 pb-32">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700">
                    <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-lime-400 to-green-600">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <span className="text-2xl">😎</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Good Morning</p>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">Timileyin!</h1>
                    </div>
                </div>
                <button className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:shadow-md transition-all active:scale-95 group relative">
                    <Bell className="w-6 h-6 group-hover:text-lime-600 transition-colors" />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
            </div>

            {/* Hero Banner */}
            <div className="relative w-full h-56 bg-black rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer active:scale-[0.98] transition-all duration-500">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

                <div className="relative z-10 h-full flex flex-col justify-center px-8 max-w-[65%]">
                    <div className="bg-lime-500/20 backdrop-blur-md self-start px-3 py-1 rounded-full mb-3 border border-lime-500/30">
                        <p className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">Free Delivery</p>
                    </div>
                    <h2 className="text-2xl font-black text-white leading-none mb-6">
                        Special Deal<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">Student Promo</span>
                    </h2>
                    <button className="bg-white text-black px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-white/10 active:scale-90 transition-all self-start flex items-center gap-2">
                        Order Now
                        <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </button>
                </div>

                <div className="absolute -right-4 bottom-0 w-48 h-48 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {/* Placeholder for Rider Image */}
                    <img
                        src="/rider-illustration.png"
                        alt="Rider"
                        className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                    />
                </div>
            </div>

            {/* Search Bar */}
            <div className="sticky top-4 z-20">
                <div className="relative group">
                    <div className="absolute inset-0 bg-lime-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-2xl shadow-lg shadow-gray-200/50 flex items-center p-2 transition-transform group-active:scale-[0.99]">
                        <Search className="w-6 h-6 text-gray-400 ml-3" />
                        <input
                            type="text"
                            placeholder="What are you craving?"
                            className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 text-sm font-medium h-10 ml-2"
                        />
                        <button className="bg-[#1a1a1a] text-white p-3 rounded-xl shadow-lg active:scale-90 transition-all">
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Restaurants Grid */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Restaurants</h3>
                    <button className="text-xs font-bold text-gray-400 hover:text-lime-600 transition-colors">View All</button>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    {RESTAURANTS.map((restaurant, idx) => (
                        <Link
                            href={`/pwa/restaurant/${restaurant.id}`}
                            key={restaurant.id}
                            className="group bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100 active:scale-[0.97] block"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-3">
                                <img
                                    src={restaurant.img}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-3 right-3 bg-white/30 backdrop-blur-md border border-white/20 px-2 py-1 rounded-lg flex items-center gap-1">
                                    <span className="text-[10px] ">⭐</span>
                                    <span className="text-[10px] font-bold text-white">4.5</span>
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-lime-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                        15 min
                                    </span>
                                </div>
                            </div>

                            <div className="px-1 text-center">
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{restaurant.name}</h4>
                                <p className="text-[10px] text-gray-400 font-medium">Burger • Pizza • Fast Food</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
