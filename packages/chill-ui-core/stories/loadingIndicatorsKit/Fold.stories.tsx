import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import Fold from '../../src/components/loadingIndicatorsKit/components/Fold';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Fold> = {
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
  component: Fold,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Fold',
};

export default meta;

type Story = StoryObj<typeof Fold>;

/**
 * Default Fold loading indicator with default props
 */
export const Default: Story = {};

/**
 * Fold with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger Fold indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};

/**
 * Fold with custom size
 */
export const CustomSize: Story = {
  args: {
    size: 32,
  },
};

/**
 * Fold with different colors
 */
export const DifferentColors: Story = {
  render: () => (
    <UiPresentation className="flex-row gap-4">
      <Fold color="#FF3B30" />
      <Fold color="#34C759" />
      <Fold color="#007AFF" />
      <Fold color="#AF52DE" />
    </UiPresentation>
  ),
};

/**
 * Fold with different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <UiPresentation className="flex-row items-center gap-4">
      <Fold size={16} />
      <Fold size={24} />
      <Fold size={32} />
      <Fold size={40} />
    </UiPresentation>
  ),
};
