import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import Grid from '../../src/components/loadingIndicatorsKit/components/Grid';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Grid> = {
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
  component: Grid,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Grid',
};

export default meta;

type Story = StoryObj<typeof Grid>;

/**
 * Default Grid loading indicator with default props
 */
export const Default: Story = {};

/**
 * Grid with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger Grid indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};

/**
 * Grid with custom size
 */
export const CustomSize: Story = {
  args: {
    size: 32,
  },
};

/**
 * Grid with different colors
 */
export const DifferentColors: Story = {
  render: () => (
    <UiPresentation className="flex-row gap-4">
      <Grid color="#FF3B30" />
      <Grid color="#34C759" />
      <Grid color="#007AFF" />
      <Grid color="#AF52DE" />
    </UiPresentation>
  ),
};

/**
 * Grid with different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <UiPresentation className="flex-row items-center gap-4">
      <Grid size={16} />
      <Grid size={24} />
      <Grid size={32} />
      <Grid size={40} />
    </UiPresentation>
  ),
};
