'use client';

import styles from './FloatingCart.module.css';

export default function FloatingCart() {
  return (
    <button className={styles.floatingCart} aria-label="Cart">
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span className={styles.cartCount}>0</span>
    </button>
  );
}
