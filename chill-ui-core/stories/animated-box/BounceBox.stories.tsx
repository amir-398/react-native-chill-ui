import type { Meta, StoryObj } from '@storybook/react';

import { String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';
import BounceBox from '../../src/components/animatedBox/components/BounceBox/BounceBox';

const meta = {
  argTypes: {
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the bounce animation automatically',
    },
    bounceHeight: {
      control: 'number',
      description: 'Height of the bounce',
    },
    bounceInterval: {
      control: 'number',
      description: 'Interval between bounces',
    },
    children: {
      control: 'object',
      description: 'Content to display inside the bounce box',
    },
    className: {
      control: 'text',
      description: 'Additional className for the bounce box',
    },
    duration: {
      control: 'number',
      description: 'Duration of the bounce animation',
    },
    infiniteLoop: {
      control: 'boolean',
      description: 'Whether to loop the animation infinitely',
    },
    onBounce: {
      control: 'object',
      description: 'Callback function to be called when the bounce animation starts',
    },
  },
  component: BounceBox,
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
  title: 'Components/AnimatedBox/BounceBox',
} satisfies Meta<typeof BounceBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Default Bounce
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    infiniteLoop: false,
  },
};

export const AutoBounce: Story = {
  args: {
    autoStart: true,
    bounceInterval: 2000,
    children: (
      <String size="lg" className="text-center">
        Auto Bounce Every 2s
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const HighBounce: Story = {
  args: {
    autoStart: true,
    bounceHeight: 40,
    children: (
      <String size="lg" className="text-center">
        High Bounce (40px)
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const FastBounce: Story = {
  args: {
    children: (
      <String size="lg" className="text-center text-black">
        Fast Bounce
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 200,
  },
};

export const FrequentBounce: Story = {
  args: {
    autoStart: true,
    bounceInterval: 800,
    children: (
      <String size="lg" className="text-center text-black">
        Frequent Bounce
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    infiniteLoop: true,
  },
};

export const InfiniteLoop: Story = {
  args: {
    bounceInterval: 1500,
    children: (
      <String size="lg" className="text-center text-black">
        Infinite Bounce Loop
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    infiniteLoop: true,
  },
};
