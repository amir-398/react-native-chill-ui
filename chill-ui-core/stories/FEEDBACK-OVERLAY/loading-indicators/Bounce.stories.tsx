import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../../../src/components/box';
import { Bounce } from '../../../../src/components/loadingIndicatorsKit/components/Bounce';
import { defaultProps } from '../../../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Bounce> = {
  args: {
    animating: defaultProps.animating,
    color: defaultProps.color,
    hidesWhenStopped: defaultProps.hidesWhenStopped,
    size: defaultProps.size,
  },
  component: Bounce,
  decorators: [
    Story => (
      <Box style={{ padding: 20 }}>
        <Story />
      </Box>
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

export const NotAnimating: Story = {
  args: {
    animating: false,
    hidesWhenStopped: false,
  },
};
