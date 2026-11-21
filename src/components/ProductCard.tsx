'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addToCart } from '@/lib/cart';
import { colors } from '@/lib/colors';
import styles from './ProductCard.module.css';

export interface Product {
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
  stock_quantity?: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.imageWrap}>
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={styles.image}
            />
          ) : (
            <>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.sand} strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className={styles.noImageText}>No Image</span>
            </>
          )}
        </div>
      </Link>

      <div className={styles.infoCol}>
        <div className={styles.info}>
          {product.category && (
            <p className={styles.category}>{product.category.name}</p>
          )}
          <h3 className={styles.name}>{product.name}</h3>
          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.compare_at_price && (
              <span className={styles.comparePrice}>${product.compare_at_price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.stepper}>
            <button
              type="button"
              aria-label="Decrease quantity"
              className={styles.stepperButton}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className={styles.stepperValue}>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={styles.stepperButton}
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={styles.addButton}
            onClick={() => {
              addToCart(product, quantity);
              setQuantity(1);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
