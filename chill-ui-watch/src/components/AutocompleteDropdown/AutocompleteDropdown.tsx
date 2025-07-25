import { TextInput } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useRef, memo, useMemo } from 'react';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import { Input } from '../inputs';
import { DEFAULT_CONFIG } from './types';
import HighlightString from '../highlightString';
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
            return searchQuery(searchText, searchValue);
          }

          const searchValue = searchField ? get(item, searchField) : get(item, valueField);
          return searchValue?.toLowerCase().includes(searchText.toLowerCase());
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

    const defaultDropdownItemRender = useCallback(
      (item: any) => (
        <Box className={cn('p-3', dropdownItemProps?.className)} style={{ flex: 1 }}>
          {hasHighlightString ? (
            <HighlightString
              text={valueField ? get(item, valueField) : item}
              highlightTerm={highlightProps?.highlightTerm ?? state.searchText ?? ''}
              stringProps={dropdownItemProps?.stringItemProps ?? {}}
              {...highlightProps}
            />
          ) : (
            <String {...dropdownItemProps?.stringItemProps} color="black">
              {valueField ? get(item, valueField) : item}
            </String>
          )}
        </Box>
      ),
      [dropdownItemProps, valueField, highlightProps, hasHighlightString, state.searchText],
    );

    const renderDropdownItem = useCallback(
      (item: any) => {
        if (customDropdownItem) {
          const selected = valueField ? isEqual(get(item, valueField), isSelected) : false;
          return customDropdownItem(item, selected);
        }

        return defaultDropdownItemRender(item);
      },
      [customDropdownItem, isSelected, defaultDropdownItemRender, valueField],
    );

    useEffect(() => {
      setDropdownContent(
        instanceId,
        <InputDropdown
          {...dropdownProps}
          visible={instance?.showDropdown ?? false}
          maxHeight={maxHeight}
          minHeight={minHeight}
          data={state.listData}
          onSelectItem={selectItem}
          dropdownItemProps={dropdownItemProps}
          DropdownItemRender={renderDropdownItem}
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

/**
 * AutocompleteDropdown provides a smart dropdown with search functionality and auto-completion features.
 * Supports custom rendering, positioning, and advanced search capabilities.
 *
 * @example
 * ```tsx
 * <AutocompleteDropdown
 *   dataSet={data}
 *   valueField="name"
 *   searchField="name"
 *   onSelectItem={(item) => console.log('Selected:', item)}
 *   inputProps={{
 *     placeholder: 'Search...',
 *   }}
 * />
 * ```
 *
 * @example
 * // With custom rendering
 * <AutocompleteDropdown
 *   dataSet={products}
 *   valueField="name"
 *   customDropdownItem={(item, selected) => (
 *     <Box className={`p-3 ${selected ? 'bg-blue-100' : 'bg-white'}`}>
 *       <String className="font-bold">{item.name}</String>
 *       <String className="text-gray-500">{item.category}</String>
 *     </Box>
 *   )}
 *   onSelectItem={(item) => console.log('Selected:', item)}
 * />
 *
 * @param dataSet - Array of data items to display in the dropdown
 * @param valueField - Field to use as the display value and identifier
 * @param onSelectItem - Callback function when an item is selected
 * @param searchField - Field to search in (defaults to valueField)
 * @param offsetX - Horizontal offset for dropdown positioning (default: 0)
 * @param offsetY - Vertical offset for dropdown positioning (default: 0)
 * @param maxHeight - Maximum height of dropdown (default: 300)
 * @param minHeight - Minimum height of dropdown (default: 0)
 * @param excludeItems - Items to exclude from dropdown
 * @param isLoading - Show loading indicator
 * @param hasPerformSearch - Enable search functionality (default: true)
 * @param hasHighlightString - Highlight search terms in results (default: true)
 * @param confirmSelectItem - Require confirmation before selecting
 * @param closeModalWhenSelectedItem - Close dropdown after selection (default: true)
 * @param dropdownPosition - Dropdown positioning: 'auto', 'top', or 'bottom'
 * @param onBlur - Callback when input loses focus
 * @param onFocus - Callback when input gains focus
 * @param onConfirmSelectItem - Callback for confirmed selection
 * @param searchQuery - Custom search function for filtering items
 * @param customDropdownItem - Custom renderer for dropdown items
 * @param inputProps - Props to pass to the input component
 * @param dropdownItemProps - Props for styling dropdown items
 * @param dropdownListProps - Props for the dropdown FlatList
 * @param dropdownProps - Props for the dropdown container
 * @param highlightProps - Props for text highlighting configuration
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/AutocompleteDropdown/README.md Documentation}
 */
const MemoizedAutocompleteDropdown = memo(AutocompleteDropdown);

export default MemoizedAutocompleteDropdown;
