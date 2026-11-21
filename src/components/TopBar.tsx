'use client';

import { useState, useEffect } from 'react';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

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

  const topBarStyle = {
    background: colors.emerald,
    padding: isSmallScreen ? '4px 8px' : isMobile ? '5px 12px' : '6px 32px',
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: isSmallScreen ? '6px' : isMobile ? '8px' : '20px',
    textAlign: 'center' as const,
    flexWrap: 'nowrap' as const,
    overflow: 'hidden' as const,
  };

  const titleStyle = {
    fontSize: isSmallScreen ? '10px' : isMobile ? '11px' : '18px',
    fontWeight: 700,
    color: colors.gold,
    fontFamily: 'var(--font-poppins), sans-serif',
    letterSpacing: '0.1px',
    whiteSpace: 'nowrap' as const,
  };

  const subtitleStyle = {
    fontSize: isSmallScreen ? '9px' : isMobile ? '10px' : '14px',
    fontWeight: 400,
    color: colors.ivory,
    fontFamily: 'var(--font-poppins), sans-serif',
    letterSpacing: '0.2px',
    whiteSpace: 'nowrap' as const,
    opacity: 0.85,
  };

  const dividerStyle = {
    width: '1px',
    height: isSmallScreen ? '10px' : isMobile ? '12px' : '20px',
    background: `${colors.gold}40`,
  };

  return (
    <div style={topBarStyle}>
      <div style={titleStyle}>
        Africa's Unified Marketplace
      </div>
      <div style={dividerStyle} />
      <div style={subtitleStyle}>
        Your Gateway to African Markets
      </div>
    </div>
  );
}
