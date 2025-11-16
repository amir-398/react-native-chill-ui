import { BoxTw } from '@components/box';
import { DropdownMenuSeparatorPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/DropdownMenu.ss.styles';
import { twStyles } from '../styles/DropdownMenu.tw.styles';

/**
 * DropdownMenuSeparator component that renders a visual separator within a dropdown menu.
 * Used to group related items or create visual breaks in the menu.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuContent>
 *   <DropdownMenuItem>Item 1</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Item 2</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 *
 * @param className - Custom CSS classes (NativeWind only)
 * @param style - Style object for the separator
 * @returns Visual separator component
 */
export function DropdownMenuSeparator(props: DropdownMenuSeparatorPropsTw) {
  classNamePropsHandler(props, 'DropdownMenuSeparator');
  const { className, style, ...rest } = props;
  return (
    <BoxTw
      {...classNameHandler(cn(twStyles.separator, className))}
      {...styleHandler({ defaultStyle: styles.separator, style })}
      {...rest}
    />
  );
}
