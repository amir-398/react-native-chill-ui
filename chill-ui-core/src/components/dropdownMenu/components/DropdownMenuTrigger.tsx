import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { DropdownMenuTriggerPropsTw } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';
import { classNameHandler, classNamePropsHandler, cn, SlotTw, styleHandler } from '@utils';

import { twStyles } from '../styles/DropdownMenu.tw.styles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuTriggerDefaultProps } from '../utils/defaultProps';

/**
 * DropdownMenuTrigger component that opens the dropdown when pressed.
 * Supports different touchable types and can clone child elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuTrigger asChild>
 *   <Button title="Cloned Trigger" />
 * </DropdownMenuTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dropdown
 * @param className - Custom CSS classes (NativeWind only)
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DropdownMenuTrigger(props: PropsWithChildren<DropdownMenuTriggerPropsTw>) {
  classNamePropsHandler(props, 'DropdownMenuTrigger');
  const { as = dropdownMenuTriggerDefaultProps.as, asChild, children, className, style } = props;
  const { eventOpen, inputRef } = useDropdownMenuContext();
  const handlePress = () => {
    eventOpen();
  };

  if (asChild) {
    return (
      <SlotTw onPress={handlePress} ref={inputRef} className={className} style={style}>
        {children}
      </SlotTw>
    );
  }

  const commonProps = {
    ...classNameHandler(cn(twStyles.trigger, className)),
    ...styleHandler({ defaultStyle: twStyles.trigger, style }),
    onPress: handlePress,
    ref: inputRef,
    style,
  };

  if (as === 'touchable-opacity') {
    return (
      <Box>
        <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>
      </Box>
    );
  }

  return (
    <Box>
      <Pressable {...commonProps}>{children}</Pressable>
    </Box>
  );
}

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
