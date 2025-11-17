import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowBetween />` component spaces items with `space-between` in a horizontal row using Tailwind CSS classes and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowBetween className="p-4">
 *   <String>Title</String>
 *   <Button>Action</Button>
 * </BoxRowBetween>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowBetween(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxRowBetween, className)} {...rest} />;
}

BoxRowBetween.displayName = 'BoxRowBetween';

export { BoxRowBetween };
