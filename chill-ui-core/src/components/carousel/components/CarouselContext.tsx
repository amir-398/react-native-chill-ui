import { FlatList } from 'react-native';
import { RefObject, createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

interface CarouselContextValue {
  loop: boolean;
  totalItems: number;
  currentIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  setLoop: (loop: boolean) => void;
  scrollToIndex: (index: number) => void;
  setCurrentIndex: (index: number) => void;
  setTotalItems: (totalItems: number) => void;
  flatListRef: RefObject<FlatList<any> | null>;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within a Carousel');
  }
  return context;
};

interface CarouselProviderProps {
  loop?: boolean;
  initialIndex: number;
  children: React.ReactNode;
  onScrollChange?: (index: number) => void;
}

export function CarouselProvider({ children, initialIndex, loop: defaultLoop, onScrollChange }: CarouselProviderProps) {
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [totalItems, setTotalItems] = useState(0);
  const [loop, setLoop] = useState(defaultLoop ?? false);

  const canScrollPrev = useMemo(() => currentIndex > 0, [currentIndex]);
  const canScrollNext = useMemo(() => currentIndex < totalItems - 1, [currentIndex, totalItems]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalItems) {
        flatListRef.current?.scrollToIndex({ animated: true, index });
        setCurrentIndex(index);
        onScrollChange?.(index);
      }
    },
    [onScrollChange, totalItems],
  );

  const defaultValue = useMemo(
    () => ({
      canScrollNext,
      canScrollPrev,
      currentIndex,
      flatListRef,
      loop,
      scrollToIndex,
      setCurrentIndex,
      setLoop,
      setTotalItems,
      totalItems,
    }),
    [
      currentIndex,
      canScrollPrev,
      canScrollNext,
      totalItems,
      flatListRef,
      setCurrentIndex,
      scrollToIndex,
      setTotalItems,
      loop,
      setLoop,
    ],
  );

  return <CarouselContext.Provider value={defaultValue}>{children}</CarouselContext.Provider>;
}

export { CarouselContext, useCarousel };
