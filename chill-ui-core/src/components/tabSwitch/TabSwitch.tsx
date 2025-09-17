import { cn } from '@utils';
import { useState, useRef, useMemo } from 'react';
// eslint-disable-next-line
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Dimensions, FlatList, Pressable } from 'react-native';

import { Box } from '../box';
import { String } from '../string';
import { AnimatedBox } from '../animatedBox';
import TabSwitchRender from './TabSwitchRender';
import { TabSwitchProps } from '../../types/tabSwitch.types';

type ScreenType = {
  key: 'leftScreen' | 'rightScreen';
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ANIMATION_DURATION = 300;
const screenType: ScreenType[] = [{ key: 'leftScreen' }, { key: 'rightScreen' }];

/**
 * TabSwitch component that provides a two-tab interface with smooth animations and gesture support.
 * Features animated tab switching, customizable styling, and horizontal swipe navigation.
 *
 * @example
 * ```tsx
 * // Basic tab switch
 * <TabSwitch
 *   leftScreenTitle="Tab 1"
 *   rightScreenTitle="Tab 2"
 *   leftRender={<Box><String>Content 1</String></Box>}
 *   rightRender={<Box><String>Content 2</String></Box>}
 * />
 *
 * // Customized tab switch
 * <TabSwitch
 *   leftScreenTitle="Profile"
 *   rightScreenTitle="Settings"
 *   leftTabColor="#E5E7EB"
 *   leftTabColorActive="#3B82F6"
 *   rightTabColor="#E5E7EB"
 *   rightTabColorActive="#3B82F6"
 *   leftRender={<ProfileScreen />}
 *   rightRender={<SettingsScreen />}
 * />
 * ```
 *
 * @param activeSeparatorColor - Color of the active separator indicator
 * @param leftRender - Content to render in the left tab
 * @param leftScreenTitle - Title for the left tab
 * @param leftTabClassName - Custom CSS classes for left tab
 * @param leftTabColor - Background color of inactive left tab
 * @param leftTabColorActive - Background color of active left tab
 * @param rightRender - Content to render in the right tab
 * @param rightScreenTitle - Title for the right tab
 * @param rightTabClassName - Custom CSS classes for right tab
 * @param rightTabColor - Background color of inactive right tab
 * @param rightTabColorActive - Background color of active right tab
 * @param separatorClassName - Custom CSS classes for separator
 * @param separatorColor - Color of the separator background
 * @param tabClassName - Custom CSS classes for all tabs
 * @param titleClassName - Custom CSS classes for tab titles
 * @param titleColor - Color of inactive tab titles
 * @param titleColorActive - Color of active tab titles
 * @param titleSize - Size of tab titles ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl')
 * @returns TabSwitch component with animated tab switching
 */
export default function TabSwitch({
  activeSeparatorColor = '#FCA5A5',
  leftRender,
  leftScreenTitle,
  leftTabClassName,
  leftTabColor = '#CBD2D9',
  leftTabColorActive = '#7DD3FC',
  rightRender,
  rightScreenTitle,
  rightTabClassName,
  rightTabColor = '#CBD2D9',
  rightTabColorActive = '#7DD3FC',
  separatorClassName,
  separatorColor = 'black',
  tabClassName,
  titleClassName,
  titleColor,
  titleColorActive,
  titleSize = 'lg',
}: TabSwitchProps) {
  /** Current active screen state */
  const [activeScreen, setActiveScreen] = useState<'leftScreen' | 'rightScreen'>('leftScreen');

  /** Reference to the FlatList for programmatic scrolling */
  const flatlistRef = useRef<FlatList<ScreenType>>(null);

  /** Shared animated value for separator translation */
  const translateX = useSharedValue(0);

  /**
   * Handles tab press events and animates the separator
   * @param index - Index of the pressed tab (0 for left, 1 for right)
   */
  const handleTabPress = (index: number) => {
    flatlistRef.current?.scrollToIndex({ animated: true, index });
    translateX.value = withTiming(index * (SCREEN_WIDTH / 2), {
      duration: ANIMATION_DURATION,
    });
    setActiveScreen(screenType[index].key);
  };

  /** Animated style for the separator indicator */
  const animatedSeparatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  /** Memoized tabs configuration for rendering */
  const tabs = useMemo(
    () => [
      {
        activeColor: leftTabColorActive,
        className: leftTabClassName,
        inactiveColor: leftTabColor,
        key: 'leftScreen',
        title: leftScreenTitle,
      },
      {
        activeColor: rightTabColorActive,
        className: rightTabClassName,
        inactiveColor: rightTabColor,
        key: 'rightScreen',
        title: rightScreenTitle,
      },
    ],
    [
      leftTabColorActive,
      leftTabColor,
      leftTabClassName,
      leftScreenTitle,
      rightTabColorActive,
      rightTabColor,
      rightTabClassName,
      rightScreenTitle,
    ],
  );

  return (
    <Box className="flex-1">
      <Box className="flex-row">
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.key}
            className={cn('w-1/2 items-center p-4', tab.className, tabClassName)}
            style={{ backgroundColor: activeScreen === tab.key ? tab.activeColor : tab.inactiveColor }}
            onPress={() => handleTabPress(index)}
          >
            <String
              size={titleSize}
              className={titleClassName}
              style={{
                ...(titleColor && { color: activeScreen === tab.key ? titleColorActive : titleColor }),
              }}
            >
              {tab.title}
            </String>
          </Pressable>
        ))}
      </Box>
      <Box
        className={cn('relative h-0.5', separatorClassName)}
        style={{ ...(separatorColor && { backgroundColor: separatorColor }) }}
      >
        <AnimatedBox style={[animatedSeparatorStyle]}>
          <Box className="h-full w-1/2" style={{ backgroundColor: activeSeparatorColor }} />
        </AnimatedBox>
      </Box>
      <TabSwitchRender
        leftRender={leftRender}
        rightRender={rightRender}
        screenType={screenType}
        setActiveScreen={setActiveScreen}
        translateX={translateX}
        flatlistRef={flatlistRef}
      />
    </Box>
  );
}
