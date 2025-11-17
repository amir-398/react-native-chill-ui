import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WrapperScrollViewTw, String, Box } from '../../src/components';

const meta = {
  args: {
    fill: true,
    px: 'md',
  },
  argTypes: {
    alwaysBounceVertical: {
      control: {
        type: 'boolean',
      },
      description: 'Whether to always bounce vertically',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    fill: {
      description: 'Whether to fill the available space',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    grow: {
      control: {
        type: 'boolean',
      },
      description: 'Whether to grow the wrapper to fill parent',
    },
    px: {
      control: {
        type: 'select',
      },
      description: 'Padding horizontal variant',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    ScrollViewProps: {
      control: {
        type: 'object',
      },
      description: 'Any other props accepted by the native `ScrollView` component.',
    },
    showVerticalScrollIndicator: {
      control: {
        type: 'boolean',
      },
      description: 'Whether to show the vertical scroll indicator',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  component: WrapperScrollViewTw,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  title: 'LAYOUT/Wrapper/WrapperScrollView',
} satisfies Meta<typeof WrapperScrollViewTw>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'bg-gray-100 p-4 max-h-[200px]',
  },
  render: (args: any) => (
    <WrapperScrollViewTw {...args}>
      <Box className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <String key={i} className="rounded bg-white p-4">
            Scrollable item {i + 1}
          </String>
        ))}
      </Box>
    </WrapperScrollViewTw>
  ),
};

export const WithSafeArea: Story = {
  args: {
    className: 'bg-green-50 p-4 max-h-[400px]',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
  render: (args: any) => (
    <WrapperScrollViewTw {...args}>
      <Box className="space-y-4">
        {Array.from({ length: 15 }, (_, i) => (
          <String key={i} className="rounded bg-green-100 p-4">
            Safe area scrollable item {i + 1}
          </String>
        ))}
      </Box>
    </WrapperScrollViewTw>
  ),
};

export const HorizontalScroll: Story = {
  args: {
    className: 'bg-purple-50 p-4',
    horizontal: true,
  },
  render: (args: any) => (
    <WrapperScrollViewTw {...args}>
      <Box className="flex-row space-x-4">
        {Array.from({ length: 10 }, (_, i) => (
          <String key={i} className="whitespace-nowrap rounded bg-purple-100 p-4">
            Horizontal item {i + 1}
          </String>
        ))}
      </Box>
    </WrapperScrollViewTw>
  ),
};
