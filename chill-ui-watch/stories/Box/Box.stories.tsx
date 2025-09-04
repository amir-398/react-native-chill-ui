import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { Box } from '../../src/components';
import String from '../../src/components/string';

const meta: Meta<typeof Box> = {
  component: Box,
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
  title: 'Components/Box/Box',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="bg-gray-100 p-4">
      <String>Basic Box Container</String>
    </Box>
  ),
};
