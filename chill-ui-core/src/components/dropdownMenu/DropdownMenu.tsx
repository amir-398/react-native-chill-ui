import { cn } from '@utils';
import { useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { TouchableHighlight, TouchableOpacity, Pressable } from 'react-native';

import Icon from '../icon';
import { Box } from '../box';
import { String } from '../string';
import { RipplePressable } from '../ripplePressable';
import useDropdownMenu from './hooks/useDropdownMenu';
import { DEFAULT_CONFIG } from '../inputSelectDropdown/types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { DropdownMenuItemProps, DropdownMenuProps, DropdownMenuRef } from '../../types/dropdownMenu.types';

const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>(
  (
    {
      children,
      className,
      closeDropdownWhenSelectedItem = true,
      customItemRender,
      dataSet,
      disabled = false,
      dropdownItemProps,
      dropdownListProps,
      dropdownPosition = 'auto',
      hasAnimation = true,
      hasScroll = true,
      horizontalPosition = 'auto',
      itemClickableAs = 'TouchableHighlight',
      maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
      minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
      modalProps,
      offsetX = 0,
      offsetY = 5,
      onClose,
      onOpen,
      onSelectItem,
      selectedItem,
      triggerAs = 'TouchableOpacity',
      triggerClassName,
      triggerStyle,
      width = 200,
    },
    ref,
  ) => {
    const {
      dropdownRef,
      dropdownStyles,
      eventClose,
      eventOpen,
      handleSelectItem,
      inputRef,
      toggleDropdown,
      visible,
      wrapperRef,
    } = useDropdownMenu(
      {
        closeModalWhenSelectedItem: closeDropdownWhenSelectedItem,
        disabled,
        dropdownWidth: width,
        hasScroll,
        horizontalPosition,
        items: dataSet,
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

    // Exposer les méthodes via useImperativeHandle
    useImperativeHandle(
      ref,
      () => ({
        close: eventClose,
        open: eventOpen,
        toggle: toggleDropdown,
      }),
      [eventOpen, eventClose, toggleDropdown],
    );

    const defaultItemRender = useCallback(
      (item: DropdownMenuItemProps) => (
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
      ),
      [dropdownItemProps?.className, dropdownItemProps?.stringItemProps],
    );

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

    const activeItems = useMemo(() => dataSet.filter((item: DropdownMenuItemProps) => !item.disabled), [dataSet]);

    const renderTrigger = useCallback(() => {
      if (triggerAs === 'none') {
        return null;
      }

      const commonTriggerProps = {
        className: triggerClassName,
        disabled,
        onPress: disabled ? undefined : toggleDropdown,
        ref: inputRef,
        style: triggerStyle,
      };

      const triggerContent = <Box className="flex-row items-center">{children}</Box>;

      switch (triggerAs) {
        case 'TouchableHighlight':
          return (
            <TouchableHighlight {...commonTriggerProps} underlayColor="#F6F7F8">
              {triggerContent}
            </TouchableHighlight>
          );
        case 'Pressable':
          return (
            <Pressable {...commonTriggerProps} android_ripple={{ color: '#F6F7F8' }}>
              {triggerContent}
            </Pressable>
          );
        case 'RipplePressable':
          // @ts-ignore
          return <RipplePressable {...commonTriggerProps}>{triggerContent}</RipplePressable>;
        case 'TouchableOpacity':
        default:
          return (
            <TouchableOpacity {...commonTriggerProps} activeOpacity={0.7}>
              {triggerContent}
            </TouchableOpacity>
          );
      }
    }, [triggerAs, inputRef, disabled, toggleDropdown, triggerStyle, triggerClassName, children]);

    return (
      <>
        {/* trigger */}
        {renderTrigger()}

        {/* modal */}
        {dropdownStyles && (
          <InputDropdownModal
            dropdownRef={dropdownRef}
            wrapperRef={wrapperRef}
            dropdownPosition={dropdownStyles}
            toggleDropdown={toggleDropdown}
            dropdownProps={{
              className,
              customSearchInput: undefined,
              data: activeItems,
              dropdownItemProps: undefined,
              DropdownItemRender: (item: any) => customDropdownItem(item as DropdownMenuItemProps),
              dropdownListProps: {
                scrollEnabled: hasScroll,
                ...dropdownListProps,
              },
              hasAnimation,
              hasSearch: false,
              itemClickableAs,
              maxHeight,
              minHeight,
              onSelectItem: handleSelectItem,
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
  },
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
