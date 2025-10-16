import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { View as NativeView } from './View';
import styles from '../styles/Box.ss.styles';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxStack />` component provides a relatively positioned container for layering children and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxStack } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxStack>
 *   <Image source={{ uri: 'image.jpg' }} />
 *   <BoxAbsolute className="top-2 right-2" {'or'} style={{ top: 8, right: 8 }}>
 *     <Badge>New</Badge>
 *   </BoxAbsolute>
 * </BoxStack>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxStack(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxStack');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxStack, className))}
      {...styleHandler({ defaultStyle: styles.stack, style })}
      {...rest}
    />
  );
}

BoxStack.displayName = 'BoxStack';

export { BoxStack };
