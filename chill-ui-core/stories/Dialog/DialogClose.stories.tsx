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

const meta: Meta<typeof DialogClose> = {
  title: 'Components/Dialog/DialogClose',
  component: DialogClose,
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
  },
  decorators: [
    Story => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Dialog Close Example</DialogTitle>
          </DialogHeader>
          <String>Dialog content goes here.</String>
          <DialogFooter>
            <Story />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DialogClose>;

export const Default: Story = {
  args: {
    as: 'pressable',
    asChild: false,
  },
  render: args => (
    <DialogClose {...args}>
      <Button title="Close" />
    </DialogClose>
  ),
};

export const RipplePressable: Story = {
  args: {
    as: 'ripple-pressable',
    asChild: false,
  },
  render: args => (
    <DialogClose {...args}>
      <Button title="Ripple Close" />
    </DialogClose>
  ),
};

export const TouchableOpacity: Story = {
  args: {
    as: 'touchable-opacity',
    asChild: false,
  },
  render: args => (
    <DialogClose {...args}>
      <Button title="Touchable Close" />
    </DialogClose>
  ),
};

export const AsChild: Story = {
  args: {
    as: 'pressable',
    asChild: true,
  },
  render: args => (
    <DialogClose {...args}>
      <Button title="As Child Close" />
    </DialogClose>
  ),
};

export const CustomStyled: Story = {
  args: {
    as: 'pressable',
    asChild: true,
  },
  render: args => (
    <DialogClose {...args}>
      <Button title="Custom Close" variant="danger" />
    </DialogClose>
  ),
};

export const WithCustomElement: Story = {
  args: {
    as: 'pressable',
    asChild: true,
  },
  render: args => (
    <DialogClose {...args}>
      <Box className="rounded-lg bg-red-500 p-3">
        <String className="font-semibold text-white">Custom Close Element</String>
      </Box>
    </DialogClose>
  ),
};

export const MultipleCloseButtons: Story = {
  render: () => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Multiple Close Buttons</String>
      <Box className="flex flex-row gap-4">
        <DialogClose as="pressable">
          <Button title="Pressable" />
        </DialogClose>
        <DialogClose as="ripple-pressable">
          <Button title="Ripple" />
        </DialogClose>
        <DialogClose as="touchable-opacity">
          <Button title="Touchable" />
        </DialogClose>
      </Box>
    </Box>
  ),
  decorators: [
    Story => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Multiple Close Buttons</DialogTitle>
          </DialogHeader>
          <String>Any of the close buttons below can close this dialog.</String>
          <DialogFooter>
            <Story />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
};

export const DifferentVariants: Story = {
  render: () => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Different Button Variants</String>
      <Box className="flex flex-row gap-2">
        <DialogClose asChild>
          <Button title="Default" />
        </DialogClose>
        <DialogClose asChild>
          <Button title="Secondary" variant="secondary" />
        </DialogClose>
        <DialogClose asChild>
          <Button title="Danger" variant="danger" />
        </DialogClose>
        <DialogClose asChild>
          <Button title="Success" variant="success" />
        </DialogClose>
      </Box>
    </Box>
  ),
  decorators: [
    Story => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Different Close Variants</DialogTitle>
          </DialogHeader>
          <String>Try different close button variants below.</String>
          <DialogFooter>
            <Story />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
};

export const WithIcons: Story = {
  render: () => (
    <Box className="flex flex-row gap-2">
      <DialogClose asChild>
        <Button title="Close" icon="close" />
      </DialogClose>
      <DialogClose asChild>
        <Button title="Cancel" icon="cancel" variant="secondary" />
      </DialogClose>
      <DialogClose asChild>
        <Button title="Exit" icon="exit" variant="danger" />
      </DialogClose>
    </Box>
  ),
  decorators: [
    Story => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Close with Icons</DialogTitle>
          </DialogHeader>
          <String>Close buttons with different icons.</String>
          <DialogFooter>
            <Story />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
};
