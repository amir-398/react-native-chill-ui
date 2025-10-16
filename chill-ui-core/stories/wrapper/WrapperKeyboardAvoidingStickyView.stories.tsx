import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WrapperKeyboardAvoidingStickyView, String, Box, Button } from '../../src/components';

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
    ViewProps: {
      control: {
        type: 'object',
      },
      description: 'Any other props accepted by the native `View` component.',
    },
  },
  component: WrapperKeyboardAvoidingStickyView,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  title: 'LAYOUT/Wrapper/WrapperKeyboardAvoidingStickyView',
} satisfies Meta<typeof WrapperKeyboardAvoidingStickyView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <WrapperKeyboardAvoidingStickyView {...args}>
      <String>Default KeyboardAvoidingStickyView wrapper content</String>
    </WrapperKeyboardAvoidingStickyView>
  ),
};

export const WithStickyContent: Story = {
  render: (args: any) => (
    <WrapperKeyboardAvoidingStickyView {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Sticky Keyboard Avoiding View</String>
        <String>This wrapper provides sticky keyboard avoidance behavior</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Sticky input field</String>
        </Box>
        <Button colorVariant="primary" size="sm">
          <String>Action</String>
        </Button>
      </Box>
    </WrapperKeyboardAvoidingStickyView>
  ),
};

export const WithCustomOffset: Story = {
  render: (args: any) => (
    <WrapperKeyboardAvoidingStickyView {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Custom Offset Sticky View</String>
        <String>This has custom close and open offsets</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Custom offset input</String>
        </Box>
      </Box>
    </WrapperKeyboardAvoidingStickyView>
  ),
};

export const WithSafeArea: Story = {
  render: (args: any) => (
    <WrapperKeyboardAvoidingStickyView {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Sticky View with SafeArea</String>
        <String>Combines sticky keyboard avoidance with SafeAreaView</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Safe area sticky input</String>
        </Box>
      </Box>
    </WrapperKeyboardAvoidingStickyView>
  ),
};
