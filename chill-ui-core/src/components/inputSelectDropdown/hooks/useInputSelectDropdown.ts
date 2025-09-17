import { FlatList, View } from 'react-native';
import { useImperativeHandle, useRef, useCallback, useState, useEffect } from 'react';

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
  offsetX?: number;
  offsetY?: number;
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
    closeModalWhenSelectedItem = true,
    dataSet = [],
    disable = false,
    excludeItems = [],
    excludeSearchItems = [],
    inputValue,
    offsetX = 0,
    offsetY = 0,
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
  const inputRef = useRef<any>(null);
  const wrapperRef = useRef<View | null>(null);
  const dropdownRef = useRef<View | null>(null);
  const [calculatedDropdownPosition, setCalculatedDropdownPosition] = useState<'top' | 'bottom'>('bottom');

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
    inputRef,
    position,
    setDropdownPosition: pos => {
      setCalculatedDropdownPosition(pos);
    },
    waitForKeyboard: false,
  });

  const { calculatePosition, dropdownStyles } = useCalculateDropDownPosition({
    dropdownPosition: calculatedDropdownPosition,
    inputRef,
    offsetX,
    offsetY,
    wrapperRef,
  });

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

  useEffect(() => {
    const calculate = async () => {
      if (state.visible) {
        const newPosition = await getDropdownPosition();
        calculatePosition(newPosition);
      }
    };
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.visible]);

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
    inputRef,
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
