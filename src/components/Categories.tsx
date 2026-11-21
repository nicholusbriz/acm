'use client';

import { useEffect, useRef, useState } from 'react';
import { getProductFilters, setProductFilters, type ProductFilters } from '@/lib/filters';
import styles from './Categories.module.css';

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

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draft, setDraft] = useState<ProductFilters>(getProductFilters());
  const scrollRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const isAllProductsActive = selectedCategory === null;

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

  function toggleFilter() {
    setIsFilterOpen((open) => {
      if (!open) setDraft(getProductFilters());
      return !open;
    });
  }

  function applyFilters() {
    setProductFilters(draft);
    setIsFilterOpen(false);
  }

  function clearFilters() {
    const cleared = { minPrice: null, maxPrice: null, inStockOnly: false, sortBy: 'default' as const };
    setDraft(cleared);
    setProductFilters(cleared);
    setIsFilterOpen(false);
  }

  useEffect(() => {
    const active = scrollRef.current?.querySelector('[aria-pressed="true"]');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedCategory]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  function selectCategory(categorySlug: string | null) {
    onSelectCategory(categorySlug);
    setIsFilterOpen(false);
  }

  if (loading) {
    return (
      <section className="section-pad">
        <p className={styles.loading}>Loading categories...</p>
      </section>
    );
  }

  return (
    <section className={`section-pad ${styles.section}`}>
      <div className={styles.controlsRow}>
        <div ref={scrollRef} className={`hide-scrollbar ${styles.scrollArea}`}>
          <button
            type="button"
            aria-pressed={isAllProductsActive}
            onClick={() => selectCategory(null)}
            className={`${styles.pill} ${isAllProductsActive ? styles.allActive : styles.allIdle}`}
          >
            All Products
          </button>

          {categories.map((category) => {
            const isActive = selectedCategory === category.slug;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectCategory(category.slug)}
                className={`${styles.pill} ${isActive ? styles.catActive : styles.catIdle}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div ref={filterRef} className={styles.moreWrap}>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={isFilterOpen}
            onClick={toggleFilter}
            className={`${styles.pill} ${isFilterOpen ? styles.moreOpen : styles.moreIdle}`}
          >
            Filter
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${styles.moreIcon} ${isFilterOpen ? styles.moreIconOpen : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isFilterOpen && (
            <div className={styles.dropdown}>
              <div className={styles.filterSection}>
                <span className={styles.filterLabel}>Price</span>
                <div className={styles.priceRow}>
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    className={styles.filterInput}
                    value={draft.minPrice ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft({ ...draft, minPrice: v === '' ? null : Number(v) });
                    }}
                  />
                  <span className={styles.priceDash}>–</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    className={styles.filterInput}
                    value={draft.maxPrice ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft({ ...draft, maxPrice: v === '' ? null : Number(v) });
                    }}
                  />
                </div>
              </div>

              <label className={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={draft.inStockOnly}
                  onChange={(e) => setDraft({ ...draft, inStockOnly: e.target.checked })}
                />
                <span>In stock only</span>
              </label>

              <div className={styles.filterSection}>
                <span className={styles.filterLabel}>Sort by</span>
                <select
                  className={styles.filterSelect}
                  value={draft.sortBy}
                  onChange={(e) => setDraft({ ...draft, sortBy: e.target.value as ProductFilters['sortBy'] })}
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              <div className={styles.applyRow}>
                <button type="button" className={styles.applyButton} onClick={applyFilters}>
                  Apply
                </button>
                <button type="button" className={styles.clearButton} onClick={clearFilters}>
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
