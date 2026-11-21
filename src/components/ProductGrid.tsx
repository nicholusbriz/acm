'use client';

import ProductCard, { type Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

export default function ProductGrid({ products, columns }: ProductGridProps) {
  const gridColumns = columns ? `repeat(${columns}, 1fr)` : 'repeat(auto-fill, minmax(180px, 1fr))';

  return (
    <div style={{
      display: 'grid',
      width: '100%',
      gridTemplateColumns: gridColumns,
      gap: '10px',
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
