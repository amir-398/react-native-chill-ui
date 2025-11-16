import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { CarouselButtonPropsTw } from '@types';
import { classNamePropsHandler, cn } from '@utils';

import { useCarousel } from './CarouselContext';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * The `<CarouselNext />` component displays a button to navigate to the next slide.
 * This is a hybrid version that supports both StyleSheet and Tailwind styling.
 *
 * @example
 * ```tsx
 * // Default icon button
 * <CarouselNext />
 *
 * // Custom icon
 * <CarouselNext iconName="arrow-right-solid" />
 *
 * // Custom content
 * <CarouselNext>
 *   <String>Next →</String>
 * </CarouselNext>
 *
 * // With custom styling
 * <CarouselNext
 *   className="bg-blue-500"
 *   style={{ padding: 12 }}
 *   iconProps={{ color: 'white', size: 'lg' }}
 * />
 * ```
 *
 * @param children - Custom content to render instead of the default icon
 * @param className - Custom CSS classes for the button container (NativeWind)
 * @param iconName - Icon name to display (default: 'chevron-right-solid')
 * @param iconProps - Additional props to pass to the Icon component
 * @param style - Custom style object for the button container
 */
function CarouselNext(props: PropsWithChildren<CarouselButtonPropsTw>) {
  classNamePropsHandler(props, 'CarouselNext');
  const { children, className, iconName = carouselDefaultProps.rightIconName, iconProps, style } = props;

  const { canScrollNext, currentIndex, scrollToIndex } = useCarousel();

  const handlePress = () => {
    if (canScrollNext) {
      scrollToIndex(currentIndex + 1);
    }
  };

  if (!canScrollNext) return null;

  if (children) {
    return (
      <Pressable
        onPress={handlePress}
        className={cn(
          'absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50 focus:outline-none',
          className,
        )}
        style={style}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <Box
      className={cn(
        'absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50 focus:outline-none',
        className,
      )}
      style={style}
    >
      <Icon name={iconName} onPress={handlePress} hasPressEffect={canScrollNext} {...iconProps} />
    </Box>
  );
}

CarouselNext.displayName = 'CarouselNext';

export { CarouselNext };
