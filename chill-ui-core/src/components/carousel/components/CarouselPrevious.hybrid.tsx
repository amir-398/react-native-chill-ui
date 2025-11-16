import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { CarouselButtonPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { useCarousel } from './CarouselContext';
import { styles } from '../styles/Carousel.ss.styles';
import { twStyles } from '../styles/Carousel.tw.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * The `<CarouselPrevious />` component displays a button to navigate to the previous slide.
 * Automatically disables when at the first slide. Can render custom children or default icon.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { CarouselPrevious } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <CarouselPrevious />
 * ```
 *
 * @param children - Custom content to render instead of the default icon
 * @param className - Custom CSS classes for the button container (NativeWind)
 * @param iconName - Icon name to display (default: 'chevron-left-solid')
 * @param iconProps - Additional props to pass to the Icon component
 * @param style - Custom style object for the button container
 */
function CarouselPrevious(props: PropsWithChildren<CarouselButtonPropsTw>) {
  classNamePropsHandler(props, 'CarouselPrevious');
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
        {...classNameHandler(
          cn(
            twStyles.carouselPrevButton,
            twStyles.padding2,
            !canScrollPrev && twStyles.carouselButtonDisabled,
            className,
          ),
        )}
        {...styleHandler({
          defaultStyle: [styles.carouselPrevButton, styles.padding2, !canScrollPrev && styles.carouselButtonDisabled],
          style,
        })}
        onPress={handlePress}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <Box
      {...classNameHandler(
        cn(
          twStyles.carouselPrevButton,
          !canScrollPrev && twStyles.carouselButtonDisabled,
          !canScrollPrev && twStyles.padding2,
          className,
        ),
      )}
      {...styleHandler({
        defaultStyle: [
          styles.carouselPrevButton,
          !canScrollPrev && styles.carouselButtonDisabled,
          !canScrollPrev && styles.padding2,
        ],
        style,
      })}
    >
      <Icon name={iconName} onPress={handlePress} hasPressEffect={canScrollPrev} {...iconProps} />
    </Box>
  );
}
CarouselPrevious.displayName = 'CarouselPrevious';

export { CarouselPrevious };
