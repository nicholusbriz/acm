'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const colors = {
  emerald: '#123C32',
  gold: '#C6A15B',
  ivory: '#FAF0E7',
  sand: '#D8C7A5',
  black: '#171A18',
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
}

const GAP = 6;
const SAFETY_MARGIN = 8;

const pillBaseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontFamily: 'var(--font-inter), sans-serif',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  border: '1px solid transparent',
  whiteSpace: 'nowrap',
  flexShrink: 0,
} as const;

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const isAllProductsActive = selectedCategory === null;
  const visibleCategories = categories.slice(0, visibleCount);
  const hiddenCategories = categories.slice(visibleCount);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const active = rowRef.current?.querySelector('[aria-pressed="true"]');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedCategory, visibleCount]);

  const measureVisibleCount = useCallback(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure || categories.length === 0) {
      setVisibleCount(0);
      return;
    }

    const children = Array.from(measure.children) as HTMLElement[];
    if (children.length < categories.length + 2) {
      setVisibleCount(0);
      return;
    }

    const allWidth = children[0].offsetWidth;
    const moreWidth = children[children.length - 1].offsetWidth;
    const categoryWidths = children.slice(1, -1).map((child) => child.offsetWidth);
    const availableWidth = row.clientWidth - SAFETY_MARGIN;

    const widthWithoutMore = allWidth + categoryWidths.reduce((sum, width) => sum + width, 0) + GAP * categories.length;
    if (widthWithoutMore <= availableWidth) {
      setVisibleCount(categories.length);
      return;
    }

    let best = 0;
    let usedCategoryWidth = 0;
    for (let count = 0; count <= categoryWidths.length; count++) {
      const width = allWidth + moreWidth + usedCategoryWidth + GAP * (count + 1);
      if (width <= availableWidth) {
        best = count;
        if (count < categoryWidths.length) {
          usedCategoryWidth += categoryWidths[count];
        }
      } else {
        break;
      }
    }
    setVisibleCount(best);
  }, [categories]);

  useEffect(() => {
    measureVisibleCount();
  }, [measureVisibleCount]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new ResizeObserver(() => measureVisibleCount());
    observer.observe(row);
    window.addEventListener('resize', measureVisibleCount);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureVisibleCount);
    };
  }, [measureVisibleCount]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function selectCategory(categorySlug: string | null) {
    onSelectCategory(categorySlug);
    setIsMoreOpen(false);
  }

  if (loading) {
    return (
      <section style={{ padding: '12px 16px', width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: colors.black, fontFamily: 'var(--font-inter), sans-serif' }}>
            Loading categories...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '12px 16px', width: '100%', position: 'relative' }}>
      <div ref={rowRef} style={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: `${GAP}px`,
        alignItems: 'center',
        position: 'relative',
      }}>
        <button
          type="button"
          aria-pressed={isAllProductsActive}
          onClick={() => selectCategory(null)}
          style={{
            ...pillBaseStyle,
            background: isAllProductsActive ? colors.gold : colors.emerald,
            color: isAllProductsActive ? colors.black : colors.ivory,
            borderColor: isAllProductsActive ? colors.gold : colors.emerald,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isAllProductsActive ? colors.emerald : colors.gold;
            e.currentTarget.style.color = isAllProductsActive ? colors.ivory : colors.black;
            e.currentTarget.style.borderColor = isAllProductsActive ? colors.emerald : colors.gold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isAllProductsActive ? colors.gold : colors.emerald;
            e.currentTarget.style.color = isAllProductsActive ? colors.black : colors.ivory;
            e.currentTarget.style.borderColor = isAllProductsActive ? colors.gold : colors.emerald;
          }}
        >
          All Products
        </button>

        {visibleCategories.map((category) => {
          const isActive = selectedCategory === category.slug;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectCategory(category.slug)}
              style={{
                ...pillBaseStyle,
                background: isActive ? colors.emerald : colors.sand,
                color: isActive ? colors.ivory : colors.black,
                borderColor: isActive ? colors.emerald : 'transparent',
                fontWeight: isActive ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (isActive) {
                  e.currentTarget.style.background = colors.gold;
                  e.currentTarget.style.color = colors.black;
                  e.currentTarget.style.borderColor = colors.gold;
                } else {
                  e.currentTarget.style.background = colors.emerald;
                  e.currentTarget.style.color = colors.ivory;
                  e.currentTarget.style.borderColor = colors.emerald;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isActive ? colors.emerald : colors.sand;
                e.currentTarget.style.color = isActive ? colors.ivory : colors.black;
                e.currentTarget.style.borderColor = isActive ? colors.emerald : 'transparent';
              }}
            >
              {category.name}
            </button>
          );
        })}

        {hiddenCategories.length > 0 && (
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={isMoreOpen}
              onClick={() => setIsMoreOpen((open) => !open)}
              style={{
                ...pillBaseStyle,
                background: isMoreOpen ? colors.emerald : colors.sand,
                color: isMoreOpen ? colors.ivory : colors.black,
                borderColor: isMoreOpen ? colors.emerald : 'transparent',
                gap: '4px',
              }}
              onMouseEnter={(e) => {
                if (!isMoreOpen) {
                  e.currentTarget.style.background = colors.emerald;
                  e.currentTarget.style.color = colors.ivory;
                  e.currentTarget.style.borderColor = colors.emerald;
                }
              }}
              onMouseLeave={(e) => {
                if (!isMoreOpen) {
                  e.currentTarget.style.background = colors.sand;
                  e.currentTarget.style.color = colors.black;
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              More
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isMoreOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isMoreOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: '180px',
                background: colors.ivory,
                border: `1px solid ${colors.sand}`,
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                padding: '8px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}>
                {hiddenCategories.map((category) => {
                  const isActive = selectedCategory === category.slug;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => selectCategory(category.slug)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid transparent',
                        background: isActive ? colors.emerald : 'transparent',
                        color: isActive ? colors.ivory : colors.black,
                        fontSize: '12px',
                        fontFamily: 'var(--font-inter), sans-serif',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = colors.sand;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isActive ? colors.emerald : 'transparent';
                      }}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: `${GAP}px`,
          alignItems: 'center',
        }}
      >
        <button type="button" tabIndex={-1} style={{ ...pillBaseStyle, background: colors.emerald, color: colors.ivory }}>
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            tabIndex={-1}
            style={{ ...pillBaseStyle, background: colors.ivory, color: colors.emerald, fontWeight: 600 }}
          >
            {category.name}
          </button>
        ))}
        <button
          type="button"
          tabIndex={-1}
          style={{ ...pillBaseStyle, background: colors.ivory, color: colors.emerald, gap: '4px' }}
        >
          More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
