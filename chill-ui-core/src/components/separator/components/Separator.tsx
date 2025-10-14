import { Box } from '@components/box';
import { SeparatorPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/Separator.ss.styles';
import { twStyles } from '../styles/Separator.tw.styles';

/**
 * Separator component that displays a horizontal line for visual separation.
 * A simple and lightweight component for creating visual dividers between content sections.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic separator
 * <Separator />
 * ```
 *
 * @param className - Custom CSS classes for styling the separator
 * @param style - Style object for the separator
 * @param viewProps - Rest of the view props
 */
export function Separator(props: SeparatorPropsTw) {
  classNamePropsHandler(props, 'Separator');
  const { className, style, ...rest } = props;
  return (
    <Box
      {...classNameHandler(cn(twStyles.separator, className))}
      {...styleHandler({ defaultStyle: styles.separator, style })}
      {...rest}
    />
  );
}

Separator.displayName = 'Separator';
