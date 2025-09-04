import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import String from '../../src/components/string';
import { BoxColumnCenter } from '../../src/components';

const meta: Meta<typeof BoxColumnCenter> = {
  component: BoxColumnCenter,
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
  title: 'Components/Box/BoxColumnCenter',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxColumnCenter className="h-32 gap-2 rounded border bg-green-50 p-4">
      <String>👤</String>
      <String>John Doe</String>
    </BoxColumnCenter>
  ),
};
