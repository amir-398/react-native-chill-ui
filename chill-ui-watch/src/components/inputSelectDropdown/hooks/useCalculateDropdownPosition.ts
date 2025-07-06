import { useState } from 'react';
import { TextInput, View } from 'react-native';

const useCalculateDropdownPosition = ({
  dropdownPosition,
  headerOffset,
  inputRef,
  offsetX = 0,
  offsetY = 0,
  wrapperRef,
}: {
  inputRef: React.RefObject<TextInput | null>;
  wrapperRef: React.RefObject<View | null>;
  dropdownPosition: 'top' | 'bottom';
  headerOffset: number;
  offsetX?: number;
  offsetY?: number;
}) => {
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
      console.log('width', width);

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
            const distanceFromBottom = wrapperHeight - inputMeasurements.topY + 5 + headerOffset + offsetY;
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
              top: inputMeasurements.topY + inputMeasurements.height + 5 + headerOffset + offsetY,
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

  return { calculatePosition, dropdownStyles };
};

export default useCalculateDropdownPosition;
