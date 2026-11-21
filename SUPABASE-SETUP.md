# Supabase Database Setup Instructions

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** on the left sidebar
4. Click **"New bucket"**
5. Enter bucket name: `product-images`
6. Make it **Public** (check the "Public bucket" option)
7. Click **"Create bucket"**

## Step 2: Run SQL Setup

1. In Supabase Dashboard, go to **SQL Editor** (icon looks like `</>`)
2. Click **"New query"**
3. Copy the contents of `supabase-setup.sql` file
4. Paste it into the SQL Editor
5. Click **"Run"** to execute the SQL

This will create:
- ✅ `categories` table with sample data
- ✅ `products` table linked to categories
- ✅ Storage policies for the product-images bucket
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance

## Step 3: Verify Setup

Visit `/test-db` in your browser to confirm the connection is working.

## Database Schema

### Categories Table
```typescript
{
  id: UUID (primary key)
  name: string
  slug: string (unique)
  description: string (optional)
  image_url: string (optional)
  created_at: timestamp
  updated_at: timestamp
}
```

### Products Table
```typescript
{
  id: UUID (primary key)
  name: string
  slug: string (unique)
  description: string (optional)
  price: decimal
  compare_at_price: decimal (optional)
  sku: string (optional)
  stock_quantity: integer
  category_id: UUID (foreign key to categories)
  seller_id: UUID (for future user integration)
  images: string[] (array of image URLs)
  is_active: boolean
  is_featured: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

## Usage Examples

### Get all categories
```typescript
import { getCategories } from '@/lib/database';

const categories = await getCategories();
```

### Get all products
```typescript
import { getProducts } from '@/lib/database';

const products = await getProducts();
```

### Get products by category
```typescript
import { getProductsByCategory } from '@/lib/database';

const products = await getProductsByCategory('agricultural-products');
```

### Create a new product
```typescript
import { createProduct } from '@/lib/database';

const newProduct = await createProduct({
  name: 'Organic Coffee Beans',
  slug: 'organic-coffee-beans',
  description: 'Premium organic coffee from Ethiopia',
  price: 24.99,
  stock_quantity: 100,
  category_id: 'category-uuid-here',
  images: ['https://storage-url/image.jpg'],
  is_active: true,
  is_featured: false,
});
```

### Upload product images
```typescript
import { uploadProductImages } from '@/lib/storage';

const files = [file1, file2, file3];
const imageUrls = await uploadProductImages(files);
```

## Security Notes

- Row Level Security (RLS) is enabled
- **For Development**: Public access is enabled for all operations (no authentication required)
- **For Production**: You should update policies to require authentication
- Storage bucket is public for image access and uploads
- **Important**: Change these policies to `TO authenticated` before going to production

## Next Steps

1. Complete the database setup above
2. Create pages to display products and categories
3. Build product upload forms
4. Integrate with user authentication
