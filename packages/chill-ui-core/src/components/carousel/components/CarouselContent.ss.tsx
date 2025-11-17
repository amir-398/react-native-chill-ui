import { useEffect, useRef } from 'react';
import { CarouselContentPropsSs } from '@types';
import { FlatList, ViewToken } from 'react-native';

import { useCarousel } from './CarouselContext';
import { useAutoPlay } from '../hooks/useAutoPlay';

/**
 * CarouselContent component manages the scrollable content area of the carousel (StyleSheet version).
 * Handles the FlatList implementation, viewability tracking, and auto-play functionality.
 *
 * @example
 * ```tsx
 * <CarouselContent>
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 * </CarouselContent>
 * ```
 *

 * @param children - CarouselItem components to display
 * @param style - Custom style object for the FlatList container
 */
function CarouselContent(props: CarouselContentPropsSs) {
  const { children, ...rest } = props;

  const {
    autoPlay,
    autoPlayDirection,
    autoPlayInterval,
    autoPlayLoop,
    currentIndex,
    flatListRef,
    orientation,
    setCurrentIndex,
    setTotalItems,
    totalItems,
  } = useCarousel();

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
      {...rest}
      onViewableItemsChanged={onViewableItemsChanged}
      horizontal={orientation === 'horizontal'}
      ref={flatListRef}
      renderItem={({ item }) => item}
      data={validItems}
    />
  );
}

CarouselContent.displayName = 'CarouselContent';

export { CarouselContent };
