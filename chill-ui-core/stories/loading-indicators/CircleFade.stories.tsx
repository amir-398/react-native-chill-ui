import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';
import CircleFade from '../../src/components/loadingIndicatorsKit/components/CircleFade';

const meta: Meta<typeof CircleFade> = {
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
  component: CircleFade,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/CircleFade',
};

export default meta;

type Story = StoryObj<typeof CircleFade>;

/**
 * Default CircleFade loading indicator with default props
 */
export const Default: Story = {};

/**
 * CircleFade with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger CircleFade indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};
