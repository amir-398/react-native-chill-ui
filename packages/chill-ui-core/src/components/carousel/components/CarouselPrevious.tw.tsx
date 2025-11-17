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
 * CarouselPrevious component displays a button to navigate to the previous slide (Tailwind version).
 *
 * Automatically disables when at the first slide. Can render custom children or default icon.
 *
 * @example
 * ```tsx
 * // Default icon button
 * <CarouselPrevious />
 *
 * // Custom icon
 * <CarouselPrevious iconName="arrow-left-solid" />
 *
 * // Custom content
 * <CarouselPrevious>
 *   <String>← Previous</String>
 * </CarouselPrevious>
 *
 * // With custom styling
 * <CarouselPrevious
 *   className="bg-blue-500"
 *   iconProps={{ color: 'white', size: 'lg' }}
 * />
 * ```
 *
 * @param children - Custom content to render instead of the default icon
 * @param className - Custom CSS classes for the button container
 * @param iconName - Icon name to display (default: 'chevron-left-solid')
 * @param iconProps - Additional props to pass to the Icon component
 * @param style - Custom style object for the button container
 */
function CarouselPrevious(props: PropsWithChildren<CarouselButtonPropsTw>) {
  const { children, className, iconName = carouselDefaultProps.leftIconName, iconProps, style } = props;
  const { canScrollPrev, currentIndex, scrollToIndex } = useCarousel();

  const handlePress = () => {
    if (canScrollPrev) {
      scrollToIndex(currentIndex - 1);
    }
  };

  if (children) {
    return (
      <Pressable
        className={cn(
          twStyles.carouselPrevButton,
          twStyles.padding2,
          !canScrollPrev && twStyles.carouselButtonDisabled,
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
        twStyles.carouselPrevButton,
        !canScrollPrev && twStyles.carouselButtonDisabled,
        !canScrollPrev && twStyles.padding2,
        className,
      )}
      style={style}
    >
      <IconTw name={iconName} onPress={handlePress} hasPressEffect={canScrollPrev} {...iconProps} />
    </BoxTw>
  );
}

CarouselPrevious.displayName = 'CarouselPrevious';

export { CarouselPrevious };
