import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { View as NativeView } from './View';
import styles from '../styles/Box.ss.styles';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumn />` component provides a vertical flex column and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumn } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumn className="gap-4">
 *   <String>Item 1</String>
 *   <String>Item 2</String>
 * </BoxColumn>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumn(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumn');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumn, className))}
      {...styleHandler({ defaultStyle: styles.column, style })}
      {...rest}
    />
  );
}

BoxColumn.displayName = 'BoxColumn';

export { BoxColumn };
