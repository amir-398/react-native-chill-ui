import { FlatList } from 'react-native';
import { useImperativeHandle, useRef } from 'react';

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
  searchQuery?: (searchText: string, itemText: string) => boolean;
}

export default function useInputSelectDropdown(
  {
    autoScroll = true,
    dataSet = [],
    disable = false,
    excludeItems = [],
    excludeSearchItems = [],
    inputValue,
    onBlur,
    onFocus,
    searchField,
    searchQuery,
    valueField,
  }: InputSelectDropdownHookParams,
  currentRef: React.Ref<IDropdownRef>,
) {
  const refList = useRef<FlatList>(null);
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

  // Position du dropdown
  const { measureComponent, position } = useCalculateDropDownPosition(containerRef);

  // Gestion de la recherche
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

  // Gestion de la sélection
  const { scrollToSelectedIndex, updateCurrentValue } = useDropdownSelection({
    autoScroll,
    dataSet,
    inputValue,
    listData: state.listData,
    refList,
    setCurrentValue,
    valueField,
  });

  // Actions du dropdown
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

  // Gestion du clavier
  useDropdownKeyboard({
    onKeyboardHide: () => setKeyboardHeight(0),
    onKeyboardShow: setKeyboardHeight,
    onMeasure: measureComponent,
  });

  // Interface exposée
  useImperativeHandle(
    currentRef,
    () => ({
      close: eventClose,
      open: eventOpen,
    }),
    [eventClose, eventOpen],
  );

  return {
    // État
    state,
    updateState,

    // Refs
    containerRef,
    position,
    refList,

    // Actions
    eventClose,
    eventOpen,
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
