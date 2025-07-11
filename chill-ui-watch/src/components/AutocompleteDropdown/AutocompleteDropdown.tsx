import { TextInput } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useRef, memo, useMemo } from 'react';

import { Input } from '../inputs';
import { DEFAULT_CONFIG } from './types';
import { get, isEqual, debounce } from '../../utils';
import InputDropdown from '../inputDrodown/InputDropdown';
import useDropdownActions from './hooks/useDropdownActions';
import useDropdownKeyboard from './hooks/useDropdownKeyboard';
import useGetDropdownPosition from './hooks/useGetDropdownPosition';
import useAutocompleteDropdownProvider from './hooks/useAutocompleteDropdownProvider';
import { AutocompleteDropdownRefProps, AutocompleteDropdownProps } from '../../types';

// State interface for AutocompleteDropdown
interface AutocompleteDropdownState {
  listData: any[];
  searchText: string;
  keyboardHeight: number;
  currentValue: any | null;
}

// Hook for managing AutocompleteDropdown state
const useAutocompleteDropdownState = (dataSet: any[]) => {
  const [state, setState] = React.useState<AutocompleteDropdownState>({
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

const AutocompleteDropdown = React.forwardRef<AutocompleteDropdownRefProps, AutocompleteDropdownProps<any>>(
  (props, currentRef) => {
    const {
      closeModalWhenSelectedItem = true,
      confirmSelectItem,
      customDropdownItem,
      dataSet = [],
      dropdownItemProps,
      dropdownListProps,
      dropdownPosition,
      dropdownProps,
      excludeItems = [],
      hasHighlightString = true,
      hasPerformSearch = true,
      highlightProps,
      inputProps,
      isLoading,
      maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
      minHeight,
      offsetX = 0,
      offsetY = 0,
      onBlur,
      onConfirmSelectItem,
      onFocus,
      onSelectItem,
      searchField,
      searchQuery,
      valueField,
    } = props;

    const instanceId = useRef(`autocomplete-${Math.random().toString(36).slice(2, 11)}`).current;

    const {
      getInstance,
      registerInstance,
      setDropdownContent,
      setDropdownPosition,
      setShowDropdown,
      unregisterInstance,
    } = useAutocompleteDropdownProvider();

    const inputRef = useRef<TextInput>(null);
    const inputContainerRef = useRef<any>(null);

    // Enregistrer cette instance lors du montage
    useEffect(() => {
      registerInstance(instanceId, inputContainerRef, offsetX, offsetY);
      return () => {
        unregisterInstance(instanceId);
      };
    }, [instanceId, registerInstance, unregisterInstance, offsetX, offsetY]);

    const instance = getInstance(instanceId);

    const { state, updateState } = useAutocompleteDropdownState(dataSet);

    const { getDropdownPosition } = useGetDropdownPosition({
      inputContainerRef,
      setDropdownPosition: pos => {
        setDropdownPosition(instanceId, pos);
      },
      waitForKeyboard: !!inputRef.current?.isFocused(),
    });

    // Search functionality
    const excludeData = useCallback(
      (data: any[]) => {
        if (!excludeItems || excludeItems.length === 0) return data;
        return data.filter(
          item => !excludeItems.some(excludeItem => isEqual(get(item, valueField), get(excludeItem, valueField))),
        );
      },
      [excludeItems, valueField],
    );

    const performSearch = useCallback(
      (searchText: string) => {
        if (!searchText) return excludeData(dataSet);

        const filteredData = dataSet.filter(item => {
          if (searchQuery) {
            const searchValue = searchField ? get(item, searchField) : get(item, valueField);
            return searchQuery(searchText, String(searchValue));
          }

          const searchValue = searchField ? get(item, searchField) : get(item, valueField);
          return String(searchValue).toLowerCase().includes(searchText.toLowerCase());
        });

        return excludeData(filteredData);
      },
      [dataSet, searchField, valueField, searchQuery, excludeData],
    );

    const debouncedSearch = useMemo(() => debounce(performSearch, 300), [performSearch]);

    const { eventClose, eventOpen, toggleDropdown } = useDropdownActions({
      disabled: (inputProps?.isDisabled || inputProps?.editable) ?? false,
      getDropdownPosition,
      position: dropdownPosition,
      setDropdownPosition: pos => {
        setDropdownPosition(instanceId, pos);
      },
      setShowDropdown: show => {
        setShowDropdown(instanceId, show);
      },
      state: { ...state, showDropdown: instance?.showDropdown ?? false },
    });

    useImperativeHandle(
      currentRef,
      () => ({
        close: eventClose,
        open: eventOpen,
        toggle: toggleDropdown,
      }),
      [eventClose, eventOpen, toggleDropdown],
    );

    useDropdownKeyboard(
      height => {
        updateState({ keyboardHeight: height });
      },
      () => {
        updateState({ keyboardHeight: 0 });
      },
    );

    const updateCurrentValue = useCallback(() => {
      const defaultValue =
        typeof inputProps?.value === 'object' ? get(inputProps?.value, valueField) : inputProps?.value;
      const selectedItem = dataSet.find((e: any) => isEqual(defaultValue, get(e, valueField)));

      updateState({ currentValue: selectedItem || null });
    }, [dataSet, inputProps?.value, valueField, updateState]);

    useEffect(() => {
      updateCurrentValue();
    }, [updateCurrentValue]);

    const selectItem = useCallback(
      (item: any) => {
        if (confirmSelectItem && onConfirmSelectItem) {
          return onConfirmSelectItem(item);
        }

        // Toujours sélectionner l'item et effacer le searchText pour que displayValue affiche la valeur sélectionnée
        updateState({ currentValue: item, searchText: '' });
        onSelectItem?.(item);

        // Fermer le dropdown seulement si closeModalWhenSelectedItem est true
        if (closeModalWhenSelectedItem) {
          setShowDropdown(instanceId, false);
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
        setShowDropdown,
        instanceId,
      ],
    );

    const handleSearchTextChange = useCallback(
      (text: string) => {
        updateState({
          currentValue: text === '' ? null : state.currentValue,
          searchText: text,
        });

        const showDropdown = instance?.showDropdown ?? false;

        if (hasPerformSearch) {
          const searchResults = performSearch(text);
          updateState({ listData: searchResults });
        }

        if (!showDropdown && text.length > 0) {
          eventOpen();
        } else if (text.length === 0) {
          setShowDropdown(instanceId, false);
        }
      },
      [
        performSearch,
        eventOpen,
        updateState,
        state.currentValue,
        hasPerformSearch,
        setShowDropdown,
        instanceId,
        instance?.showDropdown,
      ],
    );

    const isSelected = useMemo(
      () => state.currentValue && get(state.currentValue, valueField),
      [state.currentValue, valueField],
    );

    const displayValue = useMemo(
      () => state.searchText || (isSelected ? get(state.currentValue, valueField) : ''),
      [state.searchText, isSelected, state.currentValue, valueField],
    );

    useEffect(() => {
      if (!hasPerformSearch) return;

      if (dataSet && state.searchText.length === 0) {
        const filterData = excludeData(dataSet);
        updateState({ listData: [...filterData] });
      }

      // eslint-disable-next-line
      return () => debouncedSearch.cancel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSet, state.searchText, updateState, hasPerformSearch]);

    useEffect(() => {
      setDropdownContent(
        instanceId,
        <InputDropdown
          {...dropdownProps}
          visible={instance?.showDropdown ?? false}
          maxHeight={maxHeight}
          minHeight={minHeight}
          data={state.listData}
          valueField={String(valueField)}
          currentValue={state.currentValue}
          onSelectItem={selectItem}
          dropdownItemProps={dropdownItemProps}
          customDropdownItem={customDropdownItem}
          hasHighlightString={hasHighlightString}
          highlightStringProps={{
            highlightTerm: state.searchText,
            stringProps: dropdownItemProps?.stringItemProps ?? {},
            ...highlightProps,
          }}
          dropdownListProps={dropdownListProps}
          emptyText={dropdownProps?.emptyText ?? DEFAULT_CONFIG.EMPTY_TEXT}
          isLoading={isLoading}
        />,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      instanceId,
      instance?.showDropdown,
      maxHeight,
      minHeight,
      dropdownProps,
      state.listData,
      state.currentValue,
      dropdownItemProps,
      customDropdownItem,
      isLoading,
      setDropdownContent,
      valueField,
    ]);

    return (
      <Input
        ref={inputRef}
        wrapperRef={inputContainerRef}
        placeholder={inputProps?.placeholder ?? DEFAULT_CONFIG.PLACEHOLDER}
        value={displayValue}
        onBlur={() => {
          setShowDropdown(instanceId, false);
          onBlur?.();
        }}
        onFocus={() => {
          onFocus?.();
          if (displayValue.length > 0) {
            setShowDropdown(instanceId, true);
          }
        }}
        onChangeText={handleSearchTextChange}
        {...inputProps}
      />
    );
  },
);

AutocompleteDropdown.displayName = 'AutocompleteDropdown';

export default memo(AutocompleteDropdown);
