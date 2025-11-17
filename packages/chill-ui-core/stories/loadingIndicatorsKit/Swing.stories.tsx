import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import Swing from '../../src/components/loadingIndicatorsKit/components/Swing';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Swing> = {
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
  component: Swing,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Swing',
};

export default meta;

type Story = StoryObj<typeof Swing>;

/**
 * Default Swing loading indicator with default props
 */
export const Default: Story = {};

/**
 * Swing with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger Swing indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};

/**
 * Swing with custom size
 */
export const CustomSize: Story = {
  args: {
    size: 32,
  },
};

/**
 * Swing with different colors
 */
export const DifferentColors: Story = {
  render: () => (
    <UiPresentation className="flex-row gap-4">
      <Swing color="#FF3B30" />
      <Swing color="#34C759" />
      <Swing color="#007AFF" />
      <Swing color="#AF52DE" />
    </UiPresentation>
  ),
};

/**
 * Swing with different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <UiPresentation className="flex-row items-center gap-4">
      <Swing size={16} />
      <Swing size={24} />
      <Swing size={32} />
      <Swing size={40} />
    </UiPresentation>
  ),
};
