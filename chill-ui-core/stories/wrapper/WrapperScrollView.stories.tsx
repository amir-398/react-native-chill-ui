import type { Meta, StoryObj } from '@storybook/react';

import { WrapperScrollView, String, Box, Button } from '../../src/components';

const meta = {
  argTypes: {
    bounces: {
      control: 'boolean',
      description: 'Whether the scroll view bounces',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for the wrapper (NativeWind)',
    },
    edges: {
      control: 'object',
      description: 'Safe area edges to apply when hasSafeArea is true',
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
    scrollEnabled: {
      control: 'boolean',
      description: 'Whether scrolling is enabled',
    },
    showsHorizontalScrollIndicator: {
      control: 'boolean',
      description: 'Whether to show horizontal scroll indicator',
    },
    showsVerticalScrollIndicator: {
      control: 'boolean',
      description: 'Whether to show vertical scroll indicator',
    },
    style: {
      control: 'object',
      description: 'Custom styles for the wrapper',
    },
  },
  component: WrapperScrollView,
  parameters: {
    docs: {
      description: {
        component:
          'A scrollable wrapper component with default styling and SafeAreaView support. Automatically detects NativeWind availability and falls back to StyleSheet if needed.',
      },
    },
  },
  title: 'Components/Wrapper/WrapperScrollView',
} satisfies Meta<typeof WrapperScrollView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <String>Default scrollable wrapper content</String>,
  },
};

export const WithScrollableContent: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <String key={i} className="rounded bg-white p-4">
            Scrollable item {i + 1}
          </String>
        ))}
      </Box>
    ),
    className: 'bg-gray-100 p-4',
  },
};

export const WithCustomStyling: Story = {
  args: {
    bounces: true,
    children: (
      <Box className="space-y-4">
        {Array.from({ length: 10 }, (_, i) => (
          <String key={i} className="rounded bg-blue-100 p-4">
            Styled scrollable item {i + 1}
          </String>
        ))}
      </Box>
    ),
    className: 'bg-blue-50 p-4',
    showsVerticalScrollIndicator: true,
  },
};

export const WithSafeArea: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        {Array.from({ length: 15 }, (_, i) => (
          <String key={i} className="rounded bg-green-100 p-4">
            Safe area scrollable item {i + 1}
          </String>
        ))}
      </Box>
    ),
    className: 'bg-green-50 p-4',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
};

export const HorizontalScroll: Story = {
  args: {
    children: (
      <Box className="flex-row space-x-4">
        {Array.from({ length: 10 }, (_, i) => (
          <String key={i} className="whitespace-nowrap rounded bg-purple-100 p-4">
            Horizontal item {i + 1}
          </String>
        ))}
      </Box>
    ),
    className: 'bg-purple-50 p-4',
    horizontal: true,
    showsHorizontalScrollIndicator: true,
  },
};

export const DisabledScroll: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        {Array.from({ length: 10 }, (_, i) => (
          <String key={i} className="rounded bg-red-100 p-4">
            Disabled scroll item {i + 1}
          </String>
        ))}
      </Box>
    ),
    className: 'bg-red-50 p-4',
    scrollEnabled: false,
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <Box className="space-y-6">
        <String className="text-2xl font-bold">Complex Scrollable Content</String>
        {Array.from({ length: 5 }, (_, i) => (
          <Box key={i} className="rounded-lg bg-white p-6 shadow-sm">
            <String className="text-lg font-semibold">Section {i + 1}</String>
            <String className="mt-2">This is a complex scrollable section with multiple elements and styling.</String>
            <Button colorVariant="primary" size="sm" className="mt-4">
              <String>Action {i + 1}</String>
            </Button>
          </Box>
        ))}
      </Box>
    ),
    className: 'bg-gray-50 p-4',
    showsVerticalScrollIndicator: true,
  },
};
