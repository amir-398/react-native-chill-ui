import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { IconTw } from '@components/icon';
import { CarouselButtonPropsTw } from '@types';

import { useCarousel } from './CarouselContext';
import { twStyles } from '../styles/Carousel.tw.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselNext component displays a button to navigate to the next slide (Tailwind version).
 *
 * Automatically disables when at the last slide. Can render custom children or default icon.
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
 *   iconProps={{ color: 'white', size: 'lg' }}
 * />
 * ```
 *
 * @param children - Custom content to render instead of the default icon
 * @param className - Custom CSS classes for the button container
 * @param iconName - Icon name to display (default: 'chevron-right-solid')
 * @param iconProps - Additional props to pass to the Icon component
 * @param style - Custom style object for the button container
 */
function CarouselNext(props: PropsWithChildren<CarouselButtonPropsTw>) {
  const { children, className, iconName = carouselDefaultProps.rightIconName, iconProps, style } = props;
  const { canScrollNext, currentIndex, scrollToIndex } = useCarousel();

  const handlePress = () => {
    if (canScrollNext) {
      scrollToIndex(currentIndex + 1);
    }
  };

  if (children) {
    return (
      <Pressable
        className={cn(
          twStyles.carouselNextButton,
          twStyles.padding2,
          !canScrollNext && twStyles.carouselButtonDisabled,
          className,
        )}
        style={style}
        onPress={handlePress}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <BoxTw
      className={cn(
        twStyles.carouselNextButton,
        !canScrollNext && twStyles.carouselButtonDisabled,
        !canScrollNext && twStyles.padding2,
        className,
      )}
      style={style}
    >
      <IconTw name={iconName} onPress={handlePress} hasPressEffect={canScrollNext} {...iconProps} />
    </BoxTw>
  );
}

CarouselNext.displayName = 'CarouselNext';

export { CarouselNext };
