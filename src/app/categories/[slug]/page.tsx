'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  category?: {
    name: string;
    slug: string;
  };
  images: string[];
}

export default function CategoryPage() {
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
      <div style={{ padding: '40px 32px', maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 32px', maxWidth: '1400px', margin: '0 auto' }}>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: colors.ivory,
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${colors.sand}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '200px',
                background: `${colors.emerald}08`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}>
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={colors.sand} strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <span style={{
                      fontSize: '12px',
                      color: colors.sand,
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}>
                      No Image
                    </span>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '16px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.emerald,
                  fontFamily: 'var(--font-poppins), sans-serif',
                  marginBottom: '8px',
                }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: colors.emerald,
                    fontFamily: 'var(--font-inter), sans-serif',
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compare_at_price && (
                    <span style={{
                      fontSize: '14px',
                      color: colors.sand,
                      fontFamily: 'var(--font-inter), sans-serif',
                      textDecoration: 'line-through',
                    }}>
                      ${product.compare_at_price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

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
