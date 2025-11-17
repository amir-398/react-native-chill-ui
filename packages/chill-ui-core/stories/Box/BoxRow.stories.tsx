import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import { String, BoxRow } from '../../src/components';

const meta: Meta<typeof BoxRow> = {
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
  component: BoxRow,
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
  title: 'LAYOUT/Box/BoxRow',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxRow className="gap-4 rounded border bg-blue-50 p-4">
      <String>Item 1</String>
      <String>Item 2</String>
      <String>Item 3</String>
    </BoxRow>
  ),
};
