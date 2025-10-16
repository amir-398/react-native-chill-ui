import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import { Box, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { ScalePressable } from '../src/components/scalePressable';

const meta: Meta<typeof ScalePressable> = {
  argTypes: {
    onPress: {
      action: 'pressed',
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
  title: 'components/ScalePressable',
};

export default meta;
type Story = StoryObj<typeof ScalePressable>;

export const Default: Story = {
  args: {
    children: (
      <Box className="w-full rounded-lg p-4" style={{ backgroundColor: '#3b82f6' }}>
        <String style={{ color: 'white' }}>Press me</String>
      </Box>
    ),
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic ScalePressable with text content and default scale effect',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <Box className="rounded-full p-4" style={{ backgroundColor: '#10b981' }}>
        <Box className="h-6 w-6 rounded-full" style={{ backgroundColor: 'white' }} />
      </Box>
    ),
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable with an icon button',
      },
    },
  },
};

export const LargeButton: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-6" style={{ backgroundColor: '#8b5cf6' }}>
        <String style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Large Button</String>
      </Box>
    ),
    onPress: action('onPress'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Large ScalePressable button with text',
      },
    },
  },
};

export const SubtleScale: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#f59e0b' }}>
        <String style={{ color: 'white' }}>Subtle Scale</String>
      </Box>
    ),
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
};

export const StrongScale: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#ef4444' }}>
        <String style={{ color: 'white' }}>Strong Scale</String>
      </Box>
    ),
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
};

export const FastAnimation: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#06b6d4' }}>
        <String style={{ color: 'white' }}>Fast Animation</String>
      </Box>
    ),
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
};

export const SlowAnimation: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#84cc16' }}>
        <String style={{ color: 'white' }}>Slow Animation</String>
      </Box>
    ),
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
};

export const CustomScaleAndDuration: Story = {
  args: {
    children: (
      <Box className="rounded-lg p-4" style={{ backgroundColor: '#ec4899' }}>
        <String style={{ color: 'white' }}>Custom Scale & Duration</String>
      </Box>
    ),
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
        story: 'Disabled ScalePressable that does not respond to touches',
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
      backgroundColor: '#7c3aed',
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
        story: 'ScalePressable with custom inline styles including shadow',
      },
    },
  },
};

export const CardStyle: Story = {
  args: {
    children: (
      <Box className="rounded-xl p-6" style={{ backgroundColor: 'white', borderColor: '#e5e7eb', borderWidth: 1 }}>
        <String style={{ color: '#374151', fontSize: 16, fontWeight: '600' }}>Card Title</String>
        <String style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Card description text</String>
      </Box>
    ),
    duration: 100,
    onPress: action('onPress'),
    scaleValue: 0.95,
  },
  parameters: {
    docs: {
      description: {
        story: 'ScalePressable styled as a card with subtle scale effect',
      },
    },
  },
};

export const ButtonGroup: Story = {
  args: {
    children: (
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
    ),
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
};
