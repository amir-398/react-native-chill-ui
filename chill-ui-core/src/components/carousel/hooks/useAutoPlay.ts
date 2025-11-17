import type { FlatList } from 'react-native';

import { RefObject, useEffect, useRef } from 'react';

interface UseAutoPlayProps {
  autoPlay: boolean;
  totalItems: number;
  currentIndex: number;
  autoPlayLoop: boolean;
  autoPlayInterval: number;
  setCurrentIndex: (index: number) => void;
  autoPlayDirection: 'forward' | 'backward';
  flatListRef: RefObject<FlatList<any> | null>;
}

export function useAutoPlay({
  autoPlay,
  autoPlayDirection,
  autoPlayInterval,
  autoPlayLoop,
  currentIndex,
  flatListRef,
  setCurrentIndex,
  totalItems,
}: UseAutoPlayProps) {
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoPlay || totalItems === 0) {
      return undefined;
    }

    autoPlayTimerRef.current = setInterval(() => {
      let nextIndex: number;

      if (autoPlayDirection === 'forward') {
        nextIndex = currentIndex + 1;
        if (nextIndex >= totalItems) {
          nextIndex = autoPlayLoop ? 0 : currentIndex;
          if (!autoPlayLoop && autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
          }
        }
      } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = autoPlayLoop ? totalItems - 1 : currentIndex;
          if (!autoPlayLoop && autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
          }
        }
      }

      if (nextIndex !== currentIndex) {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: nextIndex,
        });
        setCurrentIndex(nextIndex);
      }
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [
    autoPlay,
    autoPlayDirection,
    autoPlayInterval,
    autoPlayLoop,
    currentIndex,
    totalItems,
    flatListRef,
    setCurrentIndex,
  ]);
}
