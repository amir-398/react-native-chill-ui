import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from 'stories/storybook';

import { Box, BoxCenter } from '../../src/components';

const meta: Meta<typeof BoxCenter> = {
  component: BoxCenter,
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
  title: 'Components/Box/BoxCenter',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxCenter className="h-32 w-32 rounded border p-1">
      <Box className="size-10 bg-black" />
    </BoxCenter>
  ),
};
