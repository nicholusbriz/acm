'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallScreen(window.innerWidth < 400);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logoContainer}>
            <Image
              src="/Africa-logo.jpg"
              alt="Africa Conglomerate Logo"
              width={60}
              height={60}
              className={styles.logo}
            />
            <div className={styles.brandName}>
              <span className={styles.brandMain}>Africa</span>
              <span className={styles.brandSub}>Conglomerate</span>
            </div>
          </Link>

          {!isMobile && (
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <div className={styles.searchLabelContainer}>
                  <svg className={styles.searchIcon} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <span className={styles.searchLabel}>Search</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.rightSection}>

            {/* User Account */}
            <div ref={accountRef} style={{ position: 'relative' }}>
              <button
                className={styles.accountButton}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                aria-label="Account"
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-inter), sans-serif' }}>
                  Account
                </span>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Account Dropdown */}
              <div className={`${styles.accountDropdown} ${isAccountOpen ? styles.open : ''}`}>
                <Link
                  href="/login"
                  className={styles.dropdownItem}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={styles.dropdownItem}
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Cart */}
            <button className={styles.iconButton} aria-label="Cart">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className={styles.cartCount}>0</span>
            </button>
          </div>
        </div>
      </header>

      {isMobile && (
        <div className={styles.mobileSearchContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <div className={styles.searchLabelContainer}>
              <svg className={styles.searchIcon} width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className={styles.searchLabel}>Search</span>
            </div>
          </div>
          <button
            className={styles.iconButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      )}

      {isMobile && (
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <p style={{ fontSize: '14px', color: '#171A18', fontFamily: 'var(--font-inter), sans-serif' }}>
            Menu items will go here
          </p>
        </div>
      )}
    </>
  );
}
