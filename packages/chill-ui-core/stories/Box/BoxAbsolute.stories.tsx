import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import { Chip, BoxAbsolute, BoxStack } from '../../src/components';

const meta: Meta<typeof BoxAbsolute> = {
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
  component: BoxAbsolute,
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
  title: 'LAYOUT/Box/BoxAbsolute',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxStack className="h-32 w-32 rounded border bg-gray-100">
      <BoxAbsolute className="left-2 top-2">
        <Chip>New</Chip>
      </BoxAbsolute>
    </BoxStack>
  ),
};
