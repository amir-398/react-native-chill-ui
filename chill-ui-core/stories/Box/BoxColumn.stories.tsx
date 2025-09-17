import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { BoxColumn } from '../../src/components';
import String from '../../src/components/string';

const meta: Meta<typeof BoxColumn> = {
  component: BoxColumn,
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
  title: 'Components/Box/BoxColumn',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxColumn className="h-32 gap-2 rounded border bg-blue-50 p-4">
      <String>Item 1</String>
      <String>Item 2</String>
      <String>Item 3</String>
    </BoxColumn>
  ),
};
