'use client';

import { useEffect, useState } from 'react';
import ProductCard, { type Product } from './ProductCard';
import ProductScrollRow from './ProductScrollRow';
import { getSearchQuery } from '@/lib/search';
import type { Category } from './Categories';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

interface ProductsProps {
  selectedCategory?: string | null;
  onSelectCategory?: (categorySlug: string | null) => void;
}

interface ProductRow {
  slug: string;
  name: string;
  products: Product[];
}

export default function Products({ selectedCategory = null, onSelectCategory }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateSearch = () => setSearchQuery(getSearchQuery());
    updateSearch();
    window.addEventListener('search-updated', updateSearch);
    window.addEventListener('storage', updateSearch);
    return () => {
      window.removeEventListener('search-updated', updateSearch);
      window.removeEventListener('storage', updateSearch);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        const [productsData, categoriesData] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ]);
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const groupedProducts = new Map<string, Product[]>();
  products.forEach((product) => {
    const key = product.category?.slug ?? 'uncategorized';
    const existing = groupedProducts.get(key) ?? [];
    existing.push(product);
    groupedProducts.set(key, existing);
  });

  const categoryRows: ProductRow[] = categories.length > 0
    ? categories.map((category) => ({
        slug: category.slug,
        name: category.name,
        products: groupedProducts.get(category.slug) ?? [],
      }))
    : Array.from(
        products.reduce((map, product) => {
          const slug = product.category?.slug ?? 'uncategorized';
          const name = product.category?.name ?? 'Other';
          if (!map.has(slug)) map.set(slug, { slug, name, products: [] });
          map.get(slug)!.products.push(product);
          return map;
        }, new Map<string, ProductRow>()).values()
      );

  if (groupedProducts.has('uncategorized')) {
    const hasUncategorizedRow = categoryRows.some((row) => row.slug === 'uncategorized');
    if (!hasUncategorizedRow) {
      categoryRows.push({
        slug: 'uncategorized',
        name: 'Other',
        products: groupedProducts.get('uncategorized') ?? [],
      });
    }
  }

  const visibleRows = selectedCategory
    ? categoryRows.filter((row) => row.slug === selectedCategory)
    : categoryRows;

  if (loading) {
    return (
      <div style={{ padding: '12px 16px', width: '100%' }}>
        <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading products...
        </p>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const queryFiltered = isSearching
    ? products.filter((product) =>
        [product.name, product.description, product.category?.name].some((field) =>
          field?.toLowerCase().includes(normalizedQuery)
        )
      )
    : products;

  const filteredProducts = selectedCategory
    ? queryFiltered.filter((product) => product.category?.slug === selectedCategory)
    : queryFiltered;

  if (selectedCategory || isSearching) {
    return (
      <div style={{ padding: '12px 16px', width: '100%' }}>
        {filteredProducts.length === 0 && (
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
              {isSearching ? `No products found for "${searchQuery.trim()}".` : 'No products found in this category.'}
            </p>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="productGrid productGrid-2col">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 16px', width: '100%' }}>
      {visibleRows.length === 0 && (
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

      {visibleRows.map((row) => (
        <ProductScrollRow
          key={row.slug}
          title={row.name}
          products={row.products}
          onViewAll={onSelectCategory ? () => onSelectCategory(row.slug) : undefined}
        />
      ))}
    </div>
  );
}
