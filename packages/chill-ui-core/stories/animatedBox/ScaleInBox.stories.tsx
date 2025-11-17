import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook/UiPresentation';
import { ScaleInBox, String } from '../../src/components';

const meta = {
  args: {
    autoStart: false,
    delay: 0,
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
  title: 'LAYOUT/AnimatedBox/ScaleInBox',
} satisfies Meta<typeof ScaleInBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: (args: any) => (
    <ScaleInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Scale In
      </String>
    </ScaleInBox>
  ),
};

export const WithDelay: Story = {
  args: {
    autoStart: true,
    delay: 800,
  },
  render: (args: any) => (
    <ScaleInBox {...args}>
      <String size="lg" className="text-center">
        Scale In with Delay
      </String>
    </ScaleInBox>
  ),
};

export const InfiniteLoop: Story = {
  args: {
    autoStart: true,
    infiniteLoop: true,
  },
  render: (args: any) => (
    <ScaleInBox {...args}>
      <String size="lg" className="text-center">
        Infinite Scale Loop
      </String>
    </ScaleInBox>
  ),
};
