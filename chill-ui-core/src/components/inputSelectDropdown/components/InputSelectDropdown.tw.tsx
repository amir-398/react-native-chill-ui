import { BoxTw } from '@components/box';
import { cn, get, isEqual } from '@utils';
import { InputTw } from '@components/input';
import { StringTw } from '@components/string';
import { forwardRef, useCallback } from 'react';
import { InputSelectDropdownPropsTw } from '@types';
import { HighlightStringTw } from '@components/highlightString';

import { InputDropdownModalTw } from '@/components/inputDropdown';

import { useInputSelectDropdown } from '../hooks';
import { IDropdownRef, DEFAULT_CONFIG } from '../types';
import { twStyles } from '../styles/InputSelectDropdown.tw.styles';
import { inputSelectDropdownDefaultProps } from '../utils/defaultProps';

/**
 * InputSelectDropdown component that combines an input field with a searchable dropdown.
 * Supports custom rendering, highlighting, filtering, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <InputSelectDropdownTw
 *   dataSet={[
 *     { id: 1, name: 'John Doe', email: 'john@example.com' },
 *     { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
 *   ]}
 *   valueField="name"
 *   searchField="email"
 *   hasSearch
 *   hasHighlightString
 *   onSelectItem={(item) => setSelectedUser(item)}
 *   customDropdownItem={(item, selected) => (
 *     <BoxTw className={selected ? 'bg-blue-100' : ''}>
 *       <StringTw>{item.name}</StringTw>
 *       <StringTw size="sm" color="gray">{item.email}</StringTw>
 *     </BoxTw>
 *   )}
 * />
 * ```
 *
 * @param closeModalWhenSelectedItem - Whether to close modal when item is selected
 * @param customDropdownItem - Custom render function for dropdown items
 * @param customSearchInput - Custom search input component
 * @param dataSet - Array of data items to display in dropdown
 * @param dropdownItemProps - Props for dropdown items
 * @param dropdownPosition - Position of dropdown ('auto' | 'top' | 'bottom')
 * @param dropdownProps - Additional props for dropdown component
 * @param excludeItems - Items to exclude from dropdown
 * @param excludeSearchItems - Items to exclude from search results
 * @param hasHighlightString - Whether to highlight search terms
 * @param hasSearch - Whether to show search functionality
 * @param highlightProps - Props for highlight string functionality
 * @param inputProps - Props for the input component
 * @param maxHeight - Maximum height of dropdown
 * @param minHeight - Minimum height of dropdown
 * @param offsetX - Horizontal offset for dropdown positioning
 * @param offsetY - Vertical offset for dropdown positioning
 * @param onBlur - Callback when input loses focus
 * @param onFocus - Callback when input gains focus
 * @param onSelectItem - Callback when item is selected
 * @param searchField - Field name to use for search
 * @param searchInputProps - Props for search input
 * @param searchQuery - Custom search query function
 * @param valueField - Field name to use as display value
 * @param open - Whether the dropdown is open (controlled)
 * @param onOpenChange - Callback when dropdown open state changes
 * @param defaultOpen - Default open state (uncontrolled)
 * @param ref - Forwarded ref to dropdown component
 * @returns InputSelectDropdown component with searchable dropdown
 */
export const InputSelectDropdown = forwardRef<IDropdownRef, InputSelectDropdownPropsTw<any>>((props, currentRef) => {
  const {
    closeModalWhenSelectedItem = inputSelectDropdownDefaultProps.closeModalWhenSelectedItem,
    customDropdownItem,
    customSearchInput,
    dataSet = inputSelectDropdownDefaultProps.dataSet,
    defaultOpen,
    dropdownItemProps,
    dropdownPosition = inputSelectDropdownDefaultProps.dropdownPosition,
    dropdownProps,
    excludeItems = inputSelectDropdownDefaultProps.excludeItems,
    excludeSearchItems = inputSelectDropdownDefaultProps.excludeSearchItems,
    hasHighlightString = inputSelectDropdownDefaultProps.hasHighlightString,
    hasSearch = inputSelectDropdownDefaultProps.hasSearch,
    highlightProps,
    inputProps,
    maxHeight = inputSelectDropdownDefaultProps.maxHeight,
    minHeight = inputSelectDropdownDefaultProps.minHeight,
    offsetX = inputSelectDropdownDefaultProps.offsetX,
    offsetY = inputSelectDropdownDefaultProps.offsetY,
    onBlur,
    onFocus,
    onOpenChange,
    onSelectItem,
    open,
    searchField,
    searchInputProps,
    searchQuery,
    valueField,
  } = props;

  const {
    dropdownRef,
    dropdownStyles,
    handleSelectItem,
    inputRef,
    setCurrentValue,
    setSearchText,
    state,
    toggleDropdown,
    wrapperRef,
  } = useInputSelectDropdown(
    {
      closeModalWhenSelectedItem,
      dataSet,
      defaultOpen,
      disable: inputProps?.isDisabled,
      excludeItems,
      excludeSearchItems,
      inputValue: inputProps?.value,
      offsetX,
      offsetY,
      onBlur,
      onFocus,
      onOpenChange,
      onSelectItem,
      open,
      position: dropdownPosition,
      searchField,
      searchQuery,
      valueField,
    },
    currentRef,
  );

  const isSelected = state.currentValue && get(state.currentValue, valueField);

  /**
   * Handles clearing the selected value
   */
  const handleClearValue = useCallback(() => {
    setCurrentValue(null);
    onSelectItem?.(null);
  }, [setCurrentValue, onSelectItem]);

  /**
   * Default render function for dropdown items with highlighting support
   * @param item - The item to render
   * @returns Rendered dropdown item component
   */
  const defaultDropdownItemRender = useCallback(
    (item: any) => (
      <BoxTw
        className={cn(twStyles.defaultDropdownItemRender, dropdownItemProps?.className)}
        style={dropdownItemProps?.style}
      >
        {hasHighlightString ? (
          <HighlightStringTw
            content={valueField ? get(item, valueField) : item}
            highlightTerm={highlightProps?.highlightTerm ?? state.searchText ?? ''}
            stringProps={dropdownItemProps?.stringItemProps ?? {}}
            {...highlightProps}
          />
        ) : (
          <StringTw {...dropdownItemProps?.stringItemProps}>{valueField ? get(item, valueField) : item}</StringTw>
        )}
      </BoxTw>
    ),
    [dropdownItemProps, valueField, highlightProps, hasHighlightString, state.searchText],
  );

  /**
   * Renders dropdown item using custom render function or default
   * @param item - The item to render
   * @returns Rendered dropdown item component
   */
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

  return (
    <>
      <InputTw
        wrapperRef={inputRef}
        editable={false}
        onPress={toggleDropdown}
        placeholder={inputProps?.placeholder ?? DEFAULT_CONFIG.PLACEHOLDER}
        value={isSelected ? get(state.currentValue, valueField) : undefined}
        rightIconAction={{
          hasPressEffect: false,
          iconColor: 'black',
          iconName: state.visible ? 'angle-up-solid' : 'angle-down-solid',
          iconPress: toggleDropdown,
        }}
        clearIconProps={{
          onPress: handleClearValue,
        }}
        {...inputProps}
      />

      <InputDropdownModalTw
        dropdownRef={dropdownRef}
        wrapperRef={wrapperRef}
        dropdownPosition={dropdownStyles}
        backdropPress={toggleDropdown}
        dropdownProps={{
          customSearchInput,
          data: state.listData,
          dropdownItemProps: {
            activeBackgroundColor: dropdownItemProps?.activeBackgroundColor,
            stringItemProps: dropdownItemProps?.stringItemProps,
          },
          DropdownItemRender: renderDropdownItem,
          hasSearch,
          itemClickableAs: inputSelectDropdownDefaultProps.itemClickableAs,
          maxHeight,
          minHeight,
          onSelectItem: handleSelectItem,
          searchInputProps: {
            ...searchInputProps,
            onChangeText: setSearchText,
            value: state.searchText,
          },

          visible: state.visible,
          ...dropdownProps,
        }}
        modalProps={{
          onRequestClose: toggleDropdown,
          statusBarTranslucent: true,
          transparent: true,
          visible: state.visible,
        }}
      />
    </>
  );
});

InputSelectDropdown.displayName = 'InputSelectDropdown';
