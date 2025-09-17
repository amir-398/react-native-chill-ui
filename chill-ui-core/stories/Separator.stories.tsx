import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { Box, String } from '../src/components';
import Separator from '../src/components/separator/Separator';

const meta: Meta<typeof Separator> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes for customizing the separator',
    },
  },
  component: Separator,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="space-y-8 p-4">
          <String>Content Above</String>
          <Story />
          <String>Content Below</String>
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/Separator',
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {},
};

export const Thick: Story = {
  args: {
    className: 'h-0.5',
  },
};

export const ExtraThick: Story = {
  args: {
    className: 'h-1',
  },
};

export const CustomColor: Story = {
  args: {
    className: 'bg-primary',
  },
};

export const DarkTheme: Story = {
  args: {
    className: 'bg-white/30',
  },
  decorators: [
    (StoryComponent: ComponentType) => (
      <UiPresentation>
        <Box className="bg-dark space-y-8 p-4">
          <String className="text-white">Content Above</String>
          <StoryComponent />
          <String className="text-white">Content Below</String>
        </Box>
      </UiPresentation>
    ),
  ],
};
