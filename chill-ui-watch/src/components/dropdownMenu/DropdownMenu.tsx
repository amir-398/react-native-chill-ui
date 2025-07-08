import { useCallback, useMemo } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import useDropdownMenu from './hooks/useDropdownMenu';
import { DEFAULT_CONFIG } from '../inputSelectDropdown/types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { DropdownMenuItemProps, DropdownMenuProps } from '../../types';

function DropdownMenu({
  children,
  className,
  customItemRender,
  disabled = false,
  dropdownItemProps,
  dropdownPosition = 'auto',
  hasAnimation = true,
  hasScroll = true,
  horizontalPosition = 'auto',
  items,
  maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
  minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
  modalProps,
  offsetX = 0,
  offsetY = 5,
  onClose,
  onOpen,
  onSelectItem,
  selectedItem,
  triggerClassName,
  triggerStyle,
  width = 200,
}: DropdownMenuProps) {
  // Utilisation du hook principal pour gérer l'état du dropdown
  const { dropdownRef, dropdownStyles, handleSelectItem, inputRef, toggleDropdown, visible, wrapperRef } =
    useDropdownMenu(
      {
        closeModalWhenSelectedItem: true,
        disabled,
        dropdownWidth: width,
        hasScroll,
        horizontalPosition,
        items,
        offsetX,
        offsetY,
        onBlur: onClose,
        onFocus: onOpen,
        onSelectItem,
        selectedItem,
        verticalPosition: dropdownPosition,
      },
      null,
    );

  // Render par défaut d'un item du menu
  const defaultItemRender = useCallback(
    (item: DropdownMenuItemProps) => (
      <TouchableHighlight
        key={item.id}
        disabled={item.disabled}
        onPress={() => handleSelectItem(item)}
        underlayColor={dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8'}
      >
        <Box className={cn('flex-row items-center gap-3 p-4', dropdownItemProps?.className)}>
          {item.customLeftIcon
            ? item.customLeftIcon
            : item.leftIcon && <Icon name={item.leftIcon} size="sm" color={item.disabled ? 'gray' : 'black'} />}
          <String
            className={`flex-1 ${item.disabled ? 'text-gray-400' : 'text-black'}`}
            {...dropdownItemProps?.stringItemProps}
          >
            {item.label}
          </String>
          {item.customRightIcon
            ? item.customRightIcon
            : item.rightIcon && <Icon name={item.rightIcon} size="sm" color={item.disabled ? 'gray' : 'black'} />}
        </Box>
      </TouchableHighlight>
    ),
    [
      handleSelectItem,
      dropdownItemProps?.activeBackgroundColor,
      dropdownItemProps?.className,
      dropdownItemProps?.stringItemProps,
    ],
  );

  // Render personnalisé d'un item du menu
  const customDropdownItem = useCallback(
    (item: DropdownMenuItemProps) => {
      if (item.customRender) {
        return item.customRender();
      }

      if (customItemRender) {
        return customItemRender(item);
      }

      return defaultItemRender(item);
    },
    [customItemRender, defaultItemRender],
  );

  // Filtrer les éléments actifs
  const activeItems = useMemo(() => items.filter(item => !item.disabled), [items]);

  return (
    <>
      {/* Trigger qui ouvre le menu */}
      <TouchableOpacity
        ref={inputRef}
        onPress={disabled ? undefined : toggleDropdown}
        style={triggerStyle}
        className={triggerClassName}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Box className="flex-row items-center">{children}</Box>
      </TouchableOpacity>

      {/* Modal du dropdown */}
      {dropdownStyles && (
        <InputDropdownModal
          dropdownRef={dropdownRef}
          wrapperRef={wrapperRef}
          dropdownPosition={dropdownStyles}
          toggleDropdown={toggleDropdown}
          dropdownProps={{
            className,
            customDropdownItem: (item: any) => customDropdownItem(item as DropdownMenuItemProps),
            customSearchInput: undefined,
            data: activeItems,
            dropdownItemProps: undefined,
            dropdownListProps: {
              scrollEnabled: hasScroll,
            },
            hasAnimation,
            hasSearch: false,
            maxHeight,
            minHeight,
            onSelectItem: handleSelectItem,
            valueField: 'id',
            visible,
          }}
          modalProps={{
            onRequestClose: toggleDropdown,
            statusBarTranslucent: true,
            transparent: true,
            visible,
            ...modalProps,
          }}
        />
      )}
    </>
  );
}

export default DropdownMenu;
