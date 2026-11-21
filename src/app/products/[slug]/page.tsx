import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/database';
import ProductDetail from '@/components/ProductDetail';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={
      <div style={{ padding: '40px 32px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ fontSize: '16px', color: '#171A18', fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading product...
        </p>
      </div>
    }>
      <ProductDetailLoader paramsPromise={params} />
    </Suspense>
  );
}

async function ProductDetailLoader({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  const [product, products] = await Promise.all([
    getProductBySlug(slug).catch(() => null),
    getProducts().catch(() => []),
  ]);

  if (!product) {
    notFound();
  }

  const categorySlug = product.category?.slug;
  const relatedProducts = categorySlug
    ? products.filter((relatedProduct) => relatedProduct.category?.slug === categorySlug && relatedProduct.id !== product.id)
    : products.filter((relatedProduct) => relatedProduct.id !== product.id);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
