import { useState } from 'react';
import { View } from 'react-native';

const useCalculateDropdownPosition = ({
  dropdownPosition,
  headerOffset,
  inputContainerRef,
  wrapperRef,
}: {
  inputContainerRef: React.RefObject<View | null>;
  wrapperRef: React.RefObject<View | null>;
  dropdownPosition: 'top' | 'bottom';
  headerOffset: number;
}) => {
  const [dropdownStyles, setDropdownStyles] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width?: number;
  } | null>(null);
  const calculatePosition = () => {
    inputContainerRef?.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
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

          if (dropdownPosition === 'top') {
            const distanceFromBottom = wrapperHeight - inputMeasurements.topY + 5 + headerOffset;
            contentStyles = {
              bottom: distanceFromBottom,
              left: inputMeasurements.x,
              top: undefined,
              width: inputMeasurements.width,
            };
          } else if (dropdownPosition === 'bottom') {
            contentStyles = {
              bottom: undefined,
              left: inputMeasurements.x,
              top: inputMeasurements.topY + inputMeasurements.height + 5 + headerOffset,
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
