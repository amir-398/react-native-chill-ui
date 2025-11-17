import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsSs } from '@types';

import { ScrollView } from 'react-native';

import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.ss';

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
 * <WrapperScrollView style={{ backgroundColor: '#f0f0f0' }}>
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 * ```
 *
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'2xl'` | `'3xl'`
 * @param ScrollViewProps - Any other props accepted by the native `ScrollView` component.
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsSs>) {
  const { children, edges, fill, grow, hasSafeArea, px, style, ...rest } = props;

  const content = (
    <ScrollView
      contentContainerStyle={[wrapperSv({ fill, grow, px }), style]}
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
