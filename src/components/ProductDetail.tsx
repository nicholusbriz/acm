'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductGrid from './ProductGrid';
import type { Product } from './ProductCard';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

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
    <div style={{ padding: '40px 16px', width: '100%' }}>
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

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        marginTop: '16px',
        marginBottom: '56px',
      }}>
        <div style={{ flex: '1 1 360px', maxWidth: '560px' }}>
          <div style={{
            width: '100%',
            height: '420px',
            background: colors.ivory,
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid ${colors.sand}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  style={{
                    width: '72px',
                    height: '72px',
                    padding: 0,
                    border: `2px solid ${index === selectedImageIndex ? colors.gold : colors.sand}`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: colors.ivory,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 360px' }}>
          {product.category && (
            <p style={{
              fontSize: '13px',
              color: colors.gold,
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              marginBottom: '8px',
            }}>
              {product.category.name}
            </p>
          )}
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            color: colors.emerald,
            fontFamily: 'var(--font-poppins), sans-serif',
            marginBottom: '16px',
          }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{
              fontSize: '28px',
              fontWeight: 700,
              color: colors.emerald,
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              ${product.price.toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span style={{
                fontSize: '18px',
                color: colors.sand,
                fontFamily: 'var(--font-inter), sans-serif',
                textDecoration: 'line-through',
              }}>
                ${product.compare_at_price.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: colors.black,
                background: colors.gold,
                borderRadius: '12px',
                padding: '4px 10px',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>
                Save ${discountAmount.toFixed(2)}
              </span>
            )}
          </div>

          {product.description && (
            <p style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: colors.black,
              fontFamily: 'var(--font-inter), sans-serif',
              marginBottom: '24px',
              opacity: 0.85,
            }}>
              {product.description}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {product.sku && (
              <p style={{ fontSize: '14px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
                SKU: {product.sku}
              </p>
            )}
            {typeof product.stock_quantity === 'number' && (
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color: product.stock_quantity > 0 ? colors.emerald : '#B42318',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>
                {product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}
              </p>
            )}
          </div>
        </div>
      </div>

      <h2 style={{
        fontSize: '28px',
        fontWeight: 700,
        color: colors.emerald,
        fontFamily: 'var(--font-poppins), sans-serif',
        marginBottom: '8px',
      }}>
        More Products
      </h2>
      <p style={{
        fontSize: '16px',
        color: colors.black,
        fontFamily: 'var(--font-inter), sans-serif',
        marginBottom: '32px',
        opacity: 0.8,
      }}>
        Continue browsing our collection
      </p>

      <ProductGrid products={relatedProducts} columns={2} />

      {relatedProducts.length === 0 && (
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
            No other products available right now.
          </p>
        </div>
      )}

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            borderRadius: '999px',
            border: `1px solid ${colors.emerald}`,
            background: colors.ivory,
            color: colors.emerald,
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-inter), sans-serif',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.emerald;
            e.currentTarget.style.color = colors.ivory;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.ivory;
            e.currentTarget.style.color = colors.emerald;
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
