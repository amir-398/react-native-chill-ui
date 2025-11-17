import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook/UiPresentation';
import { RotatingBox, String } from '../../src/components';

const meta = {
  args: {
    autoStart: false,
    continuous: false,
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
    continuous: {
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
  title: 'LAYOUT/AnimatedBox/RotatingBox',
} satisfies Meta<typeof RotatingBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: (args: any) => (
    <RotatingBox {...args}>
      <String size="lg" className="text-center" color="black">
        Rotating Box
      </String>
    </RotatingBox>
  ),
};

export const Fast: Story = {
  args: {
    autoStart: true,
    duration: 500,
  },
  render: (args: any) => (
    <RotatingBox {...args}>
      <String size="lg" className="text-center" color="black">
        Fast Rotation
      </String>
    </RotatingBox>
  ),
};

export const Slow: Story = {
  args: {
    autoStart: true,
    duration: 4000,
  },
  render: (args: any) => (
    <RotatingBox {...args}>
      <String size="lg" className="text-center" color="black">
        Slow Rotation
      </String>
    </RotatingBox>
  ),
};

export const WithDelay: Story = {
  args: {
    autoStart: true,
    delay: 1000,
    duration: 4000,
  },
  render: (args: any) => (
    <RotatingBox {...args}>
      <String size="lg" className="text-center" color="black">
        Delayed Rotation
      </String>
    </RotatingBox>
  ),
};

export const InfiniteLoop: Story = {
  args: {
    autoStart: true,
    duration: 1500,
    infiniteLoop: true,
  },
  render: (args: any) => (
    <RotatingBox {...args}>
      <String size="lg" className="text-center" color="black">
        Infinite Rotation Loop
      </String>
    </RotatingBox>
  ),
};
