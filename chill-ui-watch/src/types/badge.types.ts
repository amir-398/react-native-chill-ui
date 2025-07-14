import type { VariantProps } from 'tailwind-variants';

import { IconProps } from './icon.types';
import { StringProps } from './string.types';
import { badgeVariants } from '../components/badge/Badge';

export interface BadgeProps {
  className?: string;
  textColor?: string;
  badgeColor?: string;
  iconProps?: IconProps;
  stringProps?: StringProps;
  children?: React.ReactNode;
  rounded?: VariantProps<typeof badgeVariants>['rounded'];
  size?: '2xl' | '2xs' | '3xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
}
