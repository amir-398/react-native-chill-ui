import type { Meta, StoryObj } from '@storybook/react';

import { BoxRowGrow, String } from '../../src/components';

const meta: Meta<typeof BoxRowGrow> = {
  component: BoxRowGrow,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Box/BoxRowGrow',
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
