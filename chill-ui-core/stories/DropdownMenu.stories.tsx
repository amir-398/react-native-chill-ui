import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Icon, Button, String } from '../src/components';
import {
  DropdownMenu,
  DropdownMenuContentTw as DropdownMenuContent,
  DropdownMenuItemTw as DropdownMenuItem,
  DropdownMenuLabelTw as DropdownMenuLabel,
  DropdownMenuSeparatorTw as DropdownMenuSeparator,
  DropdownMenuTriggerTw as DropdownMenuTrigger,
} from '../src/components/dropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  argTypes: {
    // DropdownMenu Props
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state (uncontrolled mode)',
      table: {
        category: 'DropdownMenu Props',
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when dropdown closes',
      table: {
        category: 'DropdownMenu Props',
        type: { summary: '() => void' },
      },
    },
    onOpen: {
      action: 'onOpen',
      description: 'Callback when dropdown opens',
      table: {
        category: 'DropdownMenu Props',
        type: { summary: '() => void' },
      },
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
      table: {
        category: 'DropdownMenu Props',
        type: { summary: '(open: boolean) => void' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        category: 'DropdownMenu Props',
        type: { summary: 'boolean' },
      },
    },

    // DropdownMenuContent Props
    align: {
      control: 'select',
      description: 'Horizontal alignment of the dropdown',
      options: ['auto', 'left', 'right', 'center'],
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: 'auto' },
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind)',
      table: {
        category: 'DropdownMenuContent Props',
        type: { summary: 'string' },
      },
    },
    closeDropdownWhenSelectedItem: {
      control: 'boolean',
      description: 'Close dropdown when an item is selected',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    closeWhenInteractedOutside: {
      control: 'boolean',
      description: 'Close dropdown when clicking outside',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    hasAnimation: {
      control: 'boolean',
      description: 'Enable animations',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    hasScroll: {
      control: 'boolean',
      description: 'Enable scrolling when content exceeds maxHeight',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height before scrolling',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: '200' },
        type: { summary: 'number' },
      },
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height of the dropdown',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    offsetX: {
      control: 'number',
      description: 'Horizontal offset from trigger',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset from trigger',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: '5' },
        type: { summary: 'number' },
      },
    },
    side: {
      control: 'select',
      description: 'Side of the trigger where the dropdown appears',
      options: ['auto', 'top', 'bottom'],
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: 'auto' },
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description: 'Style object for the dropdown container',
      table: {
        category: 'DropdownMenuContent Props',
        type: { summary: 'ViewStyle' },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the dropdown content',
      table: {
        category: 'DropdownMenuContent Props',
        defaultValue: { summary: '200' },
        type: { summary: 'number' },
      },
    },

    // DropdownMenuItem Props
    as: {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['pressable', 'touchable-opacity', 'touchable-highlight'],
      table: {
        category: 'DropdownMenuItem Props',
        defaultValue: { summary: 'touchable-highlight' },
        type: { summary: 'string' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to clone the child element',
      table: {
        category: 'DropdownMenuItem Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'className²': {
      control: 'text',
      description: 'Custom CSS classes (NativeWind)',
      table: {
        category: 'DropdownMenuItem Props',
        type: { summary: 'string' },
      },
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown when item is selected',
      table: {
        category: 'DropdownMenuItem Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the item is disabled',
      table: {
        category: 'DropdownMenuItem Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onSelect: {
      action: 'onSelect',
      description: 'Callback when item is selected',
      table: {
        category: 'DropdownMenuItem Props',
        type: { summary: '() => void' },
      },
    },
    stringProps: {
      control: 'object',
      description: 'Props for String component when children is a string',
      table: {
        category: 'DropdownMenuItem Props',
        type: { summary: 'object' },
      },
    },
    'style²': {
      control: 'object',
      description: 'Style object for the item',
      table: {
        category: 'DropdownMenuItem Props',
        type: { summary: 'ViewStyle' },
      },
    },
    underlayColor: {
      control: 'color',
      description: 'Underlay color for touchable-highlight',
      table: {
        category: 'DropdownMenuItem Props',
        defaultValue: { summary: '#f0f0f0' },
        type: { summary: 'string' },
      },
    },

    // DropdownMenuTrigger Props
    'as²': {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['pressable', 'touchable-opacity', 'touchable-highlight'],
      table: {
        category: 'DropdownMenuTrigger Props',
        defaultValue: { summary: 'pressable' },
        type: { summary: 'string' },
      },
    },
    'asChild³': {
      control: 'boolean',
      description: 'Whether to clone the child element',
      table: {
        category: 'DropdownMenuTrigger Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'className⁴': {
      control: 'text',
      description: 'Custom CSS classes (NativeWind)',
      table: {
        category: 'DropdownMenuTrigger Props',
        type: { summary: 'string' },
      },
    },
    'style³': {
      control: 'object',
      description: 'Style object for the trigger',
      table: {
        category: 'DropdownMenuTrigger Props',
        type: {
          summary: 'ViewStyle',
        },
      },
    },

    // DropdownMenuSeparator Props
    'className⁵': {
      control: 'text',
      description: 'Custom CSS classes (NativeWind)',
      table: {
        category: 'DropdownMenuSeparator Props',
        type: { summary: 'string' },
      },
    },
    'style⁴': {
      control: 'object',
      description: 'Style object for the separator',
      table: {
        category: 'DropdownMenuSeparator Props',
        type: {
          summary: 'ViewStyle',
        },
      },
    },

    // DropdownMenuLabel Props
    'asChild⁶': {
      control: 'boolean',
      description: 'Whether to clone the child element',
      table: {
        category: 'DropdownMenuLabel Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'className⁷': {
      control: 'text',
      description: 'Custom CSS classes (NativeWind)',
      table: {
        category: 'DropdownMenuLabel Props',
        type: { summary: 'string' },
      },
    },
    'stringProps²': {
      control: 'object',
      description: 'Props for String component when children is a string',
      table: {
        category: 'DropdownMenuLabel Props',
        type: { summary: 'object' },
      },
    },
    'style⁵': {
      control: 'object',
      description: 'Style object for the label',
      table: {
        category: 'DropdownMenuLabel Props',
        type: {
          detail: '{\n  [key: string]: any;\n  opacity?: number;\n  // ... other ViewStyle properties\n}',
          summary: 'ViewStyle',
        },
      },
    },
  },
  component: DropdownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  subcomponents: {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  },
  tags: ['autodocs'],
  title: 'FEEDBACK & OVERLAY/DropdownMenu',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
    <Box className="flex flex-row justify-start  p-4">
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

export const CustomPositioning: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button title="Custom Position" />
        </DropdownMenuTrigger>
        <DropdownMenuContent width={300} side="top" align="left" offsetX={10} offsetY={5} maxHeight={150}>
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
