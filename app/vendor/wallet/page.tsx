"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Wallet, TrendingUp, ArrowDownLeft, ArrowUpRight, Clock, Building2 } from "lucide-react"

// Mock Transactions Data
const TRANSACTIONS = [
    { id: "TX-9283", type: "credit", amount: 4500, description: "Order #8291 - Jollof Rice Combo", date: "Today, 2:30 PM", status: "completed" },
    { id: "TX-9282", type: "credit", amount: 1200, description: "Order #8290 - Coke & Chips", date: "Today, 1:15 PM", status: "completed" },
    { id: "TX-9281", type: "debit", amount: 25000, description: "Withdrawal to OPay (803...92)", date: "Yesterday, 9:00 AM", status: "completed" },
    { id: "TX-9280", type: "credit", amount: 3000, description: "Order #8288 - Fried Rice", date: "Yesterday, 8:45 PM", status: "completed" },
    { id: "TX-9279", type: "credit", amount: 5500, description: "Order #8287 - Family Platter", date: "Yesterday, 7:12 PM", status: "completed" },
]

export default function VendorWalletPage() {
    const router = useRouter()
    const [isWithdrawing, setIsWithdrawing] = useState(false)
    const [withdrawAmount, setWithdrawAmount] = useState("")

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            setIsWithdrawing(false)
            alert(`Withdrawal request of ₦${Number(withdrawAmount).toLocaleString()} submitted!`)
            setWithdrawAmount("")
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Wallet & Earnings</h1>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full relative">
                        <Clock className="w-6 h-6 text-gray-600" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 space-y-6">

                {/* Total Balance Card */}
                <div className="bg-[#1a1a1a] rounded-[2rem] p-6 text-white shadow-xl shadow-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500 rounded-full blur-[80px] opacity-20"></div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Available Balance</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black tracking-tight">₦52,800.00</span>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={() => setIsWithdrawing(true)}
                                className="flex-1 bg-lime-500 hover:bg-lime-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                                Withdraw
                            </button>
                            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Bank Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Analytics Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
                        </div>
                        <p className="text-2xl font-black text-gray-900">₦12,500</p>
                        <p className="text-xs text-green-600 font-bold mt-1">+15% from yesterday</p>
                    </div>
                    <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                            <Wallet className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
                        </div>
                        <p className="text-2xl font-black text-gray-900">₦4,200</p>
                        <p className="text-xs text-gray-400 font-medium mt-1">Clears in 24 hrs</p>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-900">Recent Transactions</h2>
                        <button className="text-sm font-bold text-lime-600">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {TRANSACTIONS.map(tx => (
                            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{tx.description}</p>
                                        <p className="text-xs text-gray-500 font-medium">{tx.date}</p>
                                    </div>
                                </div>
                                <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                                    }`}>
                                    {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Withdrawal Modal */}
            {isWithdrawing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Request Withdrawal</h3>
                            <button onClick={() => setIsWithdrawing(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200">
                                <span className="font-bold">×</span>
                            </button>
                        </div>

                        <form onSubmit={handleWithdraw} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Amount to Withdraw</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
                                    <input
                                        type="number"
                                        required
                                        min="1000"
                                        max="52800"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-lime-500 focus:bg-white rounded-xl py-4 pl-8 pr-4 font-bold text-lg outline-none transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2 font-medium">Available: ₦52,800.00</p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
                                <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-blue-900 uppercase mb-1">Sending to</p>
                                    <p className="text-sm font-bold text-blue-700">OPay Digital Services</p>
                                    <p className="text-xs text-blue-500">**** **** **92</p>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-300 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Confirm Withdrawal
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
