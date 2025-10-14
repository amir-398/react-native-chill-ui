import { BoxSs } from '@components/box';
import { SeparatorPropsSs } from '@types';

import { styles } from '../styles/Separator.ss.styles';

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
 * @param style - Style object for the separator
 * @param viewProps - Rest of the view props
 */
export function Separator(props: SeparatorPropsSs) {
  const { style, ...rest } = props;
  return <BoxSs style={[styles.separator, style]} {...rest} />;
}

Separator.displayName = 'Separator';
