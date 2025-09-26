import type { Meta, StoryObj } from '@storybook/react';

import { String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';
import SlideInBox from '../../src/components/animatedBox/components/SlideInBox/SlideInBox';

const meta = {
  argTypes: {
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the animation automatically',
    },
    className: {
      control: 'text',
      description: 'Additional className for the slide-in box',
    },
    delay: {
      control: 'number',
      description: 'Delay before starting the slide-in animation',
    },
    direction: {
      control: 'select',
      description: 'Direction from which to slide in',
      options: ['left', 'right', 'up', 'down'],
    },
    distance: {
      control: 'number',
      description: 'Distance to slide from in pixels',
    },
    duration: {
      control: 'number',
      description: 'Duration of the slide-in animation',
    },
    infiniteLoop: {
      control: 'boolean',
      description: 'Whether to loop the animation infinitely',
    },
  },
  component: SlideInBox,
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
  title: 'Components/AnimatedBox/SlideInBox',
} satisfies Meta<typeof SlideInBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromLeft: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Slide from Left
      </String>
    ),
    className: 'rounded-lg bg-blue-100 p-6',
    direction: 'left',
  },
};

export const FromRight: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Slide from Right
      </String>
    ),
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'right',
  },
};

export const FromTop: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Slide from Top
      </String>
    ),
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'up',
  },
};

export const FromBottom: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Slide from Bottom
      </String>
    ),
    className: 'rounded-lg bg-blue-100 p-6',
    direction: 'down',
  },
};

export const CustomDistance: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Long Distance Slide
      </String>
    ),
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'left',
    distance: 200,
  },
};

export const Fast: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Fast Slide
      </String>
    ),
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'left',
    duration: 300,
  },
};

export const InfiniteLoop: Story = {
  args: {
    autoStart: true,
    children: (
      <String size="lg" className="text-center" color="black">
        Infinite Slide Loop
      </String>
    ),
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'left',
    duration: 1000,
    infiniteLoop: true,
  },
};
