import { Switch } from 'react-native';

import { Box } from '../box';

export const SIZE_OPTIONS = ['small', 'large'];

interface ToggleProps {
  value: boolean;
  testID: string;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange: (value: boolean) => void;
  size?: (typeof SIZE_OPTIONS)[number];
}

const thumbColorOn = '#fff';
const thumbColorOff = '#f3f3f3';
const trackColorOff = '#CBCFD3';

export default function Toggle(props: ToggleProps) {
  const { className, isDisabled = false, isLoading = false, onChange, size = 'large', testID, value } = props;

  const scale = size === 'small' ? 0.7 : 1;

  return (
    <Box className={className}>
      <Switch
        thumbColor={value ? thumbColorOn : thumbColorOff}
        trackColor={{ false: trackColorOff, true: trackColorOff }}
        ios_backgroundColor={trackColorOff}
        onValueChange={onChange}
        value={value}
        disabled={isLoading || isDisabled}
        testID={testID}
        style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
      />
    </Box>
  );
}
