import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRow />` component creates a horizontal flex container using Tailwind CSS classes and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRow className="gap-2 p-4">
 *   <String>Item 1</String>
 *   <String>Item 2</String>
 * </BoxRow>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the row container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRow(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxRow, className)} {...rest} />;
}

BoxRow.displayName = 'BoxRow';

export { BoxRow };
