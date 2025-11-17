import { VariantProps } from '@utils';
import { StyleProp, ViewStyle } from 'react-native';
import { checkboxSv } from '@components/checkbox/styles/Checkbox.ss.styles';

import { IconProps } from '../icon/icon.ss.types';
import { StringProps } from '../string/string.ss.types';

/**
 * Props for the Checkbox component (StyleSheet version)
 */
export type CheckboxPropsSs = VariantProps<typeof checkboxSv> & {
  /** Whether the checkbox is checked */
  isChecked?: boolean;
  /** Whether the checkbox is disabled */
  isDisabled?: boolean;
  /** Label text for the checkbox */
  label?: string;
  /** Callback when checkbox state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Color when checkbox is checked */
  checkedColor?: string;
  /** Color when checkbox is unchecked */
  uncheckedColor?: string;
  /** Custom size of the checkbox */
  checkboxSize?: number;
  /** Style object for the checkbox container */
  style?: StyleProp<ViewStyle>;
  /** Props for the icon */
  iconProps?: Partial<IconProps>;
  /** Props for the label */
  labelProps?: Partial<StringProps>;
  /** Whether the label is pressable */
  isLabelPressable?: boolean;

  /** Style object for the checkbox container when checked */
  checkedStyle?: StyleProp<ViewStyle>;
};
