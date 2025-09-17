import { cn } from '@utils';
import { useState } from 'react';
import { FlatList, ImageBackground, NativeScrollEvent } from 'react-native';

import Icon from '../icon';
import { Box } from '../box';
import { String } from '../string';
import { CarouselProps } from '../../types/carousel.types';
import { dotPositionVariants, dotVariant } from './styleVariants';

/**
 * Carousel component with support for image slides, text overlays, and customizable navigation dots.
 * Provides a flexible and accessible carousel implementation with smooth scrolling and touch gestures.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const items = [
 *   {
 *     id: '1',
 *     title: 'Première image',
 *     uri: 'https://picsum.photos/800/600?random=1',
 *   },
 *   {
 *     id: '2',
 *     title: 'Deuxième image',
 *     uri: 'https://picsum.photos/800/600?random=2',
 *   },
 * ];
 *
 * <Box className="h-52">
 *   <Carousel items={items} />
 * </Box>
 *
 * // With custom dot styling
 * <Carousel
 *   items={items}
 *   dotActiveColor="blue"
 *   dotColor="#a1a1a1"
 *   dotSize="md"
 *   dotGap="lg"
 * />
 *
 * // With custom text styling
 * <Carousel
 *   items={items}
 *   textColor="#FF6B6B"
 *   textSize="2xl"
 *   textWeight="medium"
 *   textVariant="title-2"
 * />
 *
 * // With children content
 * <Carousel items={items} dotOffset={30}>
 *   <Box className="w-full px-1">
 *     <Button variant="primary" size="sm" title="Next" />
 *   </Box>
 * </Carousel>
 * ```
 *
 * @param children - Custom content to render below the carousel
 * @param dotActiveColor - Color of the active dot indicator (default: 'white')
 * @param dotColor - Color of inactive dot indicators (default: 'gray')
 * @param dotGap - Gap between dots (default: 'md')
 * @param dotOffset - Offset distance for dot container (default: 26)
 * @param dotPosition - Position of dots relative to carousel (default: 'bottom')
 * @param dotSize - Size of the dots (default: 'xs')
 * @param dotSpacing - Custom spacing between dots
 * @param hasDot - Whether to show navigation dots (default: true)
 * @param items - Array of carousel items (required)
 * @param textClassName - Custom CSS classes for text container
 * @param textColor - Color of the text overlay (default: '#fff')
 * @param textSize - Size of the text (default: '4xl')
 * @param textVariant - Text variant style
 * @param textWeight - Weight of the text (default: 'bold')
 * @param wrapperClassName - Custom CSS classes for wrapper container
 */
export default function Carousel(props: CarouselProps) {
  const {
    children,
    dotActiveColor = 'white',
    dotColor = 'gray',
    dotGap = 'md',
    dotOffset = 26,
    dotPosition = 'bottom',
    dotSize = 'xs',
    dotSpacing,
    hasDot = true,
    items,
    textClassName,
    textColor = '#fff',
    textSize = '4xl',
    textVariant,
    wrapperClassName,
  } = props;
  const [imgActive, setimgActive] = useState(0);

  const onchange = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== imgActive) {
        setimgActive(slide);
      }
    }
  };

  return (
    <>
      <FlatList
        data={items}
        keyExtractor={item => item.id || item.order?.toString() || ''}
        horizontal
        pagingEnabled
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ImageBackground
            className={cn('h-full w-screen items-center justify-center', wrapperClassName)}
            source={item.uri || item.url ? { uri: item.uri || item.url } : item.image}
          >
            {item.title && (
              <String variant={textVariant} size={textSize} color={textColor} className={textClassName}>
                {item.title}
              </String>
            )}
          </ImageBackground>
        )}
      />
      <Box
        className={cn('absolute w-full items-center justify-center', dotPositionVariants({ position: dotPosition }))}
        style={{
          marginBottom: dotPosition === 'bottom' ? dotOffset : 0,
          marginTop: dotPosition === 'top' ? dotOffset : 0,
        }}
      >
        {hasDot && (
          <Box
            className={cn('mb-6 flex-row', dotVariant({ gap: dotGap }))}
            style={{ ...(dotSpacing && { gap: dotSpacing }) }}
          >
            {items.map((item, index) => (
              <Icon
                key={item.id}
                name="dot-solid"
                size={dotSize}
                color={imgActive === index ? dotActiveColor : dotColor}
              />
            ))}
          </Box>
        )}
        {children}
      </Box>
    </>
  );
}
