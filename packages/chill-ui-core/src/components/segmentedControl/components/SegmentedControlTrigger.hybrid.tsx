import { PropsWithChildren } from 'react';
import { String } from '@components/string';
import { SegmentedControlTriggerPropsTw } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';
import { isString, SlotTw, cn, classNameHandler, classNamePropsHandler } from '@utils';

import { twStyles } from '../styles/SegmentedControl.tw.styles';
import { useSegmentedControlState, useSegmentedControlActions } from '../context/SegmentedControlContext';

/**
 * Clickable option in a segmented control.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <SegmentedControlTrigger value="option1">
 *   Option 1
 * </SegmentedControlTrigger>
 * ```
 *
 * @param value - Unique identifier for this trigger option (required)
 * @param activeClassName - Custom CSS classes applied when this trigger is active (NativeWind)
 * @param activeStyle - Style object applied when this trigger is active (React Native)
 * @param as - Type of pressable component to render: 'pressable' or 'touchable-opacity' (default: 'pressable')
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param children - Content to display in the trigger (string or React elements) (required)
 * @param className - Custom CSS classes for styling the trigger container (NativeWind)
 * @param isDisabled - Whether the trigger is disabled and non-interactive (default: false)
 * @param stringProps - Props passed to String component when children is a string
 * @param style - Style object for the trigger container (React Native)
 * @returns SegmentedControlTrigger component that handles option selection
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlTrigger(props: PropsWithChildren<SegmentedControlTriggerPropsTw>) {
  classNamePropsHandler(props, 'SegmentedControlTrigger');
  const { activeClassName, activeStyle, as, asChild, children, className, isDisabled, stringProps, style, value } =
    props;
  const { itemWidth, selectedOption } = useSegmentedControlState();
  const { setSelectedOption } = useSegmentedControlActions();

  const handleOptionPress = () => {
    if (isDisabled) return;
    setSelectedOption(value);
  };

  const isActive = selectedOption === value;

  const content = isString(children) ? (
    <String
      {...classNameHandler(cn(isActive && stringProps?.activeClassName, stringProps?.className))}
      color={isActive ? stringProps?.activeColor : stringProps?.color}
      style={[isActive && stringProps?.activeStyle, stringProps?.style]}
      {...stringProps}
    >
      {children}
    </String>
  ) : (
    children
  );

  if (asChild) {
    return (
      <SlotTw onPress={handleOptionPress} style={{ width: itemWidth }} disabled={isDisabled}>
        {content}
      </SlotTw>
    );
  }

  const commonProps = {
    ...classNameHandler(
      cn(
        twStyles.triggerContainer,
        isDisabled && twStyles.triggerContainerDisabled,
        isActive && activeClassName,
        className,
      ),
    ),
    disabled: isDisabled,
    onPress: handleOptionPress,
    style: [
      {
        width: itemWidth,
      },
      isActive && activeStyle,
      style,
    ],
  };

  if (as === 'touchable-opacity') {
    return <TouchableOpacity {...commonProps}>{content}</TouchableOpacity>;
  }

  return <Pressable {...commonProps}>{content}</Pressable>;
}

SegmentedControlTrigger.displayName = 'SegmentedControlTrigger';
