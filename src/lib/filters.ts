export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'name';

export interface ProductFilters {
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  sortBy: SortBy;
}

const FILTERS_KEY = 'product-filters';
const FILTERS_EVENT = 'filters-updated';

const DEFAULT_FILTERS: ProductFilters = {
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  sortBy: 'default',
};

export function getProductFilters(): ProductFilters {
  if (typeof window === 'undefined') return DEFAULT_FILTERS;
  try {
    const raw = window.localStorage.getItem(FILTERS_KEY);
    if (!raw) return DEFAULT_FILTERS;
    return { ...DEFAULT_FILTERS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_FILTERS;
  }
}

export function setProductFilters(partial: Partial<ProductFilters>) {
  if (typeof window === 'undefined') return;
  const next = { ...getProductFilters(), ...partial };
  window.localStorage.setItem(FILTERS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(FILTERS_EVENT));
}
