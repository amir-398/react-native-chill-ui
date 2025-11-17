import type { DialogClosePropsSs } from '@types';

import { SlotSs } from '@utils';
import { PropsWithChildren } from 'react';
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
export function DialogClose(props: PropsWithChildren<DialogClosePropsSs>) {
  const { as = dialogDefaultProps.as, asChild, children, style } = props;
  const { close } = useDialog();
  const handleClose = () => {
    close();
  };

  if (asChild) {
    return (
      <SlotSs onPress={handleClose} style={style}>
        {children}
      </SlotSs>
    );
  }

  if (as === 'ripple-pressable') {
    return (
      <RipplePressableSs onPress={handleClose} style={style}>
        {children}
      </RipplePressableSs>
    );
  }
  if (as === 'touchable-opacity') {
    return (
      <TouchableOpacity onPress={handleClose} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <Pressable onPress={handleClose} style={style}>
      {children}
    </Pressable>
  );
}

DialogClose.displayName = 'DialogClose';
