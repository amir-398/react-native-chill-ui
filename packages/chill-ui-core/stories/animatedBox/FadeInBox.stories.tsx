import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { FadeInBox, String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';

const meta = {
  args: {
    autoStart: false,
    delay: 0,
    duration: 1000,
    infiniteLoop: false,
    useFastView: true,
  },
  argTypes: {
    AnimatedViewProps: {
      control: 'object',
      table: {
        type: {
          summary: 'Animated.ViewProps',
        },
      },
    },
    autoStart: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    delay: {
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    duration: {
      table: {
        defaultValue: {
          summary: 1000,
        },
      },
    },
    infiniteLoop: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    useFastView: {
      control: 'boolean',
      description: 'Use optimized RCTView component for better performance',
      table: {
        defaultValue: {
          summary: true,
        },
      },
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
  title: 'LAYOUT/AnimatedBox/FadeInBox',
} satisfies Meta<typeof FadeInBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-secondary p-6',
  },
  render: (args: any) => (
    <FadeInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Fade In
      </String>
    </FadeInBox>
  ),
};

export const Fast: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-secondary p-6',
    duration: 500,
  },
  render: (args: any) => (
    <FadeInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Fast Fade In
      </String>
    </FadeInBox>
  ),
};

export const Slow: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-secondary p-6',
    duration: 2000,
  },
  render: (args: any) => (
    <FadeInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Slow Fade In
      </String>
    </FadeInBox>
  ),
};

export const WithDelay: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-secondary p-6',
    delay: 1000,
  },
  render: (args: any) => (
    <FadeInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Fade In with Delay
      </String>
    </FadeInBox>
  ),
};

export const InfiniteLoop: Story = {
  args: {
    className: 'rounded-lg bg-secondary p-6',
    duration: 1500,
    infiniteLoop: true,
  },
  render: (args: any) => (
    <FadeInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Infinite Fade Loop
      </String>
    </FadeInBox>
  ),
};
