import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { CarouselDotsPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { useCarousel } from './CarouselContext';
import { styles } from '../styles/Carousel.ss.styles';
import { twStyles } from '../styles/Carousel.tw.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * The `<CarouselDots />` component displays navigation dots indicating the current slide.
 * Automatically reflects the current slide and total number of slides from the carousel context.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { CarouselDots } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <CarouselDots />
 * ```
 *
 * @param activeColor - Color of the active dot (default: 'white')
 * @param className - Custom CSS classes for the dots container (NativeWind)
 * @param inactiveColor - Color of inactive dots (default: 'gray')
 * @param size - Dot icon size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'xs')
 * @param style - Custom style object for the dots container
 */
function CarouselDots(props: CarouselDotsPropsTw) {
  classNamePropsHandler(props, 'CarouselDots');
  const {
    activeColor = carouselDefaultProps.dotActiveColor,
    className,
    inactiveColor = carouselDefaultProps.dotInactiveColor,
    size = carouselDefaultProps.dotSize,
    style,
  } = props;
  const { currentIndex, totalItems } = useCarousel();

  return (
    <Box
      {...classNameHandler(cn(twStyles.carouselDots, className))}
      {...styleHandler({ defaultStyle: styles.carouselDots, style })}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <Icon
          key={`dot-${index}`}
          name={carouselDefaultProps.dotName}
          size={size}
          color={currentIndex === index ? activeColor : inactiveColor}
        />
      ))}
    </Box>
  );
}

CarouselDots.displayName = 'CarouselDots';

export { CarouselDots };
