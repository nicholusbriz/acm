'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard, { type Product } from './ProductCard';
import styles from './ProductScrollRow.module.css';

interface ProductScrollRowProps {
  title: string;
  products: Product[];
  onViewAll?: () => void;
}

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
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {products.length > 0 && (
          <div className={styles.controls}>
            <button
              type="button"
              aria-label={`Scroll ${title} left`}
              onClick={() => scrollRow('left')}
              disabled={!canScrollLeft}
              className={styles.arrow}
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
              className={styles.arrow}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            {onViewAll && (
              <button type="button" onClick={onViewAll} className={styles.browse}>
                Browse
              </button>
            )}
          </div>
        )}
      </div>

      {products.length > 0 ? (
        <div ref={rowRef} className={`hide-scrollbar ${styles.row}`}>
          {products.map((product) => (
            <div key={product.id} className={styles.cardWrap}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No products in this category yet.</p>
      )}
    </section>
  );
}
