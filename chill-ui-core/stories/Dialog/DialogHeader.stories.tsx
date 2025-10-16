import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  Box,
  Button,
  String,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../../src/components';

const meta: Meta<typeof DialogHeader> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
    closeMarkProps: {
      control: 'object',
      description: 'Custom close mark props',
    },
    hasCloseMark: {
      control: 'boolean',
      description: 'Show close button in header',
    },
  },
  component: DialogHeader,
  decorators: [
    (StoryBox: any) => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <StoryBox />
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
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dialog/DialogHeader',
};

export default meta;
type Story = StoryObj<typeof DialogHeader>;

export const Default: Story = {
  args: {
    hasCloseMark: false,
  },
  render: (args: any) => (
    <DialogHeader {...args}>
      <DialogTitle>Default Header</DialogTitle>
    </DialogHeader>
  ),
};

export const WithCloseMark: Story = {
  args: {
    hasCloseMark: true,
  },
  render: (args: any) => (
    <DialogHeader {...args}>
      <DialogTitle>Header with Close Mark</DialogTitle>
    </DialogHeader>
  ),
};

export const CustomCloseMark: Story = {
  args: {
    closeMarkProps: {
      color: 'red',
      size: 24,
    },
    hasCloseMark: true,
  },
  render: (args: any) => (
    <DialogHeader {...args}>
      <DialogTitle>Custom Close Mark</DialogTitle>
    </DialogHeader>
  ),
};

export const CustomStyled: Story = {
  args: {
    className: 'bg-blue-500 border-b-2 border-blue-600',
    hasCloseMark: true,
  },
  render: (args: any) => (
    <DialogHeader {...args}>
      <DialogTitle className="text-white">Custom Styled Header</DialogTitle>
    </DialogHeader>
  ),
};

export const WithMultipleElements: Story = {
  args: {
    hasCloseMark: true,
  },
  render: (args: any) => (
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
  render: (args: any) => (
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
