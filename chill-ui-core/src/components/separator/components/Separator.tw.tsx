import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { SeparatorPropsTw } from '@types';

import { twStyles } from '../styles/Separator.tw.styles';

/**
 * Separator component that displays a horizontal line for visual separation.
 * A simple and lightweight component for creating visual dividers between content sections.
 *
 * @example
 * ```tsx
 * // Basic separator
 * <Separator />
 * ```
 *
 * @param className - Custom CSS classes for styling the separator
 * @param viewProps - Rest of the view props
 */
export function Separator(props: SeparatorPropsTw) {
  const { className, ...rest } = props;
  return <BoxTw className={cn(twStyles.separator, className)} {...rest} />;
}

Separator.displayName = 'Separator';
