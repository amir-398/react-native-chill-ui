import { useCallback } from 'react';

/**
 * Props for the useTimePickerItem hook
 */
type UseTimePickerItemProps = {
  defaultData: (string | number)[];
  itemSize: number;
};

export const useTimePickerItem = ({ defaultData, itemSize }: UseTimePickerItemProps) => {
  const makeAnimated = useCallback(
    (activeScale: number, neighborScale: number, farScale: number, currentIndex: number) => ({
      inputRange: defaultData.map((_, i) => i * itemSize),
      outputRange: defaultData.map((_, i) => {
        const center = i + 2;
        if (center === currentIndex) return activeScale;
        if (center + 1 === currentIndex || center - 1 === currentIndex) return neighborScale;
        return farScale;
      }),
    }),
    [defaultData, itemSize],
  );

  return { makeAnimated };
};
