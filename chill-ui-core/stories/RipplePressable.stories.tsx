import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import UiPresentation from './storybook/UiPresentation';
import { Box, String, RipplePressable } from '../src/components';

const meta: Meta<typeof RipplePressable> = {
  argTypes: {
    onPress: {
      action: 'pressed',
    },
  },
  component: RipplePressable,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full items-center justify-center p-4">
          <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/RipplePressable',
};

export default meta;
type Story = StoryObj<typeof RipplePressable>;

export const Default: Story = {
  args: {
    children: (
      <Box className="w-full rounded-lg p-4">
        <String style={{ color: '#000' }}>Press me</String>
      </Box>
    ),
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic RipplePressable with text content',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <Box className="rounded-full p-4">
        <Box className="h-6 w-6 rounded-full" style={{ backgroundColor: '#000' }} />
      </Box>
    ),
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with an icon button',
      },
    },
  },
};

export const LargeButton: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-6">
        <Box className="text-lg text-white">
          <String style={{ color: '#000' }}>Large Button</String>
        </Box>
      </Box>
    ),
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Large RipplePressable button with text',
      },
    },
  },
};

export const CustomRippleColor: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#3b82f6' }}>
        <String style={{ color: 'white' }}>Blue Button</String>
      </Box>
    ),
    effectColor: 'rgba(255, 255, 255, 0.8)',
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with custom white ripple effect on blue background',
      },
    },
  },
};

export const FastRipple: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#ef4444' }}>
        <String style={{ color: 'white' }}>Fast Ripple</String>
      </Box>
    ),
    effectColor: 'rgba(255, 255, 255, 0.6)',
    onPress: action('onPress'),
    speed: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with fast ripple animation (200ms)',
      },
    },
  },
};

export const SlowRipple: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#10b981' }}>
        <String style={{ color: 'white' }}>Slow Ripple</String>
      </Box>
    ),
    effectColor: 'rgba(255, 255, 255, 0.4)',
    onPress: action('onPress'),
    speed: 1000,
  },
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with slow ripple animation (1000ms)',
      },
    },
  },
};

export const DarkRipple: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#f3f4f6', borderColor: '#d1d5db', borderWidth: 1 }}>
        <String style={{ color: '#374151' }}>Light Button</String>
      </Box>
    ),
    effectColor: 'rgba(0, 0, 0, 0.1)',
    onPress: action('onPress'),
    speed: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with dark ripple effect on light background',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#6b7280' }}>
        <String style={{ color: 'white' }}>Disabled Button</String>
      </Box>
    ),
    disabled: true,
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled RipplePressable that does not respond to touches',
      },
    },
  },
};

export const WithCustomStyle: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4">
        <String style={{ color: 'white' }}>Custom Styled</String>
      </Box>
    ),
    onPress: action('onPress'),
    style: {
      backgroundColor: '#8b5cf6',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { height: 2, width: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with custom inline styles including shadow',
      },
    },
  },
};
