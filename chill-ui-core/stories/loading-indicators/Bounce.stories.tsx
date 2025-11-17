import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import Bounce from '../../src/components/loadingIndicatorsKit/components/Bounce';
import defaultProps from '../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Bounce> = {
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
  component: Bounce,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Bounce',
};

export default meta;

type Story = StoryObj<typeof Bounce>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

export const LargeSize: Story = {
  args: {
    size: 48,
  },
};
