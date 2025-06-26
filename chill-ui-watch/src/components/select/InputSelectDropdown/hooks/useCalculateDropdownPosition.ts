import { useCallback, useState } from 'react';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { TextInput, Dimensions, I18nManager, StatusBar } from 'react-native';

const { height: H, width: W } = Dimensions.get('window');

type DropdownPositionProps = {
  bottom: number;
  left: number;
  width: number;
  height: number;
  top: number;
};

export default function useCalculateDropDownPosition(containerRef: React.RefObject<TextInput | View | null>) {
  const [position, setPosition] = useState<DropdownPositionProps | null>(null);
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const measureComponent = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.measureInWindow((pageX, pageY, width, height) => {
      const top = height + pageY + 2;
      const bottom = H - top + height;
      const left = I18nManager.isRTL ? W - width - pageX : pageX;

      setPosition({
        bottom: Math.floor(bottom - statusBarHeight),
        height: Math.floor(height),
        left: Math.floor(left),
        top: Math.floor(top + statusBarHeight),
        width: Math.floor(width),
      });
    });
  }, [containerRef, statusBarHeight]);

  return { measureComponent, position };
}
