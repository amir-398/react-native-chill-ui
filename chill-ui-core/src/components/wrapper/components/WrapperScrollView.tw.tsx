import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsTw } from '@types';

import { cn } from '@utils';
import { ScrollView } from 'react-native';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.tw';

/**
 * The `<WrapperScrollView />` component provides a ScrollView wrapper.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperScrollView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperScrollView contentContainerClassName="p-4">
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 * ```
 *
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'2xl'` | `'3xl'`
 * @param ScrollViewProps - Any other props accepted by the native `ScrollView` component.
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsTw>) {
  const { children, className, edges, fill, grow, hasSafeArea, px, ...rest } = props;

  const content = (
    <ScrollView
      contentContainerClassName={cn(wrapperTv({ fill, grow, px }), className)}
      alwaysBounceVertical={wrapperDefaultProps.alwaysBounceVertical}
      showsVerticalScrollIndicator={wrapperDefaultProps.showsVerticalScrollIndicator}
      {...rest}
    >
      {children}
    </ScrollView>
  );

  if (hasSafeArea) {
    return (
      <WrapperSafeAreaView px="none" edges={edges}>
        {content}
      </WrapperSafeAreaView>
    );
  }

  return content;
}

WrapperScrollView.displayName = 'WrapperScrollView';
