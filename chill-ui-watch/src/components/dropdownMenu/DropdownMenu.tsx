import { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import { DEFAULT_CONFIG } from '../inputSelectDropdown/types';
import { DropdownMenuProps, DropdownMenuItem } from '../../types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { useInputSelectDropdown } from '../inputSelectDropdown/hooks';

function DropdownMenu({
  children,
  customItemRender,
  disabled = false,
  dropdownPosition = 'auto',
  items,
  maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
  minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
  modalProps,
  offsetX = 0,
  offsetY = 5,
  onClose,
  onOpen,
  onSelectItem,
  triggerClassName,
  triggerStyle,
}: DropdownMenuProps) {
  // Utilisation du hook principal pour gérer l'état du dropdown
  const { dropdownRef, dropdownStyles, handleSelectItem, inputRef, state, toggleDropdown, wrapperRef } =
    useInputSelectDropdown(
      {
        closeModalWhenSelectedItem: true,
        dataSet: items,
        disable: disabled,
        excludeItems: [],
        excludeSearchItems: [],
        inputValue: null,
        offsetX,
        offsetY,
        onBlur: onClose,
        onFocus: onOpen,
        onSelectItem: (item: DropdownMenuItem) => {
          // Appeler d'abord l'action personnalisée de l'élément
          item.onPress?.();
          // Puis le callback global
          onSelectItem?.(item);
        },
        position: dropdownPosition,
        searchField: 'label',
        searchQuery: () => true,
        valueField: 'id',
      },
      null,
    );

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
            hasSearch: false, // Pas de recherche pour un menu simple
            maxHeight,
            minHeight,
            onSelectItem: handleSelectItem,
            valueField: 'id',
            visible: state.visible,
          }}
          modalProps={{
            onRequestClose: toggleDropdown,
            statusBarTranslucent: true,
            transparent: true,
            visible: state.visible,
            ...modalProps,
          }}
        />
      )}
    </>
  );
}

export default DropdownMenu;
