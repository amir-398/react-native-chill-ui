import { Box } from '@components/box';
import { CarouselItemPropsTw } from '@types';
import { classNamePropsHandler } from '@utils';

/**
 * The `<CarouselItem />` component represents a single slide in the carousel.
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
 * @param className - Custom CSS classes for the item container (NativeWind)
 * @param style - Custom style object for the item container
 */
function CarouselItem(props: CarouselItemPropsTw) {
  classNamePropsHandler(props, 'CarouselItem');
  const { children, ...rest } = props;
  return <Box {...rest}>{children}</Box>;
}

CarouselItem.displayName = 'CarouselItem';

export { CarouselItem };
