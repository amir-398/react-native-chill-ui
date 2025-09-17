import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import { Pressable } from 'react-native';

import UiPresentation from './storybook';
import { Box, String, TooltipRoot } from '../src/components';

const meta: Meta<typeof TooltipRoot> = {
  argTypes: {
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
    closeOnBackgroundInteraction: {
      control: 'boolean',
      description: 'Whether to close the tooltip when clicking the background',
    },
    closeOnChildInteraction: {
      control: 'boolean',
      description: 'Whether to close the tooltip when interacting with the child',
    },
    closeOnContentInteraction: {
      control: 'boolean',
      description: 'Whether to close the tooltip when interacting with the content',
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
    isVisible: {
      control: 'boolean',
      description: 'Controls the visibility of the tooltip',
    },
    modalComponent: {
      control: 'object',
      description: 'Custom modal component to use',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when the tooltip is closed',
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
    useInteractionManager: {
      control: 'boolean',
      description: 'Whether to use InteractionManager for showing the tooltip',
    },
    useReactNativeModal: {
      control: 'boolean',
      description: 'Whether to use React Native Modal for the tooltip',
    },
  },
  component: TooltipRoot,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'components/TooltipRoot',
};

export default meta;
type Story = StoryObj<typeof TooltipRoot>;

function TooltipRootWithState({ content, ...args }: any) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipRoot {...args} content={content} isVisible={isVisible} onClose={() => setIsVisible(false)}>
      <Pressable
        className="h-10 w-10 items-center justify-center rounded-full bg-blue-500"
        onPress={() => setIsVisible(true)}
      >
        <String color="white">H</String>
      </Pressable>
    </TooltipRoot>
  );
}

function DifferentPositionsComponent() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <Box className="flex-row flex-wrap items-center justify-center gap-4">
      <TooltipRoot
        isVisible={activeTooltip === 'top'}
        onClose={() => setActiveTooltip(null)}
        content={<String>Top tooltip</String>}
        side="top"
      >
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-green-500"
          onPress={() => setActiveTooltip('top')}
        >
          <String color="white">T</String>
        </Pressable>
      </TooltipRoot>

      <TooltipRoot
        isVisible={activeTooltip === 'bottom'}
        onClose={() => setActiveTooltip(null)}
        content={<String>Bottom tooltip</String>}
        side="bottom"
      >
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          onPress={() => setActiveTooltip('bottom')}
        >
          <String color="white">B</String>
        </Pressable>
      </TooltipRoot>

      <TooltipRoot
        isVisible={activeTooltip === 'left'}
        onClose={() => setActiveTooltip(null)}
        content={<String>Left tooltip</String>}
        side="left"
      >
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-yellow-500"
          onPress={() => setActiveTooltip('left')}
        >
          <String color="white">L</String>
        </Pressable>
      </TooltipRoot>

      <TooltipRoot
        isVisible={activeTooltip === 'right'}
        onClose={() => setActiveTooltip(null)}
        content={<String>Right tooltip</String>}
        side="right"
      >
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          onPress={() => setActiveTooltip('right')}
        >
          <String color="white">R</String>
        </Pressable>
      </TooltipRoot>
    </Box>
  );
}

export const Basic: Story = {
  args: {
    content: <String>This is a tooltip</String>,
  },
  render: (args: any) => <TooltipRootWithState {...args} />,
};

export const WithCustomContent: Story = {
  args: {
    backgroundColor: '#1a1a1a',
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
  render: (args: any) => <TooltipRootWithState {...args} />,
};

export const DifferentPositions: Story = {
  render: () => <DifferentPositionsComponent />,
};

export const WithCustomColors: Story = {
  args: {
    arrowColor: '#4a90e2',
    backgroundColor: '#4a90e2',
    content: <String color="white">Custom colored tooltip</String>,
  },
  render: (args: any) => <TooltipRootWithState {...args} />,
};

export const WithOffset: Story = {
  args: {
    content: <String>Tooltip with offset</String>,
    sideOffset: 20,
  },
  render: (args: any) => <TooltipRootWithState {...args} />,
};

export const WithoutModal: Story = {
  args: {
    content: <String>Tooltip without modal</String>,
    useReactNativeModal: false,
  },
  render: (args: any) => <TooltipRootWithState {...args} />,
};

export const withoutShadow: Story = {
  args: {
    content: <String>Tooltip without shadow</String>,
    disableShadow: true,
  },
  render: (args: any) => <TooltipRootWithState {...args} />,
};
