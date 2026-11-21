'use client';

import { useEffect, useState } from 'react';
import Categories from './Categories';
import Products from './Products';
import PromoBanner from './PromoBanner';
import { getSelectedCategory } from '@/lib/categoryNav';

export default function HomeCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory(getSelectedCategory());
    const handleCategorySelected = () => setSelectedCategory(getSelectedCategory());
    window.addEventListener('category-selected', handleCategorySelected);
    return () => window.removeEventListener('category-selected', handleCategorySelected);
  }, []);

  return (
    <>
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <PromoBanner />
      <Products selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
    </>
  );
}
