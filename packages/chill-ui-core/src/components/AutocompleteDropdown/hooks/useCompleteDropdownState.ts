import { useCallback, useState } from 'react';

import { AutocompleteDropdownState } from '../types';

// Hook for managing AutocompleteDropdown state
export const useAutocompleteDropdownState = (dataSet: any[]) => {
  const [state, setState] = useState<AutocompleteDropdownState>({
    currentValue: null,
    keyboardHeight: 0,
    listData: dataSet || [],
    searchText: '',
  });

  const updateState = useCallback((newState: Partial<AutocompleteDropdownState>) => {
    setState((prev: AutocompleteDropdownState) => ({ ...prev, ...newState }));
  }, []);

  return { state, updateState };
};
