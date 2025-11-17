import { BoxSs } from '@components/box';
import { CarouselItemPropsSs } from '@types';

import { useCarousel } from './CarouselContext';

/**
 * CarouselItem component represents a single slide in the carousel (StyleSheet version).
 *
 * @example
 * ```tsx
 * <CarouselItem>
 *   <ImageBackground source={{ uri: 'image.jpg' }}>
 *     <String>Slide Content</String>
 *   </ImageBackground>
 * </CarouselItem>
 * ```
 *
 * @param children - Content to render inside the carousel item
 * @param style - Custom style object for the item container
 */
function CarouselItem(props: CarouselItemPropsSs) {
  const { children, style, ...rest } = props;
  const { contentStyle } = useCarousel();
  return (
    <BoxSs {...rest} style={[contentStyle, style]}>
      {children}
    </BoxSs>
  );
}

CarouselItem.displayName = 'CarouselItem';

export { CarouselItem };
