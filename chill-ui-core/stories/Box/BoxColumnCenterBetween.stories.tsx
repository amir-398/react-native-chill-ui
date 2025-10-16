import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { String, BoxColumnCenterBetween } from '../../src/components';

const meta: Meta<typeof BoxColumnCenterBetween> = {
  args: {
    useFastView: true,
  },
  argTypes: {
    useFastView: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    ViewProps: {
      description: 'Any other props accepted by the native `View` component',
      type: 'object',
    },
  },
  component: BoxColumnCenterBetween,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'LAYOUT/Box/BoxColumnCenterBetween',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxColumnCenterBetween className="h-32 rounded border p-4">
      <String>🌟</String>
      <String>John Doe</String>
    </BoxColumnCenterBetween>
  ),
};
