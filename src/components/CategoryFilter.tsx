'use client';

import { useEffect, useRef, useState } from 'react';
import { getProductFilters, setProductFilters, type ProductFilters } from '@/lib/filters';
import styles from './Categories.module.css';

export default function CategoryFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<ProductFilters>(getProductFilters());
  const filterRef = useRef<HTMLDivElement>(null);

  function toggleFilter() {
    setIsOpen((open) => {
      if (!open) setDraft(getProductFilters());
      return !open;
    });
  }

  function applyFilters() {
    setProductFilters(draft);
    setIsOpen(false);
  }

  function clearFilters() {
    const cleared = { minPrice: null, maxPrice: null, inStockOnly: false, sortBy: 'default' as const };
    setDraft(cleared);
    setProductFilters(cleared);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className={styles.moreWrap}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleFilter}
        className={`${styles.pill} ${isOpen ? styles.moreOpen : styles.moreIdle}`}
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
          className={`${styles.moreIcon} ${isOpen ? styles.moreIconOpen : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
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
  );
}
