-- ============================================
-- Seed Database with Sample Categories and Products
-- ============================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM products;
-- DELETE FROM categories;

-- ============================================
-- INSERT MORE CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description) VALUES
  ('Fresh Produce', 'fresh-produce', 'Fresh fruits, vegetables, and farm-fresh produce'),
  ('Grains & Cereals', 'grains-cereals', 'Rice, wheat, maize, and other grain products'),
  ('Handmade Textiles', 'handmade-textiles', 'Traditional fabrics, woven goods, and textiles'),
  ('Sculptures & Art', 'sculptures-art', 'African sculptures, carvings, and artwork'),
  ('Jewelry & Accessories', 'jewelry-accessories', 'Beaded jewelry, traditional accessories'),
  ('Safari Tours', 'safari-tours', 'Wildlife safari experiences and game drives'),
  ('Cultural Tours', 'cultural-tours', 'Cultural immersion and heritage tours'),
  ('Adventure Travel', 'adventure-travel', 'Hiking, trekking, and outdoor adventures'),
  ('Freight Services', 'freight-services', 'International freight and cargo shipping'),
  ('Local Delivery', 'local-delivery', 'Local delivery and courier services')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- INSERT SAMPLE PRODUCTS
-- ============================================

-- Agricultural Products
INSERT INTO products (name, slug, description, price, compare_at_price, sku, stock_quantity, category_id, images, is_active, is_featured) VALUES
  (
    'Organic Ethiopian Coffee Beans',
    'organic-ethiopian-coffee-beans',
    'Premium single-origin Arabica coffee beans from the highlands of Ethiopia. Rich, full-bodied flavor with hints of berries and chocolate.',
    24.99,
    29.99,
    'COF-ETH-001',
    150,
    (SELECT id FROM categories WHERE slug = 'agricultural-products'),
    ARRAY['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
    true,
    true
  ),
  (
    'Kenyan Avocados (Fresh)',
    'kenyan-avocados-fresh',
    'Creamy, buttery avocados grown in the fertile soils of Kenya. Perfect for salads, toast, or guacamole.',
    8.99,
    10.99,
    'AVO-KEN-001',
    200,
    (SELECT id FROM categories WHERE slug = 'fresh-produce'),
    ARRAY['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800'],
    true,
    true
  ),
  (
    'Ghanaian Cocoa Beans',
    'ghanaian-cocoa-beans',
    'Premium-grade cocoa beans from Ghana, known for their rich chocolate flavor. Ideal for making artisanal chocolate.',
    18.50,
    22.00,
    'COC-GHA-001',
    100,
    (SELECT id FROM categories WHERE slug = 'agricultural-products'),
    ARRAY['https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800'],
    true,
    false
  ),
  (
    'Nigerian Jasmine Rice',
    'nigerian-jasmine-rice',
    'Premium long-grain jasmine rice with a natural floral aroma. Grown in the fertile regions of Nigeria.',
    15.99,
    18.99,
    'RIC-NIG-001',
    300,
    (SELECT id FROM categories WHERE slug = 'grains-cereals'),
    ARRAY['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800'],
    true,
    false
  ),
  (
    'South African Rooibos Tea',
    'south-african-rooibos-tea',
    'Naturally caffeine-free rooibos tea from South Africa. Rich in antioxidants with a smooth, earthy flavor.',
    12.99,
    15.99,
    'TEA-RSA-001',
    250,
    (SELECT id FROM categories WHERE slug = 'agricultural-products'),
    ARRAY['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'],
    true,
    true
  ),
  (
    'Tanzanian Mangoes',
    'tanzanian-mangoes',
    'Sweet, juicy mangoes from Tanzania. Bursting with tropical flavor and perfect for desserts or snacking.',
    6.99,
    8.99,
    'MAN-TAN-001',
    180,
    (SELECT id FROM categories WHERE slug = 'fresh-produce'),
    ARRAY['https://images.unsplash.com/photo-1553279768-865429fa0078?w=800'],
    true,
    false
  ),

  -- Arts & Crafts
  (
    'Hand-carved Mahogany Mask',
    'hand-carved-mahogany-mask',
    'Traditional African mask hand-carved from premium mahogany wood. Features intricate tribal patterns and symbolism.',
    89.99,
    120.00,
    'MSK-KEN-001',
    25,
    (SELECT id FROM categories WHERE slug = 'arts-crafts'),
    ARRAY['https://images.unsplash.com/photo-1595776613215-0d7f8a78d243?w=800'],
    true,
    true
  ),
  (
    'Beaded Maasai Necklace',
    'beaded-maasai-necklace',
    'Authentic Maasai necklace handcrafted by local artisans. Colorful beadwork representing traditional designs.',
    45.99,
    59.99,
    'NCL-MAS-001',
    40,
    (SELECT id FROM categories WHERE slug = 'jewelry-accessories'),
    ARRAY['https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=800'],
    true,
    true
  ),
  (
    'Kente Cloth Fabric',
    'kente-cloth-fabric',
    'Traditional Ghanaian Kente cloth woven by master artisans. Vibrant colors with meaningful geometric patterns.',
    120.00,
    150.00,
    'KNT-GHA-001',
    30,
    (SELECT id FROM categories WHERE slug = 'handmade-textiles'),
    ARRAY['https://images.unsplash.com/photo-1605218427368-35e4567e2774?w=800'],
    true,
    true
  ),
  (
    'Bronze Sculpture - African Family',
    'bronze-sculpture-african-family',
    'Beautiful bronze sculpture depicting an African family. Hand-cast using traditional techniques.',
    250.00,
    320.00,
    'SCU-BRZ-001',
    15,
    (SELECT id FROM categories WHERE slug = 'sculptures-art'),
    ARRAY['https://images.unsplash.com/photo-1550088877-54e844d47f4e?w=800'],
    true,
    false
  ),
  (
    'Woven Grass Basket Set',
    'woven-grass-basket-set',
    'Set of 3 handwoven grass baskets from Uganda. Perfect for storage or decorative purposes.',
    35.99,
    45.99,
    'BSK-UGA-001',
    50,
    (SELECT id FROM categories WHERE slug = 'arts-crafts'),
    ARRAY['https://images.unsplash.com/photo-1584551666614-3c2773a0b4c4?w=800'],
    true,
    false
  ),

  -- Tours & Experiences
  (
    'Serengeti Safari Package (5 Days)',
    'serengeti-safari-package-5-days',
    'Experience the Great Migration with our 5-day Serengeti safari. Includes accommodation, meals, and guided game drives.',
    2499.00,
    2999.00,
    'TOU-SER-001',
    20,
    (SELECT id FROM categories WHERE slug = 'safari-tours'),
    ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'],
    true,
    true
  ),
  (
    'Cape Town Cultural Tour',
    'cape-town-cultural-tour',
    'Full-day cultural tour of Cape Town. Visit museums, historical sites, and experience local traditions.',
    149.00,
    179.00,
    'TOU-CPT-001',
    50,
    (SELECT id FROM categories WHERE slug = 'cultural-tours'),
    ARRAY['https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800'],
    true,
    true
  ),
  (
    'Mount Kilimanjaro Trek',
    'mount-kilimanjaro-trek',
    '7-day trek to the summit of Mount Kilimanjaro. Professional guides, equipment, and support included.',
    1899.00,
    2299.00,
    'TOU-KIL-001',
    15,
    (SELECT id FROM categories WHERE slug = 'adventure-travel'),
    ARRAY['https://images.unsplash.com/photo-1575687755665-35c1c9b8d7dc?w=800'],
    true,
    true
  ),
  (
    'Victoria Falls Adventure',
    'victoria-falls-adventure',
    '3-day adventure package to Victoria Falls. Includes guided tours, sunset cruise, and adrenaline activities.',
    899.00,
    1099.00,
    'TOU-VIC-001',
    30,
    (SELECT id FROM categories WHERE slug = 'adventure-travel'),
    ARRAY['https://images.unsplash.com/photo-1619516969622-4e6c2858a574?w=800'],
    true,
    false
  ),
  (
    'Zanzibar Beach Escape',
    'zanzibar-beach-escape',
    '5-day beach getaway to Zanzibar. Includes luxury accommodation, snorkeling, and spice farm tour.',
    1299.00,
    1599.00,
    'TOU-ZAN-001',
    25,
    (SELECT id FROM categories WHERE slug = 'tours-experiences'),
    ARRAY['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800'],
    true,
    false
  ),

  -- Shipping & Logistics
  (
    'International Freight - West Africa',
    'international-freight-west-africa',
    'Reliable international freight services to West Africa. FCL and LCL options available.',
    1500.00,
    1800.00,
    'SHP-WAF-001',
    999,
    (SELECT id FROM categories WHERE slug = 'freight-services'),
    ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'],
    true,
    false
  ),
  (
    'Last-Mile Delivery - East Africa',
    'last-mile-delivery-east-africa',
    'Efficient last-mile delivery services across East Africa. Real-time tracking included.',
    25.00,
    30.00,
    'SHP-EAF-001',
    999,
    (SELECT id FROM categories WHERE slug = 'local-delivery'),
    ARRAY['https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800'],
    true,
    false
  ),
  (
    'Cold Chain Logistics',
    'cold-chain-logistics',
    'Temperature-controlled logistics for perishable goods. Maintains optimal conditions throughout transit.',
    2000.00,
    2400.00,
    'SHP-CCL-001',
    999,
    (SELECT id FROM categories WHERE slug = 'freight-services'),
    ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'],
    true,
    false
  ),
  (
    'Customs Clearance Service',
    'customs-clearance-service',
    'Full customs clearance service for imports and exports. Expert handling of documentation and regulations.',
    300.00,
    400.00,
    'SHP-CUS-001',
    999,
    (SELECT id FROM categories WHERE slug = 'shipping-logistics'),
    ARRAY['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'],
    true,
    false
  );

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check categories count
SELECT 'Categories count:' as info, COUNT(*) as count FROM categories;

-- Check products count
SELECT 'Products count:' as info, COUNT(*) as count FROM products;

-- Show sample categories
SELECT 'Sample categories:' as info, name, slug FROM categories LIMIT 5;

-- Show sample products
SELECT 'Sample products:' as info, name, slug, price FROM products LIMIT 5;
