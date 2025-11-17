import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';

import { styles } from '../styles/Slider.ss.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

export function SliderRootContent(props: PropsWithChildren<{ orientation?: 'horizontal' | 'vertical'; style?: any }>) {
  const { children, orientation = sliderDefaultProps.orientation, style, ...rest } = props;
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
    <BoxSs {...rest} onLayout={measureContainer} style={[vertical && styles.rootVertical, styles.root, style]}>
      {children}
      <BoxSs style={[styles.touchOverlay, touchOverflowStyle]} {...(panResponder?.panHandlers || {})} />
    </BoxSs>
  );
}
