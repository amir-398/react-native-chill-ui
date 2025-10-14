import type { DialogClosePropsSs } from '@types';

import { SlotSs } from '@utils';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableSs } from '@components/ripplePressable';

import { useDialog } from './DialogContext';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogClose component that closes the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 * StyleSheet version using React Native StyleSheet for styling.
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
export function DialogClose({ as = dialogDefaultProps.as, asChild, children }: DialogClosePropsSs) {
  const { close } = useDialog();
  const handleClose = () => {
    close();
  };

  if (asChild) {
    return <SlotSs onPress={handleClose}>{children}</SlotSs>;
  }

  if (as === 'ripple-pressable') {
    return <RipplePressableSs onPress={handleClose}>{children}</RipplePressableSs>;
  }
  if (as === 'touchable-opacity') {
    return <TouchableOpacity onPress={handleClose}>{children}</TouchableOpacity>;
  }
  return <Pressable onPress={handleClose}>{children}</Pressable>;
}

DialogClose.displayName = 'DialogClose';
