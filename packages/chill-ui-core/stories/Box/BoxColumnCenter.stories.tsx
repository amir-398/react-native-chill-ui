import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import { String, BoxColumnCenter } from '../../src/components';

const meta: Meta<typeof BoxColumnCenter> = {
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
  title: 'LAYOUT/Box/BoxColumnCenter',
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
