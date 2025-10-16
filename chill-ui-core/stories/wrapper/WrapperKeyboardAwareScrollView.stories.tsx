import type { Meta, StoryObj } from '@storybook/react';

import { WrapperKeyboardAwareScrollView, String, Box, Button } from '../../src/components';

const meta = {
  argTypes: {
    bottomOffset: {
      control: 'number',
      description: 'Bottom offset for keyboard',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for the wrapper (NativeWind)',
    },
    contentContainerClassName: {
      control: 'text',
      description: 'Content container className',
    },
    disableScrollOnKeyboardHid: {
      control: 'boolean',
      description: 'Disable scroll on keyboard hide',
    },
    edges: {
      control: 'object',
      description: 'Safe area edges to apply when hasSafeArea is true',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the keyboard aware scroll view is enabled',
    },
    extraKeyboardSpace: {
      control: 'number',
      description: 'Extra keyboard space',
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
  component: WrapperKeyboardAwareScrollView,
  parameters: {
    docs: {
      description: {
        component:
          'A KeyboardAwareScrollView wrapper component with default styling and SafeAreaView support. Automatically detects NativeWind availability and falls back to StyleSheet if needed.',
      },
    },
  },
  title: 'Components/Wrapper/WrapperKeyboardAwareScrollView',
} satisfies Meta<typeof WrapperKeyboardAwareScrollView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <String>Default KeyboardAwareScrollView wrapper content</String>,
  },
};

export const WithScrollableForm: Story = {
  args: {
    bottomOffset: 20,
    children: (
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

        <Box className="space-y-4">
          <String className="text-lg font-semibold">Address Information</String>
          <Box className="space-y-2">
            <String>Street Address:</String>
            <String className="rounded border border-gray-300 bg-white p-2">123 Main Street</String>
          </Box>
          <Box className="space-y-2">
            <String>City:</String>
            <String className="rounded border border-gray-300 bg-white p-2">New York</String>
          </Box>
          <Box className="space-y-2">
            <String>ZIP Code:</String>
            <String className="rounded border border-gray-300 bg-white p-2">10001</String>
          </Box>
        </Box>

        <Box className="space-y-4">
          <String className="text-lg font-semibold">Additional Information</String>
          <Box className="space-y-2">
            <String>Phone Number:</String>
            <String className="rounded border border-gray-300 bg-white p-2">+1 (555) 123-4567</String>
          </Box>
          <Box className="space-y-2">
            <String>Comments:</String>
            <String className="h-24 rounded border border-gray-300 bg-white p-2">Multi-line comments field</String>
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
    ),
    className: 'bg-gray-50 p-4',
  },
};

export const WithCustomKeyboardSpace: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Custom Keyboard Space</String>
        <String>This has extra keyboard space of 50</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Custom space input</String>
        </Box>
        <Button colorVariant="primary" size="sm">
          <String>Action</String>
        </Button>
      </Box>
    ),
    className: 'bg-blue-100 p-4',
    extraKeyboardSpace: 50,
  },
};

export const WithSafeArea: Story = {
  args: {
    bottomOffset: 30,
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Keyboard Aware with SafeArea</String>
        <String>Combines keyboard awareness with SafeAreaView</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Safe area input</String>
        </Box>
      </Box>
    ),
    className: 'bg-green-100 p-4',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
};

export const DisabledKeyboardAware: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Disabled Keyboard Aware</String>
        <String>Keyboard awareness is disabled</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Disabled aware input</String>
        </Box>
      </Box>
    ),
    className: 'bg-gray-100 p-4',
    enabled: false,
  },
};

export const WithScrollDisabledOnKeyboardHide: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Scroll Disabled on Keyboard Hide</String>
        <String>Scroll is disabled when keyboard is hidden</String>
        <Box className="space-y-2">
          <String>Input field:</String>
          <String className="rounded border border-gray-300 bg-white p-2">Scroll disabled input</String>
        </Box>
      </Box>
    ),
    className: 'bg-purple-100 p-4',
    disableScrollOnKeyboardHid: true,
  },
};

export const WithContentContainerStyling: Story = {
  args: {
    bottomOffset: 40,
    children: (
      <Box className="space-y-6">
        <String className="text-2xl font-bold">Styled Content Container</String>
        <String>This has custom content container styling</String>

        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} className="rounded-lg bg-white p-4 shadow-sm">
            <String className="font-semibold">Section {i + 1}</String>
            <String className="mt-2">Content for section {i + 1}</String>
          </Box>
        ))}
      </Box>
    ),
    className: 'bg-white',
    contentContainerClassName: 'bg-gray-50 p-4',
  },
};

export const OffsetVariations: Story = {
  render: () => (
    <Box className="space-y-6">
      <WrapperKeyboardAwareScrollView bottomOffset={0} className="bg-red-100 p-4">
        <String className="font-bold">Bottom Offset: 0</String>
        <String>No bottom offset</String>
      </WrapperKeyboardAwareScrollView>

      <WrapperKeyboardAwareScrollView bottomOffset={50} className="bg-blue-100 p-4">
        <String className="font-bold">Bottom Offset: 50</String>
        <String>Medium bottom offset</String>
      </WrapperKeyboardAwareScrollView>

      <WrapperKeyboardAwareScrollView bottomOffset={100} className="bg-green-100 p-4">
        <String className="font-bold">Bottom Offset: 100</String>
        <String>Large bottom offset</String>
      </WrapperKeyboardAwareScrollView>
    </Box>
  ),
};
