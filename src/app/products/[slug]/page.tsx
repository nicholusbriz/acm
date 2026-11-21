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
      <div className="page-pad">
        <p className="page-loading">Loading product...</p>
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
  const otherProducts = products.filter(
    (otherProduct) => otherProduct.category?.slug !== categorySlug && otherProduct.id !== product.id
  );

  return <ProductDetail product={product} relatedProducts={relatedProducts} otherProducts={otherProducts} />;
}
