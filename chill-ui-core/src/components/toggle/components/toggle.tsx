import { Switch } from 'react-native';
import { Box } from '@components/box';
import { TogglePropsTw } from '@types';
import { useEffect, useState } from 'react';
import { classNameHandler, cn, isUndefined, styleHandler } from '@utils';

import { toggleTv } from '../styles/toggle.tw.styles';
import { toggleSv } from '../styles/toggle.ss.styles';
import { toggleDefaultProps } from '../utils/defaultProps';

/**
 * The `<Toggle />` component provides a switch-like interface for boolean values.
 * Built on top of React Native's Switch component with enhanced styling and state management.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Toggle } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Toggle value={isEnabled} onChange={setIsEnabled} />
 * ```
 *
 * @param className - Custom CSS classes for the container (NativeWind)
 * @param isDisabled - Whether the toggle is disabled (default: false)
 * @param isLoading - Whether the toggle is in loading state (default: false)
 * @param onChange - Callback function called when toggle state changes
 * @param size - Toggle size variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * @param style - Custom style for the container
 * @param thumbColorOff - Color of the thumb when toggle is off
 * @param thumbColorOn - Color of the thumb when toggle is on
 * @param trackColorOff - Color of the track when toggle is off
 * @param trackColorOn - Color of the track when toggle is on
 * @param value - Current toggle state (true for on, false for off)
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
    <Box>
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
        {...classNameHandler(cn(toggleTv({ size }), className))}
        {...styleHandler({ defaultStyle: toggleSv({ size }), style })}
      />
    </Box>
  );
}

Toggle.displayName = 'Toggle';
