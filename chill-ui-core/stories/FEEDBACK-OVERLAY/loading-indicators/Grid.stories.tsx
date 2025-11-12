import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { Grid } from '../../../../src/components/loadingIndicatorsKit';
import { defaultProps } from '../../../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Grid',
  args: {
    animating: defaultProps.animating,
    color: defaultProps.color,
    hidesWhenStopped: defaultProps.hidesWhenStopped,
    size: defaultProps.size,
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
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
 * Non-animating Grid indicator
 */
export const NotAnimating: Story = {
  args: {
    animating: false,
    hidesWhenStopped: false,
  },
};

/**
 * Multiple Grid indicators with different sizes and colors
 */
export const MultipleIndicators: Story = {
  render: (args) => (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
      <Grid {...args} size={24} color="#FF3B30" />
      <Grid {...args} size={32} color="#34C759" />
      <Grid {...args} size={40} color="#007AFF" />
      <Grid {...args} size={48} color="#AF52DE" />
    </View>
  ),
};
