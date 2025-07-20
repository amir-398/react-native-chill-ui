import type { Meta, StoryObj } from '@storybook/react';

import { String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';
import InteractiveBox from '../../src/components/animatedBox/InteractiveBox';

const meta = {
  component: InteractiveBox,
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
  title: 'Components/AnimatedBox/InteractiveBox',
} satisfies Meta<typeof InteractiveBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <String size="lg" weight="bold" className="text-center">
        Press Me!
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const HighScale: Story = {
  args: {
    children: (
      <String size="lg" weight="bold" className="text-center">
        High Scale Press
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const LowOpacity: Story = {
  args: {
    children: (
      <String size="lg" weight="bold" className="text-center">
        Low Opacity Press
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const SlowAnimation: Story = {
  args: {
    children: (
      <String size="lg" weight="bold" className="text-center">
        Slow Press Animation
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};

export const CustomInteraction: Story = {
  args: {
    children: (
      <String size="lg" weight="bold" className="text-center">
        Custom Interaction
      </String>
    ),
    className: 'rounded-lg bg-secondary p-6',
  },
};
