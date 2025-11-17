import { useCallback, useState } from 'react';

import { DropdownState } from '../types';

export default function useDropdownState(initialData: any[] = [], defaultOpen: boolean = false) {
  const [state, setState] = useState<DropdownState>({
    currentValue: null,
    keyboardHeight: 0,
    listData: initialData,
    position: null,
    searchText: '',
    visible: defaultOpen,
  });

  const updateState = useCallback((newState: Partial<DropdownState>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  const resetSearch = useCallback(() => {
    setState(prev => ({ ...prev, searchText: '' }));
  }, []);

  const setVisible = useCallback((visible: boolean) => {
    setState(prev => ({ ...prev, visible }));
  }, []);

  const setSearchText = useCallback((searchText: string) => {
    setState(prev => ({ ...prev, searchText }));
  }, []);

  const setListData = useCallback((listData: any[]) => {
    setState(prev => ({ ...prev, listData }));
  }, []);

  const setCurrentValue = useCallback((currentValue: any) => {
    setState(prev => ({ ...prev, currentValue }));
  }, []);

  const setKeyboardHeight = useCallback((keyboardHeight: number) => {
    setState(prev => ({ ...prev, keyboardHeight }));
  }, []);

  return {
    resetSearch,
    setCurrentValue,
    setKeyboardHeight,
    setListData,
    setSearchText,
    setVisible,
    state,
    updateState,
  };
}
