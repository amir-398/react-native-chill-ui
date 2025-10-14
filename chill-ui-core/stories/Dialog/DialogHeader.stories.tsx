import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@components/button';
import { String } from '@components/string';
import { Box } from '@components/box';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@components/dialog';

const meta: Meta<typeof DialogHeader> = {
  title: 'Components/Dialog/DialogHeader',
  component: DialogHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasCloseMark: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closeMarkProps: {
      control: 'object',
      description: 'Custom close mark props',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
  },
  decorators: [
    Story => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <Story />
          <String>Dialog content goes here.</String>
          <DialogFooter>
            <DialogClose asChild>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DialogHeader>;

export const Default: Story = {
  args: {
    hasCloseMark: false,
  },
  render: args => (
    <DialogHeader {...args}>
      <DialogTitle>Default Header</DialogTitle>
    </DialogHeader>
  ),
};

export const WithCloseMark: Story = {
  args: {
    hasCloseMark: true,
  },
  render: args => (
    <DialogHeader {...args}>
      <DialogTitle>Header with Close Mark</DialogTitle>
    </DialogHeader>
  ),
};

export const CustomCloseMark: Story = {
  args: {
    hasCloseMark: true,
    closeMarkProps: {
      size: 24,
      color: 'red',
    },
  },
  render: args => (
    <DialogHeader {...args}>
      <DialogTitle>Custom Close Mark</DialogTitle>
    </DialogHeader>
  ),
};

export const CustomStyled: Story = {
  args: {
    hasCloseMark: true,
    className: 'bg-blue-500 border-b-2 border-blue-600',
  },
  render: args => (
    <DialogHeader {...args}>
      <DialogTitle className="text-white">Custom Styled Header</DialogTitle>
    </DialogHeader>
  ),
};

export const WithMultipleElements: Story = {
  args: {
    hasCloseMark: true,
  },
  render: args => (
    <DialogHeader {...args}>
      <Box className="flex flex-row items-center justify-between">
        <DialogTitle>Complex Header</DialogTitle>
        <Box className="flex flex-row gap-2">
          <Button title="Help" size="sm" />
          <Button title="Settings" size="sm" />
        </Box>
      </Box>
    </DialogHeader>
  ),
};

export const WithoutTitle: Story = {
  args: {
    hasCloseMark: true,
  },
  render: args => (
    <DialogHeader {...args}>
      <Box className="flex flex-row items-center justify-between">
        <String className="text-lg font-semibold">Custom Header Content</String>
        <Box className="flex flex-row gap-2">
          <Button title="Action 1" size="sm" />
          <Button title="Action 2" size="sm" />
        </Box>
      </Box>
    </DialogHeader>
  ),
};
