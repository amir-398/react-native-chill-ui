import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { String, BoxColumnGrow, Box } from '../../src/components';

const meta: Meta<typeof BoxColumnGrow> = {
  argTypes: {
    useFastView: {
      control: 'boolean',
      description: 'Use optimized RCTView component for better performance',
    },
  },
  component: BoxColumnGrow,
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
  title: 'Components/Box/BoxColumnGrow',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="h-32 w-64 rounded border">
      <BoxColumnGrow className="gap-2 rounded border bg-purple-50 p-4">
        <String>Header</String>
        <String>Content</String>
        <String>Footer</String>
      </BoxColumnGrow>
    </Box>
  ),
};
