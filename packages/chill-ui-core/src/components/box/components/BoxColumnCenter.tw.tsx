import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnCenter />` component centers its children both horizontally and vertically in a column layout using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnCenter className="h-64 bg-gray-100 p-4">
 *   <String>Centered Content</String>
 *   <Button>Click Me</Button>
 * </BoxColumnCenter>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnCenter(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxColumnCenter, className)} {...rest} />;
}

BoxColumnCenter.displayName = 'BoxColumnCenter';

export { BoxColumnCenter };
