import { TouchableOpacity, FlatList } from 'react-native';
import { useCallback, useMemo, useEffect, useRef } from 'react';

import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import useDropdownMenu from './hooks/useDropdownMenu';
import { DEFAULT_CONFIG } from '../inputSelectDropdown/types';
import { DropdownMenuProps, DropdownMenuItem } from '../../types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';

function DropdownMenu({
  children,
  customItemRender,
  disabled = false,
  dropdownPosition = 'auto',
  hasAutoScroll = true,
  hasScroll = false,
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
  const flatListRef = useRef<FlatList>(null);

  // Utilisation du hook principal pour gérer l'état du dropdown
  const {
    dropdownRef,
    dropdownStyles,
    handleSelectItem,
    hasScroll: scrollEnabled,
    inputRef,
    refList,
    toggleDropdown,
    visible,
    wrapperRef,
  } = useDropdownMenu(
    {
      closeModalWhenSelectedItem: true,
      disabled,
      dropdownWidth: width,
      hasAutoScroll,
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

  // Connecter notre ref locale avec celle du hook
  useEffect(() => {
    if (refList && refList.current !== flatListRef.current) {
      refList.current = flatListRef.current;
    }
  }, [refList]);

  // Render par défaut d'un item du menu
  const defaultItemRender = useCallback(
    (item: DropdownMenuItem) => (
      <TouchableOpacity
        key={item.id}
        disabled={item.disabled}
        className={`flex-row items-center gap-3 p-4 ${item.disabled ? 'opacity-50' : ''}`}
        onPress={() => handleSelectItem(item)}
      >
        {item.icon && <Icon name={item.icon} size="sm" color={item.disabled ? 'gray' : 'black'} />}
        <String className={`flex-1 ${item.disabled ? 'text-gray-400' : 'text-black'}`}>{item.label}</String>
      </TouchableOpacity>
    ),
    [handleSelectItem],
  );

  // Render personnalisé d'un item du menu
  const customDropdownItem = useCallback(
    (item: DropdownMenuItem) => {
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
            customDropdownItem: (item: any) => customDropdownItem(item as DropdownMenuItem),
            customSearchInput: undefined,
            data: activeItems,
            dropdownItemProps: undefined,
            dropdownListProps: {
              scrollEnabled,
              showsVerticalScrollIndicator: scrollEnabled,
            },
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
