'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

export default function Hero() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const productImages = (Array.isArray(data) ? data : [])
          .flatMap((p: { images?: string[] }) => p.images ?? [])
          .filter(Boolean)
          .slice(0, 12);
        setImages(productImages);
      } catch {
        // hero still renders without the marquee
      }
    }
    fetchImages();
  }, []);

  const duplicatedImages = [...images, ...images];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '300px',
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${colors.emerald} 0%, #0d2b23 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
        padding: 0,
      }}
    >
      {duplicatedImages.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
          }}
        >
          <motion.div
            style={{ display: 'flex', gap: '16px', height: '100%', alignItems: 'center', padding: '0 8px' }}
            animate={{ x: ['-50%', '0%'] }}
            transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
          >
            {duplicatedImages.map((src, index) => (
              <motion.div
                key={index}
                style={{
                  position: 'relative',
                  aspectRatio: '3 / 4',
                  height: '78%',
                  flexShrink: 0,
                  rotate: `${index % 2 === 0 ? -2 : 4}deg`,
                }}
              >
                <img
                  src={src}
                  alt={`Featured product ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          background: 'linear-gradient(to bottom, rgba(13,43,35,0.55) 0%, rgba(13,43,35,0.25) 45%, rgba(13,43,35,0.55) 100%)',
          padding: '0 16px',
          textAlign: 'center',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(30px, 5.5vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-1px',
            color: colors.ivory,
            fontFamily: 'var(--font-poppins), sans-serif',
            lineHeight: 1.1,
            margin: 0,
            textShadow: '0 4px 24px rgba(0,0,0,0.45)',
          }}
        >
          Everything Africa Has to Offer
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        >
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              padding: '13px 34px',
              borderRadius: '999px',
              background: colors.gold,
              color: colors.black,
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'var(--font-inter), sans-serif',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(198,161,91,0.4)',
              transition: 'transform 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = colors.ivory;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = colors.gold;
            }}
          >
            Shop All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
