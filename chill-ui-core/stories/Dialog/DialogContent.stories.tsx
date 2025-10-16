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

const meta: Meta<typeof DialogContent> = {
  argTypes: {
    animation: {
      control: 'select',
      description: 'Animation type for the dialog',
      options: ['fade', 'slide', 'none'],
    },
    backdropColor: {
      control: 'color',
      description: 'Custom backdrop color',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
    closeOnBackdropPress: {
      control: 'boolean',
      description: 'Close when backdrop is pressed',
    },
    closeOnGoBack: {
      control: 'boolean',
      description: 'Close when back button is pressed',
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'Show backdrop behind dialog',
    },
    size: {
      control: 'select',
      description: 'Size variant for the dialog',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    useDefaultContainer: {
      control: 'boolean',
      description: 'Use default white container',
    },
  },
  component: DialogContent,
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
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dialog/DialogContent',
};

export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {
  args: {
    animation: 'fade',
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    backdropColor: 'rgba(0, 0, 0, 0.8)',
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    closeOnBackdropPress: false,
    closeOnGoBack: true,
    hasBackdrop: false,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'full',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: false,
  },
  render: (args: any) => (
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
    className: 'bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl',
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasBackdrop: true,
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => (
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
