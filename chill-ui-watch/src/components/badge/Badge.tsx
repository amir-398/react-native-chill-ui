import { tv } from 'tailwind-variants';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import { type BadgeProps } from '../../types';

export const badgeVariants = tv({
  variants: {
    padding: {
      false: 'px-2 py-1',
      true: 'p-2',
    },
    rounded: {
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm',
      xl: 'rounded-xl',
    },
  },
});

export default function Badge({
  badgeColor,
  children,
  className,
  iconColor,
  iconName,
  rounded = 'md',
  size = 'md',
  textClassName,
  textColor,
}: BadgeProps) {
  return (
    <Box
      className={cn(
        'bg-primary rounded-md px-2 py-1',
        className,
        badgeVariants({ padding: rounded === 'full', rounded }),
      )}
      style={{ ...(badgeColor && { backgroundColor: badgeColor }) }}
    >
      {iconName ? (
        <Icon name={iconName} size={size} color={iconColor} />
      ) : (
        <String
          size={size}
          weight="semiBold"
          className={textClassName}
          style={{ ...(textColor && { color: textColor }) }}
        >
          {children}
        </String>
      )}
    </Box>
  );
}
