import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook/UiPresentation';
import { SlideInBox, String } from '../../src/components';

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
  title: 'LAYOUT/AnimatedBox/SlideInBox',
} satisfies Meta<typeof SlideInBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-blue-100 p-6',
    direction: 'left',
  },
  render: (args: any) => (
    <SlideInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Slide from Left
      </String>
    </SlideInBox>
  ),
};

export const FromRight: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'right',
  },
  render: (args: any) => (
    <SlideInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Slide from Right
      </String>
    </SlideInBox>
  ),
};

export const FromTop: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'up',
  },
  render: (args: any) => (
    <SlideInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Slide from Top
      </String>
    </SlideInBox>
  ),
};

export const FromBottom: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg bg-blue-100 p-6',
    direction: 'down',
  },
  render: (args: any) => (
    <SlideInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Slide from Bottom
      </String>
    </SlideInBox>
  ),
};

export const InfiniteLoop: Story = {
  args: {
    autoStart: true,
    className: 'rounded-lg  bg-blue-100 p-6',
    direction: 'left',
    duration: 1000,
    infiniteLoop: true,
  },
  render: (args: any) => (
    <SlideInBox {...args}>
      <String size="lg" className="text-center" color="black">
        Infinite Slide Loop
      </String>
    </SlideInBox>
  ),
};
