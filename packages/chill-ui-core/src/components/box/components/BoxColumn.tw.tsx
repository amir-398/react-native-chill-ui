import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumn />` component creates a vertical flex column using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumn } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumn className="gap-4 p-4">
 *   <String>Top Item</String>
 *   <String>Middle Item</String>
 *   <String>Bottom Item</String>
 * </BoxColumn>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the column container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumn(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxColumn, className)} {...rest} />;
}

BoxColumn.displayName = 'BoxColumn';

export { BoxColumn };
