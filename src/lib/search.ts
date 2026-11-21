const SEARCH_KEY = 'site-search-query';
const SEARCH_EVENT = 'search-updated';

export function getSearchQuery(): string {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(SEARCH_KEY) ?? '';
}

export function setSearchQuery(query: string) {
  window.localStorage.setItem(SEARCH_KEY, query);
  window.dispatchEvent(new Event(SEARCH_EVENT));
}
