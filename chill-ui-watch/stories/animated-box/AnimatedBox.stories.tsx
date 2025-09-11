import type { Meta, StoryObj } from '@storybook/react';

import { Animated } from 'react-native';
import { useRef, useEffect } from 'react';

import { String } from '../../src/components';
import AnimatedBox from '../../src/components/animatedBox/components/animatedBox/AnimatedBox';

const meta = {
  component: AnimatedBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/AnimatedBox/AnimatedBox',
} satisfies Meta<typeof AnimatedBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Fade Animation
export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fadeAnim = useRef(new Animated.Value(0)).current;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      Animated.timing(fadeAnim, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <AnimatedBox
        style={{
          opacity: fadeAnim,
        }}
        className="rounded-lg bg-blue-100 p-6"
      >
        <String size="lg" className="text-center">
          Fade In Animation
        </String>
      </AnimatedBox>
    );
  },
};
