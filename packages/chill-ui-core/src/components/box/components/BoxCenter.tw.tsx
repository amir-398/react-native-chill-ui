import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxCenter />` component centers its children both horizontally and vertically using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxCenter className="h-48 w-48 bg-blue-100 rounded-lg">
 *   <String>Centered Content</String>
 * </BoxCenter>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxCenter(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxCenter, className)} {...rest} />;
}

BoxCenter.displayName = 'BoxCenter';

export { BoxCenter };
