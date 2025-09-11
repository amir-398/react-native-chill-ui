import type { Meta, StoryObj } from '@storybook/react';

import { String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';
import FadeInBox from '../../src/components/animatedBox/components/FadeInBox/FadeInBox';

const meta = {
  argTypes: {
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the animation automatically',
    },
    children: {
      control: 'object',
      description: 'Content to display inside the fade-in box',
    },
    className: {
      control: 'text',
      description: 'Additional className for the fade-in box',
    },
    delay: {
      control: 'number',
      description: 'Delay before starting the fade-in animation',
    },
    duration: {
      control: 'number',
      description: 'Duration of the fade-in animation',
    },
    infiniteLoop: {
      control: 'boolean',
      description: 'Whether to loop the animation infinitely',
    },
  },
  component: FadeInBox,
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
  title: 'Components/AnimatedBox/FadeInBox',
} satisfies Meta<typeof FadeInBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Fade In
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const Fast: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Fast Fade In
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 500,
  },
};

export const Slow: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Slow Fade In
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 2000,
  },
};

export const WithDelay: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Fade In with Delay
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
      <String size="lg" className="text-center" color="black">
        Infinite Fade Loop
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
    duration: 1500,
    infiniteLoop: true,
  },
};
