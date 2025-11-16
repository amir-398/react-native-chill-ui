import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { String } from '@components/string';
import { DropdownMenuItemPropsTw } from '@types';
import { Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';
import { isString, classNameHandler, classNamePropsHandler, cn, SlotTw, styleHandler } from '@utils';

import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuItemDefaultProps } from '../utils/defaultProps';
import { dropdownMenuItemSv, styles } from '../styles/DropdownMenu.ss.styles';
import { dropdownMenuItemTv, twStyles } from '../styles/DropdownMenu.tw.styles';

/**
 * The <DropdownMenuItem /> component is a touchable item that can be selected to close the dropdown.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuItem onSelect={() => console.log('Item selected')}>
 *   Item 1
 * </DropdownMenuItem>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Item content (string or React element)
 * @param className - Custom CSS classes (NativeWind only)
 * @param closeOnSelect - Close dropdown when item is selected (default: true)
 * @param isDisabled - Whether the item is disabled (default: false)
 * @param onSelect - Callback when item is selected
 * @param stringProps - Props for String component when children is a string
 * @param style - Style object for the item
 * @param underlayColor - Underlay color for touchable-highlight (default: '#f0f0f0')
 * @returns Touchable item component with selection handling
 */
export function DropdownMenuItem(props: PropsWithChildren<DropdownMenuItemPropsTw>) {
  classNamePropsHandler(props, 'DropdownMenuItem');
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

  const content = isString(children) ? <String {...stringProps}>{children}</String> : children;

  const commonProps = {
    ...classNameHandler(cn(twStyles.item, dropdownMenuItemTv({ isDisabled }), className)),
    ...styleHandler({ defaultStyle: [styles.item, dropdownMenuItemSv({ isDisabled })], style }),
    disabled: isDisabled,
    onPress: handlePress,
  };

  if (as === 'touchable-opacity') {
    return (
      <Box>
        <TouchableOpacity {...commonProps}>{content}</TouchableOpacity>
      </Box>
    );
  }

  if (as === 'touchable-highlight') {
    return (
      <Box>
        <TouchableHighlight {...commonProps} underlayColor={underlayColor}>
          {content}
        </TouchableHighlight>
      </Box>
    );
  }

  return (
    <Box>
      <Pressable {...commonProps}>{content}</Pressable>
    </Box>
  );
}

DropdownMenuItem.displayName = 'DropdownMenuItem';
