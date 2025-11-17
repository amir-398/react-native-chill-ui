import { FlatList } from 'react-native';
import { useCallback, useEffect, useMemo } from 'react';

import { get, debounce, isEqual, findIndex } from '../../../utils';
import { inputSelectDropdownDefaultProps } from '../utils/defaultProps';

interface DropdownSelectionParams {
  dataSet: any[];
  listData: any[];
  inputValue: any;
  valueField: string;
  autoScroll?: boolean;
  setCurrentValue: (value: any) => void;
  refList?: React.RefObject<FlatList | null>;
}

export default function useDropdownSelection({
  dataSet,
  inputValue,
  listData,
  refList,
  setCurrentValue,
  valueField,
}: DropdownSelectionParams) {
  const updateCurrentValue = useCallback(() => {
    const defaultValue = typeof inputValue === 'object' ? get(inputValue, valueField) : inputValue;
    const selectedItem = dataSet.find((e: any) => isEqual(defaultValue, get(e, valueField)));

    setCurrentValue(selectedItem || null);
  }, [dataSet, inputValue, valueField, setCurrentValue]);

  useEffect(() => {
    updateCurrentValue();
  }, [updateCurrentValue]);

  const scrollToSelectedIndex = useMemo(
    () =>
      debounce(() => {
        if (!dataSet?.length || listData?.length !== dataSet?.length) return;
        if (!refList?.current) return;

        const defaultValue = typeof inputValue === 'object' ? get(inputValue, valueField) : inputValue;
        const index = findIndex(listData, e => isEqual(defaultValue, get(e, valueField)));

        if (index > -1 && index < listData.length) {
          try {
            refList.current.scrollToIndex({
              animated: false,
              index,
            });
          } catch (error) {
            console.warn(`scrollToIndex error: ${error}`);
          }
        }
      }, inputSelectDropdownDefaultProps.debounceDelay),
    [dataSet?.length, listData, inputValue, valueField, refList],
  );

  useEffect(
    () => () => {
      scrollToSelectedIndex.cancel();
    },
    [scrollToSelectedIndex],
  );

  return {
    scrollToSelectedIndex,
    updateCurrentValue,
  };
}
