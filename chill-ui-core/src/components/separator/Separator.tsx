import { cn } from '@utils';

import { Box } from '../box';
import { SeparatorProps } from '../../types/separator.types';

/**
 * Separator component that displays a horizontal line for visual separation.
 * A simple and lightweight component for creating visual dividers between content sections.
 *
 * @example
 * ```tsx
 * // Basic separator
 * <Separator />
 *
 * // Custom styled separator
 * <Separator className="h-0.5 bg-gray-300" />
 *
 * // Thick separator with custom color
 * <Separator className="h-1 bg-primary" />
 * ```
 *
 * @param className - Custom CSS classes for styling the separator
 */
export default function Separator({ className }: SeparatorProps) {
  return <Box className={cn('h-px bg-black', className)} />;
}
