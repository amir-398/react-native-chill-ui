import { useCallback, useMemo } from 'react';

import { DEFAULT_CONFIG } from '../types';
import { get, debounce, isEqual, differenceWith } from '../../../../utils';

export default function useDropdownSearch(
  dataSet: any[],
  excludeItems: any[],
  excludeSearchItems: any[],
  valueField: string,
  searchField?: string,
  searchQuery?: (text: string, labelText: string) => boolean,
) {
  const excludeData = useCallback(
    (dataToFilter: any[]) => {
      if (excludeItems.length === 0) return dataToFilter || [];

      return (
        differenceWith(dataToFilter, excludeItems, (obj1, obj2) =>
          isEqual(get(obj1, valueField), get(obj2, valueField)),
        ) || []
      );
    },
    [excludeItems, valueField],
  );

  const performSearch = useCallback(
    (text: string) => {
      if (text.length === 0) {
        const filterData = excludeData(dataSet);
        return filterData;
      }

      const createSearchFilter = () => {
        if (searchQuery) {
          return (e: any) => {
            const labelText = get(e, searchField || valueField);
            return searchQuery(text, labelText);
          };
        }

        return (e: any) => {
          const item = get(e, searchField || valueField)
            ?.toLowerCase()
            .replace(/\s/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          const key = text
            .toLowerCase()
            .replace(/\s/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          return item?.indexOf(key) >= 0;
        };
      };

      const searchFilter = createSearchFilter();
      const dataSearch = dataSet.filter(searchFilter);

      if (excludeSearchItems.length > 0 || excludeItems.length > 0) {
        const excludeSearchData = differenceWith(dataSearch, excludeSearchItems, (obj1, obj2) =>
          isEqual(get(obj1, valueField), get(obj2, valueField)),
        );
        return excludeData(excludeSearchData);
      }

      return dataSearch;
    },
    [dataSet, searchQuery, excludeSearchItems, excludeItems, searchField, valueField, excludeData],
  );

  const debouncedSearch = useMemo(() => debounce(performSearch, DEFAULT_CONFIG.DEBOUNCE_DELAY), [performSearch]);

  return {
    debouncedSearch,
    excludeData,
    performSearch,
  };
}
