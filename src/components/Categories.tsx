'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section style={{ padding: '40px 32px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
            Loading categories...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '40px 32px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: 700,
        color: colors.emerald,
        fontFamily: 'var(--font-poppins), sans-serif',
        marginBottom: '24px',
      }}>
        Categories
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <Link
          href="/products"
          style={{
            textDecoration: 'none',
          }}
        >
          <span style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: colors.emerald,
            color: colors.ivory,
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-inter), sans-serif',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.gold;
              e.currentTarget.style.color = colors.black;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.emerald;
              e.currentTarget.style.color = colors.ivory;
            }}
          >
            All Products
          </span>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <span style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: colors.ivory,
              color: colors.emerald,
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'var(--font-inter), sans-serif',
              border: `1px solid ${colors.sand}`,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.emerald;
                e.currentTarget.style.color = colors.ivory;
                e.currentTarget.style.borderColor = colors.emerald;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.ivory;
                e.currentTarget.style.color = colors.emerald;
                e.currentTarget.style.borderColor = colors.sand;
              }}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
