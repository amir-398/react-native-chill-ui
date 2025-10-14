import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../../src/components/icon';
import { Box } from '../../src/components/box';
import { String } from '../../src/components/string';
import { DropdownMenuItem } from '../../src/components/dropdownMenu';

const meta: Meta<typeof DropdownMenuItem> = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['pressable', 'touchable-opacity', 'touchable-highlight'],
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to clone the child element',
    },
    children: {
      control: false,
      description: 'Item content (string or React element)',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown when item is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the item is disabled',
    },
    onSelect: {
      action: 'onSelect',
      description: 'Callback when item is selected',
    },
    stringProps: {
      control: 'object',
      description: 'Props for String component when children is a string',
    },
    underlayColor: {
      control: 'color',
      description: 'Underlay color for touchable-highlight',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
    style: {
      control: 'object',
      description: 'Custom style (StyleSheet only)',
    },
  },
  component: DropdownMenuItem,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu/Item',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenuItem onSelect={() => console.log('Item selected')}>Default Item</DropdownMenuItem>
    </Box>
  ),
};

export const WithPressable: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-blue-100 p-8">
      <DropdownMenuItem as="pressable" onSelect={() => console.log('Pressable selected')}>
        Pressable Item
      </DropdownMenuItem>
    </Box>
  ),
};

export const WithTouchableOpacity: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-8">
      <DropdownMenuItem as="touchable-opacity" onSelect={() => console.log('TouchableOpacity selected')}>
        TouchableOpacity Item
      </DropdownMenuItem>
    </Box>
  ),
};

export const WithTouchableHighlight: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-purple-100 p-8">
      <DropdownMenuItem
        as="touchable-highlight"
        underlayColor="#e0e0e0"
        onSelect={() => console.log('TouchableHighlight selected')}
      >
        TouchableHighlight Item
      </DropdownMenuItem>
    </Box>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-yellow-100 p-8">
      <DropdownMenuItem onSelect={() => console.log('Icon item selected')}>
        <Box className="flex flex-row items-center gap-2">
          <Icon name="user-solid" size="sm" color="blue" />
          <String>Profile</String>
        </Box>
      </DropdownMenuItem>
    </Box>
  ),
};

export const WithMultipleIcons: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-pink-100 p-8">
      <String className="text-lg font-semibold">Items with Icons</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem onSelect={() => console.log('Edit selected')}>
          <Box className="flex flex-row items-center gap-3">
            <Icon name="pen-to-square-solid" size="sm" color="green" />
            <String>Edit</String>
          </Box>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => console.log('Share selected')}>
          <Box className="flex flex-row items-center gap-3">
            <Icon name="share-solid" size="sm" color="blue" />
            <String>Share</String>
          </Box>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => console.log('Delete selected')}>
          <Box className="flex flex-row items-center gap-3">
            <Icon name="trash-solid" size="sm" color="red" />
            <String>Delete</String>
          </Box>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-red-100 p-8">
      <String className="text-lg font-semibold">Disabled Items</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem onSelect={() => console.log('This will not be called')}>
          <String>Normal Item</String>
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <String className="text-gray-400">Disabled Item</String>
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Box className="flex flex-row items-center gap-3">
            <Icon name="lock-solid" size="sm" color="gray" />
            <String className="text-gray-400">Disabled with Icon</String>
          </Box>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-indigo-100 p-8">
      <String className="text-lg font-semibold">AsChild Items</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem asChild closeOnSelect={false}>
          <Box className="flex flex-row items-center gap-3 rounded bg-blue-50 p-2">
            <Icon name="star-solid" size="sm" color="yellow" />
            <String>Custom Item 1</String>
          </Box>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Box className="flex flex-row items-center gap-3 rounded bg-green-50 p-2">
            <Icon name="heart-solid" size="sm" color="red" />
            <String>Custom Item 2</String>
          </Box>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Box className="flex flex-row items-center gap-3 rounded bg-purple-50 p-2">
            <Icon name="gear-solid" size="sm" color="purple" />
            <String>Custom Item 3</String>
          </Box>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-orange-100 p-8">
      <String className="text-lg font-semibold">Custom Styled Items</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem className="rounded-lg hover:bg-blue-100">
          <String className="font-medium text-blue-600">Blue Item</String>
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-lg hover:bg-green-100">
          <String className="font-medium text-green-600">Green Item</String>
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-lg hover:bg-red-100">
          <String className="font-medium text-red-600">Red Item</String>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const WithCloseBehaviors: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-slate-100 p-8">
      <String className="text-lg font-semibold">Close Behaviors</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem closeOnSelect onSelect={() => console.log('Will close dropdown')}>
          <String>Close on Select (Default)</String>
        </DropdownMenuItem>

        <DropdownMenuItem closeOnSelect={false} onSelect={() => console.log("Won't close dropdown")}>
          <String>No Close on Select</String>
        </DropdownMenuItem>

        <DropdownMenuItem closeOnSelect={false} onSelect={() => console.log('Custom behavior')}>
          <Box className="flex flex-row items-center gap-3">
            <Icon name="gear-solid" size="sm" color="gray" />
            <String>Settings (No Close)</String>
          </Box>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const WithStringProps: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-teal-100 p-8">
      <String className="text-lg font-semibold">String Props</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem
          stringProps={{ style: { color: 'red', fontWeight: 'bold' } }}
          onSelect={() => console.log('Red bold item')}
        >
          Red Bold Item
        </DropdownMenuItem>

        <DropdownMenuItem
          stringProps={{ style: { color: 'blue', fontSize: 16 } }}
          onSelect={() => console.log('Blue large item')}
        >
          Blue Large Item
        </DropdownMenuItem>

        <DropdownMenuItem
          stringProps={{ style: { color: 'green', fontStyle: 'italic' } }}
          onSelect={() => console.log('Green italic item')}
        >
          Green Italic Item
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-cyan-100 p-8">
      <String className="text-lg font-semibold">Different Sizes</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem onSelect={() => console.log('Small item')}>
          <String className="text-sm">Small Item</String>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => console.log('Medium item')}>
          <String className="text-base">Medium Item</String>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => console.log('Large item')}>
          <String className="text-lg">Large Item</String>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-rose-100 p-8">
      <String className="text-lg font-semibold">Items with Badges</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuItem onSelect={() => console.log('Notifications')}>
          <Box className="flex w-full flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-3">
              <Icon name="bell-solid" size="sm" color="blue" />
              <String>Notifications</String>
            </Box>
            <Box className="rounded-full bg-red-500 px-2 py-1">
              <String className="text-xs font-bold text-white">3</String>
            </Box>
          </Box>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => console.log('Messages')}>
          <Box className="flex w-full flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-3">
              <Icon name="envelope-solid" size="sm" color="green" />
              <String>Messages</String>
            </Box>
            <Box className="rounded-full bg-green-500 px-2 py-1">
              <String className="text-xs font-bold text-white">12</String>
            </Box>
          </Box>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => console.log('Updates')}>
          <Box className="flex w-full flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-3">
              <Icon name="arrow-down-solid" size="sm" color="purple" />
              <String>Updates</String>
            </Box>
            <Box className="rounded-full bg-purple-500 px-2 py-1">
              <String className="text-xs font-bold text-white">New</String>
            </Box>
          </Box>
        </DropdownMenuItem>
      </Box>
    </Box>
  ),
};
