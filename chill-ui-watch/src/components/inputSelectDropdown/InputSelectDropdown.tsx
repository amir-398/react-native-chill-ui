import React, { memo, useCallback } from 'react';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import Input from '../inputs/Input';
import { get, isEqual } from '../../utils';
import { useInputSelectDropdown } from './hooks';
import HighlightString from '../highlightString';
import { IDropdownRef, DEFAULT_CONFIG } from './types';
import { InputSelectDropdownProps } from '../../types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';

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
