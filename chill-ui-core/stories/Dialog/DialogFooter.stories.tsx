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

const meta: Meta<typeof DialogFooter> = {
  title: 'Components/Dialog/DialogFooter',
  component: DialogFooter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
          <DialogHeader hasCloseMark>
            <DialogTitle>Dialog Footer Example</DialogTitle>
          </DialogHeader>
          <String>Dialog content goes here.</String>
          <Story />
        </DialogContent>
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DialogFooter>;

export const Default: Story = {
  render: () => (
    <DialogFooter>
      <DialogClose asChild>
        <Button title="Close" />
      </DialogClose>
    </DialogFooter>
  ),
};

export const WithMultipleButtons: Story = {
  render: () => (
    <DialogFooter>
      <DialogClose asChild>
        <Button title="Cancel" variant="secondary" />
      </DialogClose>
      <Button title="Confirm" />
    </DialogFooter>
  ),
};

export const ThreeButtons: Story = {
  render: () => (
    <DialogFooter>
      <DialogClose asChild>
        <Button title="Cancel" variant="secondary" />
      </DialogClose>
      <Button title="Save Draft" variant="secondary" />
      <Button title="Publish" />
    </DialogFooter>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <DialogFooter className="border-t border-gray-200 bg-gray-100 p-4">
      <Box className="flex flex-row items-center justify-between">
        <String className="text-sm text-gray-500">Optional: This action cannot be undone</String>
        <Box className="flex flex-row gap-2">
          <DialogClose asChild>
            <Button title="Cancel" variant="secondary" />
          </DialogClose>
          <Button title="Delete" variant="danger" />
        </Box>
      </Box>
    </DialogFooter>
  ),
};

export const CenteredButtons: Story = {
  render: () => (
    <DialogFooter className="justify-center">
      <Box className="flex flex-row gap-4">
        <DialogClose asChild>
          <Button title="Cancel" variant="secondary" />
        </DialogClose>
        <Button title="Confirm" />
      </Box>
    </DialogFooter>
  ),
};

export const WithSpacer: Story = {
  render: () => (
    <DialogFooter>
      <Box className="flex w-full flex-row items-center justify-between">
        <String className="text-sm text-gray-500">Last saved 2 minutes ago</String>
        <Box className="flex flex-row gap-2">
          <DialogClose asChild>
            <Button title="Cancel" variant="secondary" />
          </DialogClose>
          <Button title="Save" />
        </Box>
      </Box>
    </DialogFooter>
  ),
};

export const StackedButtons: Story = {
  render: () => (
    <DialogFooter>
      <Box className="flex w-full flex-col gap-2">
        <Button title="Primary Action" />
        <DialogClose asChild>
          <Button title="Cancel" variant="secondary" />
        </DialogClose>
      </Box>
    </DialogFooter>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DialogFooter>
      <Box className="flex flex-row gap-2">
        <DialogClose asChild>
          <Button title="Cancel" variant="secondary" icon="close" />
        </DialogClose>
        <Button title="Save" icon="save" />
        <Button title="Share" icon="share" />
      </Box>
    </DialogFooter>
  ),
};

export const DifferentButtonSizes: Story = {
  render: () => (
    <DialogFooter>
      <Box className="flex flex-row items-center gap-2">
        <DialogClose asChild>
          <Button title="Cancel" variant="secondary" size="sm" />
        </DialogClose>
        <Button title="Confirm" size="md" />
        <Button title="Advanced" size="lg" />
      </Box>
    </DialogFooter>
  ),
};
