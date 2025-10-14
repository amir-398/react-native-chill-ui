import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

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

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state for uncontrolled mode',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
    onOpen: {
      action: 'onOpen',
      description: 'Callback when dialog opens',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when dialog closes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: args => (
    <Dialog {...args}>
      <DialogTrigger>
        <Button title="Open Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Default Dialog</DialogTitle>
        </DialogHeader>
        <String>This is a default dialog content.</String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithCloseMark: Story = {
  render: args => (
    <Dialog {...args}>
      <DialogTrigger>
        <Button title="Open Dialog with Close Mark" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hasCloseMark>
          <DialogTitle>Dialog with Close Mark</DialogTitle>
        </DialogHeader>
        <String>This dialog has a close mark in the header.</String>
        <DialogFooter>
          <Button title="Action" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box className="flex flex-col items-center gap-4">
        <String className="text-lg font-semibold">Controlled Dialog</String>
        <Button title={isOpen ? 'Close Dialog' : 'Open Dialog'} onPress={() => setIsOpen(!isOpen)} />
        <Dialog {...args} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button title="Open via Trigger" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hasCloseMark>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogHeader>
            <String>This dialog is controlled by parent state.</String>
            <DialogFooter>
              <DialogClose asChild>
                <Button title="Close" />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Box>
    );
  },
};

export const Uncontrolled: Story = {
  render: args => (
    <Dialog {...args} defaultOpen={false}>
      <DialogTrigger>
        <Button title="Open Uncontrolled Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hasCloseMark>
          <DialogTitle>Uncontrolled Dialog</DialogTitle>
        </DialogHeader>
        <String>This dialog manages its own state internally.</String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithCallbacks: Story = {
  render: args => (
    <Dialog
      {...args}
      onOpenChange={open => console.log('Dialog state changed:', open)}
      onOpen={() => console.log('Dialog opened!')}
      onClose={() => console.log('Dialog closed!')}
    >
      <DialogTrigger>
        <Button title="Open Dialog with Callbacks" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hasCloseMark>
          <DialogTitle>Dialog with Callbacks</DialogTitle>
        </DialogHeader>
        <String>Check the console for callback logs.</String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const MultipleDialogs: Story = {
  render: args => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Multiple Dialogs</String>
      <Box className="flex flex-row gap-4">
        <Dialog {...args}>
          <DialogTrigger>
            <Button title="Dialog 1" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hasCloseMark>
              <DialogTitle>First Dialog</DialogTitle>
            </DialogHeader>
            <String>This is the first dialog.</String>
          </DialogContent>
        </Dialog>

        <Dialog {...args}>
          <DialogTrigger>
            <Button title="Dialog 2" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hasCloseMark>
              <DialogTitle>Second Dialog</DialogTitle>
            </DialogHeader>
            <String>This is the second dialog.</String>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  ),
};
