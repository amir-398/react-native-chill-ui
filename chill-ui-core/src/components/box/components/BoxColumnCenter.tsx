import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { View as NativeView } from './View';
import styles from '../styles/Box.ss.styles';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnCenter />` component stacks items vertically with horizontal centering and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnCenter>
 *   <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
 *   <String>John Doe</String>
 * </BoxColumnCenter>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnCenter(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnCenter');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnCenter, className))}
      {...styleHandler({ defaultStyle: styles.columnCenter, style })}
      {...rest}
    />
  );
}

BoxColumnCenter.displayName = 'BoxColumnCenter';

export { BoxColumnCenter };
