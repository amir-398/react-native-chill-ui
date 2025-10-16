import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from '../storybook';
import { Box } from '../../src/components';

const meta: Meta<typeof Box> = {
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
  title: 'LAYOUT/Box/Box',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    useFastView: true,
  },
  render: (args: any) => <Box style={{ backgroundColor: '#f3f4f6', padding: 16, width: 200 }} {...args} />,
};
