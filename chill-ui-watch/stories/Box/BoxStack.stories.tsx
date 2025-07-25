import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from 'stories/storybook';

import Badge from '@/components/badge';

import String from '../../src/components/string';
import { BoxAbsolute, BoxStack } from '../../src/components';

const meta: Meta<typeof BoxStack> = {
  component: BoxStack,
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
  title: 'Components/Box/BoxStack',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BoxStack className="h-32 w-32 rounded border bg-gray-200">
      <BoxAbsolute className="right-2 top-2">
        <Badge>New</Badge>
      </BoxAbsolute>
      <String className="p-4">Background</String>
    </BoxStack>
  ),
};
