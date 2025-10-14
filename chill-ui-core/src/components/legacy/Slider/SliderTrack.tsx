import { cn } from '@utils';
import { Animated, ViewStyle } from 'react-native';

import { Box } from '../../box';

interface SliderTrackProps {
  trackClassName?: string;
  maximumTrackColor: string;
  minimumTrackColor: string;
  minimumTrackStyle: ViewStyle;
  maximumTrackClassName?: string;
  minimumTrackClassName?: string;
  measureTrack: (e: any) => void;
  valueVisibleStyle: { opacity?: number };
  interpolatedTrackMarksValues?: Animated.Value[];
  renderMaximumTrackComponent?: () => React.ReactNode;
  renderMinimumTrackComponent?: () => React.ReactNode;
  renderTrackMarkComponent?: (index: number) => React.ReactNode;
}

export default function SliderTrack({
  interpolatedTrackMarksValues,
  maximumTrackClassName,
  maximumTrackColor,
  measureTrack,
  minimumTrackClassName,
  minimumTrackColor,
  minimumTrackStyle,
  renderMaximumTrackComponent,
  renderMinimumTrackComponent,
  renderTrackMarkComponent,
  trackClassName,
  valueVisibleStyle,
}: SliderTrackProps) {
  return (
    <>
      <Box
        onLayout={measureTrack}
        renderToHardwareTextureAndroid
        className={cn('h-1 rounded-full', trackClassName, maximumTrackClassName)}
        style={[{ backgroundColor: maximumTrackColor }]}
      >
        {renderMaximumTrackComponent?.()}
      </Box>

      <Animated.View
        renderToHardwareTextureAndroid
        className={cn('absolute h-1.5 rounded-full', trackClassName, minimumTrackClassName)}
        style={[minimumTrackStyle, { ...(minimumTrackColor && { backgroundColor: minimumTrackColor }) }]}
      >
        {renderMinimumTrackComponent?.()}
      </Animated.View>

      {renderTrackMarkComponent &&
        interpolatedTrackMarksValues?.map((val, i) => (
          <Animated.View
            key={`track-mark-${i}`}
            className="absolute"
            style={[
              {
                transform: [{ translateX: val }, { translateY: 0 }],
                ...valueVisibleStyle,
              } as ViewStyle,
            ]}
          >
            {renderTrackMarkComponent?.(i)}
          </Animated.View>
        ))}
    </>
  );
}
