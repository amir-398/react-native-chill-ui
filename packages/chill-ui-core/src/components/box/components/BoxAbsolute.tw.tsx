import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxAbsolute />` component positions its children absolutely within a relative container using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxAbsolute } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Box className="relative h-32 w-32">
 *   <BoxAbsolute className="top-2 right-2 bg-red-500 rounded-full w-6 h-6" />
 *   <String>Content</String>
 * </Box>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the absolutely positioned container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxAbsolute(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxAbsolute, className)} {...rest} />;
}

BoxAbsolute.displayName = 'BoxAbsolute';

export { BoxAbsolute };
