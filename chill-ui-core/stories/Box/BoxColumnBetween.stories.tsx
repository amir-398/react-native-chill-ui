import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { String, BoxColumnBetween } from '../../src/components';

const meta: Meta<typeof BoxColumnBetween> = {
  component: BoxColumnBetween,
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
  title: 'Components/Box/BoxColumnBetween',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxColumnBetween className="h-32 rounded border bg-purple-50 p-4">
      <String>Header</String>
      <String>Content</String>
      <String>Footer</String>
    </BoxColumnBetween>
  ),
};
