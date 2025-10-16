import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { BounceBox, String } from '../../src/components';
import UiPresentation from '../storybook/UiPresentation';

const meta = {
  args: {
    autoStart: false,
    bounceHeight: 20,
    duration: 400,
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
    bounceHeight: {
      table: {
        defaultValue: {
          summary: 20,
        },
      },
    },
    bounceInterval: {
      table: {
        defaultValue: {
          summary: 2000,
        },
      },
    },
    duration: {
      table: {
        defaultValue: {
          summary: 400,
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
  title: 'LAYOUT/AnimatedBox/BounceBox',
} satisfies Meta<typeof BounceBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-secondary p-6',
    infiniteLoop: false,
  },
  render: (args: any) => (
    <BounceBox {...args}>
      <String size="lg" className="text-center">
        Default Bounce
      </String>
    </BounceBox>
  ),
};

export const AutoBounce: Story = {
  args: {
    autoStart: true,
    bounceInterval: 2000,
    className: 'rounded-lg bg-secondary p-6',
  },
  render: (args: any) => (
    <BounceBox {...args}>
      <String size="lg" className="text-center">
        Auto Bounce Every 2s
      </String>
    </BounceBox>
  ),
};

export const HighBounce: Story = {
  args: {
    autoStart: true,
    bounceHeight: 40,
    className: 'rounded-lg bg-secondary p-6',
  },
  render: (args: any) => (
    <BounceBox {...args}>
      <String size="lg" className="text-center">
        High Bounce (40px)
      </String>
    </BounceBox>
  ),
};

export const InfiniteLoop: Story = {
  args: {
    bounceInterval: 1500,
    className: 'rounded-lg bg-secondary p-6',
    infiniteLoop: true,
  },
  render: (args: any) => (
    <BounceBox {...args}>
      <String size="lg" className="text-center text-black">
        Infinite Loop
      </String>
    </BounceBox>
  ),
};
