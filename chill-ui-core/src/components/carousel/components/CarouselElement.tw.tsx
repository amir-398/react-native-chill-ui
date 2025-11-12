import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { CarouselElementPropsTw } from '@types';

import { twStyles } from '../styles/Carousel.tw.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselElement component for positioning custom elements over the carousel (Tailwind version).
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
 *   <Box className="flex-row gap-2">
 *     <Button title="Prev" />
 *     <Button title="Next" />
 *   </Box>
 * </CarouselElement>
 * ```
 *
 * @param children - Content to render (typically CarouselDots or custom controls)
 * @param className - Custom CSS classes for the element container
 * @param offset - Distance from the edge in pixels (default: 16)
 * @param position - Position relative to carousel: 'top' | 'bottom' (default: 'bottom')
 * @param style - Custom style object for the element container
 */
function CarouselElement(props: PropsWithChildren<CarouselElementPropsTw>) {
  const {
    children,
    className,
    offset = carouselDefaultProps.elementOffset,
    position = carouselDefaultProps.elementPosition,
    style,
  } = props;
  const positionStyle = position === 'bottom' ? { bottom: offset } : { top: offset };
  return (
    <BoxTw className={cn(twStyles.carouselElement, className)} style={[positionStyle, style]}>
      {children}
    </BoxTw>
  );
}

CarouselElement.displayName = 'CarouselElement';

export { CarouselElement };
