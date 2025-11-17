import { Switch } from 'react-native';
import { TogglePropsTw } from '@types';
import { BoxTw } from '@components/box';
import { cn, isUndefined } from '@utils';
import { useEffect, useState } from 'react';

import { toggleTv } from '../styles/toggle.tw.styles';
import { toggleDefaultProps } from '../utils/defaultProps';

/**
 * Toggle component that provides a switch-like interface for boolean values.
 * Built on top of React Native's Switch component with enhanced styling and state management.
 * Features customizable colors, sizes, and support for loading and disabled states.
 *
 * @example
 * ```tsx
 * // Basic toggle
 * <Toggle value={isEnabled} onChange={setIsEnabled} />
 * ```
 *
 * @param value - Current toggle state (true for on, false for off)
 * @param onChange - Callback function called when toggle state changes
 * @param size - Toggle size variant (default: 'md') lg, md, sm, xl, xs
 * @param isDisabled - Whether the toggle is disabled (default: false)
 * @param isLoading - Whether the toggle is in loading state (default: false)
 * @param className - Custom CSS classes for the container
 * @param thumbColorOn - Color of the thumb when toggle is on
 * @param thumbColorOff - Color of the thumb when toggle is off
 * @param trackColorOn - Color of the track when toggle is on
 * @param trackColorOff - Color of the track when toggle is off
 * @param style - Custom style for the container (only NativeWind)
 * @returns Toggle component with switch-like interface
 */
export function Toggle(props: TogglePropsTw) {
  const {
    className,
    isDisabled = toggleDefaultProps.isDisabled,
    isLoading = toggleDefaultProps.isLoading,
    onChange,
    size = toggleDefaultProps.size,
    style,
    thumbColorOff,
    thumbColorOn,
    trackColorOff,
    trackColorOn,
    value,
  } = props;
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (v: boolean) => {
    if (isDisabled || isLoading) return;
    if (isUndefined(value)) {
      setInternalValue(v);
    }
    onChange?.(v);
  };

  return (
    <BoxTw>
      <Switch
        thumbColor={
          internalValue
            ? (thumbColorOn ?? toggleDefaultProps.thumbColorOn)
            : (thumbColorOff ?? toggleDefaultProps.thumbColorOff)
        }
        trackColor={{
          false: trackColorOff ?? toggleDefaultProps.trackColorOff,
          true: trackColorOn ?? toggleDefaultProps.trackColorOn,
        }}
        ios_backgroundColor={trackColorOff}
        onValueChange={handleChange}
        value={internalValue}
        disabled={isLoading || isDisabled}
        className={cn(toggleTv({ size }), className)}
        style={style}
      />
    </BoxTw>
  );
}

Toggle.displayName = 'Toggle';
