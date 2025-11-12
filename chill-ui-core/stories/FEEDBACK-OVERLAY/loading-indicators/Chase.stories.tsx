import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Chase } from '../../../../src/components/loadingIndicatorsKit';
import { defaultProps } from '../../../../src/components/loadingIndicatorsKit/utils/defaultProps';

const meta: Meta<typeof Chase> = {
  title: 'FEEDBACK & OVERLAY/LoadingIndicators/Chase',
  component: Chase,
  args: {
    animating: defaultProps.animating,
    color: defaultProps.color,
    hidesWhenStopped: defaultProps.hidesWhenStopped,
    size: defaultProps.size,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Chase>;

/**
 * Default Chase loading indicator with default props
 */
export const Default: Story = {};

/**
 * Chase with custom color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF3B30',
  },
};

/**
 * Larger Chase indicator
 */
export const LargeSize: Story = {
  args: {
    size: 48,
  },
};

/**
 * Non-animating Chase indicator
 */
export const NotAnimating: Story = {
  args: {
    animating: false,
    hidesWhenStopped: false,
  },
};

/**
 * Multiple Chase indicators with different sizes and colors
 */
export const MultipleIndicators: Story = {
  render: (args) => (
    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
      <Chase {...args} size={24} color="#FF3B30" />
      <Chase {...args} size={32} color="#34C759" />
      <Chase {...args} size={40} color="#007AFF" />
      <Chase {...args} size={48} color="#AF52DE" />
    </View>
  ),
};
