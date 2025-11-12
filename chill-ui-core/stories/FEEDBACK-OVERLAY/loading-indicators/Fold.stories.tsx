import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { Fold } from '../../../../src/components/loadingIndicatorsKit';
import { defaultProps } from '../../../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Fold> = {
  component: Fold,
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Fold',
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
 * Non-animating Fold indicator
 */
export const NotAnimating: Story = {
  args: {
    animating: false,
    hidesWhenStopped: false,
  },
};

/**
 * Multiple Fold indicators with different sizes and colors
 */
export const MultipleIndicators: Story = {
  render: (args) => (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
      <Fold {...args} size={24} color="#FF3B30" />
      <Fold {...args} size={32} color="#34C759" />
      <Fold {...args} size={40} color="#007AFF" />
      <Fold {...args} size={48} color="#AF52DE" />
    </View>
  ),
};
