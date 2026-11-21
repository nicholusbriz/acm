-- ============================================
-- Supabase Database Setup for Africa Marketplace
-- ============================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  compare_at_price DECIMAL(10, 2),
  sku VARCHAR(100) UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  seller_id UUID, -- Add your seller/user ID reference
  images TEXT[], -- Array of image URLs
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies for Categories
-- Allow public read access to categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Allow public (no auth) to insert categories (for development)
CREATE POLICY "Public can create categories"
  ON categories FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public (no auth) to update categories (for development)
CREATE POLICY "Public can update categories"
  ON categories FOR UPDATE
  TO public
  USING (true);

-- Allow public (no auth) to delete categories (for development)
CREATE POLICY "Public can delete categories"
  ON categories FOR DELETE
  TO public
  USING (true);

-- 6. Create Policies for Products
-- Allow public read access to active products
CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true);

-- Allow public (no auth) to insert products (for development)
CREATE POLICY "Public can create products"
  ON products FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public (no auth) to update products (for development)
CREATE POLICY "Public can update products"
  ON products FOR UPDATE
  TO public
  USING (true);

-- Allow public (no auth) to delete products (for development)
CREATE POLICY "Public can delete products"
  ON products FOR DELETE
  TO public
  USING (true);

-- 7. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Add triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 9. Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Agricultural Products', 'agricultural-products', 'Fresh produce, grains, and agricultural goods'),
  ('Arts & Crafts', 'arts-crafts', 'Handmade crafts, artwork, and cultural items'),
  ('Tours & Experiences', 'tours-experiences', 'Travel packages, tours, and cultural experiences'),
  ('Shipping & Logistics', 'shipping-logistics', 'Shipping services and logistics solutions')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================
-- Note: Storage buckets need to be created via Supabase Dashboard or API
-- Run the SQL below in Supabase SQL Editor after creating the bucket

-- 1. Create a storage bucket named 'product-images'
-- Go to Supabase Dashboard > Storage > New Bucket
-- Name: product-images
-- Public: Yes (to allow public access to images)

-- 2. After creating the bucket, run this to set up policies:
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Allow public read access to product images
CREATE POLICY "Public view for product-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- 4. Allow public (no auth) to upload images (for development)
CREATE POLICY "Public can upload to product-images"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'product-images');

-- 5. Allow public (no auth) to update images (for development)
CREATE POLICY "Public can update product-images"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'product-images');

-- 6. Allow public (no auth) to delete images (for development)
CREATE POLICY "Public can delete product-images"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'product-images');
