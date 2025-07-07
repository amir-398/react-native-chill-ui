import { useState } from 'react';
import { TextInput, View } from 'react-native';

type UseCalculateDropdownPositionProps = {
  dropdownPosition: 'top' | 'bottom';
  inputRef: React.RefObject<TextInput | null>;
  offsetX?: number;
  offsetY?: number;
  wrapperRef: React.RefObject<View | null>;
};

const useCalculateDropdownPosition = ({
  dropdownPosition,

  inputRef,
  offsetX = 0,
  offsetY = 0,
  wrapperRef,
}: UseCalculateDropdownPositionProps) => {
  const [dropdownStyles, setDropdownStyles] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width?: number;
  } | null>({
    left: 0,
    top: -9999,
    width: 0,
  });
  const calculatePosition = (currentPosition: 'top' | 'bottom' = dropdownPosition) => {
    inputRef?.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
      if (!wrapperRef.current) {
        return;
      }
      wrapperRef?.current?.measureInWindow(
        (wrapperX: number, wrapperY: number, _wrapperWidth: number, wrapperHeight: number) => {
          const inputMeasurements = {
            bottomY: y - wrapperY + height,
            height,
            topY: y - wrapperY,
            width,
            x: x - wrapperX,
          };

          let contentStyles: { top?: number; left: number; width?: number; bottom?: number } | undefined;

          if (currentPosition === 'top') {
            const distanceFromBottom = wrapperHeight - inputMeasurements.topY + offsetY;
            contentStyles = {
              bottom: distanceFromBottom,
              left: inputMeasurements.x + offsetX,
              top: undefined,
              width: inputMeasurements.width,
            };
          } else if (currentPosition === 'bottom') {
            contentStyles = {
              bottom: undefined,
              left: inputMeasurements.x + offsetX,
              top: inputMeasurements.topY + inputMeasurements.height + offsetY,
              width: inputMeasurements.width,
            };
          }

          if (contentStyles) {
            setDropdownStyles(contentStyles);
          }
        },
      );
    });
  };
  const resetPosition = () => {
    setDropdownStyles(null);
  };

  return { calculatePosition, dropdownStyles, resetPosition };
};

export default useCalculateDropdownPosition;
