import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { CarouselDotsPropsSs } from '@types';

import { useCarousel } from './CarouselContext';
import { styles } from '../styles/Carousel.ss.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselDots component displays navigation dots indicating the current slide (StyleSheet version).
 *
 * Automatically reflects the current slide and total number of slides from the carousel context.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CarouselDots />
 *
 * // Custom colors and size
 * <CarouselDots
 *   activeColor="blue"
 *   inactiveColor="gray"
 *   size="lg"
 * />
 *
 * // With custom styling
 * <CarouselDots
 *   style={{ gap: 16 }}
 *   activeColor="#3b82f6"
 *   inactiveColor="#d1d5db"
 * />
 * ```
 *
 * @param activeColor - Color of the active dot (default: 'white')
 * @param inactiveColor - Color of inactive dots (default: 'gray')
 * @param size - Dot icon size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'xs')
 * @param style - Custom style object for the dots container
 */
function CarouselDots(props: CarouselDotsPropsSs) {
  const {
    activeColor = carouselDefaultProps.dotActiveColor,
    inactiveColor = carouselDefaultProps.dotInactiveColor,
    size = carouselDefaultProps.dotSize,
    style,
  } = props;
  const { currentIndex, totalItems } = useCarousel();

  return (
    <BoxSs style={[styles.carouselDots, style]}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <IconSs
          key={`dot-${index}`}
          name={carouselDefaultProps.dotName}
          size={size}
          color={currentIndex === index ? activeColor : inactiveColor}
        />
      ))}
    </BoxSs>
  );
}

CarouselDots.displayName = 'CarouselDots';

export { CarouselDots };
