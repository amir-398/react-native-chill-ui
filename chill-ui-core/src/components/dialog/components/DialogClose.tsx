import type { DialogClosePropsTw } from '@types';

import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '@components/ripplePressable';

import { SlotTw } from '@/utils';

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
    return <RipplePressable onPress={handleClose}>{children}</RipplePressable>;
  }
  if (as === 'touchable-opacity') {
    return <TouchableOpacity onPress={handleClose}>{children}</TouchableOpacity>;
  }
  return <Pressable onPress={handleClose}>{children}</Pressable>;
}

DialogClose.displayName = 'DialogClose';
