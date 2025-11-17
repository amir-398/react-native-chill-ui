import { BoxSs } from '@components/box';
import { SeparatorPropsSs } from '@types';

import { styles } from '../styles/Separator.ss.styles';

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
 * @param style - Style object for the separator
 * @param viewProps - Rest of the view props
 */
export function Separator(props: SeparatorPropsSs) {
  const { style, ...rest } = props;
  return <BoxSs style={[styles.separator, style]} {...rest} />;
}

Separator.displayName = 'Separator';
