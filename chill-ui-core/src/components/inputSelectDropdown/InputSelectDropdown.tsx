import { cn } from '@utils';
import React, { memo, useCallback } from 'react';

import { Box } from '../box';
import { String } from '../string';
import Input from '../inputs/Input';
import { get, isEqual } from '../../utils';
import { useInputSelectDropdown } from './hooks';
import HighlightString from '../highlightString';
import { IDropdownRef, DEFAULT_CONFIG } from './types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { InputSelectDropdownProps } from '../../types/inputSelectDropdown.types';

/**
 * InputSelectDropdown component that combines an input field with a searchable dropdown.
 * Supports custom rendering, highlighting, filtering, and keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic usage with simple data
 * <InputSelectDropdown
 *   dataSet={['Apple', 'Banana', 'Cherry']}
 *   valueField="name"
 *   onSelectItem={(item) => console.log('Selected:', item)}
 * />
 *
 * // Advanced usage with complex data
 * <InputSelectDropdown
 *   dataSet={[
 *     { id: 1, name: 'John Doe', email: 'john@example.com' },
 *     { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
 *   ]}
 *   valueField="name"
 *   searchField="email"
 *   hasSearch={true}
 *   hasHighlightString={true}
 *   onSelectItem={(item) => setSelectedUser(item)}
 *   customDropdownItem={(item, selected) => (
 *     <Box className={selected ? 'bg-blue-100' : ''}>
 *       <String>{item.name}</String>
 *       <String size="sm" color="gray">{item.email}</String>
 *     </Box>
 *   )}
 * />
 *
 * // With search and filtering
 * <InputSelectDropdown
 *   dataSet={users}
 *   valueField="name"
 *   searchField="email"
 *   hasSearch={true}
 *   searchQuery={(keyword, labelValue) =>
 *     labelValue.toLowerCase().includes(keyword.toLowerCase())
 *   }
 *   excludeItems={[currentUser]}
 *   onSelectItem={handleUserSelect}
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
 * @param ref - Forwarded ref to dropdown component
 * @returns InputSelectDropdown component with searchable dropdown
 */
const InputSelectDropdown = React.forwardRef<IDropdownRef, InputSelectDropdownProps<any>>((props, currentRef) => {
  const {
    closeModalWhenSelectedItem = true,
    customDropdownItem,
    customSearchInput,
    dataSet = [],
    dropdownItemProps,
    dropdownPosition = 'auto',
    dropdownProps,
    excludeItems = [],
    excludeSearchItems = [],
    hasHighlightString = true,
    hasSearch = false,
    highlightProps,
    inputProps,
    maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
    minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
    offsetX = 0,
    offsetY = 0,
    onBlur,
    onFocus,
    onSelectItem,
    searchField,
    searchInputProps,
    searchQuery,
    valueField,
  } = props;

  // Utilisation du hook principal qui combine toute la logique
  const { dropdownRef, dropdownStyles, handleSelectItem, inputRef, setSearchText, state, toggleDropdown, wrapperRef } =
    useInputSelectDropdown(
      {
        closeModalWhenSelectedItem,
        dataSet,
        disable: inputProps?.isDisabled,
        excludeItems,
        excludeSearchItems,
        inputValue: inputProps?.value,
        offsetX,
        offsetY,
        onBlur,
        onFocus,
        onSelectItem,
        position: dropdownPosition,
        searchField,
        searchQuery,
        valueField,
      },
      currentRef,
    );

  const isSelected = state.currentValue && get(state.currentValue, valueField);

  /**
   * Default render function for dropdown items with highlighting support
   * @param item - The item to render
   * @returns Rendered dropdown item component
   */
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
      <Input
        wrapperRef={inputRef}
        editable={false}
        onPress={toggleDropdown}
        placeholder={inputProps?.placeholder ?? DEFAULT_CONFIG.PLACEHOLDER}
        value={isSelected ? get(state.currentValue, valueField) : undefined}
        rightIconAction={{
          iconColor: 'black',
          iconName: state.visible ? 'angle-up-solid' : 'angle-down-solid',
          iconPress: toggleDropdown,
        }}
        {...inputProps}
      />

      <InputDropdownModal
        dropdownRef={dropdownRef}
        wrapperRef={wrapperRef}
        dropdownPosition={dropdownStyles}
        toggleDropdown={toggleDropdown}
        dropdownProps={{
          customSearchInput,
          data: state.listData,
          dropdownItemProps,
          DropdownItemRender: renderDropdownItem,
          hasSearch,
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

export default memo(InputSelectDropdown);
