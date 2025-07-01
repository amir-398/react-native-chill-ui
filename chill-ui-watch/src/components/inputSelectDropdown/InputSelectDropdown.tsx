import { View } from 'react-native';
import React, { memo } from 'react';

import cn from '../cn';
import { get } from '../../utils';
import Input from '../inputs/Input';
import { useInputSelectDropdown } from './hooks';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { IDropdownRef, DEFAULT_CONFIG, CompleteInputSelectDropdownProps } from './types';

const InputSelectDropdown = React.forwardRef<IDropdownRef, CompleteInputSelectDropdownProps<any>>(
  (props, currentRef) => {
    const {
      autoScroll = true,
      closeModalWhenSelectedItem = true,
      confirmSelectItem,
      customDropdownItem,
      customInputSearch,
      dataSet = [],
      disable = false,
      dropdownItemProps,
      dropdownPosition = 'auto',
      dropdownProps,
      excludeItems = [],
      excludeSearchItems = [],
      hasSearch = false,
      inputProps,
      keyboardAvoiding = true,
      maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
      minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
      onBlur,
      onConfirmSelectItem,
      onFocus,
      onSelectItem,
      searchField,
      searchInputProps,
      searchQuery,
      valueField,
    } = props;

    // Utilisation du hook principal qui combine toute la logique
    const { containerRef, measureComponent, position, state, toggleDropdown } = useInputSelectDropdown(
      {
        autoScroll,
        dataSet,
        disable,
        excludeItems,
        excludeSearchItems,
        inputValue: inputProps?.value,
        onBlur,
        onFocus,
        searchField,
        searchQuery,
        valueField,
      },
      currentRef,
    );

    const isSelected = state.currentValue && get(state.currentValue, valueField);

    return (
      <View
        className={cn('justify-center', inputProps?.containerClassName)}
        ref={containerRef}
        onLayout={measureComponent}
      >
        <Input
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
          dropdownPosition={position}
          toggleDropdown={toggleDropdown}
          dropdownProps={{
            data: state.listData,
            dropdownItemProps,
            hasSearch,
            maxHeight,
            minHeight,
            onSelectItem: item => {
              onSelectItem?.(item);
              toggleDropdown();
            },
            valueField,
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
      </View>
    );
  },
);

InputSelectDropdown.displayName = 'InputSelectDropdown';

export default memo(InputSelectDropdown);
