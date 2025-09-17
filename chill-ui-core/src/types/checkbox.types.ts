import type { VariantProps } from 'tailwind-variants';

import type { TIcons } from '../constants/ICONS';
import type { IconSizeVr } from '../components/icon/Icon';

import { checkboxVariants } from '../components/checkbox/styleVariants';

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
  /** Label text for the checkbox */
  label?: string;
  /** Color of the checkbox icon */
  iconColor?: string;
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
  /** Icon name to display when checked */
  iconName?: keyof TIcons;
  /** Custom CSS classes for the label */
  labelClassName?: string;
  /** Custom CSS classes when checked */
  checkedClassName?: string;
  /** Custom icon component */
  customIcon?: React.ReactNode;
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Size variant for the checkbox */
  size?: VariantProps<typeof IconSizeVr>['size'];
  /** Style variant for the checkbox */
  variant?: VariantProps<typeof checkboxVariants>['variant'];
}
