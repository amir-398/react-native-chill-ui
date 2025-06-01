import { Switch } from 'react-native';

import type { ToggleProps } from '../../types';

import { Box } from '../box';

export const SIZE_OPTIONS = ['small', 'large'];

const defaultThumbColorOn = '#000';
const defaultThumbColorOff = '#f3f3f3';
const defaultTrackColorOff = '#CBCFD3';
const defaultTrackColorOn = '#CBCFD3';

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
