import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnGrow />` component creates a vertical flex container that expands to fill available space using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnGrow className="gap-4 p-4">
 *   <String>Header</String>
 *   <BoxGrow className="border border-gray-200 rounded p-4">
 *     <String>This content area will expand to fill available space</String>
 *   </BoxGrow>
 *   <String>Footer</String>
 * </BoxColumnGrow>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the column container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnGrow(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxColumnGrow, className)} {...rest} />;
}

BoxColumnGrow.displayName = 'BoxColumnGrow';

export { BoxColumnGrow };
