'use client';

import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';

const phrases = [
  'Buy, Sell & Ship Across Africa',
  'Fresh from Farm to Door',
  'Trade Anything in Africa',
  'For Business & Shoppers',
];

export default function TopBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallScreen(window.innerWidth < 400);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={styles.topBar}>
      <div className={styles.title}>
        Africa's Unified Marketplace
      </div>
      <div className={styles.divider} />
      <div className={styles.subtitle}>
        <span className={styles.rotator}>
          <span
            className={styles.rotatorTrack}
            style={{ transform: `translateY(-${phraseIndex * 1.4}em)` }}
          >
            {phrases.map((phrase) => (
              <span key={phrase} className={styles.rotatorItem}>
                {phrase}
              </span>
            ))}
          </span>
        </span>
      </div>
      <div className={styles.divider} />
      <div className={styles.badges}>
        <span className={styles.badge}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
          Delivery
        </span>
        <span className={styles.badge}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Africa-wide
        </span>
      </div>
    </div>
  );
}
