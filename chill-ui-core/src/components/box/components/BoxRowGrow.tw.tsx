import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowGrow />` component creates a horizontal flex container that expands to fill available space using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowGrow className="bg-gray-100">
 *   <String>This row will expand to fill available space</String>
 *   <Button>Action</Button>
 * </BoxRowGrow>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the row container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowGrow(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxRowGrow, className)} {...rest} />;
}

BoxRowGrow.displayName = 'BoxRowGrow';

export { BoxRowGrow };
