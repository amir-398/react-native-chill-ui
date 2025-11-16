import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxAbsolute />` component provides an absolutely positioned container and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxAbsolute } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxAbsolute style={{ top: 10, left: 10 }}>
 *   <Badge>New</Badge>
 * </BoxAbsolute>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind only)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxAbsolute(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxAbsolute');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxAbsolute, className))}
      {...styleHandler({ defaultStyle: styles.absolute, style })}
      {...rest}
    />
  );
}

BoxAbsolute.displayName = 'BoxAbsolute';

export { BoxAbsolute };
