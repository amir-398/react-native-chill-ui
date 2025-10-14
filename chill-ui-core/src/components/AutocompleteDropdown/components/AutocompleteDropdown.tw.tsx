import { BoxTw } from '@components/box';
import { TextInput } from 'react-native';
import { InputTw } from '@components/input';
import { StringTw } from '@components/string';
import { cn, get, isEqual, debounce } from '@utils';
import { InputDropdownTw } from '@components/inputDropdown';
import { HighlightStringTw } from '@components/highlightString';
import { AutocompleteDropdownRefPropsTw, AutocompleteDropdownPropsTw } from '@types';
import { useCallback, useEffect, useImperativeHandle, useRef, useMemo, forwardRef } from 'react';

import useDropdownActions from '../hooks/useDropdownActions';
import useDropdownKeyboard from '../hooks/useDropdownKeyboard';
import useGetDropdownPosition from '../hooks/useGetDropdownPosition';
import { autocompleteDropdownDefaultProps } from '../utils/defaultProps';
import { useAutocompleteDropdownState } from '../hooks/useCompleteDropdownState';
import useAutocompleteDropdownProvider from '../hooks/useAutocompleteDropdownProvider';

/**
 * AutocompleteDropdown component with Tailwind styling.
 * Provides a smart dropdown with search functionality and auto-completion features.
 *
 * @example
 * ```tsx
 * // Basic autocomplete dropdown
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
 * @returns Styled autocomplete dropdown component with search and selection functionality using Tailwind CSS
 */
export const AutocompleteDropdown = forwardRef<AutocompleteDropdownRefPropsTw, AutocompleteDropdownPropsTw<any>>(
  (props, currentRef) => {
    const {
      closeModalWhenSelectedItem = autocompleteDropdownDefaultProps.closeModalWhenSelectedItem,
      confirmSelectItem,
      customDropdownItem,
      dataSet = autocompleteDropdownDefaultProps.dataSet,
      dropdownItemProps,
      dropdownListProps,
      dropdownPosition,
      dropdownProps,
      excludeItems = autocompleteDropdownDefaultProps.excludeItems,
      hasHighlightString = autocompleteDropdownDefaultProps.hasHighlightString,
      hasPerformSearch = autocompleteDropdownDefaultProps.hasPerformSearch,
      highlightProps,
      inputProps,
      isLoading,
      maxHeight = autocompleteDropdownDefaultProps.maxHeight,
      minHeight,
      offsetX = autocompleteDropdownDefaultProps.offsetX,
      offsetY = autocompleteDropdownDefaultProps.offsetY,
      onBlur,
      onChangeText,
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

    useEffect(() => {
      registerInstance(instanceId, inputContainerRef, offsetX, offsetY);
      return () => {
        unregisterInstance(instanceId);
      };
    }, [instanceId, registerInstance, unregisterInstance, offsetX, offsetY]);

    const instance = getInstance(instanceId);

    const { state, updateState } = useAutocompleteDropdownState(dataSet);

    useEffect(() => {
      updateState({ listData: dataSet });
    }, [dataSet, updateState]);

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
        updateState({ currentValue: item, searchText: '' });
        onSelectItem?.(item);

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
        onChangeText?.(text);
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
        onChangeText,
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
        <BoxTw className={cn('p-3', dropdownItemProps?.className)} style={{ flex: 1 }}>
          {hasHighlightString ? (
            <HighlightStringTw
              content={valueField ? get(item, valueField) : item}
              highlightTerm={highlightProps?.highlightTerm ?? state.searchText ?? ''}
              stringProps={dropdownItemProps?.stringItemProps ?? {}}
              {...highlightProps}
            />
          ) : (
            <StringTw {...dropdownItemProps?.stringItemProps} color="#000">
              {valueField ? get(item, valueField) : item}
            </StringTw>
          )}
        </BoxTw>
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
        <InputDropdownTw
          {...dropdownProps}
          visible={instance?.showDropdown ?? false}
          maxHeight={maxHeight}
          minHeight={minHeight}
          itemClickableAs="touchable-opacity"
          data={state.listData}
          onSelectItem={selectItem}
          dropdownItemProps={dropdownItemProps}
          DropdownItemRender={renderDropdownItem}
          dropdownListProps={dropdownListProps}
          emptyText={dropdownProps?.emptyText ?? autocompleteDropdownDefaultProps.emptyText}
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
      <InputTw
        ref={inputRef}
        wrapperRef={inputContainerRef}
        placeholder={inputProps?.placeholder ?? autocompleteDropdownDefaultProps.placeholder}
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
