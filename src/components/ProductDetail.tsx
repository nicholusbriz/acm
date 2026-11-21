'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductGrid from './ProductGrid';
import type { Product } from './ProductCard';
import { colors } from '@/lib/colors';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
  product: Product & {
    sku?: string;
    stock_quantity?: number;
  };
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = product.images ?? [];
  const selectedImage = images[selectedImageIndex] ?? images[0];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountAmount = hasDiscount ? product.compare_at_price! - product.price : 0;

  return (
    <div className="page-pad">
      <Link href="/" className={styles.backLink}>
        ← Back to Products
      </Link>

      <div className={styles.main}>
        <div className={styles.gallery}>
          <div className={styles.imageWrap}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className={styles.image}
              />
            ) : (
              <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke={colors.sand} strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`${styles.thumb} ${index === selectedImageIndex ? styles.thumbActive : ''}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={styles.thumbImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          {product.category && (
            <p className={styles.category}>{product.category.name}</p>
          )}
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.compare_at_price && (
              <span className={styles.comparePrice}>${product.compare_at_price.toFixed(2)}</span>
            )}
            {hasDiscount && (
              <span className={styles.discount}>Save ${discountAmount.toFixed(2)}</span>
            )}
          </div>

          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}

          <div className={styles.meta}>
            {product.sku && (
              <p className={styles.metaText}>SKU: {product.sku}</p>
            )}
            {typeof product.stock_quantity === 'number' && (
              <p className={`${styles.metaText} ${product.stock_quantity > 0 ? styles.inStock : styles.outOfStock}`}>
                {product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}
              </p>
            )}
          </div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>More Products</h2>
      <p className={styles.sectionSubtitle}>Continue browsing our collection</p>

      <ProductGrid products={relatedProducts} columns={2} />

      {relatedProducts.length === 0 && (
        <div className={styles.emptyState}>
          <p>No other products available right now.</p>
        </div>
      )}

      <div className={styles.backWrap}>
        <Link href="/" className={styles.backButton}>
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
