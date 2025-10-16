import type { Meta, StoryObj } from '@storybook/react';

import { String, BoxColumnCenterBetween } from '../../src/components';

const meta: Meta<typeof BoxColumnCenterBetween> = {
  component: BoxColumnCenterBetween,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Box/BoxColumnCenterBetween',
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
