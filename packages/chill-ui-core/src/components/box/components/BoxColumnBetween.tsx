import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnBetween />` component stacks items vertically with `space-between` distribution and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnBetween>
 *   <String>Header</String>
 *   <String>Content</String>
 *   <String>Footer</String>
 * </BoxColumnBetween>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnBetween(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnBetween');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnBetween, className))}
      {...styleHandler({ defaultStyle: styles.columnBetween, style })}
      {...rest}
    />
  );
}

BoxColumnBetween.displayName = 'BoxColumnBetween';

export { BoxColumnBetween };
