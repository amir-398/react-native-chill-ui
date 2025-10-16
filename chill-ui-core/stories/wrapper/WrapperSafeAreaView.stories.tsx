import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WrapperSafeAreaViewTw, String } from '../../src/components';

const meta = {
  args: {
    fill: true,
    px: 'md',
  },
  argTypes: {
    fill: {
      description: 'Whether to fill the available space',
      table: {
        defaultValue: {
          summary: 'true',
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
    ViewProps: {
      control: {
        type: 'object',
      },
      description: 'Any other props accepted by the native `View` component.',
    },
  },
  component: WrapperSafeAreaViewTw,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  title: 'LAYOUT/Wrapper/WrapperSafeAreaView',
} satisfies Meta<typeof WrapperSafeAreaViewTw>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <WrapperSafeAreaViewTw {...args}>
      <String>Default SafeAreaView wrapper content</String>
    </WrapperSafeAreaViewTw>
  ),
};
