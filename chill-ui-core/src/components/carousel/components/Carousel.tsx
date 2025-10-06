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
 * CarouselItem component represents a single slide in the carousel.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - (only NativeWind) Custom CSS classes for the item container
 * @param children - Content to render inside the carousel item
 * @param style - Custom style object for the item container
 */
function CarouselItem(props: CarouselItemPropsTw) {
  classNamePropsHandler(props, 'CarouselItem');
  const { children, ...rest } = props;
  return <Box {...rest}>{children}</Box>;
}

/**
 * Carousel component for displaying a scrollable collection of items with navigation controls.
 *
 * Provides a flexible carousel implementation inspired by shadcn/ui with support for dots, arrows, and auto-play.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
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
 *
 * // With auto-play
 * <Carousel>
 *   <CarouselContent autoPlay autoPlayLoop autoPlayInterval={3000}>
 *     {items.map(item => <CarouselItem key={item.id}>{item.content}</CarouselItem>)}
 *   </CarouselContent>
 * </Carousel>
 * ```
 *
 * @param children - Carousel sub-components (CarouselContent, CarouselElement, etc.)
 * @param className - (only NativeWind) Custom CSS classes for the carousel container
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
 * CarouselContent component manages the scrollable content area of the carousel.
 *
 * Handles the FlatList implementation, viewability tracking, and auto-play functionality.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Horizontal carousel
 * <CarouselContent orientation="horizontal">
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 * </CarouselContent>
 *
 * // With auto-play
 * <CarouselContent
 *   autoPlay
 *   autoPlayLoop
 *   autoPlayInterval={3000}
 *   autoPlayDirection="forward"
 * >
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 * </CarouselContent>
 *
 * // Vertical carousel
 * <CarouselContent orientation="vertical">
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
 * @param className - (only NativeWind) Custom CSS classes for the FlatList container
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
 * CarouselElement component for positioning custom elements over the carousel.
 *
 * Typically used to position navigation dots or custom controls at the top or bottom of the carousel.
 *
 * @example
 * ```tsx
 * // Position dots at bottom
 * <CarouselElement position="bottom" offset={16}>
 *   <CarouselDots />
 * </CarouselElement>
 *
 * // Position controls at top
 * <CarouselElement position="top" offset={20}>
 *   <Box className="flex-row gap-2">
 *     <Button title="Prev" />
 *     <Button title="Next" />
 *   </Box>
 * </CarouselElement>
 * ```
 *
 * @param children - Content to render (typically CarouselDots or custom controls)
 * @param className - (only NativeWind) Custom CSS classes for the element container
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
 * CarouselDots component displays navigation dots indicating the current slide.
 *
 * Automatically reflects the current slide and total number of slides from the carousel context.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CarouselDots />
 *
 * // Custom colors and size
 * <CarouselDots
 *   activeColor="blue"
 *   inactiveColor="gray"
 *   size="lg"
 * />
 *
 * // With custom styling
 * <CarouselDots
 *   className="gap-4"
 *   activeColor="#3b82f6"
 *   inactiveColor="#d1d5db"
 * />
 * ```
 *
 * @param activeColor - Color of the active dot (default: 'white')
 * @param className - (only NativeWind) Custom CSS classes for the dots container
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
 * CarouselPrevious component displays a button to navigate to the previous slide.
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
 * @param className - (only NativeWind) Custom CSS classes for the button container
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
 * CarouselNext component displays a button to navigate to the next slide.
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
 * @param className - (only NativeWind) Custom CSS classes for the button container
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
