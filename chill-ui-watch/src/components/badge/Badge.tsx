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

/**
 * Badge component displays small labels, tags, or status indicators.
 * Supports both text and icon content with customizable colors, sizes, and border radius variants.
 *
 * @example
 * ```tsx
 * <Badge size="md" rounded="md">
 *   New
 * </Badge>
 *
 * <Badge
 *   badgeColor="#3B82F6"
 *   textColor="#FFFFFF"
 *   size="lg"
 *   rounded="full"
 * >
 *   Custom
 * </Badge>
 *
 * <Badge
 *   iconProps={{ name: 'star', color: '#FFD700' }}
 *   size="lg"
 *   rounded="full"
 * />
 * ```
 *
 * @param badgeColor - Custom background color for the badge
 * @param children - Content to display in the badge
 * @param className - Custom CSS classes
 * @param iconProps - Props for the icon component (when displaying icon instead of text)
 * @param rounded - Border radius variant (default: 'md')
 * @param size - Size variant for the badge (default: 'md')
 * @param stringProps - Props for the string/text component
 * @param textColor - Custom text color
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/badge/README.md Documentation}
 */
export default function Badge({
  badgeColor,
  children,
  className,
  iconProps,
  rounded = 'md',
  size = 'md',
  stringProps,
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
      {iconProps && iconProps?.name ? (
        <Icon {...iconProps} name={iconProps?.name} size={size} />
      ) : (
        <String size={size} weight="semiBold" style={{ ...(textColor && { color: textColor }) }} {...stringProps}>
          {children}
        </String>
      )}
    </Box>
  );
}
