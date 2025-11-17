import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import Flow from '../../src/components/loadingIndicatorsKit/components/Flow';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Flow> = {
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
  component: Flow,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Flow',
};

export default meta;

type Story = StoryObj<typeof Flow>;

/**
 * Default Flow loading indicator with default props
 */
export const Default: Story = {};

/**
 * Flow with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger Flow indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};
