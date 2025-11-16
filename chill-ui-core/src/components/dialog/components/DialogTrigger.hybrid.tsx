import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { DialogTriggerPropsTw } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '@components/ripplePressable';
import { classNameHandler, classNamePropsHandler, cn, SlotTw, styleHandler } from '@utils';

import { useDialog } from './DialogContext';
import { styles } from '../styles/Dialog.ss.styles';
import { twStyles } from '../styles/Dialog.tw.styles';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogTrigger component that opens the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DialogTrigger asChild>
 *   <Button title="Open Dialog" />
 * </DialogTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @param className - Custom CSS classes (NativeWind only)
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: PropsWithChildren<DialogTriggerPropsTw>) {
  classNamePropsHandler(props, 'DialogTrigger');
  const { as = dialogDefaultProps.as, asChild, children, className, style } = props;
  const { open } = useDialog();
  const handlePress = () => {
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
    ...classNameHandler(cn(twStyles.triggerBase, className)),
    ...styleHandler({ defaultStyle: styles.triggerBase, style }),
    onPress: handlePress,
    style,
  };

  if (as === 'ripple-pressable') {
    return (
      <Box>
        <RipplePressable {...commonProps}>{children}</RipplePressable>
      </Box>
    );
  }

  if (as === 'touchable-opacity') {
    return (
      <Box>
        <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>
      </Box>
    );
  }

  return (
    <Box>
      <Pressable {...commonProps}>{children}</Pressable>
    </Box>
  );
}

DialogTrigger.displayName = 'DialogTrigger';
