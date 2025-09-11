import type { Meta, StoryObj } from '@storybook/react';

import { String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';
import ScaleInBox from '../../src/components/animatedBox/components/ScaleInBox/ScaleInBox';

const meta = {
  argTypes: {
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the animation automatically',
    },
    children: {
      control: 'object',
      description: 'Content to display inside the scale-in box',
    },
    className: {
      control: 'text',
      description: 'Additional className for the scale-in box',
    },
    delay: {
      control: 'number',
      description: 'Delay before starting the scale-in animation',
    },
    duration: {
      control: 'number',
      description: 'Duration of the scale-in animation',
    },
    infiniteLoop: {
      control: 'boolean',
      description: 'Whether to loop the animation infinitely',
    },
  },
  component: ScaleInBox,
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
  title: 'Components/AnimatedBox/ScaleInBox',
} satisfies Meta<typeof ScaleInBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Scale In
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const Fast: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Fast Scale In
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 400,
  },
};

export const Slow: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Slow Scale In
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 1500,
  },
};

export const WithDelay: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Scale In with Delay
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    delay: 800,
  },
};

export const InfiniteLoop: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Infinite Scale Loop
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 1200,
    infiniteLoop: true,
  },
};
