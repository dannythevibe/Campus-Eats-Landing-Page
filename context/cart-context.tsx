"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
    id: string | number
    name: string
    price: number
    quantity: number
    image?: string
    restaurantId?: string | number
    options?: any
}

type CartContextType = {
    items: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string | number) => void
    updateQuantity: (id: string | number, delta: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('campus-eats-cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('campus-eats-cart', JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addToCart = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevItems, { ...newItem, quantity: 1 }]
        })
    }

    const removeFromCart = (id: string | number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string | number, delta: number) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(0, item.quantity + delta)
                    return { ...item, quantity: newQuantity }
                }
                return item
            }).filter((item) => item.quantity > 0)
        })
    }

    const clearCart = () => {
        setItems([])
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
