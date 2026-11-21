'use client';

import { useEffect, useState } from 'react';
import ProductCard, { type Product } from './ProductCard';
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
}

interface ProductRow {
  slug: string;
  name: string;
  products: Product[];
}

export default function Products({ selectedCategory = null }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div style={{ padding: '12px 32px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading products...
        </p>
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category?.slug === selectedCategory)
    : products;

  if (selectedCategory) {
    return (
      <div style={{ padding: '12px 32px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
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
              No products found in this category.
            </p>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '10px',
          }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 32px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
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
        <section key={row.slug} style={{ marginBottom: '20px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: colors.emerald,
            fontFamily: 'var(--font-poppins), sans-serif',
            marginBottom: '12px',
          }}>
            {row.name}
          </h3>

          {row.products.length > 0 ? (
            <div
              className="hide-scrollbar"
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '10px',
                overflowX: 'auto',
                paddingBottom: '8px',
              }}
            >
              {row.products.map((product) => (
                <div
                  key={product.id}
                  style={{ flex: '0 0 180px', display: 'flex' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{
              fontSize: '14px',
              color: colors.black,
              fontFamily: 'var(--font-inter), sans-serif',
              opacity: 0.7,
            }}>
              No products in this category yet.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
