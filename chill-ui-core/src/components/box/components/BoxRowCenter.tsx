import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { View as NativeView } from './View';
import styles from '../styles/Box.ss.styles';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowCenter />` component provides a horizontally arranged row with vertical centering and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowCenter>
 *   <Icon name="star" />
 *   <String>Featured</String>
 * </BoxRowCenter>
 * ```
 */
function BoxRowCenter(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowCenter');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowCenter, className))}
      {...styleHandler({ defaultStyle: styles.rowCenter, style })}
      {...rest}
    />
  );
}

BoxRowCenter.displayName = 'BoxRowCenter';

export { BoxRowCenter };
