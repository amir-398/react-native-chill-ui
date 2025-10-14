import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { DropdownMenuSeparatorPropsTw } from '@types';

import { twStyles } from '../styles/DropdownMenu.tw.styles';

/**
 * DropdownMenuSeparator component that renders a visual separator within a dropdown menu.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuSeparator />
 *
 * // With custom styling
 * <DropdownMenuSeparator className="h-2 bg-black" />
 * ```
 *
 * @param className - Custom CSS classes (NativeWind)
 * @param style - Style object for the separator
 * @returns Separator component for dropdown menu sections
 */
export function DropdownMenuSeparator(props: DropdownMenuSeparatorPropsTw) {
  const { className, ...rest } = props;
  return <BoxTw className={cn(twStyles.separator, className)} {...rest} />;
}
