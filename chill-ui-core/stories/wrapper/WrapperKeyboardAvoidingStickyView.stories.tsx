import type { Meta, StoryObj } from '@storybook/react';

import { WrapperKeyboardAvoidingStickyView, String, Box, Button } from '../../src/components';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes for the wrapper (NativeWind)',
    },
    edges: {
      control: 'object',
      description: 'Safe area edges to apply when hasSafeArea is true',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the keyboard avoiding sticky view is enabled',
    },
    fill: {
      control: 'boolean',
      description: 'Whether to fill the wrapper',
    },
    grow: {
      control: 'boolean',
      description: 'Whether to grow the wrapper',
    },
    hasSafeArea: {
      control: 'boolean',
      description: 'Whether to wrap content in SafeAreaView',
    },
    offset: {
      control: 'object',
      description: 'Offset for the keyboard avoiding sticky view',
    },
    px: {
      control: 'select',
      description: 'Horizontal padding variant',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    style: {
      control: 'object',
      description: 'Custom styles for the wrapper',
    },
  },
  component: WrapperKeyboardAvoidingStickyView,
  parameters: {
    docs: {
      description: {
        component:
          'A KeyboardAvoidingStickyView wrapper component with default styling and SafeAreaView support. Automatically detects NativeWind availability and falls back to StyleSheet if needed.',
      },
    },
  },
  title: 'Components/Wrapper/WrapperKeyboardAvoidingStickyView',
} satisfies Meta<typeof WrapperKeyboardAvoidingStickyView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <String>Default KeyboardAvoidingStickyView wrapper content</String>,
  },
};

export const WithStickyContent: Story = {
  args: {
    children: (
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
    ),
    className: 'bg-blue-100 p-4',
  },
};

export const WithCustomOffset: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Custom Offset Sticky View</String>
        <String>This has custom close and open offsets</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Custom offset input</String>
        </Box>
      </Box>
    ),
    className: 'bg-green-100 p-4',
    offset: { close: 50, open: 100 },
  },
};

export const WithSafeArea: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Sticky View with SafeArea</String>
        <String>Combines sticky keyboard avoidance with SafeAreaView</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Safe area sticky input</String>
        </Box>
      </Box>
    ),
    className: 'bg-purple-100 p-4',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
};

export const DisabledStickyView: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Disabled Sticky View</String>
        <String>Sticky keyboard avoidance is disabled</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Disabled sticky input</String>
        </Box>
      </Box>
    ),
    className: 'bg-gray-100 p-4',
    enabled: false,
  },
};

export const WithComplexForm: Story = {
  args: {
    children: (
      <Box className="space-y-6">
        <String className="text-2xl font-bold">Complex Sticky Form</String>

        <Box className="space-y-4">
          <String className="text-lg font-semibold">User Profile</String>
          <Box className="space-y-2">
            <String>Username:</String>
            <String className="rounded border border-gray-300 bg-white p-2">@username</String>
          </Box>
          <Box className="space-y-2">
            <String>Bio:</String>
            <String className="h-20 rounded border border-gray-300 bg-white p-2">Multi-line bio field</String>
          </Box>
        </Box>

        <Box className="space-y-4">
          <String className="text-lg font-semibold">Settings</String>
          <Box className="space-y-2">
            <String>Notification preferences:</String>
            <String className="rounded border border-gray-300 bg-white p-2">Settings input</String>
          </Box>
        </Box>

        <Box className="flex-row space-x-4">
          <Button colorVariant="primary" size="md">
            <String>Save Profile</String>
          </Button>
          <Button colorVariant="secondary" size="md">
            <String>Reset</String>
          </Button>
        </Box>
      </Box>
    ),
    className: 'bg-white p-6',
    offset: { close: 30, open: 80 },
  },
};

export const OffsetVariations: Story = {
  render: () => (
    <Box className="space-y-6">
      <WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 50 }} className="bg-red-100 p-4">
        <String className="font-bold">Close: 0, Open: 50</String>
        <String>Minimal offset configuration</String>
      </WrapperKeyboardAvoidingStickyView>

      <WrapperKeyboardAvoidingStickyView offset={{ close: 100, open: 200 }} className="bg-blue-100 p-4">
        <String className="font-bold">Close: 100, Open: 200</String>
        <String>Large offset configuration</String>
      </WrapperKeyboardAvoidingStickyView>

      <WrapperKeyboardAvoidingStickyView offset={{ close: 50, open: 50 }} className="bg-green-100 p-4">
        <String className="font-bold">Close: 50, Open: 50</String>
        <String>Equal close and open offsets</String>
      </WrapperKeyboardAvoidingStickyView>
    </Box>
  ),
};
