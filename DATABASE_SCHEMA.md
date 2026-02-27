# Campus Eats Database Schema

## Tables Overview

### 1. **users** (Managed by Supabase Auth)
```sql
-- Supabase automatically creates this
-- We store additional data in user_metadata:
{
  "role": "customer" | "vendor",
  "phone": "string",
  "full_name": "string"
}
```

### 2. **restaurants**
```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  banner_url TEXT,
  phone TEXT,
  location TEXT NOT NULL,
  opening_hours JSONB, -- {"monday": "8:00-22:00", ...}
  is_open BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_restaurants_vendor ON restaurants(vendor_id);
CREATE INDEX idx_restaurants_open ON restaurants(is_open);
```

### 3. **menu_items**
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL, -- "Rice", "Swallow", "Protein", "Drinks", etc.
  is_available BOOLEAN DEFAULT true,
  preparation_time INTEGER DEFAULT 15, -- minutes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_category ON menu_items(category);
```

### 4. **orders**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL, -- "CE-001234"

  -- Order Details
  items JSONB NOT NULL, -- [{menu_item_id, name, price, quantity}, ...]
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 200,
  total DECIMAL(10,2) NOT NULL,

  -- Delivery Info
  delivery_location TEXT NOT NULL,
  delivery_phone TEXT NOT NULL,
  delivery_notes TEXT,

  -- Status
  status TEXT DEFAULT 'pending', -- pending, confirmed, preparing, ready, out_for_delivery, delivered, cancelled

  -- Payment
  payment_method TEXT NOT NULL, -- "palmpay", "opay", "kuda", "moniepoint", "gtbank", etc.
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_reference TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP,
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

### 5. **order_tracking**
```sql
CREATE TABLE order_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tracking_order ON order_tracking(order_id);
```

### 6. **reviews**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_restaurant ON reviews(restaurant_id);
```

### 7. **favorites**
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(customer_id, restaurant_id)
);

CREATE INDEX idx_favorites_customer ON favorites(customer_id);
```

---

## Row Level Security (RLS) Policies

### restaurants
```sql
-- Anyone can view verified, open restaurants
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view open restaurants"
  ON restaurants FOR SELECT
  USING (is_open = true AND is_verified = true);

CREATE POLICY "Vendors can manage their restaurants"
  ON restaurants FOR ALL
  USING (auth.uid() = vendor_id);
```

### menu_items
```sql
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available items"
  ON menu_items FOR SELECT
  USING (is_available = true);

CREATE POLICY "Vendors can manage their menu"
  ON menu_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE id = menu_items.restaurant_id
      AND vendor_id = auth.uid()
    )
  );
```

### orders
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view their orders"
  ON orders FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Vendors can view their restaurant orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE id = orders.restaurant_id
      AND vendor_id = auth.uid()
    )
  );

CREATE POLICY "Customers can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = customer_id);
```

---

## Sample Data for Testing

### Restaurants
```json
[
  {
    "name": "DP Restaurant",
    "description": "Delicious local dishes, fast service",
    "location": "D Hall, Campus",
    "category": "Nigerian Cuisine",
    "rating": 4.5
  },
  {
    "name": "Manna Palace",
    "description": "Best rice and stew on campus",
    "location": "Near Main Gate",
    "category": "Nigerian Cuisine",
    "rating": 4.7
  },
  {
    "name": "Foodmart",
    "description": "Quick bites and snacks",
    "location": "Student Center",
    "category": "Fast Food",
    "rating": 4.2
  }
]
```

### Menu Categories
- Rice & Pasta
- Swallow & Soup
- Protein (Chicken, Fish, Beef)
- Snacks
- Drinks
- Breakfast

---

## When Supabase Credentials Are Ready

Run these SQL commands in Supabase SQL Editor:

1. Copy all CREATE TABLE statements above
2. Paste in SQL Editor
3. Run to create tables
4. Copy RLS policies
5. Run to secure tables
6. Insert sample data for testing

Everything will work perfectly once credentials are added! 🚀
