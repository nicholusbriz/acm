'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromoBanner.module.css';

interface PromoProduct {
  id: string;
  name: string;
  slug?: string;
  price: number;
  images?: string[];
  category?: { name: string };
}

export default function PromoBanner() {
  const [products, setProducts] = useState<PromoProduct[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const candidates = (Array.isArray(data) ? data : []).filter(
          (p: PromoProduct) => p.images && p.images.length > 0 && p.images[0]
        );

        const valid = await Promise.all(
          candidates.map(
            (p: PromoProduct) =>
              new Promise<PromoProduct | null>((resolve) => {
                const img = new window.Image();
                img.onload = () => resolve(p);
                img.onerror = () => resolve(null);
                img.src = p.images![0];
              })
          )
        );
        setProducts(valid.filter((p): p is PromoProduct => p !== null));
      } catch {
        // banner still renders without products
      }
    }
    fetchProducts();
  }, []);

  const slideCount = products.length;
  const current = products[index % slideCount] ?? products[0];
  const currentImage = current?.images?.[0];

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideCount]);

  function go(direction: number) {
    setIndex((i) => (i + direction + slideCount) % slideCount);
  }

  return (
    <section className={styles.banner}>
      <div className={styles.right}>
        {currentImage && (
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={currentImage}
              alt={current.name}
              className={styles.productImage}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </AnimatePresence>
        )}
      </div>

      <div className={styles.overlay} />

      <div className={styles.left}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className={styles.tag}>
            <span className={styles.tagText}>Black November</span>
            <span className={styles.stockBadge}>Ends Soon</span>
          </p>
          <h1 className={styles.headline}>
            <span className={styles.accentWord}>Buy Big.</span> Win Bigger.
          </h1>
          <p className={styles.subtext}>
            Top spender wins a 75&quot; Smart TV — plus free Africa-wide shipping on orders over $500
          </p>

          <p className={styles.note}>T&amp;C&apos;s apply: highest order value wins</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              className={styles.productPanel}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {current.category?.name && (
                <p className={styles.productCategory}>{current.category.name}</p>
              )}
              <p className={styles.productName}>{current.name}</p>
              <p className={styles.productPrice}>${current.price.toFixed(2)}</p>
              <Link href={`/products/${current.slug ?? ''}`} className={styles.dealLink}>
                View Deal →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous product"
            className={`${styles.navArrow} ${styles.navLeft}`}
            onClick={() => go(-1)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next product"
            className={`${styles.navArrow} ${styles.navRight}`}
            onClick={() => go(1)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
