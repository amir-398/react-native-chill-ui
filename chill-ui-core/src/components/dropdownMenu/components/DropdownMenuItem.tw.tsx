import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { isString, cn, SlotTw } from '@utils';
import { StringTw } from '@components/string';
import { DropdownMenuItemPropsTw } from '@types';
import { Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';

import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuItemDefaultProps } from '../utils/defaultProps';
import { dropdownMenuItemTv, twStyles } from '../styles/DropdownMenu.tw.styles';

/**
 * DropdownMenuItem component that renders a selectable item within a dropdown menu.
 * Supports different touchable types, custom styling, and selection behaviors.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem
 *   className="bg-red-500 text-white"
 *   disabled={isLoading}
 * >
 *   Disabled Item
 * </DropdownMenuItem>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Item content (string or React element)
 * @param className - Custom CSS classes
 * @param closeOnSelect - Close dropdown when item is selected (default: true)
 * @param disabled - Whether the item is disabled (default: false)
 * @param onSelect - Callback when item is selected
 * @param stringProps - Props for String component when children is a string
 * @param style - Style object for the item
 * @param underlayColor - Underlay color for touchable-highlight (default: '#f0f0f0')
 * @returns Touchable item component with selection handling
 */
export function DropdownMenuItem(props: PropsWithChildren<DropdownMenuItemPropsTw>) {
  const {
    as = dropdownMenuItemDefaultProps.as,
    asChild,
    children,
    className,
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
      <SlotTw onPress={handlePress} className={className} style={style} disabled={isDisabled}>
        {children}
      </SlotTw>
    );
  }

  const commonProps = {
    className: cn(twStyles.item, dropdownMenuItemTv({ isDisabled }), className),
    disabled: isDisabled,
    onPress: handlePress,
    style,
  };

  const content = isString(children) ? <StringTw {...stringProps}>{children}</StringTw> : children;

  if (as === 'touchable-opacity') {
    return (
      <BoxTw>
        <TouchableOpacity {...commonProps}>{content}</TouchableOpacity>
      </BoxTw>
    );
  }

  if (as === 'touchable-highlight') {
    return (
      <BoxTw>
        <TouchableHighlight {...commonProps} underlayColor={underlayColor}>
          {content}
        </TouchableHighlight>
      </BoxTw>
    );
  }

  return (
    <BoxTw>
      <Pressable {...commonProps}>{content}</Pressable>
    </BoxTw>
  );
}

DropdownMenuItem.displayName = 'DropdownMenuItem';
