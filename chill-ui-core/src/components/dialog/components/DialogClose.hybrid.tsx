import type { DialogClosePropsTw } from '@types';

import { PropsWithChildren } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '@components/ripplePressable';
import { classNameHandler, SlotTw, styleHandler } from '@utils';

import { useDialog } from './DialogContext';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogClose component that closes the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DialogClose>
 *   <Button title="Close" />
 * </DialogClose>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @returns Touchable close component with proper event handling
 */
function DialogClose(props: PropsWithChildren<DialogClosePropsTw>) {
  const { as = dialogDefaultProps.as, asChild, children, className, style } = props;
  const { close } = useDialog();
  const handleClose = () => {
    close();
  };

  if (asChild) {
    return (
      <SlotTw onPress={handleClose} {...classNameHandler(className)} style={style}>
        {children}
      </SlotTw>
    );
  }

  if (as === 'ripple-pressable') {
    return (
      <RipplePressable onPress={handleClose} {...classNameHandler(className)} {...styleHandler({ style })}>
        {children}
      </RipplePressable>
    );
  }
  if (as === 'touchable-opacity') {
    return (
      <TouchableOpacity onPress={handleClose} {...classNameHandler(className)} {...styleHandler({ style })}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <Pressable onPress={handleClose} {...classNameHandler(className)} {...styleHandler({ style })}>
      {children}
    </Pressable>
  );
}

DialogClose.displayName = 'DialogClose';

export { DialogClose };
