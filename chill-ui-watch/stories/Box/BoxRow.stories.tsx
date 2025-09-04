import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { BoxRow } from '../../src/components';
import String from '../../src/components/string';

const meta: Meta<typeof BoxRow> = {
  component: BoxRow,
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
  title: 'Components/Box/BoxRow',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxRow className="gap-4 rounded border bg-blue-50 p-4">
      <String>Item 1</String>
      <String>Item 2</String>
      <String>Item 3</String>
    </BoxRow>
  ),
};
