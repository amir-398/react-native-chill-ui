import { useCallback, useState } from 'react';

import { DropdownState } from '../types';

export default function useDropdownState(initialData: any[] = []) {
  const [state, setState] = useState<DropdownState>({
    currentValue: null,
    keyboardHeight: 0,
    listData: initialData,
    position: null,
    searchText: '',
  });

  const updateState = useCallback((newState: Partial<DropdownState>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  return {
    state,
    updateState,
  };
}
