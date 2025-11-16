import { Box } from '@components/box';
import { SeparatorPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/Separator.ss.styles';
import { twStyles } from '../styles/Separator.tw.styles';

/**
 * The `<Separator />` component displays a horizontal line for visual separation.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Separator } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Separator />
 * ```
 *
 * @param className - Custom CSS classes for styling the separator (NativeWind)
 * @param style - Style object for the separator
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
