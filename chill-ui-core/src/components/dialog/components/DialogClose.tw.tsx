import type { DialogClosePropsTw } from '@types';

import { SlotTw } from '@utils';
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
 * @param children - Close trigger element
 * @returns Touchable close component with proper event handling
 */
export function DialogClose({ as = dialogDefaultProps.as, asChild, children }: DialogClosePropsTw) {
  const { close } = useDialog();

  const handleClose = () => {
    close();
  };

  if (asChild) {
    return <SlotTw onPress={handleClose}>{children}</SlotTw>;
  }

  if (as === 'ripple-pressable') {
    return <RipplePressableTw onPress={handleClose}>{children}</RipplePressableTw>;
  }
  if (as === 'touchable-opacity') {
    return <TouchableOpacity onPress={handleClose}>{children}</TouchableOpacity>;
  }
  return <Pressable onPress={handleClose}>{children}</Pressable>;
}

DialogClose.displayName = 'DialogClose';
