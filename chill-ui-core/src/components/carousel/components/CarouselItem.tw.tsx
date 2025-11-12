import { BoxTw } from '@components/box';
import { CarouselItemPropsTw } from '@types';

import { useCarousel } from './CarouselContext';

/**
 * CarouselItem component represents a single slide in the carousel.
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
 * @param className - Custom CSS classes for the item container
 * @param children - Content to render inside the carousel item
 * @param style - Custom style object for the item container
 */
function CarouselItem(props: CarouselItemPropsTw) {
  const { children, style, ...rest } = props;
  const { contentStyle } = useCarousel();

  return (
    <BoxTw {...rest} style={[contentStyle, style]}>
      {children}
    </BoxTw>
  );
}

CarouselItem.displayName = 'CarouselItem';

export { CarouselItem };
