import { SlotSs } from '@utils';
import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { DropdownMenuTriggerPropsSs } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';

import { styles } from '../styles/DropdownMenu.ss.styles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuTriggerDefaultProps } from '../utils/defaultProps';

/**
 * DropdownMenuTrigger component that opens the dropdown when pressed.
 * Supports different touchable types and can clone child elements.
 *
 * @example
 * ```tsx
 * <DropdownMenuTrigger style={{ backgroundColor: 'red' }} asChild>
 *   <Button title="Open Menu" />
 * </DropdownMenuTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dropdown
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DropdownMenuTrigger(props: PropsWithChildren<DropdownMenuTriggerPropsSs>) {
  const { as = dropdownMenuTriggerDefaultProps.as, asChild, children, style } = props;
  const { eventOpen, inputRef } = useDropdownMenuContext();
  const handlePress = () => {
    eventOpen();
  };

  if (asChild) {
    return (
      <SlotSs onPress={handlePress} ref={inputRef} style={style}>
        {children}
      </SlotSs>
    );
  }

  const commonProps = {
    onPress: handlePress,
    ref: inputRef,
    style: [styles.trigger, style],
  };

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

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
