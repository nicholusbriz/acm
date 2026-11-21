const CATEGORY_KEY = 'selected-category';
const CATEGORY_EVENT = 'category-selected';

export function getSelectedCategory(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(CATEGORY_KEY) || null;
}

export function selectCategory(categorySlug: string | null) {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
  if (categorySlug) {
    window.localStorage.setItem(CATEGORY_KEY, categorySlug);
  } else {
    window.localStorage.removeItem(CATEGORY_KEY);
  }
  window.dispatchEvent(new Event(CATEGORY_EVENT));
}
