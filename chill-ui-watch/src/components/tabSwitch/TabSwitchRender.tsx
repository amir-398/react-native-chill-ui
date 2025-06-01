import { memo, useCallback, useRef } from 'react';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { Box } from '../box';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ANIMATION_DURATION = 300;
type ScreenType = {
  key: 'leftScreen' | 'rightScreen';
};

type TabSwitchRenderProps = {
  leftRender: React.ReactNode;
  rightRender: React.ReactNode;
  screenType: ScreenType[];
  setActiveScreen: (screen: 'leftScreen' | 'rightScreen') => void;
  flatlistRef: React.RefObject<FlatList<ScreenType> | null>;
  translateX: SharedValue<number>;
};

function TabSwitchRender({
  flatlistRef,
  leftRender,
  rightRender,
  screenType,
  setActiveScreen,
  translateX,
}: TabSwitchRenderProps) {
  const translateXRef = useRef(translateX);

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(scrollOffsetX / SCREEN_WIDTH);

      translateXRef.current.value = withTiming(currentIndex * (SCREEN_WIDTH / 2), {
        duration: ANIMATION_DURATION,
      });
      setActiveScreen(screenType[currentIndex].key);
    },
    [screenType, setActiveScreen],
  );

  return (
    <FlatList
      ref={flatlistRef}
      data={screenType}
      keyExtractor={item => item.key}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onMomentumScrollEnd={onMomentumScrollEnd}
      scrollEventThrottle={16}
      renderItem={({ item }) =>
        item.key === 'leftScreen' ? (
          <Box className="w-screen">{leftRender}</Box>
        ) : (
          <Box className="w-screen">{rightRender}</Box>
        )
      }
    />
  );
}

export default memo(TabSwitchRender);
