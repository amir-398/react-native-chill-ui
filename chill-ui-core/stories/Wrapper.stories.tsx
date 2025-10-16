import type { Meta, StoryObj } from '@storybook/react';

import { Wrapper, String, Box, Button } from '../src/components';

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
  component: Wrapper,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible container component with default styling and SafeAreaView support. Automatically detects NativeWind availability and falls back to StyleSheet if needed.',
      },
    },
  },
  title: 'Components/Wrapper',
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <String>Default wrapper content</String>,
  },
};

export const WithPadding: Story = {
  args: {
    children: <String>Wrapper with padding</String>,
    px: 'md',
  },
};

export const WithCustomStyling: Story = {
  args: {
    children: <String>Wrapper with custom styling</String>,
    className: 'bg-blue-100 p-4 rounded-lg',
    style: { borderColor: '#3b82f6', borderWidth: 1 },
  },
};

export const WithSafeArea: Story = {
  args: {
    children: <String>Wrapper with SafeAreaView</String>,
    className: 'bg-green-100 p-4',
    edges: ['top', 'bottom'],
    hasSafeArea: true,
  },
};

export const FillAndGrow: Story = {
  args: {
    children: <String>Wrapper that fills and grows</String>,
    className: 'bg-purple-100 p-4',
    fill: true,
    grow: true,
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <Box className="space-y-4">
        <String className="text-lg font-bold">Complex Content</String>
        <String>This wrapper contains multiple elements</String>
        <Button colorVariant="primary" size="sm">
          <String>Action Button</String>
        </Button>
      </Box>
    ),
    className: 'bg-gray-100 p-6 rounded-xl',
  },
};

export const ScrollableContent: Story = {
  args: {
    children: (
      <Box className="space-y-2">
        {Array.from({ length: 10 }, (_, i) => (
          <String key={i} className="rounded bg-white p-2">
            Scrollable item {i + 1}
          </String>
        ))}
      </Box>
    ),
    className: 'bg-yellow-100 p-4',
    fill: true,
  },
};

export const AllPaddingVariants: Story = {
  render: () => (
    <Box className="space-y-4">
      {['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].map(px => (
        <Wrapper key={px} px={px as any} className="border border-blue-200 bg-blue-50">
          <String>Padding: {px}</String>
        </Wrapper>
      ))}
    </Box>
  ),
};

export const SafeAreaVariations: Story = {
  render: () => (
    <Box className="space-y-4">
      <Wrapper hasSafeArea edges={['top']} className="bg-red-100 p-4">
        <String>SafeArea: top only</String>
      </Wrapper>
      <Wrapper hasSafeArea edges={['bottom']} className="bg-green-100 p-4">
        <String>SafeArea: bottom only</String>
      </Wrapper>
      <Wrapper hasSafeArea edges={['top', 'bottom']} className="bg-blue-100 p-4">
        <String>SafeArea: top and bottom</String>
      </Wrapper>
      <Wrapper hasSafeArea edges={['left', 'right']} className="bg-yellow-100 p-4">
        <String>SafeArea: left and right</String>
      </Wrapper>
    </Box>
  ),
};

export const LayoutExamples: Story = {
  render: () => (
    <Box className="space-y-4">
      <Wrapper className="bg-gray-100 p-4">
        <String className="font-bold">Basic Layout</String>
        <String>Simple wrapper with default styling</String>
      </Wrapper>

      <Wrapper fill grow className="bg-blue-100 p-4">
        <String className="font-bold">Fill & Grow Layout</String>
        <String>Wrapper that takes available space</String>
      </Wrapper>

      <Wrapper className="rounded-lg border border-green-300 bg-green-100 p-4">
        <String className="font-bold">Styled Layout</String>
        <String>Wrapper with custom border and rounded corners</String>
      </Wrapper>
    </Box>
  ),
};
