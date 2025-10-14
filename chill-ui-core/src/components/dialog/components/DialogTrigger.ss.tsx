import type { DialogTriggerPropsSs as DialogTriggerProps } from '@types';

import { SlotSs } from '@utils';
import { BoxSs } from '@components/box';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableSs } from '@components/ripplePressable';

import { useDialog } from './DialogContext';
import { styles } from '../styles/Dialog.ss.styles';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogTrigger component that opens the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 *
 * @example
 * ```tsx
 * // Basic usage
 * // Clone child element
 * <DialogTrigger asChild>
 *   <Button title="Cloned Trigger" />
 * </DialogTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: DialogTriggerProps) {
  const { as = dialogDefaultProps.as, asChild, children, style } = props;
  const { open } = useDialog();
  const handlePress = () => {
    open();
  };

  if (asChild) {
    return (
      <SlotSs onPress={handlePress} style={style}>
        {children}
      </SlotSs>
    );
  }

  const commonProps = {
    onPress: handlePress,
    style: [styles.triggerBase, style],
  };

  if (as === 'ripple-pressable') {
    return (
      <BoxSs>
        <RipplePressableSs {...commonProps}>{children}</RipplePressableSs>
      </BoxSs>
    );
  }

  if (as === 'touchable-opacity') {
    return (
      <BoxSs>
        <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>
      </BoxSs>
    );
  }

  return (
    <BoxSs>
      <Pressable {...commonProps}>{children}</Pressable>
    </BoxSs>
  );
}

DialogTrigger.displayName = 'DialogTrigger';
