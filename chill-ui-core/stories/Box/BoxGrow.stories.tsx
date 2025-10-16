import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { String, BoxGrow, Box } from '../../src/components';

const meta: Meta<typeof BoxGrow> = {
  argTypes: {
    useFastView: {
      control: 'boolean',
      description: 'Use optimized RCTView component for better performance',
    },
  },
  component: BoxGrow,
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
  title: 'Components/Box/BoxGrow',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="h-32 w-64 rounded border">
      <BoxGrow className="rounded border bg-blue-50 p-4">
        <String>This box grows to fill available space</String>
      </BoxGrow>
    </Box>
  ),
};
