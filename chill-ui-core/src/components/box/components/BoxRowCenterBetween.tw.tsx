import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowCenterBetween />` component centers items vertically and distributes them with `space-between` in a horizontal row using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowCenterBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowCenterBetween className="h-12 px-4 bg-gray-100 rounded">
 *   <String>Left</String>
 *   <String>Centered</String>
 *   <String>Right</String>
 * </BoxRowCenterBetween>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the row container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowCenterBetween(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxRowCenterBetween, className)} {...rest} />;
}

BoxRowCenterBetween.displayName = 'BoxRowCenterBetween';

export { BoxRowCenterBetween };
