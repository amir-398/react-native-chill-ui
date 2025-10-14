import { cn, SlotTw } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { DropdownMenuTriggerPropsTw } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';

import { twStyles } from '../styles/DropdownMenu.tw.styles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuTriggerDefaultProps } from '../utils/defaultProps';

/**
 * DropdownMenuTrigger component that opens the dropdown when pressed.
 * Supports different touchable types and can clone child elements.
 *
 * @example
 * ```tsx
 * <DropdownMenuTrigger className="bg-blue-500 hover:bg-blue-600" asChild>
 *   <Button title="Open Menu" />
 * </DropdownMenuTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dropdown
 * @param className - Custom CSS classes
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DropdownMenuTrigger(props: PropsWithChildren<DropdownMenuTriggerPropsTw>) {
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
    className: cn(twStyles.trigger, className),
    onPress: handlePress,
    ref: inputRef,
    style,
  };

  if (as === 'touchable-opacity') {
    return (
      <BoxTw>
        <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>
      </BoxTw>
    );
  }

  return (
    <BoxTw>
      <Pressable {...commonProps}>{children}</Pressable>
    </BoxTw>
  );
}

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
