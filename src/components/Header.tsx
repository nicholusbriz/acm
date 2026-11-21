'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

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

  const headerStyle = {
    background: colors.ivory,
    position: isMobile ? 'relative' as const : 'sticky' as const,
    top: 0,
    zIndex: 1000,
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isSmallScreen ? '0 12px' : isMobile ? '0 16px' : '0 32px',
    height: isSmallScreen ? '56px' : isMobile ? '64px' : '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: isSmallScreen ? '8px' : isMobile ? '16px' : '32px',
  };

  const searchContainerStyle = {
    flex: 1,
    maxWidth: isMobile ? 'none' : '600px',
    margin: isMobile ? '0' : '0 32px',
  };

  const searchInputStyle = {
    width: '100%',
    padding: isSmallScreen ? '10px 100px 10px 12px' : isMobile ? '12px 110px 12px 14px' : '14px 120px 14px 16px',
    border: `1px solid ${colors.sand}`,
    borderRadius: '24px',
    fontSize: isSmallScreen ? '13px' : isMobile ? '14px' : '15px',
    fontFamily: 'var(--font-inter), sans-serif',
    background: '#F5F0E8',
    color: colors.black,
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const searchLabelContainerStyle = {
    position: 'absolute' as const,
    right: isSmallScreen ? '12px' : isMobile ? '14px' : '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: colors.emerald,
    padding: isSmallScreen ? '6px 10px' : isMobile ? '7px 12px' : '8px 14px',
    borderRadius: '20px',
    pointerEvents: 'none' as const,
  };

  const searchLabelStyle = {
    color: colors.ivory,
    fontSize: isSmallScreen ? '11px' : isMobile ? '12px' : '13px',
    fontWeight: 600,
    fontFamily: 'var(--font-inter), sans-serif',
  };

  const searchIconInLabelStyle = {
    color: colors.gold,
  };

  const searchWrapperStyle = {
    position: 'relative' as const,
    width: '100%',
  };

  const mobileSearchBarStyle = {
    padding: isSmallScreen ? '4px 12px' : '6px 16px',
    background: colors.ivory,
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    gap: '8px',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isSmallScreen ? '8px' : isMobile ? '12px' : '14px',
    textDecoration: 'none' as const,
  };

  const logoStyle = {
    borderRadius: '12px',
    objectFit: 'contain' as const,
    width: isSmallScreen ? '35px' : isMobile ? '45px' : '60px',
    height: isSmallScreen ? '35px' : isMobile ? '45px' : '60px',
  };

  const brandNameStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    lineHeight: 1,
  };

  const brandMainStyle = {
    fontSize: isSmallScreen ? '14px' : isMobile ? '18px' : '24px',
    fontWeight: 700,
    color: colors.emerald,
    letterSpacing: '-0.3px',
    fontFamily: 'var(--font-poppins), sans-serif',
    lineHeight: 1.1,
  };

  const brandSubStyle = {
    fontSize: isSmallScreen ? '8px' : isMobile ? '10px' : '12px',
    fontWeight: 500,
    color: colors.gold,
    letterSpacing: '0.4px',
    textTransform: 'uppercase' as const,
    fontFamily: 'var(--font-poppins), sans-serif',
    lineHeight: 1.2,
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isSmallScreen ? '4px' : isMobile ? '8px' : '16px',
    justifyContent: 'flex-end',
  };

  const iconButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isSmallScreen ? '32px' : isMobile ? '38px' : '44px',
    height: isSmallScreen ? '32px' : isMobile ? '38px' : '44px',
    border: 'none',
    borderRadius: '50%',
    background: 'transparent',
    color: colors.black,
    cursor: 'pointer',
    position: 'relative' as const,
    transition: 'all 0.2s ease',
  };

  const accountButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isSmallScreen ? '4px' : '8px',
    padding: isSmallScreen ? '6px 8px' : isMobile ? '8px 12px' : '10px 16px',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    color: colors.black,
    cursor: 'pointer',
    position: 'relative' as const,
    transition: 'all 0.2s ease',
  };

  const accountDropdownStyle = {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '8px',
    background: colors.ivory,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '8px 0',
    minWidth: '160px',
    display: isAccountOpen ? 'block' : 'none',
    zIndex: 1001,
  };

  const dropdownItemStyle = {
    padding: '12px 16px',
    fontSize: '14px',
    color: colors.black,
    textDecoration: 'none' as const,
    display: 'block',
    fontFamily: 'var(--font-inter), sans-serif',
    transition: 'background 0.2s ease',
    cursor: 'pointer',
  };

  const dropdownItemHoverStyle = {
    ...dropdownItemStyle,
    background: colors.sand,
  };

  const cartCountStyle = {
    position: 'absolute' as const,
    top: '-4px',
    right: '-4px',
    background: colors.gold,
    color: colors.black,
    fontSize: isSmallScreen ? '9px' : isMobile ? '10px' : '12px',
    fontWeight: 700,
    width: isSmallScreen ? '16px' : isMobile ? '18px' : '20px',
    height: isSmallScreen ? '16px' : isMobile ? '18px' : '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${colors.ivory}`,
  };

  const mobileMenuStyle = {
    position: 'absolute' as const,
    top: isMobile ? '128px' : '64px',
    left: 0,
    right: 0,
    background: colors.ivory,
    padding: '20px 16px',
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column' as const,
    gap: '16px',
    borderBottom: `1px solid ${colors.sand}`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo and Brand Name */}
          <Link href="/" style={logoContainerStyle}>
            <Image
              src="/Africa-logo.jpg"
              alt="Africa Conglomerate Logo"
              width={isMobile ? 45 : 60}
              height={isMobile ? 45 : 60}
              style={logoStyle}
            />
            <div style={brandNameStyle}>
              <span style={brandMainStyle}>Africa</span>
              <span style={brandSubStyle}>Conglomerate</span>
            </div>
          </Link>

          {/* Search Input - Desktop only (in middle) */}
          {!isMobile && (
            <div style={searchContainerStyle}>
              <div style={searchWrapperStyle}>
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={searchInputStyle}
                />
                <div style={searchLabelContainerStyle}>
                  <svg style={searchIconInLabelStyle} width={isMobile ? 14 : 16} height={isMobile ? 14 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <span style={searchLabelStyle}>Search</span>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Icons */}
          <div style={rightSectionStyle}>

            {/* User Account */}
            <div ref={accountRef} style={{ position: 'relative' as const }}>
              <button
                style={accountButtonStyle}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                aria-label="Account"
              >
                <svg width={isSmallScreen ? 14 : isMobile ? 18 : 20} height={isSmallScreen ? 14 : isMobile ? 18 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{ fontSize: isSmallScreen ? '10px' : isMobile ? '12px' : '14px', fontWeight: 500, fontFamily: 'var(--font-inter), sans-serif' }}>
                  Account
                </span>
                <svg width={isSmallScreen ? 12 : 16} height={isSmallScreen ? 12 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Account Dropdown */}
              <div style={accountDropdownStyle}>
                <Link
                  href="/login"
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.sand}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.sand}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Cart */}
            <button style={iconButtonStyle} aria-label="Cart">
              <svg width={isSmallScreen ? 16 : isMobile ? 20 : 24} height={isSmallScreen ? 16 : isMobile ? 20 : 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span style={cartCountStyle}>0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Below header */}
      <div style={mobileSearchBarStyle}>
        <div style={searchWrapperStyle}>
          <input
            type="text"
            placeholder="Search products, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
          <div style={searchLabelContainerStyle}>
            <svg style={searchIconInLabelStyle} width={isSmallScreen ? 12 : 14} height={isSmallScreen ? 12 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span style={searchLabelStyle}>Search</span>
          </div>
        </div>
        <button
          style={iconButtonStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <svg width={isSmallScreen ? 20 : 24} height={isSmallScreen ? 20 : 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* Mobile Menu */}
      {isMobile && (
        <div style={mobileMenuStyle}>
          <p style={{ fontSize: '14px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
            Menu items will go here
          </p>
        </div>
      )}
    </>
  );
}
