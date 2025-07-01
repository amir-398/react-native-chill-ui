import type { VariantProps } from 'tailwind-variants';

import type { TIcons } from '../constants/ICONS';
import type { IconSizeVr } from '../components/icon/Icon';

import { checkboxVariants } from '../components/checkbox/styleVariants';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  iconColor?: string;
  className?: string;
  checkedColor?: string;
  checkboxSize?: number;
  uncheckedColor?: string;
  iconName?: keyof TIcons;
  labelClassName?: string;
  checkedClassName?: string;
  customIcon?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  size?: VariantProps<typeof IconSizeVr>['size'];
  variant?: VariantProps<typeof checkboxVariants>['variant'];
}
