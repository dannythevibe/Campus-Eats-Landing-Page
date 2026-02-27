-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth)
-- Links to auth.users via id
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('customer', 'vendor', 'rider')) DEFAULT 'customer',
  avatar_url TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RESTAURANTS (For Vendors)
CREATE TABLE public.restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Link to Vendor Profile
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  banner_url TEXT,
  address TEXT,
  category TEXT, -- e.g., 'Fast Food', 'Local', 'Continental'
  delivery_time_min INT DEFAULT 20,
  delivery_time_max INT DEFAULT 40,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MENU ITEMS
CREATE TABLE public.menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT, -- e.g., 'Food', 'Drinks', 'Pastries'
  is_available BOOLEAN DEFAULT TRUE,
  preparation_time_min INT DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  restaurant_id UUID REFERENCES public.restaurants(id),
  rider_id UUID REFERENCES public.profiles(id), -- Null initially, set when rider accepts
  
  status TEXT CHECK (status IN ('pending', 'accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled')) DEFAULT 'pending',
  
  total_amount NUMERIC(10, 2) NOT NULL,
  delivery_fee NUMERIC(10, 2) DEFAULT 0,
  payment_method TEXT CHECK (payment_method IN ('card', 'transfer', 'cash', 'wallet')),
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed')) DEFAULT 'pending',
  
  delivery_address TEXT,
  delivery_lat NUMERIC,
  delivery_lng NUMERIC,
  
  -- Timestamps for tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- 5. ORDER ITEMS (Links Orders to Menu Items)
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES public.menu_items(id),
  quantity INT DEFAULT 1,
  price_at_time NUMERIC(10, 2) NOT NULL -- Price might change later, so lock it here
);

-- 6. NOTIFICATIONS (For persistent history)
-- Real-time will handle the "live" part, this is for the "Bell" icon history
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('order_update', 'promo', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FAVORITES / WISHLIST
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, menu_item_id) -- Prevent duplicate likes
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- POLICIES (Simplified for initial setup)

-- Profiles: Everyone can read basic info, Users can update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Restaurants: Viewable by everyone, created/edited by Vendors
CREATE POLICY "Public restaurants viewable by everyone" ON restaurants FOR SELECT USING (true);
CREATE POLICY "Vendors can insert their restaurant" ON restaurants FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Orders: 
-- 1. Customers see their own orders
-- 2. Vendors see orders for their restaurant
-- 3. Riders see 'pending' orders (to accept) OR orders they are assigned to
CREATE POLICY "Customers see own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Vendors see restaurant orders" ON orders FOR SELECT USING (
  restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
);
CREATE POLICY "Riders see available or assigned deliveries" ON orders FOR SELECT USING (
  (status = 'pending' AND rider_id IS NULL) -- Available for pickup
  OR 
  rider_id = auth.uid() -- Assigned to me
);

-- Realtime needs specific publication setup (Run this in SQL editor)
-- alter publication supabase_realtime add table orders;
-- alter publication supabase_realtime add table notifications;
