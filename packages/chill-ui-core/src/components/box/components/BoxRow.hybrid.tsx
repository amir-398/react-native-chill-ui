import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.hybrid';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRow />` component provides a horizontal flex row and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRow className="gap-4">
 *   <String>Item 1</String>
 *   <String>Item 2</String>
 * </BoxRow>
 * ```
 *
 * @param children - Child components to render
 * @param className - Custom CSS classes for the box container (NativeWind)
 * @param style - Style object for the box container
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 */
function BoxRow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRow, className))}
      {...styleHandler({ defaultStyle: styles.row, style })}
      {...rest}
    />
  );
}

BoxRow.displayName = 'BoxRow';

export { BoxRow };
