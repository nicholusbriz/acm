'use client';

import { useState } from 'react';
import Categories from './Categories';
import Products from './Products';

export default function HomeCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Products selectedCategory={selectedCategory} />
    </>
  );
}
