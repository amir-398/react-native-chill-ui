import { useCallback, useEffect, useMemo } from 'react';

import { SearchConfig, DEFAULT_CONFIG } from '../types';
import { get, debounce, differenceWith, isEqual } from '../../../utils';

interface DropdownSearchParams extends SearchConfig {
  dataSet: any[];
  searchText: string;
  setListData: (data: any[]) => void;
}

export default function useDropdownSearch({
  dataSet,
  excludeItems = [],
  excludeSearchItems = [],
  searchField,
  searchQuery,
  searchText,
  setListData,
  valueField,
}: DropdownSearchParams) {
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
        setListData(filterData);
        return;
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
        const filterData = excludeData(excludeSearchData);
        setListData(filterData);
      } else {
        setListData(dataSearch);
      }
    },
    [dataSet, searchQuery, excludeSearchItems, excludeItems, searchField, valueField, excludeData, setListData],
  );

  // Debounced search
  const debouncedSearch = useMemo(() => debounce(performSearch, DEFAULT_CONFIG.DEBOUNCE_DELAY), [performSearch]);

  useEffect(() => {
    if (dataSet && searchText.length === 0) {
      const filterData = excludeData(dataSet);
      setListData([...filterData]);
    }

    if (searchText) {
      debouncedSearch(searchText);
    }

    // Cleanup debounce
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSet, searchText, setListData]);

  // Cleanup effect
  useEffect(
    () => () => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  return {
    debouncedSearch,
    excludeData,
    performSearch,
  };
}
