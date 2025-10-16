import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { Chip, String, BoxRowCenterBetween, BoxRowCenter } from '../../src/components';

const meta: Meta<typeof BoxRowCenterBetween> = {
  argTypes: {
    useFastView: {
      control: 'boolean',
      description: 'Use optimized RCTView component for better performance',
    },
  },
  component: BoxRowCenterBetween,
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
  title: 'Components/Box/BoxRowCenterBetween',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxRowCenterBetween className="w-64 rounded border p-4">
      <BoxRowCenter className="gap-2">
        <String>👤</String>
        <String>John Doe</String>
      </BoxRowCenter>
      <Chip>Online</Chip>
    </BoxRowCenterBetween>
  ),
};
