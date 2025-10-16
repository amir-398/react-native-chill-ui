import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { Box, String } from '../../src/components';

const meta: Meta<typeof Box> = {
  argTypes: {
    useFastView: {
      control: 'boolean',
      description: 'Use optimized RCTView component for better performance',
    },
  },
  component: Box,
  decorators: [
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Box/Box',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    useFastView: true,
  },
  render: (args: any) => (
    <Box className="bg-gray-100 p-4" {...args}>
      <String>Basic Box Container</String>
    </Box>
  ),
};

export const PerformanceComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compare performance between useFastView (optimized) and standard React Native View',
      },
    },
  },
  render: () => (
    <Box className="gap-4">
      <Box className="bg-blue-100 p-4">
        <String weight="bold">useFastView=true (Default - Optimized)</String>
        <String>Uses createElement(&quot;RCTView&quot;) for maximum performance</String>
      </Box>
      <Box className="bg-green-100 p-4" useFastView={false}>
        <String weight="bold">useFastView=false (Standard)</String>
        <String>Uses React Native&apos;s standard View component</String>
      </Box>
    </Box>
  ),
};
