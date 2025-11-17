import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxColumnGrow />` component creates a vertical flex container that expands to fill available space and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnGrow className="gap-4 p-4">
 *   <String>Header</String>
 *   <BoxGrow className="border border-gray-200 rounded p-4">
 *     <String>This content area will expand to fill available space</String>
 *   </BoxGrow>
 *   <String>Footer</String>
 * </BoxColumnGrow>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the column container
 * @param style - Style object for the box container (alternative to className)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnGrow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnGrow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnGrow, className))}
      {...styleHandler({ defaultStyle: styles.columnGrow, style })}
      {...rest}
    />
  );
}

BoxColumnGrow.displayName = 'BoxColumnGrow';

export { BoxColumnGrow };
