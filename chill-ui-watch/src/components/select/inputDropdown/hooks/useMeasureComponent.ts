import { useCallback } from 'react';
import { Dimensions, I18nManager, StatusBar, View } from 'react-native';

import { useDetectDevice } from '../../utils';

const { isTablet } = useDetectDevice;
const statusBarHeight: number = StatusBar.currentHeight || 0;

interface Position {
  top: number;
  left: number;
  width: number;
  bottom: number;
  height: number;
  isFull: boolean;
}

interface UseMeasureComponentProps {
  mode: string;
  orientation: string;
  ref: React.RefObject<View | null>;
  updateState: (state: { position: Position }) => void;
}

const useMeasureComponent = ({ mode, orientation, ref, updateState }: UseMeasureComponentProps) => {
  const { height: H, width: W } = Dimensions.get('window');

  const measureComponent = useCallback(() => {
    if (!ref.current) return;

    ref.current.measureInWindow((pageX, pageY, width, height) => {
      const isFull = isTablet ? false : mode === 'modal' || orientation === 'LANDSCAPE';
      const isAutoMode = mode === 'auto';

      const top = isFull && !isAutoMode ? 20 : height + pageY;
      const bottom = H - top + height;
      const left = I18nManager.isRTL ? W - width - pageX : pageX;

      updateState({
        position: {
          bottom: Math.floor(bottom - statusBarHeight),
          height: Math.floor(height),
          isFull: isFull && !isAutoMode,
          left: Math.floor(left),
          top: Math.floor(top + statusBarHeight),
          width: Math.floor(width),
        },
      });
    });
  }, [H, W, orientation, mode, updateState]);

  return measureComponent;
};

export default useMeasureComponent;
