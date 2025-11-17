import { VariantProps } from 'tailwind-variants';
import { StyleProp, ViewStyle } from 'react-native';
import { checkboxTv } from '@components/checkbox/styles/Checkbox.tw.styles';

import { IconProps } from '../icon/icon.tw.types';
import { StringProps } from '../string/string.tw.types';

/**
 * Props for the Checkbox component
 */
export type CheckboxProps = VariantProps<typeof checkboxTv> & {
  /** Label text for the checkbox */
  label?: string;
  /** Custom CSS classes for the checkbox container */
  className?: string;
  /** Whether the checkbox is checked */
  isChecked?: boolean;
  /** Whether the checkbox is disabled */
  isDisabled?: boolean;
  /** Color when checkbox is checked */
  checkedColor?: string;
  /** Custom size of the checkbox */
  checkboxSize?: number;
  /** Color when checkbox is unchecked */
  uncheckedColor?: string;
  /** Custom CSS classes when checked */
  checkedClassName?: string;
  /** Callback when checkbox state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Props for the icon */
  iconProps?: Partial<IconProps>;
  /** Props for the label */
  labelProps?: Partial<StringProps>;

  /** Style object for the checkbox container */
  style?: StyleProp<ViewStyle>;
  /** Whether the label is pressable */
  isLabelPressable?: boolean;

  /** Style object for the checkbox container when checked */
  checkedStyle?: StyleProp<ViewStyle>;
};
