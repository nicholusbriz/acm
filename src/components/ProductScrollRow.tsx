'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard, { type Product } from './ProductCard';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

interface ProductScrollRowProps {
  title: string;
  products: Product[];
  onViewAll?: () => void;
}

const arrowButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  flexShrink: 0,
  borderRadius: '50%',
  border: `1px solid ${colors.sand}`,
  background: colors.ivory,
  color: colors.emerald,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
} as const;

export default function ProductScrollRow({ title, products, onViewAll }: ProductScrollRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows, products.length]);

  function scrollRow(direction: 'left' | 'right') {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: 'smooth',
    });
  }

  return (
    <section style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: colors.emerald,
          fontFamily: 'var(--font-poppins), sans-serif',
          margin: 0,
        }}>
          {title}
        </h3>

        {products.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              type="button"
              aria-label={`Scroll ${title} left`}
              onClick={() => scrollRow('left')}
              disabled={!canScrollLeft}
              style={{
                ...arrowButtonStyle,
                opacity: canScrollLeft ? 1 : 0.35,
                cursor: canScrollLeft ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.background = colors.emerald;
                  e.currentTarget.style.color = colors.ivory;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.ivory;
                e.currentTarget.style.color = colors.emerald;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`Scroll ${title} right`}
              onClick={() => scrollRow('right')}
              disabled={!canScrollRight}
              style={{
                ...arrowButtonStyle,
                opacity: canScrollRight ? 1 : 0.35,
                cursor: canScrollRight ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.background = colors.emerald;
                  e.currentTarget.style.color = colors.ivory;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.ivory;
                e.currentTarget.style.color = colors.emerald;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: `1px solid ${colors.emerald}`,
                  background: colors.ivory,
                  color: colors.emerald,
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter), sans-serif',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.gold;
                  e.currentTarget.style.color = colors.black;
                  e.currentTarget.style.borderColor = colors.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.ivory;
                  e.currentTarget.style.color = colors.emerald;
                  e.currentTarget.style.borderColor = colors.emerald;
                }}
              >
                Browse
              </button>
            )}
          </div>
        )}
      </div>

      {products.length > 0 ? (
        <div
          ref={rowRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollBehavior: 'smooth',
          }}
        >
          {products.map((product) => (
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
  );
}
