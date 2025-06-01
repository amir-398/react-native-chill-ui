import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import RipplePressable from '../src/components/ripple-pressable/RipplePressable';

const meta: Meta<typeof RipplePressable> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onPress: {
      action: 'text',
      description: 'Callback when pressed',
    },
  },
  component: RipplePressable,
  decorators: [
    Story => (
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
