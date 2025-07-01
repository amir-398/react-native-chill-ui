import { SIZE_OPTIONS } from '../components/toggle/toggle';

export type ToggleProps = {
  value: boolean;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange: (value: boolean) => void;
  size?: (typeof SIZE_OPTIONS)[number];
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOff?: string;
  trackColorOn?: string;
};
