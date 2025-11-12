import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import { Box, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { ScalePressableTw as ScalePressable } from '../src/components/scalePressable';

const meta: Meta<typeof ScalePressable> = {
  argTypes: {
    duration: {
      table: {
        defaultValue: {
          summary: 100,
        },
      },
    },
    scaleValue: {
      table: {
        defaultValue: {
          summary: 0.95,
        },
      },
    },
  },
  component: ScalePressable,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full items-center justify-center p-4">
          <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'ACTIONS/ScalePressable',
};

export default meta;
type Story = StoryObj<typeof ScalePressable>;

export const Default: Story = {
  args: {
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic ScalePressable with text content and default scale effect',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="w-full rounded-lg p-4" style={{ backgroundColor: '#3b82f6' }}>
        <String style={{ color: 'white' }}>Press me</String>
      </Box>
    </ScalePressable>
  ),
};

export const SubtleScale: Story = {
  args: {
    onPress: action('onPress'),
    scaleValue: 0.98,
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with subtle scale effect (0.98)',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#f59e0b' }}>
        <String style={{ color: 'white' }}>Subtle Scale</String>
      </Box>
    </ScalePressable>
  ),
};

export const StrongScale: Story = {
  args: {
    onPress: action('onPress'),
    scaleValue: 0.85,
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with strong scale effect (0.85)',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#ef4444' }}>
        <String style={{ color: 'white' }}>Strong Scale</String>
      </Box>
    </ScalePressable>
  ),
};

export const FastAnimation: Story = {
  args: {
    duration: 50,
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with fast animation (50ms)',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#06b6d4' }}>
        <String style={{ color: 'white' }}>Fast Animation</String>
      </Box>
    </ScalePressable>
  ),
};

export const SlowAnimation: Story = {
  args: {
    duration: 300,
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with slow animation (300ms)',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#84cc16' }}>
        <String style={{ color: 'white' }}>Slow Animation</String>
      </Box>
    </ScalePressable>
  ),
};

export const CustomScaleAndDuration: Story = {
  args: {
    duration: 150,
    onPress: action('onPress'),
    scaleValue: 0.9,
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with custom scale value (0.9) and duration (150ms)',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#ec4899' }}>
        <String style={{ color: 'white' }}>Custom Scale & Duration</String>
      </Box>
    </ScalePressable>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled ScalePressable that does not respond to touches',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#6b7280' }}>
        <String style={{ color: 'white' }}>Disabled Button</String>
      </Box>
    </ScalePressable>
  ),
};

export const ButtonGroup: Story = {
  args: {
    duration: 80,
    onPress: action('onPress'),
    scaleValue: 0.92,
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with multiple button options in a group',
      },
    },
  },
  render: (args: any) => (
    <ScalePressable {...args}>
      <Box className="flex-row gap-2">
        <Box className="rounded-lg p-3" style={{ backgroundColor: '#3b82f6' }}>
          <String style={{ color: 'white', fontSize: 14 }}>Option 1</String>
        </Box>
        <Box className="rounded-lg p-3" style={{ backgroundColor: '#10b981' }}>
          <String style={{ color: 'white', fontSize: 14 }}>Option 2</String>
        </Box>
        <Box className="rounded-lg p-3" style={{ backgroundColor: '#f59e0b' }}>
          <String style={{ color: 'white', fontSize: 14 }}>Option 3</String>
        </Box>
      </Box>
    </ScalePressable>
  ),
};
