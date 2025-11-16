import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { CarouselElementPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/Carousel.ss.styles';
import { twStyles } from '../styles/Carousel.tw.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * The `<CarouselElement />` component positions custom elements over the carousel.
 * This is a hybrid version that supports both StyleSheet and Tailwind styling.
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
 * @param className - Custom CSS classes for the element container (NativeWind)
 * @param offset - Distance from the edge in pixels (default: 16)
 * @param position - Position relative to carousel: 'top' | 'bottom' (default: 'bottom')
 * @param style - Custom style object for the element container
 */
function CarouselElement(props: PropsWithChildren<CarouselElementPropsTw>) {
  classNamePropsHandler(props, 'CarouselElement');
  const {
    children,
    className,
    offset = carouselDefaultProps.elementOffset,
    position = carouselDefaultProps.elementPosition,
    style,
  } = props;

  const positionStyle = position === 'bottom' ? { bottom: offset } : { top: offset };

  return (
    <Box
      {...classNameHandler(cn(twStyles.carouselElement, className))}
      {...styleHandler({ defaultStyle: styles.carouselElement, style: [positionStyle, style] })}
    >
      {children}
    </Box>
  );
}

CarouselElement.displayName = 'CarouselElement';

export { CarouselElement };
