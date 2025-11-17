import { FlatList, StyleProp, ViewStyle } from 'react-native';
import { RefObject, createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

interface CarouselContextValue {
  loop: boolean;
  autoPlay: boolean;
  totalItems: number;
  currentIndex: number;
  autoPlayLoop: boolean;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  autoPlayInterval: number;
  setLoop: (loop: boolean) => void;
  contentStyle: StyleProp<ViewStyle>;
  scrollToIndex: (index: number) => void;
  orientation: 'horizontal' | 'vertical';
  setCurrentIndex: (index: number) => void;
  autoPlayDirection: 'forward' | 'backward';
  setTotalItems: (totalItems: number) => void;
  flatListRef: RefObject<FlatList<any> | null>;
  setContentStyle: (style: StyleProp<ViewStyle>) => void;
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
  autoPlay?: boolean;
  initialIndex: number;
  autoPlayLoop?: boolean;
  children: React.ReactNode;
  autoPlayInterval?: number;
  orientation?: 'horizontal' | 'vertical';
  onScrollChange?: (index: number) => void;
  autoPlayDirection?: 'forward' | 'backward';
}

export function CarouselProvider({
  autoPlay = false,
  autoPlayDirection = 'forward',
  autoPlayInterval = 3000,
  autoPlayLoop = false,
  children,
  initialIndex,
  loop: defaultLoop,
  onScrollChange,
  orientation = 'horizontal',
}: CarouselProviderProps) {
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [totalItems, setTotalItems] = useState(0);
  const [loop, setLoop] = useState(defaultLoop ?? false);
  const [contentStyle, setContentStyle] = useState<StyleProp<ViewStyle>>({});

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

  const contextValue = useMemo(
    () => ({
      autoPlay,
      autoPlayDirection,
      autoPlayInterval,
      autoPlayLoop,
      canScrollNext,
      canScrollPrev,
      contentStyle,
      currentIndex,
      flatListRef,
      loop,
      orientation,
      scrollToIndex,
      setContentStyle,
      setCurrentIndex,
      setLoop,
      setTotalItems,
      totalItems,
    }),
    [
      autoPlay,
      autoPlayDirection,
      autoPlayInterval,
      autoPlayLoop,
      canScrollNext,
      canScrollPrev,
      contentStyle,
      currentIndex,
      flatListRef,
      loop,
      scrollToIndex,
      setContentStyle,
      setCurrentIndex,
      setLoop,
      setTotalItems,
      totalItems,
      orientation,
    ],
  );

  return <CarouselContext.Provider value={contextValue}>{children}</CarouselContext.Provider>;
}

export { CarouselContext, useCarousel };
