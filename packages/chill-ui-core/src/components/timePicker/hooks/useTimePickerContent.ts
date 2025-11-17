import { useCallback } from 'react';

/**
 * Props for the useTimePickerContent hook
 */
type UseTimePickerContentProps = {
  itemSize: number;
  setItemSize: (size: number) => void;
};
export const useTimePickerContent = ({ itemSize, setItemSize }: UseTimePickerContentProps) => {
  /**
   * Change item width
   */
  const changeItemWidth = useCallback(
    ({ nativeEvent }: { nativeEvent: { layout: { width: number } } }) => {
      const { width } = nativeEvent.layout;
      if (itemSize === 0) {
        setItemSize(width / 5);
      }
    },
    [setItemSize, itemSize],
  );

  return { changeItemWidth };
};
