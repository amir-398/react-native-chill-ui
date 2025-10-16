import type { Meta, StoryObj } from '@storybook/react';

import { WrapperKeyboardAvoidingView, String, Box, Button } from '../../src/components';

const meta = {
  argTypes: {
    behavior: {
      control: 'select',
      description: 'Behavior of the keyboard avoiding view',
      options: ['height', 'position', 'padding', 'translate-with-padding'],
    },
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
      description: 'Whether the keyboard avoiding view is enabled',
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
    keyboardVerticalOffset: {
      control: 'number',
      description: 'Keyboard vertical offset',
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
  component: WrapperKeyboardAvoidingView,
  parameters: {
    docs: {
      description: {
        component:
          'A KeyboardAvoidingView wrapper component with default styling and SafeAreaView support. Automatically detects NativeWind availability and falls back to StyleSheet if needed.',
      },
    },
  },
  title: 'Components/Wrapper/WrapperKeyboardAvoidingView',
} satisfies Meta<typeof WrapperKeyboardAvoidingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <String>Default KeyboardAvoidingView wrapper content</String>,
  },
};

export const WithFormContent: Story = {
  args: {
    behavior: 'padding',
    children: (
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
    ),
    className: 'bg-gray-100 p-4',
    keyboardVerticalOffset: 0,
  },
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
  args: {
    behavior: 'padding',
    children: (
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
    ),
    className: 'bg-yellow-100 p-4',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
};

export const WithCustomOffset: Story = {
  args: {
    behavior: 'padding',
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Custom Keyboard Offset</String>
        <String>This has a custom keyboard vertical offset of 100</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Custom offset input</String>
        </Box>
      </Box>
    ),
    className: 'bg-red-100 p-4',
    keyboardVerticalOffset: 100,
  },
};

export const DisabledKeyboardAvoiding: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Disabled Keyboard Avoiding</String>
        <String>Keyboard avoiding is disabled for this wrapper</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Disabled input</String>
        </Box>
      </Box>
    ),
    className: 'bg-gray-100 p-4',
    enabled: false,
  },
};

export const WithComplexForm: Story = {
  args: {
    behavior: 'padding',
    children: (
      <Box className="space-y-6">
        <String className="text-2xl font-bold">Complex Form with Keyboard Avoidance</String>

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

        <Box className="space-y-4">
          <String className="text-lg font-semibold">Additional Information</String>
          <Box className="space-y-2">
            <String>Phone:</String>
            <String className="rounded border border-gray-300 bg-white p-2">+1 (555) 123-4567</String>
          </Box>
          <Box className="space-y-2">
            <String>Comments:</String>
            <String className="h-24 rounded border border-gray-300 bg-white p-2">Multi-line comments field</String>
          </Box>
        </Box>

        <Box className="flex-row space-x-4">
          <Button colorVariant="primary" size="md">
            <String>Save</String>
          </Button>
          <Button colorVariant="secondary" size="md">
            <String>Cancel</String>
          </Button>
        </Box>
      </Box>
    ),
    className: 'bg-white p-6',
    keyboardVerticalOffset: 20,
  },
};
