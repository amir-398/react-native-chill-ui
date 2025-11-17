import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import { Chip, String, BoxRowCenterBetween, BoxRowCenter } from '../../src/components';

const meta: Meta<typeof BoxRowCenterBetween> = {
  args: {
    useFastView: true,
  },
  argTypes: {
    useFastView: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    ViewProps: {
      description: 'Any other props accepted by the native `View` component',
      type: 'object',
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
  title: 'LAYOUT/Box/BoxRowCenterBetween',
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
