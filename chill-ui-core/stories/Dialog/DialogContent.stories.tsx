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

const meta: Meta<typeof DialogContent> = {
  title: 'Components/Dialog/DialogContent',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: 'select',
      options: ['fade', 'slide', 'none'],
      description: 'Animation type for the dialog',
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'Show backdrop behind dialog',
    },
    closeOnBackdropPress: {
      control: 'boolean',
      description: 'Close when backdrop is pressed',
    },
    closeOnGoBack: {
      control: 'boolean',
      description: 'Close when back button is pressed',
    },
    backdropColor: {
      control: 'color',
      description: 'Custom backdrop color',
    },
    useDefaultContainer: {
      control: 'boolean',
      description: 'Use default white container',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size variant for the dialog',
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
        <Story />
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {
  args: {
    animation: 'fade',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader>
        <DialogTitle>Default Dialog Content</DialogTitle>
      </DialogHeader>
      <String>This is a default dialog content with standard settings.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const WithCloseMark: Story = {
  args: {
    animation: 'fade',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle>Dialog with Close Mark</DialogTitle>
      </DialogHeader>
      <String>This dialog has a close mark in the header.</String>
      <DialogFooter>
        <Button title="Action" />
      </DialogFooter>
    </DialogContent>
  ),
};

export const SlideAnimation: Story = {
  args: {
    animation: 'slide',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle>Slide Animation</DialogTitle>
      </DialogHeader>
      <String>This dialog uses slide animation.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const NoAnimation: Story = {
  args: {
    animation: 'none',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle>No Animation</DialogTitle>
      </DialogHeader>
      <String>This dialog has no animation.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const CustomBackdrop: Story = {
  args: {
    animation: 'fade',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
    backdropColor: 'rgba(0, 0, 0, 0.8)',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle>Custom Backdrop</DialogTitle>
      </DialogHeader>
      <String>This dialog has a custom backdrop color.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const NoBackdrop: Story = {
  args: {
    animation: 'fade',
    hasBackdrop: false,
    closeOnBackdropPress: false,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle>No Backdrop</DialogTitle>
      </DialogHeader>
      <String>This dialog has no backdrop.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Different Sizes</String>
      <Box className="flex flex-row gap-4">
        <Dialog>
          <DialogTrigger>
            <Button title="Small" />
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader hasCloseMark>
              <DialogTitle>Small Dialog</DialogTitle>
            </DialogHeader>
            <String>This is a small dialog.</String>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button title="Medium" />
          </DialogTrigger>
          <DialogContent size="md">
            <DialogHeader hasCloseMark>
              <DialogTitle>Medium Dialog</DialogTitle>
            </DialogHeader>
            <String>This is a medium dialog.</String>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button title="Large" />
          </DialogTrigger>
          <DialogContent size="lg">
            <DialogHeader hasCloseMark>
              <DialogTitle>Large Dialog</DialogTitle>
            </DialogHeader>
            <String>This is a large dialog.</String>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button title="Extra Large" />
          </DialogTrigger>
          <DialogContent size="xl">
            <DialogHeader hasCloseMark>
              <DialogTitle>Extra Large Dialog</DialogTitle>
            </DialogHeader>
            <String>This is an extra large dialog.</String>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  ),
};

export const FullScreen: Story = {
  args: {
    animation: 'slide',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'full',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle>Full Screen Dialog</DialogTitle>
      </DialogHeader>
      <String>This is a full screen dialog that takes up the entire screen.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const WithoutDefaultContainer: Story = {
  args: {
    animation: 'fade',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: false,
    size: 'md',
  },
  render: args => (
    <DialogContent {...args}>
      <Box className="flex-1 items-center justify-center bg-blue-500 p-8">
        <DialogHeader hasCloseMark>
          <DialogTitle className="text-white">Custom Layout</DialogTitle>
        </DialogHeader>
        <String className="text-center text-white">
          This dialog uses a custom layout without the default container.
        </String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </DialogFooter>
      </Box>
    </DialogContent>
  ),
};

export const CustomStyled: Story = {
  args: {
    animation: 'fade',
    hasBackdrop: true,
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    useDefaultContainer: true,
    size: 'md',
    className: 'bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl',
  },
  render: args => (
    <DialogContent {...args}>
      <DialogHeader hasCloseMark>
        <DialogTitle className="text-white">Custom Styled Dialog</DialogTitle>
      </DialogHeader>
      <String className="text-white">This dialog has custom styling with gradient background.</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};
