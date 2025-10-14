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

const meta: Meta<typeof DialogTrigger> = {
  title: 'Components/Dialog/DialogTrigger',
  component: DialogTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['pressable', 'touchable-opacity', 'ripple-pressable'],
      description: 'Type of touchable component',
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
};

export default meta;
type Story = StoryObj<typeof DialogTrigger>;

export const Default: Story = {
  args: {
    as: 'pressable',
    asChild: false,
  },
  render: args => (
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
  render: args => (
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
  render: args => (
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
  render: args => (
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
  render: args => (
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
  render: args => (
    <DialogTrigger {...args}>
      <Box className="rounded-lg bg-green-500 p-4">
        <String className="font-semibold text-white">Custom Element Trigger</String>
      </Box>
    </DialogTrigger>
  ),
};

export const MultipleTriggers: Story = {
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
  decorators: [
    Story => (
      <Dialog>
        <Story />
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
};
