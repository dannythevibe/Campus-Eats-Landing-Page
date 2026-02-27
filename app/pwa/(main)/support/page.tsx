"use client"

import { MessageCircle, CreditCard, ChevronRight, HelpCircle, Phone } from "lucide-react"

export default function PwaSupportPage() {
    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Abstract Header */}
            <div className="relative bg-[#1a1a1a] h-[320px] rounded-b-[3.5rem] px-8 pt-16 overflow-hidden shadow-2xl">
                {/* Background Art */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-lime-500 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute top-40 -left-20 w-60 h-60 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>

                <div className="relative z-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-lime-400 text-xs font-bold uppercase tracking-wider mb-6">
                        Support Center
                    </span>
                    <h1 className="text-5xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                        Hello, how<br />can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">help?</span>
                    </h1>

                    {/* Floating Chat Button */}
                    <div className="absolute right-0 bottom-10 translate-x-4">
                        <button className="bg-lime-400 hover:bg-lime-500 px-8 py-4 rounded-l-full shadow-[0_10px_30px_-10px_rgba(163,230,53,0.5)] flex items-center gap-3 active:scale-95 transition-all group">
                            <MessageCircle className="w-6 h-6 text-[#1a1a1a]" />
                            <span className="font-black text-[#1a1a1a] text-sm group-hover:pr-2 transition-all">Start Chat</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6 py-10 space-y-10">
                {/* Recent Orders Support */}
                <div className="animate-in slide-in-from-bottom-8 duration-700 delay-100">
                    <h3 className="font-bold text-gray-900 mb-5 text-xs uppercase tracking-widest pl-2">Recent Issue?</h3>
                    <div className="bg-gray-50 rounded-[2rem] p-8 text-center border border-dashed border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <HelpCircle className="w-8 h-8 text-gray-300 group-hover:text-lime-500 transition-colors" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Select a recent order to get help</p>
                    </div>
                </div>

                {/* General Help */}
                <div className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
                    <h3 className="font-bold text-gray-900 mb-5 text-xs uppercase tracking-widest pl-2">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full bg-[#1a1a1a] p-1 rounded-[2rem] shadow-xl shadow-gray-200 active:scale-[0.98] transition-all group overflow-hidden">
                            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-[1.7rem] p-5 flex items-center justify-between border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-white text-base">Payments & Wallet</h4>
                                        <p className="text-gray-400 text-xs font-medium">Refunds, Top-ups</p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <ChevronRight className="text-white w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </button>

                        <button className="w-full bg-white p-5 rounded-[2rem] shadow-lg shadow-gray-100 border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-900 text-base">Call Support</h4>
                                    <p className="text-gray-400 text-xs font-medium">Speak to an agent</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-300 w-5 h-5 group-hover:text-black transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
