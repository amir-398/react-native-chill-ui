import { BoxSs } from '@components/box';
import { CarouselPropsSs } from '@types';
import { PropsWithChildren } from 'react';

import { CarouselProvider } from './CarouselContext';
import { styles } from '../styles/Carousel.ss.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * Carousel component for displaying a scrollable collection of items with navigation controls (StyleSheet version).
 * Provides a flexible carousel implementation inspired by shadcn/ui with support for dots, arrows, and auto-play.
 *
 * @example
 * ```tsx
 * <Carousel  orientation="horizontal">
 *   <CarouselContent>
 *     <CarouselItem><String>Slide 1</String></CarouselItem>
 *     <CarouselItem><String>Slide 2</String></CarouselItem>
 *   </CarouselContent>
 *   <CarouselElement>
 *     <CarouselDots />
 *   </CarouselElement>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 *
 * @param children - Carousel sub-components (CarouselContent, CarouselElement, etc.)
 * @param initialIndex - Initial slide index to display (default: 0)
 * @param onScrollChange - Callback fired when the active slide changes
 * @param autoPlay - Whether to enable auto-play (default: false)
 * @param autoPlayDirection - Auto-play direction: 'forward' | 'backward' (default: 'forward')
 * @param autoPlayInterval - Auto-play interval in milliseconds (default: 3000)
 * @param autoPlayLoop - Whether to loop auto-play (default: true)
 * @param orientation - Scroll orientation: 'horizontal' | 'vertical' (default: 'horizontal')
 * @param style - Custom style object for the carousel container
 */
function Carousel(props: PropsWithChildren<CarouselPropsSs>) {
  const {
    autoPlay = carouselDefaultProps.autoPlay,
    autoPlayDirection = carouselDefaultProps.autoPlayDirection,
    autoPlayInterval = carouselDefaultProps.autoPlayInterval,
    autoPlayLoop = carouselDefaultProps.autoPlayLoop,
    children,
    initialIndex = carouselDefaultProps.initialIndex,
    onScrollChange,
    orientation = carouselDefaultProps.orientation,
    style,
  } = props;
  return (
    <CarouselProvider
      initialIndex={initialIndex}
      onScrollChange={onScrollChange}
      autoPlay={autoPlay}
      autoPlayDirection={autoPlayDirection}
      autoPlayInterval={autoPlayInterval}
      autoPlayLoop={autoPlayLoop}
      orientation={orientation}
    >
      <BoxSs style={[styles.carouselContainer, style]}>{children}</BoxSs>
    </CarouselProvider>
  );
}

Carousel.displayName = 'Carousel';

export { Carousel };
