'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/components/ProductCard';
import styles from './CategoryPage.module.css';

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
      <div className="page-pad">
        <p className={styles.loading}>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="page-pad">
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <h1 className={styles.title}>{categoryName || 'Category'}</h1>
      <p className={styles.subtitle}>
        {products.length} product{products.length !== 1 ? 's' : ''} available
      </p>

      <ProductGrid products={products} />

      {products.length === 0 && (
        <div className={styles.emptyState}>
          <p>No products found in this category.</p>
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
