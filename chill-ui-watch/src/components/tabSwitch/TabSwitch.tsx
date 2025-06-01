import { useState, useRef, useMemo } from 'react';
import { Dimensions, FlatList, Pressable } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import cn from '../cn';
import String from '../string';
import { AnimatedBox, Box } from '../box';
import { TabSwitchProps } from '../../types';
import TabSwitchRender from './TabSwitchRender';

type ScreenType = {
  key: 'leftScreen' | 'rightScreen';
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ANIMATION_DURATION = 300;
const screenType: ScreenType[] = [{ key: 'leftScreen' }, { key: 'rightScreen' }];

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
  const [activeScreen, setActiveScreen] = useState<'leftScreen' | 'rightScreen'>('leftScreen');

  const flatlistRef = useRef<FlatList<ScreenType>>(null);

  const translateX = useSharedValue(0);

  const handleTabPress = (index: number) => {
    flatlistRef.current?.scrollToIndex({ animated: true, index });
    translateX.value = withTiming(index * (SCREEN_WIDTH / 2), {
      duration: ANIMATION_DURATION,
    });
    setActiveScreen(screenType[index].key);
  };

  const animatedSeparatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

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
              weight="bold"
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
