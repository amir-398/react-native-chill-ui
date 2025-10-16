import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsTw } from '@types';

import { ScrollView } from 'react-native';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';
import { wrapperDefaultProps } from '../utils/defaultProps';

/**
 * ScrollView wrapper component with keyboard handling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <WrapperScrollView>
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param rest - Rest of the scroll view props and view props
 * @param children - Child components to render
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsTw>) {
  classNamePropsHandler(props, 'WrapperScrollView');
  const { children, className, edges, fill, grow, hasSafeArea, px, style, ...rest } = props;

  const content = (
    <ScrollView
      {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
      {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
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
