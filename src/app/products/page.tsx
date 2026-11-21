'use client';

import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/components/ProductCard';
import styles from './ProductsPage.module.css';

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
      <div className="page-pad">
        <p className={styles.loading}>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="page-pad">
      <h1 className={styles.title}>All Products</h1>
      <p className={styles.subtitle}>Browse our complete collection</p>

      <ProductGrid products={products} />
    </div>
  );
}
