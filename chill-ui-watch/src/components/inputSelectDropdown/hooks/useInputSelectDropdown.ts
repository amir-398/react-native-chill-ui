import { FlatList } from 'react-native';
import { useImperativeHandle, useRef, useCallback } from 'react';

import { IDropdownRef } from '../types';
import useDropdownState from './useDropdownState';
import useDropdownSearch from './useDropdownSearch';
import useDropdownActions from './useDropdownActions';
import useDropdownKeyboard from './useDropdownKeyboard';
import useDropdownSelection from './useDropdownSelection';
import useCalculateDropDownPosition from './useCalculateDropdownPosition';

interface InputSelectDropdownHookParams {
  dataSet: any[];
  inputValue?: any;
  disable?: boolean;
  valueField: string;
  onBlur?: () => void;
  searchField?: string;
  excludeItems?: any[];
  autoScroll?: boolean;
  onFocus?: () => void;
  excludeSearchItems?: any[];
  onSelectItem?: (item: any) => void;
  closeModalWhenSelectedItem?: boolean;
  searchQuery?: (searchText: string, itemText: string) => boolean;
}

export default function useInputSelectDropdown(
  {
    autoScroll = true,
    closeModalWhenSelectedItem = true,
    dataSet = [],
    disable = false,
    excludeItems = [],
    excludeSearchItems = [],
    inputValue,
    onBlur,
    onFocus,
    onSelectItem,
    searchField,
    searchQuery,
    valueField,
  }: InputSelectDropdownHookParams,
  currentRef: React.Ref<IDropdownRef>,
) {
  const refList = useRef<FlatList | null>(null);
  const containerRef = useRef<any>(null);

  // État principal du dropdown
  const {
    resetSearch,
    setCurrentValue,
    setKeyboardHeight,
    setListData,
    setSearchText,
    setVisible,
    state,
    updateState,
  } = useDropdownState(dataSet);

  const { measureComponent, position } = useCalculateDropDownPosition(containerRef);

  const { debouncedSearch, excludeData, performSearch } = useDropdownSearch({
    dataSet,
    excludeItems,
    excludeSearchItems,
    searchField,
    searchQuery,
    searchText: state.searchText,
    setListData,
    valueField,
  });

  const { scrollToSelectedIndex, updateCurrentValue } = useDropdownSelection({
    autoScroll,
    dataSet,
    inputValue,
    listData: state.listData,
    refList,
    setCurrentValue,
    valueField,
  });

  const { eventClose, eventOpen, toggleDropdown } = useDropdownActions({
    disabled: disable,
    keyboardHeight: state.keyboardHeight,
    onClose: onBlur,
    onMeasure: measureComponent,
    onOpen: onFocus,
    onPerformSearch: performSearch,
    onResetSearch: resetSearch,
    searchText: state.searchText,
    setVisible,
    visible: state.visible,
  });

  const handleSelectItem = useCallback(
    (item: any) => {
      setCurrentValue(item);

      onSelectItem?.(item);

      if (closeModalWhenSelectedItem) {
        setVisible(false);
        onBlur?.();
      }
    },
    [setCurrentValue, onSelectItem, closeModalWhenSelectedItem, setVisible, onBlur],
  );

  useDropdownKeyboard({
    onKeyboardHide: () => setKeyboardHeight(0),
    onKeyboardShow: setKeyboardHeight,
    onMeasure: measureComponent,
  });

  useImperativeHandle(
    currentRef,
    () => ({
      close: eventClose,
      open: eventOpen,
    }),
    [eventClose, eventOpen],
  );

  return {
    // state
    state,
    updateState,

    // Refs
    containerRef,
    position,
    refList,

    // Actions
    eventClose,
    eventOpen,
    handleSelectItem,
    toggleDropdown,

    // Search
    debouncedSearch,
    performSearch,
    setSearchText,

    // Selection
    scrollToSelectedIndex,
    updateCurrentValue,

    // Utils
    excludeData,
    measureComponent,
  };
}
