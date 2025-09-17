import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { Box, String, Tooltip } from '../src/components';

const meta: Meta<typeof Tooltip> = {
  argTypes: {
    allowChildInteraction: {
      control: 'boolean',
      description: 'Whether to allow interaction with the child element',
    },
    arrowColor: {
      control: 'color',
      description: 'Color of the tooltip arrow',
    },
    arrowSize: {
      control: 'select',
      description: 'Size of the tooltip arrow',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the tooltip',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class for the tooltip',
    },
    classNameWrapper: {
      control: 'text',
      description: 'Additional CSS class for the tooltip wrapper',
    },
    disableShadow: {
      control: 'boolean',
      description: 'Whether to disable the tooltip shadow',
    },
    displayInsets: {
      control: 'object',
      description: 'Display insets for the tooltip',
    },
    horizontalAdjustment: {
      control: 'number',
      description: 'Horizontal adjustment for the tooltip position',
    },
    modalComponent: {
      control: 'object',
      description: 'Custom modal component to use',
    },
    overlayColor: {
      control: 'color',
      description: 'Color of the overlay',
    },
    showChildInTooltip: {
      control: 'boolean',
      description: 'Whether to show the child element in the tooltip',
    },
    side: {
      control: 'select',
      description: 'Position of the tooltip relative to the trigger',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: {
      control: 'number',
      description: 'Offset from the trigger element',
    },
    supportedOrientations: {
      control: 'multi-select',
      description: 'Supported orientations for the tooltip',
      options: ['portrait', 'landscape', 'portrait-upside-down', 'landscape-left', 'landscape-right'],
    },
    textColor: {
      control: 'color',
      description: 'Color of the tooltip text',
    },
    textSize: {
      control: 'select',
      description: 'Size of the tooltip text',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    title: {
      control: 'text',
      description: 'Text content of the tooltip',
    },
    useInteractionManager: {
      control: 'boolean',
      description: 'Whether to use InteractionManager for showing the tooltip',
    },
    useReactNativeModal: {
      control: 'boolean',
      description: 'Whether to use React Native Modal for the tooltip',
    },
  },
  component: Tooltip,
  decorators: [
    (Story: React.ComponentType) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'components/Tooltip',
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    children: (
      <Box className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
        <String color="white">H</String>
      </Box>
    ),
    title: 'This is a tooltip',
  },
};

export const WithCustomContent: Story = {
  args: {
    backgroundColor: '#1a1a1a',
    children: (
      <Box className="h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <String color="white">C</String>
      </Box>
    ),
    content: (
      <Box className="p-2">
        <String color="white" size="lg">
          Custom Content
        </String>
        <String color="white" size="sm">
          With multiple lines
        </String>
      </Box>
    ),
  },
};

export const DifferentPositions: Story = {
  render: () => (
    <Box className="flex-row flex-wrap items-center justify-center gap-4">
      <Tooltip title="Top tooltip" side="top">
        <Box className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
          <String color="white">T</String>
        </Box>
      </Tooltip>

      <Tooltip title="Bottom tooltip" side="bottom">
        <Box className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
          <String color="white">B</String>
        </Box>
      </Tooltip>

      <Tooltip title="Left tooltip" side="left">
        <Box className="h-10 w-10 items-center justify-center rounded-full bg-yellow-500">
          <String color="white">L</String>
        </Box>
      </Tooltip>

      <Tooltip title="Right tooltip" side="right">
        <Box className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
          <String color="white">R</String>
        </Box>
      </Tooltip>
    </Box>
  ),
};

export const WithCustomColors: Story = {
  args: {
    arrowColor: '#4a90e2',
    backgroundColor: '#4a90e2',
    children: (
      <Box className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
        <String>Color</String>
      </Box>
    ),
    textColor: 'white',
    title: 'Custom colored tooltip',
  },
};

export const WithOffset: Story = {
  args: {
    children: (
      <Box className="h-10 w-10 items-center justify-center rounded-full bg-orange-500">
        <String color="white">O</String>
      </Box>
    ),
    sideOffset: 20,
    title: 'Tooltip with offset',
  },
};
