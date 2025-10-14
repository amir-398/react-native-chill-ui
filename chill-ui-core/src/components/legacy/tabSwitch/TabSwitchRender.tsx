import { memo, useCallback, useRef } from 'react';
// eslint-disable-next-line
import { SharedValue, withTiming } from 'react-native-reanimated';
import { FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { Box } from '../../box';

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

/**
 * TabSwitchRender component that handles the content rendering and scroll interactions.
 * Manages the FlatList for horizontal scrolling between tabs and synchronizes animations.
 *
 * @example
 * ```tsx
 * <TabSwitchRender
 *   leftRender={<ProfileContent />}
 *   rightRender={<SettingsContent />}
 *   screenType={screenType}
 *   setActiveScreen={setActiveScreen}
 *   translateX={translateX}
 *   flatlistRef={flatlistRef}
 * />
 * ```
 *
 * @param flatlistRef - Reference to the FlatList for programmatic control
 * @param leftRender - Content to render in the left tab
 * @param rightRender - Content to render in the right tab
 * @param screenType - Array of screen configurations
 * @param setActiveScreen - Function to update active screen state
 * @param translateX - Shared animated value for separator translation
 * @returns FlatList component with tab content and scroll handling
 */
function TabSwitchRender({
  flatlistRef,
  leftRender,
  rightRender,
  screenType,
  setActiveScreen,
  translateX,
}: TabSwitchRenderProps) {
  /** Reference to the translateX shared value for scroll handling */
  const translateXRef = useRef(translateX);

  /**
   * Handles scroll momentum end to update active screen and animate separator
   * @param event - Native scroll event from FlatList
   */
  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(scrollOffsetX / SCREEN_WIDTH);

      translateXRef?.current?.value = withTiming(currentIndex * (SCREEN_WIDTH / 2), {
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
