import { Animated, Image, ViewStyle } from 'react-native';

import cn from '../../cn';

interface SliderThumbProps {
  thumbColor: string;
  thumbClassName?: string;
  thumbImage?: string | string[];
  measureThumb: (e: any) => void;
  valueVisibleStyle: { opacity?: number };
  interpolatedThumbValues: Animated.Value[];
  renderThumbComponent?:
    | ((index: number) => React.ReactNode)
    | React.ReactNode
    | ((index: number) => React.ReactNode)[];
}

export default function SliderThumb({
  interpolatedThumbValues,
  measureThumb,
  renderThumbComponent,
  thumbClassName,
  thumbColor,
  thumbImage,
  valueVisibleStyle,
}: SliderThumbProps) {
  const renderThumbImage = (thumbIndex = 0) => {
    if (!thumbImage) {
      return null;
    }
    const source = Array.isArray(thumbImage) ? thumbImage[thumbIndex] : thumbImage;
    return <Image source={{ uri: source }} />;
  };

  return (
    <>
      {interpolatedThumbValues.map((val, i) => (
        <Animated.View
          key={`slider-thumb-${i}`}
          onLayout={measureThumb}
          className={cn(renderThumbComponent ? 'absolute' : 'absolute size-5 rounded-full', thumbClassName)}
          style={[
            !renderThumbComponent && { backgroundColor: thumbColor },
            {
              transform: [{ translateX: val }, { translateY: 0 }],
              ...valueVisibleStyle,
            } as ViewStyle,
          ]}
        >
          {(() => {
            if (!renderThumbComponent) {
              return renderThumbImage(i);
            }
            if (Array.isArray(renderThumbComponent)) {
              return renderThumbComponent[i](i);
            }
            if (typeof renderThumbComponent === 'function') {
              return renderThumbComponent(i);
            }
            return renderThumbComponent;
          })()}
        </Animated.View>
      ))}
    </>
  );
}
