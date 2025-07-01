import type { VariantProps } from 'tailwind-variants';

import type { TIcons } from '../constants/ICONS';

import { badgeVariants } from '../components/badge/Badge';

export interface BadgeProps {
  className?: string;
  textColor?: string;
  iconColor?: string;
  badgeColor?: string;
  textClassName?: string;
  iconName?: keyof TIcons;
  children?: React.ReactNode;
  rounded?: VariantProps<typeof badgeVariants>['rounded'];
  size?: '2xl' | '2xs' | '3xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
}
