"use client"

import { MessageSquare, Ticket, Wallet, ChevronRight, User, LogOut } from "lucide-react"

export default function PwaProfilePage() {
    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Header */}
            <div className="relative bg-[#1a1a1a] pb-12 pt-16 px-6 rounded-b-[3rem] shadow-2xl overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px]"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative group">
                        <div className="w-28 h-28 bg-gradient-to-br from-lime-400 to-green-600 rounded-full p-[3px] shadow-2xl">
                            <div className="w-full h-full bg-[#1a1a1a] rounded-full flex items-center justify-center overflow-hidden relative">
                                <span className="text-6xl group-hover:scale-110 transition-transform duration-500">🧑🏾‍🦱</span>
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 bg-lime-500 text-white p-2 rounded-full border-4 border-[#1a1a1a] shadow-lg active:scale-90 transition-transform">
                            <User className="w-4 h-4" />
                        </button>
                    </div>

                    <h1 className="text-2xl font-black text-white mt-6 mb-1 tracking-tight">Timileyin Abolarin</h1>
                    <p className="text-gray-400 text-sm font-medium mb-6">timileyin@campuseats.com</p>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-md">
                            <span className="font-mono text-xs text-lime-400">ID:</span>
                            <span className="text-xs font-bold">9936764784</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg shadow-purple-500/20">
                            <Ticket className="w-3 h-3" />
                            <span className="text-xs font-bold">Titan Plan</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 px-6 -mt-8 relative z-20 mb-8">
                <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center border border-gray-100">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Orders</span>
                    <span className="text-2xl font-black text-gray-900">124</span>
                </div>
                <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center border border-gray-100">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Wallet Balance</span>
                    <span className="text-2xl font-black text-lime-600">₦45k</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="px-6 space-y-3">
                {[
                    { icon: Ticket, label: "My Vouchers", badge: "2 New" },
                    { icon: Wallet, label: "Payment Methods" },
                    { icon: MessageSquare, label: "Help & Support" },
                ].map((item, idx) => (
                    <button key={idx} className="w-full bg-gray-50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-white hover:shadow-lg hover:shadow-gray-200/40">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 shadow-sm group-hover:text-lime-600 transition-colors">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-gray-900">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {item.badge && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm animate-pulse">{item.badge}</span>
                            )}
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-lime-500 transition-colors" />
                        </div>
                    </button>
                ))}

                <button className="w-full mt-8 border-2 border-red-100 p-4 rounded-2xl flex items-center justify-center gap-2 text-red-500 font-bold active:scale-[0.98] transition-all hover:bg-red-50">
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>
        </div>
    )
}
