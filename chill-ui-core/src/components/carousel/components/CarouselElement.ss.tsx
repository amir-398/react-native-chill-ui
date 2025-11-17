import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { CarouselElementPropsSs } from '@types';

import { styles } from '../styles/Carousel.ss.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselElement component for positioning custom elements over the carousel (StyleSheet version).
 *
 * Typically used to position navigation dots or custom controls at the top or bottom of the carousel.
 *
 * @example
 * ```tsx
 * // Position dots at bottom
 * <CarouselElement position="bottom" offset={16}>
 *   <CarouselDots />
 * </CarouselElement>
 *
 * // Position controls at top
 * <CarouselElement position="top" offset={20}>
 *   <BoxSs style={{ flexDirection: 'row', gap: 8 }}>
 *     <Button title="Prev" />
 *     <Button title="Next" />
 *   </BoxSs>
 * </CarouselElement>
 * ```
 *
 * @param children - Content to render (typically CarouselDots or custom controls)
 * @param offset - Distance from the edge in pixels (default: 16)
 * @param position - Position relative to carousel: 'top' | 'bottom' (default: 'bottom')
 * @param style - Custom style object for the element container
 */
function CarouselElement(props: PropsWithChildren<CarouselElementPropsSs>) {
  const {
    children,
    offset = carouselDefaultProps.elementOffset,
    position = carouselDefaultProps.elementPosition,
    style,
  } = props;
  const positionStyle = position === 'bottom' ? { bottom: offset } : { top: offset };
  return <BoxSs style={[styles.carouselElement, positionStyle, style]}>{children}</BoxSs>;
}

CarouselElement.displayName = 'CarouselElement';

export { CarouselElement };
