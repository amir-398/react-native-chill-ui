import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowCenterBetween />` component centers items vertically and distributes them with `space-between` in a horizontal row, and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowCenterBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowCenterBetween>
 *   <BoxRowCenter>
 *     <Icon name="user" />
 *     <String>John Doe</String>
 *   </BoxRowCenter>
 *   <Badge>Online</Badge>
 * </BoxRowCenterBetween>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowCenterBetween(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowCenterBetween');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowCenterBetween, className))}
      {...styleHandler({ defaultStyle: styles.rowCenterBetween, style })}
      {...rest}
    />
  );
}

BoxRowCenterBetween.displayName = 'BoxRowCenterBetween';

export { BoxRowCenterBetween };
