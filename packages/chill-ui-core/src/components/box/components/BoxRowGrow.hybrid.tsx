import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowGrow />` component creates a horizontal flex container that expands to fill available space and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowGrow className="bg-gray-100">
 *   <String>This row will expand to fill available space</String>
 *   <Button>Action</Button>
 * </BoxRowGrow>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the row container
 * @param style - Style object for the box container (alternative to className)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowGrow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowGrow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowGrow, className))}
      {...styleHandler({ defaultStyle: styles.rowGrow, style })}
      {...rest}
    />
  );
}

BoxRowGrow.displayName = 'BoxRowGrow';

export { BoxRowGrow };
