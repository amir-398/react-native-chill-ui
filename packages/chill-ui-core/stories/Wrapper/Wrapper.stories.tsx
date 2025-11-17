import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Wrapper, String, Box } from '../../src/components';

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
  component: Wrapper,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  title: 'LAYOUT/Wrapper/Wrapper',
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Wrapper {...args}>
      <String>Default wrapper content</String>
    </Wrapper>
  ),
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

export const WithSafeArea: Story = {
  args: {
    className: 'bg-green-100 p-4',
    hasSafeArea: true,
  },
  render: (args: any) => (
    <Wrapper {...args}>
      <String>Wrapper with SafeAreaView</String>
    </Wrapper>
  ),
};
