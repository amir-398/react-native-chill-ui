import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WrapperKeyboardAvoidingView, String, Box, Button } from '../../src/components';

const meta = {
  args: {
    fill: true,
    px: 'md',
  },
  argTypes: {
    behavior: {
      control: {
        type: 'select',
      },
      description: 'Behavior of the keyboard avoiding view',
      options: ['height', 'position', 'padding', 'translate-with-padding'],
      table: {
        defaultValue: {
          summary: 'padding',
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
    keyboardVerticalOffset: {
      control: {
        type: 'number',
      },
      description: 'Keyboard vertical offset',
      table: {
        defaultValue: {
          summary: 10,
        },
      },
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
  component: WrapperKeyboardAvoidingView,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  title: 'LAYOUT/Wrapper/WrapperKeyboardAvoidingView',
} satisfies Meta<typeof WrapperKeyboardAvoidingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <WrapperKeyboardAvoidingView {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Form with Keyboard Avoidance</String>
        <Box className="space-y-2">
          <String>Name:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Input field 1</String>
        </Box>
        <Box className="space-y-2">
          <String>Email:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Input field 2</String>
        </Box>
        <Box className="space-y-2">
          <String>Message:</String>
          <String className="h-20 rounded border border-gray-300 bg-white p-2">Multi-line input field</String>
        </Box>
        <Button colorVariant="primary" size="md">
          <String>Submit</String>
        </Button>
      </Box>
    </WrapperKeyboardAvoidingView>
  ),
};

export const WithDifferentBehaviors: Story = {
  render: () => (
    <Box className="space-y-6">
      <WrapperKeyboardAvoidingView behavior="padding" className="bg-blue-100 p-4">
        <String className="font-bold">Behavior: padding</String>
        <String>This uses padding behavior for keyboard avoidance</String>
      </WrapperKeyboardAvoidingView>

      <WrapperKeyboardAvoidingView behavior="height" className="bg-green-100 p-4">
        <String className="font-bold">Behavior: height</String>
        <String>This uses height behavior for keyboard avoidance</String>
      </WrapperKeyboardAvoidingView>

      <WrapperKeyboardAvoidingView behavior="position" className="bg-purple-100 p-4">
        <String className="font-bold">Behavior: position</String>
        <String>This uses position behavior for keyboard avoidance</String>
      </WrapperKeyboardAvoidingView>
    </Box>
  ),
};

export const WithSafeArea: Story = {
  arg: {
    behavior: 'padding',
    className: 'bg-yellow-100 p-4',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
  render: (args: any) => (
    <WrapperKeyboardAvoidingView {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Keyboard Avoiding with SafeArea</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Safe area input</String>
        </Box>
        <Button colorVariant="secondary" size="sm">
          <String>Action</String>
        </Button>
      </Box>
    </WrapperKeyboardAvoidingView>
  ),
};
