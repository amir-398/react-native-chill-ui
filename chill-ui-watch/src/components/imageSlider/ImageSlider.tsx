import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { FlatList, ImageBackground, NativeScrollEvent } from 'react-native';

import { ImageSliderProps } from '@/types';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';

export const dotVariant = tv({
  variants: {
    gap: {
      lg: 'gap-6',
      md: 'gap-4',
      sm: 'gap-2',
      xl: 'gap-8',
    },
  },
});

export const dotPositionVariants = tv({
  variants: {
    position: {
      bottom: 'bottom-0',
      top: 'top-0',
    },
  },
});

export default function ImageSlider(props: ImageSliderProps) {
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
    textWeight = 'bold',
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
              <String
                variant={textVariant}
                size={textSize}
                weight={textWeight}
                color={textColor}
                className={textClassName}
              >
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
