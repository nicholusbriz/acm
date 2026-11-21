'use client';

import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';

export default function TopBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
        Your Gateway to African Markets
      </div>
    </div>
  );
}
