import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * The `<BoxRowCenter />` component centers its children both horizontally and vertically in a row using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowCenter className="h-16 gap-4 bg-blue-50">
 *   <Icon name="star" size={24} />
 *   <String>Centered Content</String>
 *   <Button>Action</Button>
 * </BoxRowCenter>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the row container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowCenter(props: BoxPropsTw) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxRowCenter, className)} {...rest} />;
}

BoxRowCenter.displayName = 'BoxRowCenter';

export { BoxRowCenter };
