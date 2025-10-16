import { Box } from '@components/box';
import { Icon, IconTw } from '@components/icon';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { FlatList, Pressable, ViewToken } from 'react-native';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';
import {
  CarouselDotsPropsTw,
  CarouselButtonPropsTw,
  CarouselItemPropsTw,
  CarouselPropsTw,
  CarouselContentPropsTw,
  CarouselElementPropsTw,
} from '@types';

import { useAutoPlay } from '../hooks/useAutoPlay';
import { styles } from '../styles/Carousel.ss.styles';
import { twStyles } from '../styles/Carousel.tw.styles';
import { carouselDefaultProps } from '../utils/defaultProps';
import { CarouselProvider, useCarousel } from './CarouselContext';

/**
 * The `<CarouselItem />` component represents a single slide in the carousel.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { CarouselItem } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <CarouselItem className="h-full w-screen">
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

/**
 * The `<Carousel />` component displays a scrollable collection of items with navigation controls.
 * Provides a flexible carousel implementation with support for dots, arrows, and auto-play.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Carousel } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent orientation="horizontal">
 *     <CarouselItem><String>Slide 1</String></CarouselItem>
 *     <CarouselItem><String>Slide 2</String></CarouselItem>
 *   </CarouselContent>
 *   <CarouselElement>
 *     <CarouselDots />
 *   </CarouselElement>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 *
 * @param children - Carousel sub-components (CarouselContent, CarouselElement, etc.)
 * @param className - Custom CSS classes for the carousel container (NativeWind)
 * @param initialIndex - Initial slide index to display (default: 0)
 * @param onScrollChange - Callback fired when the active slide changes
 * @param style - Custom style object for the carousel container
 */
export function Carousel(props: PropsWithChildren<CarouselPropsTw>) {
  classNamePropsHandler(props, 'Carousel');
  const { children, className, initialIndex = carouselDefaultProps.initialIndex, onScrollChange, style } = props;
  return (
    <CarouselProvider initialIndex={initialIndex} onScrollChange={onScrollChange}>
      <Box
        {...classNameHandler(cn(twStyles.carouselContainer, className))}
        {...styleHandler({ defaultStyle: styles.carouselContainer, style })}
      >
        {children}
      </Box>
    </CarouselProvider>
  );
}

/**
 * The `<CarouselContent />` component manages the scrollable content area of the carousel.
 * Handles the FlatList implementation, viewability tracking, and auto-play functionality.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { CarouselContent } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <CarouselContent orientation="horizontal">
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 * </CarouselContent>
 * ```
 *
 * @param autoPlay - Whether to enable auto-play (default: false)
 * @param autoPlayDirection - Auto-play direction: 'forward' | 'backward' (default: 'forward')
 * @param autoPlayInterval - Auto-play interval in milliseconds (default: 3000)
 * @param autoPlayLoop - Whether to loop auto-play (default: true)
 * @param children - CarouselItem components to display
 * @param className - Custom CSS classes for the FlatList container (NativeWind)
 * @param orientation - Scroll orientation: 'horizontal' | 'vertical' (default: 'horizontal')
 */
function CarouselContent(props: CarouselContentPropsTw) {
  classNamePropsHandler(props, 'CarouselContent');
  const {
    autoPlay = carouselDefaultProps.autoPlay,
    autoPlayDirection = carouselDefaultProps.autoPlayDirection,
    autoPlayInterval = carouselDefaultProps.autoPlayInterval,
    autoPlayLoop = carouselDefaultProps.autoPlayLoop,
    children,
    className,
    orientation = carouselDefaultProps.orientation,
    ...rest
  } = props;

  const { currentIndex, flatListRef, setCurrentIndex, setTotalItems, totalItems } = useCarousel();

  // Convert children to array for FlatList
  const items = Array.isArray(children) ? children : [children];
  const validItems = items.filter(Boolean);

  useEffect(() => {
    setTotalItems(validItems.length);
  }, [setTotalItems, validItems]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // AutoPlay logic
  useAutoPlay({
    autoPlay,
    autoPlayDirection,
    autoPlayInterval,
    autoPlayLoop,
    currentIndex,
    flatListRef,
    setCurrentIndex,
    totalItems,
  });

  return (
    <FlatList
      keyExtractor={(_, index) => `carousel-item-${index}`}
      pagingEnabled
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      className={className}
      {...rest}
      onViewableItemsChanged={onViewableItemsChanged}
      horizontal={orientation === 'horizontal'}
      ref={flatListRef}
      renderItem={({ item }) => item}
      data={validItems}
    />
  );
}

/**
 * The `<CarouselElement />` component positions custom elements over the carousel.
 * Typically used to position navigation dots or custom controls at the top or bottom of the carousel.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { CarouselElement } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <CarouselElement position="bottom" offset={16}>
 *   <CarouselDots />
 * </CarouselElement>
 * ```
 *
 * @param children - Content to render (typically CarouselDots or custom controls)
 * @param className - Custom CSS classes for the element container (NativeWind)
 * @param offset - Distance from the edge in pixels (default: 16)
 * @param position - Position relative to carousel: 'top' | 'bottom' (default: 'bottom')
 * @param style - Custom style object for the element container
 */
export function CarouselElement(props: PropsWithChildren<CarouselElementPropsTw>) {
  classNamePropsHandler(props, 'CarouselElement');
  const {
    children,
    className,
    offset = carouselDefaultProps.elementOffset,
    position = carouselDefaultProps.elementPosition,
    style,
  } = props;
  const positionStyle = position === 'bottom' ? { bottom: offset } : { top: offset };
  return (
    <Box
      {...classNameHandler(cn(twStyles.carouselElement, className))}
      {...styleHandler({ defaultStyle: styles.carouselElement, style: [positionStyle, style] })}
    >
      {children}
    </Box>
  );
}

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
      <IconTw name={iconName} onPress={handlePress} hasPressEffect={canScrollPrev} {...iconProps} />
    </Box>
  );
}

/**
 * The `<CarouselNext />` component displays a button to navigate to the next slide.
 * Automatically disables when at the last slide. Can render custom children or default icon.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { CarouselNext } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <CarouselNext />
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

  if (children) {
    return (
      <Pressable
        {...classNameHandler(
          cn(
            twStyles.carouselNextButton,
            twStyles.padding2,
            !canScrollNext && twStyles.carouselButtonDisabled,
            className,
          ),
        )}
        {...styleHandler({
          defaultStyle: [styles.carouselNextButton, styles.padding2, !canScrollNext && styles.carouselButtonDisabled],
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
          twStyles.carouselNextButton,
          !canScrollNext && twStyles.carouselButtonDisabled,
          !canScrollNext && twStyles.padding2,
          className,
        ),
      )}
      {...styleHandler({
        defaultStyle: [
          styles.carouselNextButton,
          !canScrollNext && styles.carouselButtonDisabled,
          !canScrollNext && styles.padding2,
        ],
        style,
      })}
    >
      <Icon name={iconName} onPress={handlePress} hasPressEffect={canScrollNext} {...iconProps} />
    </Box>
  );
}

export { CarouselContent, CarouselItem, CarouselDots, CarouselPrevious, CarouselNext };
