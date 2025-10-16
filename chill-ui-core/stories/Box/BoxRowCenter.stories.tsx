import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from '../storybook';
import { String, BoxRowCenter } from '../../src/components';

const meta: Meta<typeof BoxRowCenter> = {
  argTypes: {
    useFastView: {
      control: 'boolean',
      description: 'Use optimized RCTView component for better performance',
    },
  },
  component: BoxRowCenter,
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
  title: 'Components/Box/BoxRowCenter',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxRowCenter className="gap-2 rounded border bg-green-50 p-4">
      <String>⭐</String>
      <String>Centered Row</String>
    </BoxRowCenter>
  ),
};
