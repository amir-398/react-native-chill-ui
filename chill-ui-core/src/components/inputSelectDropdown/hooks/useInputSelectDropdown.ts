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
  open?: boolean;
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
  defaultOpen?: boolean;
  excludeSearchItems?: any[];
  onSelectItem?: (item: any) => void;
  position: 'top' | 'bottom' | 'auto';
  closeModalWhenSelectedItem?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchQuery?: (searchText: string, itemText: string) => boolean;
}

export default function useInputSelectDropdown(
  {
    closeModalWhenSelectedItem = true,
    dataSet = [],
    defaultOpen,
    disable = false,
    excludeItems = [],
    excludeSearchItems = [],
    inputValue,
    offsetX = 0,
    offsetY = 0,
    onBlur,
    onFocus,
    onOpenChange,
    onSelectItem,
    open,
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
  } = useDropdownState(dataSet, defaultOpen);

  // Handle controlled vs uncontrolled open state
  const isControlled = open !== undefined;
  const currentVisible = isControlled ? open : state.visible;

  const handleSetVisible = useCallback(
    (visible: boolean) => {
      if (isControlled) {
        onOpenChange?.(visible);
      } else {
        setVisible(visible);
      }
    },
    [isControlled, onOpenChange, setVisible],
  );
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
    setVisible: handleSetVisible,
    visible: currentVisible,
  });

  const handleSelectItem = useCallback(
    (item: any) => {
      setCurrentValue(item);

      onSelectItem?.(item);

      if (closeModalWhenSelectedItem) {
        handleSetVisible(false);
        onBlur?.();
      }
    },
    [setCurrentValue, onSelectItem, closeModalWhenSelectedItem, handleSetVisible, onBlur],
  );

  useEffect(() => {
    const calculate = async () => {
      if (currentVisible) {
        const newPosition = await getDropdownPosition();
        calculatePosition(newPosition);
      }
    };
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVisible]);

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
    state: {
      ...state,
      visible: currentVisible,
    },
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
    setCurrentValue,
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
