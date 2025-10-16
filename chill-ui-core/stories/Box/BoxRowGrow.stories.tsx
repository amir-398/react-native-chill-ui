import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { BoxRowGrow, String } from '../../src/components';

const meta: Meta<typeof BoxRowGrow> = {
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
  component: BoxRowGrow,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'LAYOUT/Box/BoxRowGrow',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxRowGrow className="h-32 gap-2 rounded border p-4">
      <String>Left</String>
      <String>Right</String>
    </BoxRowGrow>
  ),
};
