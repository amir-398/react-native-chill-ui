import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WrapperKeyboardAwareScrollViewTw, String, Box, Button } from '../../src/components';

const meta = {
  args: {
    fill: true,
    px: 'md',
  },
  argTypes: {
    bottomOffset: {
      control: {
        type: 'number',
      },
      description: 'Bottom offset for the keyboard avoiding view',
      table: {
        defaultValue: {
          summary: 20,
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
    ViewProps: {
      control: {
        type: 'object',
      },
      description: 'Any other props accepted by the native `View` component.',
    },
  },
  component: WrapperKeyboardAwareScrollViewTw,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  title: 'LAYOUT/Wrapper/WrapperKeyboardAwareScrollView',
} satisfies Meta<typeof WrapperKeyboardAwareScrollViewTw>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <WrapperKeyboardAwareScrollViewTw {...args}>
      <Box className="space-y-6">
        <String className="text-2xl font-bold">Keyboard Aware Form</String>

        <Box className="space-y-4">
          <String className="text-lg font-semibold">Personal Information</String>
          <Box className="space-y-2">
            <String>First Name:</String>
            <String className="rounded border border-gray-300 bg-white p-2">John</String>
          </Box>
          <Box className="space-y-2">
            <String>Last Name:</String>
            <String className="rounded border border-gray-300 bg-white p-2">Doe</String>
          </Box>
          <Box className="space-y-2">
            <String>Email:</String>
            <String className="rounded border border-gray-300 bg-white p-2">john.doe@example.com</String>
          </Box>
        </Box>

        <Box className="flex-row space-x-4">
          <Button colorVariant="primary" size="md">
            <String>Submit</String>
          </Button>
          <Button colorVariant="secondary" size="md">
            <String>Cancel</String>
          </Button>
        </Box>
      </Box>
    </WrapperKeyboardAwareScrollViewTw>
  ),
};

export const WithSafeArea: Story = {
  args: {
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
  render: (args: any) => (
    <WrapperKeyboardAwareScrollViewTw {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Keyboard Aware with SafeArea</String>
        <String>Combines keyboard awareness with SafeAreaView</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Safe area input</String>
        </Box>
      </Box>
    </WrapperKeyboardAwareScrollViewTw>
  ),
};

export const DisabledKeyboardAware: Story = {
  args: {
    enabled: false,
  },
  render: (args: any) => (
    <WrapperKeyboardAwareScrollViewTw {...args}>
      <Box className="space-y-4">
        <String className="text-lg font-bold">Disabled Keyboard Aware</String>
        <String>Keyboard awareness is disabled</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Disabled aware input</String>
        </Box>
      </Box>
    </WrapperKeyboardAwareScrollViewTw>
  ),
};
