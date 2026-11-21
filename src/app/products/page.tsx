'use client';

import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/components/ProductCard';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px 32px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 32px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 700,
        color: colors.emerald,
        fontFamily: 'var(--font-poppins), sans-serif',
        marginBottom: '8px',
      }}>
        All Products
      </h1>
      <p style={{
        fontSize: '16px',
        color: colors.black,
        fontFamily: 'var(--font-inter), sans-serif',
        marginBottom: '32px',
        opacity: 0.8,
      }}>
        Browse our complete collection
      </p>

      <ProductGrid products={products} />
    </div>
  );
}
