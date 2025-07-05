import { FlatList, View } from 'react-native';
import { useImperativeHandle, useRef, useCallback, useState } from 'react';

import { IDropdownRef } from '../types';
import useDropdownState from './useDropdownState';
import useDropdownSearch from './useDropdownSearch';
import useDropdownActions from './useDropdownActions';
import useDropdownKeyboard from './useDropdownKeyboard';
import useDropdownSelection from './useDropdownSelection';
import useGetDropdownPosition from './useGetDropdownPosition';
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
  position: 'top' | 'bottom' | 'auto';
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
    position,
    searchField,
    searchQuery,
    valueField,
  }: InputSelectDropdownHookParams,
  currentRef: React.Ref<IDropdownRef>,
) {
  const refList = useRef<FlatList | null>(null);
  const inputContainerRef = useRef<any>(null);
  const wrapperRef = useRef<View | null>(null);
  const dropdownRef = useRef<View | null>(null);
  const [calculatedDropdownPosition, setCalculatedDropdownPosition] = useState<'top' | 'bottom'>('bottom');

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
  const { getDropdownPosition } = useGetDropdownPosition({
    inputContainerRef,
    position,
    setDropdownPosition: pos => {
      setCalculatedDropdownPosition(pos);
    },
    waitForKeyboard: false,
  });

  const { calculatePosition, dropdownStyles } = useCalculateDropDownPosition({
    dropdownPosition: calculatedDropdownPosition,
    headerOffset: 0,
    inputContainerRef,
    wrapperRef,
  });

  console.log('dropdownStyles', dropdownStyles);

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
    getDropdownPosition,
    keyboardHeight: state.keyboardHeight,
    onClose: onBlur,
    onMeasure: calculatePosition,
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
    onMeasure: calculatePosition,
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
    dropdownRef,
    inputContainerRef,
    refList,
    wrapperRef,

    // Actions
    dropdownStyles,
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
    calculatePosition,
    excludeData,
  };
}
