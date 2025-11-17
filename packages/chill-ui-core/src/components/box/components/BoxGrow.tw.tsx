import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxGrow />` component creates a flex container that expands to fill available space using Tailwind CSS classes and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxGrow className="bg-gray-100 p-4">
 *   <String>This will expand to fill available space</String>
 * </BoxGrow>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxGrow(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxGrow, className)} {...rest} />;
}

BoxGrow.displayName = 'BoxGrow';

export { BoxGrow };
