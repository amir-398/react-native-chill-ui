import { useState } from 'react';
import { TextInput, View } from 'react-native';

type UseCalculateDropdownMenuPositionProps = {
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'right';
  inputRef: React.RefObject<TextInput | null>;
  offsetX?: number;
  offsetY?: number;
  dropdownWidth: number;
  wrapperRef: React.RefObject<View | null>;
};

const useCalculateDropdownMenuPosition = ({
  dropdownWidth,
  horizontalPosition,
  inputRef,
  offsetX = 0,
  offsetY = 0,
  verticalPosition,
  wrapperRef,
}: UseCalculateDropdownMenuPositionProps) => {
  const [dropdownStyles, setDropdownStyles] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null>({
    left: 0,
    top: -9999,
    width: dropdownWidth,
  });

  const calculatePosition = (
    currentVerticalPosition: 'top' | 'bottom' = verticalPosition,
    currentHorizontalPosition: 'left' | 'right' = horizontalPosition,
  ) => {
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

          // Calcul de la position verticale
          let topPosition: number | undefined;
          let bottomPosition: number | undefined;

          if (currentVerticalPosition === 'top') {
            const distanceFromBottom = wrapperHeight - inputMeasurements.topY + offsetY;
            bottomPosition = distanceFromBottom;
            topPosition = undefined;
          } else if (currentVerticalPosition === 'bottom') {
            topPosition = inputMeasurements.topY + inputMeasurements.height + offsetY;
            bottomPosition = undefined;
          }

          // Calcul de la position horizontale
          let leftPosition: number;

          if (currentHorizontalPosition === 'left') {
            // Aligner le coin gauche du dropdown avec le coin gauche du trigger
            leftPosition = inputMeasurements.x + offsetX;
          } else {
            // Aligner le coin droit du dropdown avec le coin droit du trigger
            leftPosition = inputMeasurements.x + inputMeasurements.width - dropdownWidth + offsetX;
          }

          const contentStyles = {
            bottom: bottomPosition,
            left: leftPosition,
            top: topPosition,
            width: dropdownWidth,
          };

          setDropdownStyles(contentStyles);
        },
      );
    });
  };

  const resetPosition = () => {
    setDropdownStyles(null);
  };

  return { calculatePosition, dropdownStyles, resetPosition };
};

export default useCalculateDropdownMenuPosition;
