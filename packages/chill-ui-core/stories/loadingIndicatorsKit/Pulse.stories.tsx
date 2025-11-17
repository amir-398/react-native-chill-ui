import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import Pulse from '../../src/components/loadingIndicatorsKit/components/Pulse';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Pulse> = {
  args: {
    animating: defaultProps.animating,
    color: defaultProps.color,
    hidesWhenStopped: defaultProps.hidesWhenStopped,
    size: defaultProps.size,
  },
  argTypes: {
    animating: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    color: {
      table: {
        defaultValue: {
          summary: '#000',
        },
      },
    },
    hidesWhenStopped: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    size: {
      control: 'number',
      table: {
        defaultValue: {
          summary: 24,
        },
      },
    },
  },
  component: Pulse,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Pulse',
};

export default meta;

type Story = StoryObj<typeof Pulse>;

/**
 * Default Pulse loading indicator with default props
 */
export const Default: Story = {};

/**
 * Pulse with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger Pulse indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};

/**
 * Pulse with custom size
 */
export const CustomSize: Story = {
  args: {
    size: 32,
  },
};

/**
 * Pulse with different colors
 */
export const DifferentColors: Story = {
  render: () => (
    <UiPresentation className="flex-row gap-4">
      <Pulse color="#FF3B30" />
      <Pulse color="#34C759" />
      <Pulse color="#007AFF" />
      <Pulse color="#AF52DE" />
    </UiPresentation>
  ),
};

/**
 * Pulse with different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <UiPresentation className="flex-row items-center gap-4">
      <Pulse size={16} />
      <Pulse size={24} />
      <Pulse size={32} />
      <Pulse size={40} />
    </UiPresentation>
  ),
};

/**
 * Non-animating Pulse indicator
 */
export const NotAnimating: Story = {
  args: {
    animating: false,
    hidesWhenStopped: false,
  },
};

/**
 * Hidden when stopped
 */
export const HiddenWhenStopped: Story = {
  args: {
    animating: false,
    hidesWhenStopped: true,
  },
};

/**
 * Multiple Pulse indicators with different sizes and colors
 */
export const MultipleIndicators: Story = {
  render: () => (
    <UiPresentation className="flex-row items-center gap-4">
      <Pulse size={24} color="#FF3B30" />
      <Pulse size={32} color="#34C759" />
      <Pulse size={40} color="#007AFF" />
      <Pulse size={48} color="#AF52DE" />
    </UiPresentation>
  ),
};
