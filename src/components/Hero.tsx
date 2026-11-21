'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

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
    <section className={styles.hero}>
      {duplicatedImages.length > 0 && (
        <div className={styles.marquee}>
          <motion.div
            className={styles.marqueeTrack}
            animate={{ x: ['-50%', '0%'] }}
            transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
          >
            {duplicatedImages.map((src, index) => (
              <motion.div
                key={index}
                className={`${styles.marqueeItem} ${index % 2 === 0 ? styles.marqueeItemTiltA : styles.marqueeItemTiltB}`}
              >
                <img
                  src={src}
                  alt={`Featured product ${index + 1}`}
                  className={styles.marqueeImage}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div className={styles.overlay}>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.title}
        >
          Everything Africa Has to Offer
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        >
          <Link href="/products" className={styles.cta}>
            Shop All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
