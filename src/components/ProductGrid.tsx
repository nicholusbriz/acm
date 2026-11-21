'use client';

import ProductCard, { type Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

export default function ProductGrid({ products, columns }: ProductGridProps) {
  const className = columns
    ? `productGrid productGrid-${columns}col`
    : 'productGrid';

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
