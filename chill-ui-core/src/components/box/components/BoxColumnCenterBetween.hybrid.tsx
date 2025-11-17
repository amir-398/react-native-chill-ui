import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnCenterBetween />` component stacks items vertically, centers them horizontally, and distributes them with `space-between`, and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnCenterBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnCenterBetween>
 *   <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
 *   <String>John Doe</String>
 *   <Button>Follow</Button>
 * </BoxColumnCenterBetween>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnCenterBetween(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnCenterBetween');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnCenterBetween, className))}
      {...styleHandler({ defaultStyle: styles.columnCenterBetween, style })}
      {...rest}
    />
  );
}

BoxColumnCenterBetween.displayName = 'BoxColumnCenterBetween';

export { BoxColumnCenterBetween };
