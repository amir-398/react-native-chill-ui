import { TimePickerScrollerPropsTw } from '@types';
import { Animated, FlatList, ListRenderItem } from 'react-native';
import { cloneElement, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { timePickerDefaultProps } from '../utils/defaultProps';
import { useTimePickerActions, useTimePickerState } from '../context/TimePickerContext';

/**
 * Props for the useTimePickerScroller hook
 */
type UseTimePickerScrollerProps = {
  mode: TimePickerScrollerPropsTw['mode'];
  data?: (string | number)[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  interval?: number;
};

/**
 * Hook to get the default data for the time picker scroller
 */
export const useTimePickerScroller = ({ data, defaultValue, interval, mode, onChange }: UseTimePickerScrollerProps) => {
  const [defaultData, setDefaultData] = useState<(string | undefined)[]>([]);
  const { itemSize } = useTimePickerState();
  const { updateValue } = useTimePickerActions();
  const activeRef = useRef(0);
  const scrollAnimatedValuerRef = useRef(new Animated.Value(0)).current;
  const scrollListenerRef = useRef<string | null>(null);
  const initializedRef = useRef(false);
  const flatListRef = useRef<FlatList>(null);
  /**
   * Default interval for the time picker scroller
   */
  const defaultInterval = useMemo(() => {
    if (interval) return interval;
    if (mode === 'hour') return timePickerDefaultProps.hoursInterval;
    if (mode === 'minute') return timePickerDefaultProps.minutesInterval;
    return timePickerDefaultProps.secondsInterval;
  }, [mode, interval]);

  /**
   * Default data handled for the time picker scroller
   */
  const defaultDataHandled = useMemo(() => {
    if (data?.length) return data.map(String);
    if (mode === 'hour') {
      return Array.from({ length: 24 / defaultInterval }, (_, i) => (i * defaultInterval).toString().padStart(2, '0'));
    }
    return Array.from({ length: 60 / defaultInterval }, (_, i) => (i * defaultInterval).toString().padStart(2, '0'));
  }, [mode, data, defaultInterval]);

  /**
   * Default data handled for the time picker scroller
   */
  useEffect(() => {
    const HandledData = [undefined, undefined, ...defaultDataHandled, undefined, undefined];
    setDefaultData(HandledData);
  }, [defaultDataHandled]);

  /**
   * Get default value from context if not explicitly provided
   * Use UTC time to match the createTimePickerDate() format
   * Round to nearest interval if applicable
   */
  const { defaultTime } = useTimePickerState();
  const contextDefaultValue = useMemo(() => {
    if (!defaultTime || !mode) return undefined;

    let value: number;
    if (mode === 'hour') value = defaultTime.getUTCHours();
    else if (mode === 'minute') value = defaultTime.getUTCMinutes();
    else if (mode === 'second') value = defaultTime.getUTCSeconds();
    else return undefined;

    // Round to nearest interval
    if (defaultInterval > 1) {
      value = Math.round(value / defaultInterval) * defaultInterval;
    }

    return value;
  }, [defaultTime, mode, defaultInterval]);

  /**
   * Initialize default value on mount
   */
  useEffect(() => {
    if (!initializedRef.current && defaultDataHandled.length > 0 && mode) {
      // Priority: explicit defaultValue > context defaultTime > first item
      let initialValue: number;
      if (defaultValue !== undefined) {
        initialValue = defaultValue;
      } else if (contextDefaultValue !== undefined) {
        initialValue = contextDefaultValue;
      } else {
        initialValue = Number(defaultDataHandled[0]);
      }

      updateValue(mode, initialValue);
      initializedRef.current = true;
    }
  }, [defaultDataHandled, defaultValue, contextDefaultValue, mode, updateValue]);

  /**
   * Scroll to default value position when itemSize is available
   */
  useEffect(() => {
    if (initializedRef.current && itemSize > 0 && defaultDataHandled.length > 0) {
      // Use explicit defaultValue or context defaultTime
      const targetValue = defaultValue !== undefined ? defaultValue : contextDefaultValue;

      if (targetValue !== undefined) {
        const index = defaultDataHandled.findIndex(val => Number(val) === targetValue);
        if (index !== -1) {
          // Use setTimeout to ensure FlatList is fully rendered
          setTimeout(() => {
            flatListRef.current?.scrollToOffset({
              animated: false,
              offset: index * itemSize,
            });
          }, 300);
        }
      }
    }
  }, [defaultValue, contextDefaultValue, itemSize, defaultDataHandled]);

  /**
   * Handle momentum scroll end
   */
  const handleMomentumScrollEnd = useCallback(() => {
    if (itemSize === 0) return;

    const index = Math.round(activeRef.current / itemSize);
    const selectedValue = defaultData[index + 2];

    if (selectedValue !== undefined) {
      const numValue = Number(selectedValue);
      // Update value in context based on mode
      if (mode === 'hour' || mode === 'minute' || mode === 'second') {
        updateValue(mode, numValue);
      }
      // Call user's onChange callback
      onChange?.(numValue);
    }
  }, [itemSize, defaultData, onChange, mode, updateValue]);

  /**
   * Handle scroll listener
   */
  useEffect(() => {
    scrollListenerRef.current && scrollAnimatedValuerRef.removeListener(scrollListenerRef.current);

    scrollListenerRef.current = scrollAnimatedValuerRef.addListener(({ value }) => {
      activeRef.current = value;
    });

    return () => {
      if (scrollListenerRef.current) {
        scrollAnimatedValuerRef.removeListener(scrollListenerRef.current);
      }
    };
  }, [scrollAnimatedValuerRef]);

  return { activeRef, defaultData, flatListRef, handleMomentumScrollEnd, scrollAnimatedValuerRef, scrollListenerRef };
};

/**
 * Props for the useTimePickerScrollerRenderItem hook
 */
type UseTimePickerScrollerRenderItemProps = {
  defaultData: (string | undefined)[];
  itemSize: number;
  scrollAnimatedValuerRef: Animated.Value;
};

/**
 * Hook to render the time picker scroller item
 */
export const useTimePickerScrollerRenderItem = ({
  children,
  defaultData,
  itemSize,
  scrollAnimatedValuerRef,
}: PropsWithChildren<UseTimePickerScrollerRenderItemProps>) => {
  const renderItem: ListRenderItem<string | undefined> = useCallback(
    ({ index, item }) => {
      if (!children) {
        console.warn('<TimePickerItem /> as children is required but was not provided');
        return null;
      }

      const clonedItem = cloneElement(
        children as React.ReactElement,
        {
          defaultData,
          index,
          item,
          itemSize,
          scrollAnimatedValuerRef,
        } as any,
      );
      return clonedItem;
    },
    [children, defaultData, itemSize, scrollAnimatedValuerRef],
  );

  return { renderItem };
};

/**
 * Hook to get the key extractor for the time picker scroller
 */
export const useTimePickerScrollerKeyExtractor = () => {
  const keyExtractor = useCallback((_: string | undefined, index: number) => `time-${index}`, []);
  return { keyExtractor };
};
