import { Switch } from 'react-native';

import type { ToggleProps } from '../../types/toggle.types';

import { Box } from '../box';

/** Available size options for the toggle component */
export const SIZE_OPTIONS = ['small', 'large'];

/** Default thumb color when toggle is on */
const defaultThumbColorOn = '#000';
/** Default thumb color when toggle is off */
const defaultThumbColorOff = '#f3f3f3';
/** Default track color when toggle is off */
const defaultTrackColorOff = '#CBCFD3';
/** Default track color when toggle is on */
const defaultTrackColorOn = '#CBCFD3';

/**
 * Toggle component that provides a switch-like interface for boolean values.
 * Built on top of React Native's Switch component with enhanced styling and state management.
 * Features customizable colors, sizes, and support for loading and disabled states.
 *
 * @example
 * ```tsx
 * // Basic toggle
 * <Toggle value={isEnabled} onChange={setIsEnabled} />
 *
 * // Small toggle with custom colors
 * <Toggle
 *   value={isEnabled}
 *   onChange={setIsEnabled}
 *   size="small"
 *   thumbColorOn="#3B82F6"
 *   trackColorOn="#DBEAFE"
 * />
 *
 * // Disabled toggle
 * <Toggle
 *   value={isEnabled}
 *   onChange={setIsEnabled}
 *   isDisabled={true}
 * />
 *
 * // Loading state toggle
 * <Toggle
 *   value={isEnabled}
 *   onChange={setIsEnabled}
 *   isLoading={true}
 * />
 * ```
 *
 * @param value - Current toggle state (true for on, false for off)
 * @param onChange - Callback function called when toggle state changes
 * @param size - Toggle size variant ('small' or 'large', default: 'large')
 * @param isDisabled - Whether the toggle is disabled (default: false)
 * @param isLoading - Whether the toggle is in loading state (default: false)
 * @param className - Custom CSS classes for the container
 * @param thumbColorOn - Color of the thumb when toggle is on
 * @param thumbColorOff - Color of the thumb when toggle is off
 * @param trackColorOn - Color of the track when toggle is on
 * @param trackColorOff - Color of the track when toggle is off
 * @returns Toggle component with switch-like interface
 */
export default function Toggle(props: ToggleProps) {
  const {
    className,
    isDisabled = false,
    isLoading = false,
    onChange,
    size = 'large',
    thumbColorOff,
    thumbColorOn,
    trackColorOff,
    trackColorOn,
    value,
  } = props;

  /** Scale factor based on size variant */
  const scale = size === 'small' ? 0.7 : 1;

  return (
    <Box className={className}>
      <Switch
        thumbColor={value ? (thumbColorOn ?? defaultThumbColorOn) : (thumbColorOff ?? defaultThumbColorOff)}
        trackColor={{
          false: trackColorOff ?? defaultTrackColorOff,
          true: trackColorOn ?? defaultTrackColorOn,
        }}
        ios_backgroundColor={trackColorOff}
        onValueChange={onChange}
        value={value}
        disabled={isLoading || isDisabled}
        style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
      />
    </Box>
  );
}
