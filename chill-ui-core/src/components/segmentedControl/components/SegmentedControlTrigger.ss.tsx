import { PropsWithChildren } from 'react';
import { isString, SlotSs } from '@utils';
import { StringSs } from '@components/string';
import { SegmentedControlTriggerPropsSs } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';

import { styles } from '../styles/SegmentedControl.ss.styles';
import { useSegmentedControlState, useSegmentedControlActions } from '../context/SegmentedControlContext';

/**
 * Clickable option in a segmented control.
 *
 * @example
 * ```tsx
 * <SegmentedControlTrigger value="option1">
 *   Option 1
 * </SegmentedControlTrigger>
 * ```
 *
 * @param value - Unique identifier for this trigger option (required)
 * @param activeStyle - Style object applied when this trigger is active (React Native)
 * @param as - Type of pressable component to render: 'pressable' or 'touchable-opacity' (default: 'pressable')
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param children - Content to display in the trigger (string or React elements) (required)
 * @param isDisabled - Whether the trigger is disabled and non-interactive (default: false)
 * @param stringProps - Props passed to Text component when children is a string
 * @param style - Style object for the trigger container (React Native)
 * @returns SegmentedControlTrigger component that handles option selection
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlTrigger(props: PropsWithChildren<SegmentedControlTriggerPropsSs>) {
  const { activeStyle, as, asChild, children, isDisabled, stringProps, style, value } = props;
  const { itemWidth, selectedOption } = useSegmentedControlState();
  const { setSelectedOption } = useSegmentedControlActions();

  const handleOptionPress = () => {
    if (isDisabled) return;
    setSelectedOption(value);
  };

  const isActive = selectedOption === value;

  const content = isString(children) ? (
    <StringSs
      style={[isActive && stringProps?.activeStyle, stringProps?.style]}
      color={isActive ? stringProps?.activeColor : stringProps?.color}
    >
      {children}
    </StringSs>
  ) : (
    children
  );

  if (asChild) {
    return (
      <SlotSs onPress={handleOptionPress} style={{ width: itemWidth }} disabled={isDisabled}>
        {content}
      </SlotSs>
    );
  }

  const commonProps = {
    disabled: isDisabled,
    onPress: handleOptionPress,
    style: [
      styles.triggerContainer,
      isDisabled && styles.triggerContainerDisabled,
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
