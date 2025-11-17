import type { DialogClosePropsTw } from '@types';

import { SlotTw } from '@utils';
import { PropsWithChildren } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableTw } from '@components/ripplePressable';

import { useDialog } from './DialogContext';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogClose component that closes the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 * Tailwind version using NativeWind for styling.
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
export function DialogClose(props: PropsWithChildren<DialogClosePropsTw>) {
  const { as = dialogDefaultProps.as, asChild, children, className, style } = props;
  const { close } = useDialog();

  const handleClose = () => {
    close();
  };

  if (asChild) {
    return (
      <SlotTw onPress={handleClose} className={className} style={style}>
        {children}
      </SlotTw>
    );
  }

  if (as === 'ripple-pressable') {
    return (
      <RipplePressableTw onPress={handleClose} className={className} style={style}>
        {children}
      </RipplePressableTw>
    );
  }
  if (as === 'touchable-opacity') {
    return (
      <TouchableOpacity onPress={handleClose} className={className} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <Pressable onPress={handleClose} className={className} style={style}>
      {children}
    </Pressable>
  );
}

DialogClose.displayName = 'DialogClose';
