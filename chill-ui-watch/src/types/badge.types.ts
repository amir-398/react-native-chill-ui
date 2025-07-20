import type { VariantProps } from 'tailwind-variants';

import { IconProps } from './icon.types';
import { StringProps } from './string.types';
import { badgeVariants } from '../components/badge/Badge';

/**
 * Props for the Badge component
 *
 */
export interface BadgeProps {
  /** Custom CSS classes to apply to the badge */
  className?: string;
  /** Custom text color (CSS color value) */
  textColor?: string;
  /** Custom background color (CSS color value) */
  badgeColor?: string;
  /** Props for the icon component (when displaying icon instead of text) */
  iconProps?: IconProps;
  /** Props for the string/text component */
  stringProps?: StringProps;
  /** Content to display in the badge */
  children?: React.ReactNode;
  /** Border radius variant - default: 'md' */
  rounded?: VariantProps<typeof badgeVariants>['rounded'];
  /** Size variant for the badge - default: 'md' */
  size?: '2xl' | '2xs' | '3xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
}
