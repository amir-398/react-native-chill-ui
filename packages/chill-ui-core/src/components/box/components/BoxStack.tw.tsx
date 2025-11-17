import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxStack />` component creates a stacking context for layering children using Tailwind CSS classes and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxStack } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxStack className="relative">
 *   <Image source={{ uri: 'image.jpg' }} />
 *   <BoxAbsolute className="top-2 right-2">
 *     <Badge>New</Badge>
 *   </BoxAbsolute>
 * </BoxStack>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the stack container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxStack(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxStack, className)} {...rest} />;
}

BoxStack.displayName = 'BoxStack';

export { BoxStack };
