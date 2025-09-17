import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import Slider from '../src/components/slider';
import { Box, String } from '../src/components';

const meta: Meta<typeof Slider> = {
  argTypes: {
    animateTransitions: {
      control: 'boolean',
      description: 'Whether to animate value changes',
    },
    animationConfig: {
      control: 'object',
      description: 'Animation configuration object',
    },
    animationType: {
      control: 'select',
      description: 'Type of animation to use',
      options: ['timing', 'spring'],
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
    debugTouchArea: {
      control: 'boolean',
      description: 'Show debug touch area',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
    },
    maximumTrackClassName: {
      control: 'text',
      description: 'Additional CSS classes for the maximum track',
    },
    maximumTrackColor: {
      control: 'color',
      description: 'Color of the maximum track',
    },
    maximumValue: {
      control: 'number',
      description: 'Maximum value of the slider',
    },
    minimumTrackClassName: {
      control: 'text',
      description: 'Additional CSS classes for the minimum track',
    },
    minimumTrackColor: {
      control: 'color',
      description: 'Color of the minimum track',
    },
    minimumValue: {
      control: 'number',
      description: 'Minimum value of the slider',
    },
    onSlidingComplete: {
      action: 'onSlidingComplete',
      description: 'Callback when sliding is complete',
    },
    onSlidingStart: {
      action: 'onSlidingStart',
      description: 'Callback when sliding starts',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback when value changes',
    },
    startFromZero: {
      control: 'boolean',
      description: 'Whether to start from zero',
    },
    step: {
      control: 'number',
      description: 'Step value for the slider',
    },
    thumbClassName: {
      control: 'text',
      description: 'Additional CSS classes for the thumb',
    },
    thumbColor: {
      control: 'color',
      description: 'Color of the thumb',
    },
    thumbImage: {
      control: 'text',
      description: 'Image source for the thumb',
    },
    thumbTouchSize: {
      control: 'object',
      description: 'Size of the touch area for the thumb',
    },
    trackClassName: {
      control: 'text',
      description: 'Additional CSS classes for the track',
    },
    trackClickable: {
      control: 'boolean',
      description: 'Whether the track is clickable',
    },
    trackMarks: {
      control: 'object',
      description: 'Array of values for track marks',
    },
    trackRightPadding: {
      control: 'number',
      description: 'Right padding for the track',
    },
    value: {
      control: 'number',
      description: 'Current value of the slider',
    },
    vertical: {
      control: 'boolean',
      description: 'Whether the slider is vertical',
    },
  },
  component: Slider,
  decorators: [
    (Story: any) => {
      console.log('Rendering story with decorator');
      return (
        <View style={{ padding: 20, width: '100%' }}>
          <Story />
        </View>
      );
    },
  ],
  title: 'components/Slider',
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    value: 50,
  },
};

export const WithSteps: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    step: 10,
    value: 50,
  },
};

export const RangeSlider: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    value: [25, 75],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    maximumValue: 100,
    minimumValue: 0,
    value: 50,
  },
};

export const CustomColors: Story = {
  args: {
    maximumTrackColor: '#000000',
    maximumValue: 100,
    minimumTrackColor: '#0000FF',
    minimumValue: 0,
    thumbColor: '#00FF00',
    value: 50,
  },
};

export const WithThumbMarkers: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    renderAboveThumbComponent: () => <View className="size-5 rounded-full bg-red-500" />,
    value: 50,
  },
};

export const CustomThumb: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    renderThumbComponent: () => (
      <View
        style={{
          backgroundColor: '#FF0000',
          borderRadius: 5,
          height: 20,
          width: 20,
        }}
      />
    ),
    value: 50,
  },
};

export const Vertical: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    value: 50,
    vertical: true,
  },
  render: (args: any) => (
    <View style={{ height: '100%', justifyContent: 'center', width: '100%' }}>
      <Slider {...args} />
    </View>
  ),
};

export const WithAnimation: Story = {
  args: {
    animateTransitions: true,
    animationConfig: {
      damping: 20,
      mass: 1,
      stiffness: 200,
    },
    animationType: 'spring',
    maximumValue: 100,
    minimumValue: 0,
    value: 50,
  },
};

export const WithTrackMarks: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    renderTrackMarkComponent: () => (
      <View
        style={{
          backgroundColor: '#666',
          height: 10,
          marginTop: 5,
          width: 2,
        }}
      />
    ),
    trackMarks: [0, 25, 50, 75, 100],
    value: 50,
  },
};

export const WithCustomTrack: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    renderMaximumTrackComponent: () => (
      <View
        style={{
          backgroundColor: '#E0E0E0',
          borderRadius: 2,
          height: 4,
        }}
      />
    ),
    renderMinimumTrackComponent: () => (
      <View
        style={{
          backgroundColor: '#4CAF50',
          borderRadius: 2,
          height: 4,
        }}
      />
    ),
    value: 50,
  },
};

export const WithThumbBelow: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    renderBelowThumbComponent: (_: any, value: any) => (
      <Box className="bg-primary rounded-md p-1">
        <String>{value}</String>
      </Box>
    ),
    thumbClassName: 'size-6 rounded-full',
    value: 50,
  },
};

export const WithCustomTouchSize: Story = {
  args: {
    debugTouchArea: true,
    maximumValue: 100,
    minimumValue: 0,
    thumbTouchSize: { height: 40, width: 40 },
    value: 50,
  },
};

export const WithStartFromZero: Story = {
  args: {
    maximumValue: 100,
    minimumValue: -100,
    startFromZero: true,
    value: 0,
  },
};

export const WithThumbAbove: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    renderAboveThumbComponent: (_: any, value: any) => <String>{value}</String>,
    value: 50,
  },
};
