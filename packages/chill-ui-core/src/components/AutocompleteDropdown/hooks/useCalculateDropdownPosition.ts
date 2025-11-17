import { View } from 'react-native';
import { useCallback, useState } from 'react';

export default function useCalculateDropdownPosition(
  inputContainerRef: React.RefObject<View | null>,
  wrapperRef: React.RefObject<View | null>,
) {
  const [inputMeasurements, setInputMeasurements] = useState<{
    bottomY: number;
    height: number;
    topY: number;
    width: number;
    x: number;
  } | null>(null);

  const calculatePosition = useCallback(() => {
    if (!inputContainerRef?.current || !wrapperRef?.current) {
      return;
    }
    inputContainerRef?.current?.measure((_x, _y, width, height, inputPageX, inputPageY) => {
      wrapperRef.current?.measure((_Wx, _Wy, _w, wrapperH, _wrapperPageX, wrapperPageY) => {
        const currentMeasurement = {
          bottomY: wrapperH - inputPageY + wrapperPageY,
          height,
          topY: inputPageY - wrapperPageY,
          width,
          x: inputPageX,
        };
        setInputMeasurements(prev =>
          JSON.stringify(prev) === JSON.stringify(currentMeasurement) ? prev : currentMeasurement,
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { calculatePosition, inputMeasurements };
}
