import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import Icon from '../../src/components/icon';
import { Box } from '../../src/components/box';
import { Button } from '../../src/components/button';
import { String } from '../../src/components/string';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../src/components/dropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  argTypes: {
    children: {
      control: false,
      description: 'DropdownMenu content and triggers',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
  },
  component: DropdownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button title="Open Menu" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => console.log('Profile')}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log('Settings')}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => console.log('Log out')}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  ),
};

export const WithIconTrigger: Story = {
  render: () => (
    <Box className="flex flex-row justify-end bg-black p-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Box className="rounded bg-gray-600 p-2">
            <Icon name="ellipsis-vertical-solid" size="md" color="white" />
          </Box>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => console.log('Edit')}>
            <Box className="flex flex-row items-center gap-2">
              <Icon name="pen-to-square-solid" size="sm" color="gray" />
              <String>Edit</String>
            </Box>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log('Share')}>
            <Box className="flex flex-row items-center gap-2">
              <Icon name="share-solid" size="sm" color="gray" />
              <String>Share</String>
            </Box>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => console.log('Delete')}>
            <Box className="flex flex-row items-center gap-2">
              <Icon name="trash-solid" size="sm" color="red" />
              <String>Delete</String>
            </Box>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box className="flex flex-col items-center gap-4 bg-blue-50 p-8">
        <String>Controlled Dropdown (Open: {open ? 'Yes' : 'No'})</String>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <Button title={open ? 'Close Menu' : 'Open Menu'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setOpen(false)}>Close</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log('Action 1')}>Action 1</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log('Action 2')}>Action 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    );
  },
};

export const CustomPositioning: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-8">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button title="Custom Position" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          width={300}
          verticalPosition="top"
          horizontalPosition="left"
          offsetX={10}
          offsetY={5}
          maxHeight={150}
        >
          <DropdownMenuLabel>Custom Positioned Menu</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => console.log('Item 1')}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log('Item 2')}>Item 2</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log('Item 3')}>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-8 bg-slate-100 p-8">
      <String className="text-xl font-bold">Complex Dropdown Example</String>

      <DropdownMenu>
        <DropdownMenuTrigger as="touchable-highlight">
          <Box className="flex flex-row items-center gap-2 rounded-lg bg-slate-600 px-4 py-3">
            <Icon name="user-solid" size="md" color="white" />
            <String className="font-medium text-white">Account Menu</String>
            <Icon name="angle-down-solid" size="sm" color="white" />
          </Box>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          width={280}
          offsetY={8}
          closeWhenInteractedOutside
          verticalPosition="bottom"
          horizontalPosition="left"
        >
          <DropdownMenuLabel>Account Management</DropdownMenuLabel>

          <DropdownMenuItem as="pressable" onSelect={() => console.log('View Profile')}>
            <Box className="flex flex-row items-center gap-3">
              <Icon name="user-solid" size="sm" color="blue" />
              <String>View Profile</String>
            </Box>
          </DropdownMenuItem>

          <DropdownMenuItem as="touchable-opacity" onSelect={() => console.log('Edit Profile')}>
            <Box className="flex flex-row items-center gap-3">
              <Icon name="pen-to-square-solid" size="sm" color="green" />
              <String>Edit Profile</String>
            </Box>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Settings</DropdownMenuLabel>

          <DropdownMenuItem
            as="touchable-highlight"
            underlayColor="#f0f0f0"
            onSelect={() => console.log('Preferences')}
          >
            <Box className="flex flex-row items-center gap-3">
              <Icon name="gear-solid" size="sm" color="gray" />
              <String>Preferences</String>
            </Box>
          </DropdownMenuItem>

          <DropdownMenuItem asChild closeOnSelect={false}>
            <Box className="flex flex-row items-center gap-3 rounded bg-blue-50 p-2">
              <Icon name="star-solid" size="sm" color="yellow" />
              <String>Premium Features</String>
            </Box>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled>
            <Box className="flex flex-row items-center gap-3">
              <Icon name="lock-solid" size="sm" color="gray" />
              <String className="text-gray-400">Coming Soon</String>
            </Box>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => console.log('Sign Out')}>
            <Box className="flex flex-row items-center gap-3">
              <Icon name="arrow-right-from-bracket-solid" size="sm" color="red" />
              <String className="text-red-600">Sign Out</String>
            </Box>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  ),
};
