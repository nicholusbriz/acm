import { NextResponse } from 'next/server';
import { getProductsByCategory } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const products = await getProductsByCategory(slug);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
