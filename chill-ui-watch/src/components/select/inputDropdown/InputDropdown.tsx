import { Keyboard, LogBox, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, memo } from 'react';

import cn from '@/components/cn';
import Input from '@/components/inputs/Input';

import { DEFAULT_CONFIG } from './types';
import { useDeviceOrientation } from '../utils';
import DropdownList from './components/DropdownList';
import DropdownModal from './components/DropdownModal';
import useDropdownState from './hooks/useDropdownState';
import useDropdownSearch from './hooks/useDropdownSearch';
import useDropdownKeyboard from './hooks/useDropdownKeyboard';
import useMeasureComponent from './hooks/useMeasureComponent';
import { get, findIndex, debounce, isEqual } from '../../../utils';
import { IDropdownRef, InputProps, SelectDropdownProps } from '../../../types';

const InputDropdown = React.forwardRef<IDropdownRef, SelectDropdownProps<any>>((props, currentRef) => {
  const orientation = useDeviceOrientation();
  const {
    autoScroll = true,
    closeModalWhenSelectedItem = true,
    confirmSelectItem,
    customDropdownItem,
    dataSet = [],
    disable = false,
    dropdownItemProps,
    dropdownPosition = 'auto',
    dropdownProps,
    excludeItems = [],
    excludeSearchItems = [],
    hasPerformSearch = true,
    hasSearch = false,
    inputProps,
    isLoading,
    keyboardAvoiding = true,
    maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
    minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
    mode = 'default',
    onBlur,
    onConfirmSelectItem,
    onFocus,
    onSelectItem,
    searchField,
    searchInputProps,
    searchQuery,
    valueField,
  } = props;

  const ref = useRef<View>(null);
  const refList = useRef<any>(null);
  const inputRef = useRef<TextInput>(null);

  const { state, updateState } = useDropdownState(dataSet);
  const { debouncedSearch, excludeData, performSearch } = useDropdownSearch(
    dataSet,
    excludeItems,
    excludeSearchItems,
    String(valueField),
    searchField ? String(searchField) : undefined,
    searchQuery,
  );

  const measureComponent = useMeasureComponent({
    mode,
    orientation,
    ref,
    updateState,
  });

  const eventOpen = useCallback(() => {
    if (disable) return;

    measureComponent();
    updateState({ visible: true });
    onFocus?.();

    if (state.searchText.length > 0) {
      performSearch(state.searchText);
    }
  }, [disable, onFocus, state.searchText, performSearch, measureComponent, updateState]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [state.visible]);

  const eventClose = useCallback(() => {
    if (disable) return;

    updateState({ visible: false });
    onBlur?.();
  }, [disable, onBlur, updateState]);

  useImperativeHandle(
    currentRef,
    () => ({
      close: eventClose,
      open: eventOpen,
    }),
    [eventClose, eventOpen],
  );

  useDropdownKeyboard(
    height => {
      measureComponent();
      updateState({ keyboardHeight: height });
    },
    () => {
      updateState({ keyboardHeight: 0 });
      measureComponent();
    },
  );

  const updateCurrentValue = useCallback(() => {
    const defaultValue = typeof inputProps?.value === 'object' ? get(inputProps?.value, valueField) : inputProps?.value;
    const selectedItem = dataSet.find((e: any) => isEqual(defaultValue, get(e, valueField)));

    updateState({ currentValue: selectedItem || null });
  }, [dataSet, inputProps?.value, valueField, updateState]);

  useEffect(() => {
    updateCurrentValue();
  }, [updateCurrentValue]);

  const scrollToSelectedIndex = useMemo(
    () =>
      debounce(() => {
        if (!autoScroll || !dataSet?.length || state.listData?.length !== dataSet?.length) return;
        if (!refList?.current) return;

        const defaultValue =
          typeof inputProps?.value === 'object' ? get(inputProps?.value, valueField) : inputProps?.value;
        const index = findIndex(state.listData, e => isEqual(defaultValue, get(e, valueField)));

        if (index > -1 && index < state.listData.length) {
          try {
            refList.current.scrollToIndex({
              animated: false,
              index,
            });
          } catch (error) {
            console.warn(`scrollToIndex error: ${error}`);
          }
        }
      }, DEFAULT_CONFIG.DEBOUNCE_DELAY),
    [autoScroll, dataSet?.length, state.listData, inputProps?.value, valueField],
  );

  const toggleDropdown = useCallback(() => {
    if (disable) return;

    const willBeVisible = !state.visible;

    if (state.keyboardHeight > 0 && !willBeVisible) {
      Keyboard.dismiss();
      return;
    }

    measureComponent();
    updateState({ visible: willBeVisible });

    if (dataSet) {
      const filterData = excludeData(dataSet);
      updateState({ listData: filterData });
    }

    if (willBeVisible) {
      onFocus?.();
    } else {
      onBlur?.();
    }

    if (state.searchText.length > 0) {
      performSearch(state.searchText);
    }
  }, [
    disable,
    state.visible,
    state.keyboardHeight,
    state.searchText,
    measureComponent,
    dataSet,
    excludeData,
    onFocus,
    onBlur,
    performSearch,
    updateState,
  ]);

  useEffect(() => {
    if (state.visible) {
      inputRef.current?.focus();
    }
  }, [state.visible]);

  const selectItem = useCallback(
    (item: any) => {
      if (confirmSelectItem && onConfirmSelectItem) {
        return onConfirmSelectItem(item);
      }

      updateState({ currentValue: item });
      onSelectItem?.(item);

      if (closeModalWhenSelectedItem) {
        updateState({ searchText: '', visible: false });
        performSearch('');
        onBlur?.();
      }
      return undefined;
    },
    [
      confirmSelectItem,
      onSelectItem,
      onConfirmSelectItem,
      performSearch,
      closeModalWhenSelectedItem,
      onBlur,
      updateState,
    ],
  );

  const handleSearchTextChange = useCallback(
    (text: string) => {
      searchInputProps?.onChangeText?.(text);
      updateState({
        currentValue: text === '' ? null : state.currentValue,
        searchText: text,
        visible: text.length > 0 ? state.visible : false,
      });

      if (hasPerformSearch) {
        performSearch(text);
      }

      if (!state.visible && text.length > 0) {
        eventOpen();
      }
    },
    [performSearch, searchInputProps, state.visible, eventOpen, updateState, state.currentValue, hasPerformSearch],
  );

  const renderInput = useCallback(
    (inputRefParam?: InputProps['inputRef']) => {
      const isSelected = state.currentValue && get(state.currentValue, valueField);
      const displayValue = state.searchText || (isSelected ? get(state.currentValue, valueField) : '');

      return (
        <Input
          inputRef={inputRefParam ?? undefined}
          placeholder={inputProps?.placeholder ?? DEFAULT_CONFIG.PLACEHOLDER}
          value={displayValue}
          onChangeText={handleSearchTextChange}
          {...inputProps}
        />
      );
    },
    [inputProps, state.currentValue, state.searchText, valueField, handleSearchTextChange],
  );

  useEffect(() => {
    if (!hasPerformSearch) return;

    if (dataSet && state.searchText.length === 0) {
      const filterData = excludeData(dataSet);
      updateState({ listData: [...filterData] });
    }

    if (state.searchText) {
      const searchResults = performSearch(state.searchText);
      updateState({ listData: searchResults });
    }
    // eslint-disable-next-line
    return () => debouncedSearch.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSet, state.searchText, updateState, hasPerformSearch]);

  useEffect(
    () => () => {
      debouncedSearch.cancel();
      scrollToSelectedIndex.cancel();
    },
    [debouncedSearch, scrollToSelectedIndex],
  );

  return (
    <View className={cn('justify-center', inputProps?.containerClassName)} ref={ref} onLayout={measureComponent}>
      {renderInput()}

      <DropdownModal
        visible={state.visible}
        position={state.position}
        maxHeight={maxHeight}
        minHeight={minHeight}
        className={dropdownProps?.className}
        hasShadow={dropdownProps?.hasShadow}
        withAnimation
      >
        <DropdownList
          data={state.listData}
          valueField={String(valueField)}
          currentValue={state.currentValue}
          onSelectItem={selectItem}
          dropdownItemProps={dropdownItemProps}
          customDropdownItem={customDropdownItem}
          dropdownProps={dropdownProps}
          emptyText={dropdownProps?.emptyText}
          customEmpty={dropdownProps?.customEmpty}
          isLoading={isLoading}
          onScrollToIndexFailed={scrollToSelectedIndex}
          onContentSizeChange={scrollToSelectedIndex}
          loadingIndicatorProps={dropdownProps?.loadingIndicatorProps}
          customLoadingIndicator={dropdownProps?.customLoadingIndicator}
        />
      </DropdownModal>
    </View>
  );
});

InputDropdown.displayName = 'InputDropdown';

export default memo(InputDropdown);
