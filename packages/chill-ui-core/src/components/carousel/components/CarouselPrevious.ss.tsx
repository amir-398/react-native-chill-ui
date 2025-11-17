import { BoxSs } from '@components/box';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { IconSs } from '@components/icon';
import { CarouselButtonPropsSs } from '@types';

import { useCarousel } from './CarouselContext';
import { styles } from '../styles/Carousel.ss.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselPrevious component displays a button to navigate to the previous slide (StyleSheet version).
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
 *   style={{ backgroundColor: '#3b82f6' }}
 *   iconProps={{ color: 'white', size: 'lg' }}
 * />
 * ```
 *
 * @param children - Custom content to render instead of the default icon
 * @param iconName - Icon name to display (default: 'chevron-left-solid')
 * @param iconProps - Additional props to pass to the Icon component
 * @param style - Custom style object for the button container
 */
function CarouselPrevious(props: PropsWithChildren<CarouselButtonPropsSs>) {
  const { children, iconName = carouselDefaultProps.leftIconName, iconProps, style } = props;
  const { canScrollPrev, currentIndex, scrollToIndex } = useCarousel();

  const handlePress = () => {
    if (canScrollPrev) {
      scrollToIndex(currentIndex - 1);
    }
  };

  if (children) {
    return (
      <Pressable
        style={[styles.carouselPrevButton, styles.padding2, !canScrollPrev && styles.carouselButtonDisabled, style]}
        onPress={handlePress}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <BoxSs
      style={[
        styles.carouselPrevButton,
        !canScrollPrev && styles.carouselButtonDisabled,
        !canScrollPrev && styles.padding2,
        style,
      ]}
    >
      <IconSs name={iconName} onPress={handlePress} hasPressEffect={canScrollPrev} {...iconProps} />
    </BoxSs>
  );
}

CarouselPrevious.displayName = 'CarouselPrevious';

export { CarouselPrevious };
