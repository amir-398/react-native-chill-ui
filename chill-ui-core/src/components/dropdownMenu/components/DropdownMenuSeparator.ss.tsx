import { BoxSs } from '@components/box';
import { DropdownMenuSeparatorPropsSs } from '@types';

import { styles } from '../styles/DropdownMenu.ss.styles';

/**
 * DropdownMenuSeparator component that renders a visual separator within a dropdown menu.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DropdownMenuSeparator />
 *
 * // With custom styling
 * <DropdownMenuSeparator style={{ height: 2, backgroundColor: '#000' }} />
 * ```
 *
 * @param style - Style object for the separator
 * @returns Separator component for dropdown menu sections
 */
export function DropdownMenuSeparator(props: DropdownMenuSeparatorPropsSs) {
  const { style, ...rest } = props;
  return <BoxSs style={[styles.separator, style]} {...rest} />;
}
