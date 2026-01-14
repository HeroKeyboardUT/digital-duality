import { useState, useMemo, useCallback } from 'react';

interface UseFilterOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  categoryField?: keyof T;
  arraySearchFields?: (keyof T)[];
}

interface UseFilterReturn<T> {
  filteredItems: T[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  resetFilters: () => void;
}

export function useFilter<T>({
  items,
  searchFields,
  categoryField,
  arraySearchFields = [],
}: UseFilterOptions<T>): UseFilterReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'All' ||
        (categoryField && String(item[categoryField]) === activeCategory);

      // Search filter
      if (searchQuery === '') {
        return matchesCategory;
      }

      const query = searchQuery.toLowerCase();

      // Search in regular fields
      const matchesRegularFields = searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        return false;
      });

      // Search in array fields
      const matchesArrayFields = arraySearchFields.some((field) => {
        const value = item[field];
        if (Array.isArray(value)) {
          return value.some(
            (v) => typeof v === 'string' && v.toLowerCase().includes(query)
          );
        }
        return false;
      });

      return matchesCategory && (matchesRegularFields || matchesArrayFields);
    });
  }, [items, searchQuery, activeCategory, searchFields, categoryField, arraySearchFields]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setActiveCategory('All');
  }, []);

  return {
    filteredItems,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    resetFilters,
  };
}
