import { BoxSs } from '@components/box';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { IconSs } from '@components/icon';
import { CarouselButtonPropsSs } from '@types';

import { useCarousel } from './CarouselContext';
import { styles } from '../styles/Carousel.ss.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselNext component displays a button to navigate to the next slide (StyleSheet version).
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
 *   style={{ backgroundColor: '#3b82f6' }}
 *   iconProps={{ color: 'white', size: 'lg' }}
 * />
 * ```
 *
 * @param children - Custom content to render instead of the default icon
 * @param iconName - Icon name to display (default: 'chevron-right-solid')
 * @param iconProps - Additional props to pass to the Icon component
 * @param style - Custom style object for the button container
 */
function CarouselNext(props: PropsWithChildren<CarouselButtonPropsSs>) {
  const { children, iconName = carouselDefaultProps.rightIconName, iconProps, style } = props;
  const { canScrollNext, currentIndex, scrollToIndex } = useCarousel();

  const handlePress = () => {
    if (canScrollNext) {
      scrollToIndex(currentIndex + 1);
    }
  };

  if (children) {
    return (
      <Pressable
        style={[styles.carouselNextButton, styles.padding2, !canScrollNext && styles.carouselButtonDisabled, style]}
        onPress={handlePress}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <BoxSs
      style={[
        styles.carouselNextButton,
        !canScrollNext && styles.carouselButtonDisabled,
        !canScrollNext && styles.padding2,
        style,
      ]}
    >
      <IconSs name={iconName} onPress={handlePress} hasPressEffect={canScrollNext} {...iconProps} />
    </BoxSs>
  );
}

CarouselNext.displayName = 'CarouselNext';

export { CarouselNext };
