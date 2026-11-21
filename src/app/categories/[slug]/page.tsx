'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/components/ProductCard';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

function CategoryPageContent() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        const data = await response.json();
        setProducts(data);

        if (data.length > 0 && data[0].category) {
          setCategoryName(data[0].category.name);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchProducts();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div style={{ padding: '40px 16px', width: '100%' }}>
        <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 16px', width: '100%' }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontSize: '14px',
          color: colors.gold,
          fontFamily: 'var(--font-inter), sans-serif',
          fontWeight: 600,
          marginBottom: '16px',
          display: 'inline-block',
          cursor: 'pointer',
        }}>
          ← Back to Home
        </span>
      </Link>

      <h1 style={{
        fontSize: '36px',
        fontWeight: 700,
        color: colors.emerald,
        fontFamily: 'var(--font-poppins), sans-serif',
        marginBottom: '8px',
        marginTop: '16px',
      }}>
        {categoryName || 'Category'}
      </h1>
      <p style={{
        fontSize: '16px',
        color: colors.black,
        fontFamily: 'var(--font-inter), sans-serif',
        marginBottom: '32px',
        opacity: 0.8,
      }}>
        {products.length} product{products.length !== 1 ? 's' : ''} available
      </p>

      <ProductGrid products={products} />

      {products.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: colors.ivory,
          borderRadius: '12px',
          border: `1px solid ${colors.sand}`,
        }}>
          <p style={{
            fontSize: '18px',
            color: colors.black,
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent />
    </Suspense>
  );
}
