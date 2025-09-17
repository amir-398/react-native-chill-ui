import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../src/components/box';
import UiPresentation from './storybook/UiPresentation';
import Skeleton from '../src/components/skeletons/Skeleton';

const meta: Meta<typeof Skeleton> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    size: {
      control: 'select',
      description: 'Size of the skeleton',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      description: 'Shape variant of the skeleton',
      options: ['rectangle', 'square', 'circle', 'text'],
    },
  },
  component: Skeleton,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full items-center justify-center p-4">
          <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/Skeleton',
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangle: Story = {
  args: {
    size: 'md',
    variant: 'rectangle',
  },
};

export const Square: Story = {
  args: {
    size: 'md',
    variant: 'square',
  },
};

export const Circle: Story = {
  args: {
    size: 'md',
    variant: 'circle',
  },
};

export const Text: Story = {
  args: {
    size: 'md',
    variant: 'text',
  },
};

export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available sizes for rectangle variant',
      },
    },
  },
  render: () => (
    <Box className="space-y-4">
      <Skeleton variant="rectangle" size="xs" />
      <Skeleton variant="rectangle" size="sm" />
      <Skeleton variant="rectangle" size="md" />
      <Skeleton variant="rectangle" size="lg" />
      <Skeleton variant="rectangle" size="xl" />
    </Box>
  ),
};
