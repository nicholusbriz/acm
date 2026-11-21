'use client';

import { useEffect, useState } from 'react';
import ProductCard, { type Product } from './ProductCard';
import ProductScrollRow from './ProductScrollRow';
import { getSearchQuery } from '@/lib/search';
import { getProductFilters, type ProductFilters } from '@/lib/filters';
import type { Category } from './Categories';
import styles from './Products.module.css';

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
  const [filters, setFilters] = useState<ProductFilters>(getProductFilters());

  useEffect(() => {
    const updateFilters = () => setFilters(getProductFilters());
    updateFilters();
    window.addEventListener('filters-updated', updateFilters);
    window.addEventListener('storage', updateFilters);
    return () => {
      window.removeEventListener('filters-updated', updateFilters);
      window.removeEventListener('storage', updateFilters);
    };
  }, []);

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

  const filteredCatalog = products
    .filter((product) => {
      if (filters.inStockOnly && (product.stock_quantity ?? 0) <= 0) return false;
      if (filters.minPrice !== null && product.price < filters.minPrice) return false;
      if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const groupedProducts = new Map<string, Product[]>();
  filteredCatalog.forEach((product) => {
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
        filteredCatalog.reduce((map, product) => {
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
      <div className="section-pad">
        <p className={styles.loading}>Loading products...</p>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const queryFiltered = isSearching
    ? filteredCatalog.filter((product) =>
        [product.name, product.description, product.category?.name].some((field) =>
          field?.toLowerCase().includes(normalizedQuery)
        )
      )
    : products;

  const filteredProducts = selectedCategory
    ? queryFiltered.filter((product) => product.category?.slug === selectedCategory)
    : queryFiltered;

  const otherCategoryProducts = selectedCategory
    ? filteredCatalog.filter((product) => product.category?.slug !== selectedCategory)
    : [];

  if (selectedCategory || isSearching) {
    return (
      <div className="section-pad">
        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <p>
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

        {selectedCategory && otherCategoryProducts.length > 0 && (
          <div className={styles.otherRow}>
            <ProductScrollRow title="Discover from other categories" products={otherCategoryProducts} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="section-pad">
      {visibleRows.length === 0 && (
        <div className={styles.emptyState}>
          <p>No products found in this category.</p>
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
