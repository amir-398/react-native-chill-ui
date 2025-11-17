import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { classNameHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

export function SliderRootContent(
  props: PropsWithChildren<{ className?: string; orientation?: 'horizontal' | 'vertical'; style?: any }>,
) {
  const { children, className, orientation = sliderDefaultProps.orientation, style, ...rest } = props;
  const vertical = orientation === 'vertical';
  const { getTouchOverflowSize, measureContainer, panResponder } = useSliderActions();

  const getTouchOverflowStyle = () => {
    const { height, width } = getTouchOverflowSize();
    const touchOverflowStyle: {
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
    } = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;
      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }
    return touchOverflowStyle;
  };

  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <Box
      {...rest}
      onLayout={measureContainer}
      {...classNameHandler(cn(vertical && twStyles.rootVertical, twStyles.root, className))}
      {...styleHandler({
        defaultStyle: [vertical && styles.rootVertical, styles.root],
        style,
      })}
    >
      {children}
      <Box
        {...classNameHandler(twStyles.touchOverlay)}
        {...styleHandler({
          defaultStyle: [styles.touchOverlay, touchOverflowStyle],
        })}
        {...(panResponder?.panHandlers || {})}
      />
    </Box>
  );
}
