import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../src/components/box';
import { String } from '../../src/components/string';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../../src/components/dropdownMenu';

const meta: Meta<typeof DropdownMenuContent> = {
  argTypes: {
    children: {
      control: false,
      description: 'Dropdown content (typically DropdownMenuItem components)',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
    closeDropdownWhenSelectedItem: {
      control: 'boolean',
      description: 'Close dropdown when item is selected',
    },
    closeWhenInteractedOutside: {
      control: 'boolean',
      description: 'Close dropdown when clicking outside',
    },
    hasAnimation: {
      control: 'boolean',
      description: 'Enable animations',
    },
    hasScroll: {
      control: 'boolean',
      description: 'Enable scrolling when content exceeds maxHeight',
    },
    horizontalPosition: {
      control: 'select',
      description: 'Horizontal positioning strategy',
      options: ['auto', 'left', 'right'],
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height before scrolling',
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height of the dropdown',
    },
    offsetX: {
      control: 'number',
      description: 'Horizontal offset from trigger',
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset from trigger',
    },
    style: {
      control: 'object',
      description: 'Custom style (StyleSheet only)',
    },
    verticalPosition: {
      control: 'select',
      description: 'Vertical positioning strategy',
      options: ['auto', 'top', 'bottom'],
    },
    width: {
      control: 'number',
      description: 'Width of the dropdown content',
    },
  },
  component: DropdownMenuContent,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu/Content',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => console.log('Profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Settings')}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => console.log('Log out')}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </Box>
  ),
};

export const WithCustomWidth: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-blue-100 p-8">
      <DropdownMenuContent width={300}>
        <DropdownMenuLabel>Wide Menu</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => console.log('Item 1')}>This is a longer menu item</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 2')}>Another long menu item</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 3')}>Third long menu item</DropdownMenuItem>
      </DropdownMenuContent>
    </Box>
  ),
};

export const WithCustomPositioning: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-8">
      <DropdownMenuContent width={250} offsetX={20} offsetY={10} verticalPosition="top" horizontalPosition="left">
        <DropdownMenuLabel>Custom Positioned</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => console.log('Item 1')}>Item 1</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 2')}>Item 2</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 3')}>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </Box>
  ),
};

export const WithScroll: Story = {
  render: () => {
    const longItems = Array.from({ length: 15 }, (_, index) => ({
      id: `item-${index + 1}`,
      label: `Option ${index + 1}`,
    }));

    return (
      <Box className="flex flex-row justify-center bg-purple-100 p-8">
        <DropdownMenuContent maxHeight={200} hasScroll>
          <DropdownMenuLabel>Scrollable Options</DropdownMenuLabel>
          {longItems.map(item => (
            <DropdownMenuItem key={item.id} onSelect={() => console.log(item.label)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </Box>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-yellow-100 p-8">
      <DropdownMenuContent className="w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
        <DropdownMenuLabel className="font-semibold text-gray-500">Styled Menu</DropdownMenuLabel>
        <DropdownMenuItem className="hover:bg-gray-100">
          <String>Profile</String>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100">
          <String>Settings</String>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="hover:bg-red-50">
          <String className="text-red-600">Sign Out</String>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </Box>
  ),
};

export const WithCloseBehaviors: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-8 bg-orange-100 p-8">
      <String className="text-lg font-semibold">Close Behaviors</String>

      <Box className="flex flex-row gap-8">
        <Box className="flex flex-col items-center gap-2">
          <String className="text-sm font-medium">Close on Select</String>
          <DropdownMenuContent closeDropdownWhenSelectedItem>
            <DropdownMenuItem onSelect={() => console.log('Will close')}>Will Close</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log('Will also close')}>Will Also Close</DropdownMenuItem>
          </DropdownMenuContent>
        </Box>

        <Box className="flex flex-col items-center gap-2">
          <String className="text-sm font-medium">No Close on Select</String>
          <DropdownMenuContent closeDropdownWhenSelectedItem={false}>
            <DropdownMenuItem onSelect={() => console.log('Won&apos;t close')}>Won&apos;t Close</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log('Won&apos;t close either')}>
              Won&apos;t Close Either
            </DropdownMenuItem>
          </DropdownMenuContent>
        </Box>
      </Box>
    </Box>
  ),
};

export const WithAnimation: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-pink-100 p-8">
      <DropdownMenuContent hasAnimation>
        <DropdownMenuLabel>Animated Menu</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => console.log('Animated Item 1')}>Animated Item 1</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Animated Item 2')}>Animated Item 2</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Animated Item 3')}>Animated Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </Box>
  ),
};

export const WithMinMaxHeight: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-indigo-100 p-8">
      <DropdownMenuContent minHeight={100} maxHeight={200}>
        <DropdownMenuLabel>Height Constrained</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => console.log('Item 1')}>Item 1</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 2')}>Item 2</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 3')}>Item 3</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 4')}>Item 4</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Item 5')}>Item 5</DropdownMenuItem>
      </DropdownMenuContent>
    </Box>
  ),
};

export const Empty: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenuContent>{/* Empty content */}</DropdownMenuContent>
    </Box>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-8 bg-slate-100 p-8">
      <String className="text-lg font-semibold">All Position Variants</String>

      <Box className="grid grid-cols-2 gap-8">
        <Box className="flex flex-col items-center gap-2">
          <String className="text-sm font-medium">Top Left</String>
          <DropdownMenuContent verticalPosition="top" horizontalPosition="left" width={150}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </Box>

        <Box className="flex flex-col items-center gap-2">
          <String className="text-sm font-medium">Top Right</String>
          <DropdownMenuContent verticalPosition="top" horizontalPosition="right" width={150}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </Box>

        <Box className="flex flex-col items-center gap-2">
          <String className="text-sm font-medium">Bottom Left</String>
          <DropdownMenuContent verticalPosition="bottom" horizontalPosition="left" width={150}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </Box>

        <Box className="flex flex-col items-center gap-2">
          <String className="text-sm font-medium">Bottom Right</String>
          <DropdownMenuContent verticalPosition="bottom" horizontalPosition="right" width={150}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </Box>
      </Box>
    </Box>
  ),
};
