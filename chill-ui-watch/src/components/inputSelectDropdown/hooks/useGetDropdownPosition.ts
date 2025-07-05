import { RefObject } from 'react';
import { Dimensions, Keyboard, Platform, View } from 'react-native';

type Position = 'top' | 'bottom';

interface GetDropdownPositionProps {
  waitForKeyboard: boolean;
  position: 'top' | 'bottom' | 'auto';
  setDropdownPosition: (position: Position) => void;
  inputContainerRef: RefObject<View | null | undefined>;
}

const useGetDropdownPosition = ({
  inputContainerRef,
  position,
  setDropdownPosition,
  waitForKeyboard,
}: GetDropdownPositionProps) => {
  const getDropdownPosition = async (): Promise<Position> => {
    try {
      if (!inputContainerRef.current) {
        throw new Error('Container ref is not defined');
      }
      if (position === 'auto') {
        const [, positionY] = await new Promise<[number, number, number, number]>((resolve, _reject) => {
          inputContainerRef.current?.measureInWindow((x, y, width, height) => {
            resolve([x, y, width, height]);
          });
        });

        const delay = waitForKeyboard ? Platform.select({ android: 250, default: 1, ios: 600 }) : 1;

        return await new Promise<Position>(resolve => {
          setTimeout(() => {
            const kbHeight = Keyboard.metrics?.()?.height ?? 0;
            const screenHeight = Dimensions.get('window').height;
            const shouldOpenDown = (screenHeight - kbHeight) / 2 > positionY;
            const newPos = shouldOpenDown ? 'bottom' : 'top';
            setDropdownPosition(newPos);
            resolve(newPos);
          }, delay);
        });
      }
      setDropdownPosition(position);
      return position;
    } catch {
      setDropdownPosition('bottom');
      return 'bottom';
    }
  };
  return { getDropdownPosition };
};

export default useGetDropdownPosition;
