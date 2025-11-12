import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { CircleFade } from '../../../../src/components/loadingIndicatorsKit';
import { defaultProps } from '../../../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof CircleFade> = {
  component: CircleFade,
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/CircleFade',
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

/**
 * Non-animating CircleFade indicator
 */
export const NotAnimating: Story = {
  args: {
    animating: false,
    hidesWhenStopped: false,
  },
};

/**
 * Multiple CircleFade indicators with different sizes and colors
 */
export const MultipleIndicators: Story = {
  render: (args) => (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
      <CircleFade {...args} size={24} color="#FF3B30" />
      <CircleFade {...args} size={32} color="#34C759" />
      <CircleFade {...args} size={40} color="#007AFF" />
      <CircleFade {...args} size={48} color="#AF52DE" />
    </View>
  ),
};
