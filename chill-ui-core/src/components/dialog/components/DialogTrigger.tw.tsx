import type { DialogTriggerPropsTw } from '@types';

import { cn, SlotTw } from '@utils';
import { BoxTw } from '@components/box';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableTw } from '@components/ripplePressable';

import { useDialog } from './DialogContext';
import { twStyles } from '../styles/Dialog.tw.styles';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogTrigger component that opens the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DialogTrigger asChild>
 *   <Button title="Cloned Trigger" />
 * </DialogTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @param className - Custom CSS classes
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: DialogTriggerPropsTw) {
  const { as = dialogDefaultProps.as, asChild, children, className, style } = props;
  const { open } = useDialog();

  const handlePress = () => {
    console.log('handlePress');
    open();
  };

  if (asChild) {
    return (
      <SlotTw onPress={handlePress} className={className} style={style}>
        {children}
      </SlotTw>
    );
  }

  const commonProps = {
    className: cn(twStyles.triggerBase, className),
    onPress: handlePress,
    style,
  };

  if (as === 'ripple-pressable') {
    return (
      <BoxTw>
        <RipplePressableTw {...commonProps}>{children}</RipplePressableTw>
      </BoxTw>
    );
  }

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

DialogTrigger.displayName = 'DialogTrigger';
