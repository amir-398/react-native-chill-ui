import type { Meta, StoryObj } from '@storybook/react';

import { WrapperSafeAreaView, String, Box, Button } from '../../src/components';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes for the wrapper (NativeWind)',
    },
    edges: {
      control: 'object',
      description: 'Safe area edges to apply',
    },
    emulateUnlessSupported: {
      control: 'boolean',
      description: 'Whether to emulate safe area unless supported',
    },
    fill: {
      control: 'boolean',
      description: 'Whether to fill the wrapper',
    },
    grow: {
      control: 'boolean',
      description: 'Whether to grow the wrapper',
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
  component: WrapperSafeAreaView,
  parameters: {
    docs: {
      description: {
        component:
          'A SafeAreaView wrapper component with default styling. Automatically detects NativeWind availability and falls back to StyleSheet if needed.',
      },
    },
  },
  title: 'Components/Wrapper/WrapperSafeAreaView',
} satisfies Meta<typeof WrapperSafeAreaView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <String>Default SafeAreaView wrapper content</String>,
  },
};

export const WithAllEdges: Story = {
  args: {
    children: <String>SafeAreaView with all edges</String>,
    className: 'bg-blue-100 p-4',
    edges: ['top', 'right', 'bottom', 'left'],
  },
};

export const TopAndBottom: Story = {
  args: {
    children: <String>SafeAreaView with top and bottom edges</String>,
    className: 'bg-green-100 p-4',
    edges: ['top', 'bottom'],
  },
};

export const TopOnly: Story = {
  args: {
    children: <String>SafeAreaView with top edge only</String>,
    className: 'bg-purple-100 p-4',
    edges: ['top'],
  },
};

export const BottomOnly: Story = {
  args: {
    children: <String>SafeAreaView with bottom edge only</String>,
    className: 'bg-yellow-100 p-4',
    edges: ['bottom'],
  },
};

export const LeftAndRight: Story = {
  args: {
    children: <String>SafeAreaView with left and right edges</String>,
    className: 'bg-red-100 p-4',
    edges: ['left', 'right'],
  },
};

export const WithCustomStyling: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Custom Styled SafeAreaView</String>
        <String>This SafeAreaView has custom styling and padding</String>
        <Button colorVariant="primary" size="sm">
          <String>Action Button</String>
        </Button>
      </Box>
    ),
    className: 'bg-gradient-to-b from-blue-100 to-blue-200 p-6 rounded-lg',
    edges: ['top', 'bottom'],
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <Box className="space-y-6">
        <String className="text-2xl font-bold">Complex SafeAreaView Content</String>
        <Box className="space-y-4">
          <String className="text-lg">This is a complex SafeAreaView with multiple sections</String>
          <Box className="rounded-lg bg-white p-4 shadow-sm">
            <String className="font-semibold">Section 1</String>
            <String className="mt-2">Content for section 1</String>
          </Box>
          <Box className="rounded-lg bg-white p-4 shadow-sm">
            <String className="font-semibold">Section 2</String>
            <String className="mt-2">Content for section 2</String>
          </Box>
        </Box>
        <Button colorVariant="secondary" size="md">
          <String>Main Action</String>
        </Button>
      </Box>
    ),
    className: 'bg-gray-50 p-6',
    edges: ['top', 'bottom', 'left', 'right'],
  },
};

export const EmulateUnlessSupported: Story = {
  args: {
    children: <String>SafeAreaView with emulation unless supported</String>,
    className: 'bg-orange-100 p-4',
    edges: ['top', 'bottom'],
    emulateUnlessSupported: true,
  },
};

export const AllEdgeVariations: Story = {
  render: () => (
    <Box className="space-y-4">
      <WrapperSafeAreaView edges={['top']} className="bg-red-100 p-4">
        <String>Top edge only</String>
      </WrapperSafeAreaView>
      <WrapperSafeAreaView edges={['bottom']} className="bg-green-100 p-4">
        <String>Bottom edge only</String>
      </WrapperSafeAreaView>
      <WrapperSafeAreaView edges={['left']} className="bg-blue-100 p-4">
        <String>Left edge only</String>
      </WrapperSafeAreaView>
      <WrapperSafeAreaView edges={['right']} className="bg-yellow-100 p-4">
        <String>Right edge only</String>
      </WrapperSafeAreaView>
      <WrapperSafeAreaView edges={['top', 'bottom']} className="bg-purple-100 p-4">
        <String>Top and bottom edges</String>
      </WrapperSafeAreaView>
      <WrapperSafeAreaView edges={['left', 'right']} className="bg-pink-100 p-4">
        <String>Left and right edges</String>
      </WrapperSafeAreaView>
    </Box>
  ),
};
