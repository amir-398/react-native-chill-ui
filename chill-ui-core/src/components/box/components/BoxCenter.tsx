import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { View as NativeView } from './View';
import styles from '../styles/Box.ss.styles';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxCenter />` component perfectly centers children on both axes and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxCenter className="h-32 w-32">
 *   <String>Perfectly centered</String>
 * </BoxCenter>
 * ```
 *
 * @param className - Custom CSS classes for the box container (NativeWind only)
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxCenter(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxCenter');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxCenter, className))}
      {...styleHandler({ defaultStyle: styles.center, style })}
      {...rest}
    />
  );
}

BoxCenter.displayName = 'BoxCenter';

export { BoxCenter };
