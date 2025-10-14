import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { SlotSs, isString } from '@utils';
import { StringSs } from '@components/string';
import { DropdownMenuItemPropsSs } from '@types';
import { Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';

import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuItemDefaultProps } from '../utils/defaultProps';
import { dropdownMenuItemSv, styles } from '../styles/DropdownMenu.ss.styles';

/**
 * DropdownMenuItem component that renders a selectable item within a dropdown menu.
 * Supports different touchable types, custom styling, and selection behaviors.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem as="touchable-highlight" underlayColor="#f0f0f0">
 *   Item 1
 * </DropdownMenuItem>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Item content (string or React element)
 * @param closeOnSelect - Close dropdown when item is selected (default: true)
 * @param disabled - Whether the item is disabled (default: false)
 * @param onSelect - Callback when item is selected
 * @param stringProps - Props for String component when children is a string
 * @param style - Style object for the item
 * @param underlayColor - Underlay color for touchable-highlight (default: '#f0f0f0')
 * @returns Touchable item component with selection handling
 */
export function DropdownMenuItem(props: PropsWithChildren<DropdownMenuItemPropsSs>) {
  const {
    as = dropdownMenuItemDefaultProps.as,
    asChild,
    children,
    closeOnSelect = dropdownMenuItemDefaultProps.closeOnSelect,
    isDisabled = dropdownMenuItemDefaultProps.isDisabled,
    onSelect,
    stringProps,
    style,
    underlayColor = dropdownMenuItemDefaultProps.underlayColor,
  } = props;
  const { eventClose } = useDropdownMenuContext();

  const handlePress = () => {
    if (isDisabled) return;
    onSelect?.();
    if (closeOnSelect) {
      eventClose();
    }
  };

  if (asChild) {
    return (
      <SlotSs onPress={handlePress} style={style} disabled={isDisabled}>
        {children}
      </SlotSs>
    );
  }

  const content = isString(children) ? <StringSs {...stringProps}>{children}</StringSs> : children;

  const commonProps = {
    disabled: isDisabled,
    onPress: handlePress,
    style: [styles.item, dropdownMenuItemSv({ isDisabled }), style],
  };

  if (as === 'touchable-opacity') {
    return (
      <BoxSs>
        <TouchableOpacity {...commonProps}>{content}</TouchableOpacity>
      </BoxSs>
    );
  }

  if (as === 'touchable-highlight') {
    return (
      <BoxSs>
        <TouchableHighlight {...commonProps} underlayColor={underlayColor}>
          {content}
        </TouchableHighlight>
      </BoxSs>
    );
  }

  return (
    <BoxSs>
      <Pressable {...commonProps}>{content}</Pressable>
    </BoxSs>
  );
}

DropdownMenuItem.displayName = 'DropdownMenuItem';
