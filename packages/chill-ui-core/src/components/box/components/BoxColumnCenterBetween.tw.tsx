import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnCenterBetween />` component centers items horizontally and distributes them with `space-between` in a vertical column using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnCenterBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnCenterBetween className="h-64">
 *   <String>Header</String>
 *   <String>Centered Content</String>
 *   <String>Footer</String>
 * </BoxColumnCenterBetween>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnCenterBetween(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxColumnCenterBetween, className)} {...rest} />;
}

BoxColumnCenterBetween.displayName = 'BoxColumnCenterBetween';

export { BoxColumnCenterBetween };
