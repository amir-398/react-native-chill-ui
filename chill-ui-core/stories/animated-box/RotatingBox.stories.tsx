import type { Meta, StoryObj } from '@storybook/react';

import { String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';
import RotatingBox from '../../src/components/animatedBox/components/RotatingBox/RotatingBox';

const meta = {
  argTypes: {
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the animation automatically',
    },
    children: {
      control: 'object',
      description: 'Content to display inside the rotating box',
    },
    className: {
      control: 'text',
      description: 'Additional className for the rotating box',
    },
    delay: {
      control: 'number',
      description: 'Delay before starting the rotation animation',
    },
    duration: {
      control: 'number',
      description: 'Duration of one complete rotation',
    },
    infiniteLoop: {
      control: 'boolean',
      description: 'Whether to loop the animation infinitely',
    },
  },
  component: RotatingBox,
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
  title: 'Components/AnimatedBox/RotatingBox',
} satisfies Meta<typeof RotatingBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Rotating Box
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
        Fast Rotation
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 1000,
  },
};

export const Slow: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Slow Rotation
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 4000,
  },
};

export const Single: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Single Rotation
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const WithDelay: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Delayed Rotation
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    delay: 1000,
  },
};

export const InfiniteLoop: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center">
        Infinite Rotation Loop
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 1500,
    infiniteLoop: true,
  },
};
