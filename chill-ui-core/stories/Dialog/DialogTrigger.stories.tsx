import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  Button,
  String,
  Box,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../../src/components';

const meta: Meta<typeof DialogTrigger> = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of touchable component',
      options: ['pressable', 'touchable-opacity', 'ripple-pressable'],
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to clone the child element',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
  },
  component: DialogTrigger,
  decorators: [
    Story => (
      <Dialog>
        <Story />
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Dialog Trigger Example</DialogTitle>
          </DialogHeader>
          <String>This dialog was opened by the trigger below.</String>
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
  title: 'Components/Dialog/DialogTrigger',
};

export default meta;
type Story = StoryObj<typeof DialogTrigger>;

export const Default: Story = {
  args: {
    as: 'pressable',
    asChild: false,
  },
  render: (args: any) => (
    <DialogTrigger {...args}>
      <Button title="Default Trigger" />
    </DialogTrigger>
  ),
};

export const RipplePressable: Story = {
  args: {
    as: 'ripple-pressable',
    asChild: false,
  },
  render: (args: any) => (
    <DialogTrigger {...args}>
      <Button title="Ripple Pressable Trigger" />
    </DialogTrigger>
  ),
};

export const TouchableOpacity: Story = {
  args: {
    as: 'touchable-opacity',
    asChild: false,
  },
  render: (args: any) => (
    <DialogTrigger {...args}>
      <Button title="Touchable Opacity Trigger" />
    </DialogTrigger>
  ),
};

export const AsChild: Story = {
  args: {
    as: 'pressable',
    asChild: true,
  },
  render: (args: any) => (
    <DialogTrigger {...args}>
      <Button title="As Child Trigger" />
    </DialogTrigger>
  ),
};

export const CustomStyled: Story = {
  args: {
    as: 'pressable',
    asChild: false,
    className: 'bg-blue-500 rounded-lg p-4',
  },
  render: (args: any) => (
    <DialogTrigger {...args}>
      <Button title="Custom Styled Trigger" />
    </DialogTrigger>
  ),
};

export const WithCustomElement: Story = {
  args: {
    as: 'pressable',
    asChild: true,
  },
  render: (args: any) => (
    <DialogTrigger {...args}>
      <Box className="rounded-lg bg-green-500 p-4">
        <String className="font-semibold text-white">Custom Element Trigger</String>
      </Box>
    </DialogTrigger>
  ),
};

export const MultipleTriggers: Story = {
  decorators: [
    (StoryBox: any) => (
      <Dialog>
        <StoryBox />
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Multiple Triggers</DialogTitle>
          </DialogHeader>
          <String>Any of the triggers above can open this dialog.</String>
          <DialogFooter>
            <DialogClose asChild>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
  render: () => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Multiple Triggers</String>
      <Box className="flex flex-row gap-4">
        <DialogTrigger as="pressable">
          <Button title="Pressable" />
        </DialogTrigger>
        <DialogTrigger as="ripple-pressable">
          <Button title="Ripple" />
        </DialogTrigger>
        <DialogTrigger as="touchable-opacity">
          <Button title="Touchable" />
        </DialogTrigger>
      </Box>
    </Box>
  ),
};
