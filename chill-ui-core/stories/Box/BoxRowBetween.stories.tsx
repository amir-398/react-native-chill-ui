import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import String from '../../src/components/string';
import { BoxRowBetween } from '../../src/components';

const meta: Meta<typeof BoxRowBetween> = {
  component: BoxRowBetween,
  decorators: [
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Box/BoxRowBetween',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxRowBetween className="w-64 rounded border bg-purple-50 p-4">
      <String>Left</String>
      <String>Right</String>
    </BoxRowBetween>
  ),
};
