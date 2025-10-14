import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../../src/components/icon';
import { Box } from '../../src/components/box';
import { Button } from '../../src/components/button';
import { String } from '../../src/components/string';
import { DropdownMenuTrigger } from '../../src/components/dropdownMenu';

const meta: Meta<typeof DropdownMenuTrigger> = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['pressable', 'touchable-opacity'],
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to clone the child element',
    },
    children: {
      control: false,
      description: 'Trigger element that will open the dropdown',
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
  component: DropdownMenuTrigger,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu/Trigger',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenuTrigger>
        <Button title="Open Menu" />
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const WithPressable: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-blue-100 p-8">
      <DropdownMenuTrigger as="pressable">
        <Button title="Pressable Trigger" />
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const WithTouchableOpacity: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-8">
      <DropdownMenuTrigger as="touchable-opacity">
        <Button title="TouchableOpacity Trigger" />
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Box className="flex flex-row justify-end bg-black p-4">
      <DropdownMenuTrigger>
        <Box className="rounded bg-gray-600 p-2">
          <Icon name="ellipsis-vertical-solid" size="md" color="white" />
        </Box>
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-purple-100 p-8">
      <DropdownMenuTrigger>
        <Box className="flex flex-row items-center gap-2 rounded-lg bg-purple-500 px-4 py-2">
          <Icon name="user-solid" size="md" color="white" />
          <String className="font-medium text-white">Account</String>
          <Icon name="angle-down-solid" size="sm" color="white" />
        </Box>
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-yellow-100 p-8">
      <DropdownMenuTrigger asChild>
        <Box className="flex flex-row items-center gap-2 rounded-lg bg-yellow-500 px-4 py-3">
          <Icon name="gear-solid" size="md" color="white" />
          <String className="font-semibold text-white">Settings</String>
        </Box>
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-red-100 p-8">
      <DropdownMenuTrigger className="rounded-lg bg-red-500 px-6 py-3 shadow-lg">
        <String className="font-bold text-white">Custom Styled</String>
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-indigo-100 p-8">
      <String className="text-lg font-semibold">Different Sizes</String>

      <Box className="flex flex-row items-center gap-4">
        <DropdownMenuTrigger>
          <Button title="Small" size="sm" />
        </DropdownMenuTrigger>

        <DropdownMenuTrigger>
          <Button title="Medium" size="md" />
        </DropdownMenuTrigger>

        <DropdownMenuTrigger>
          <Button title="Large" size="lg" />
        </DropdownMenuTrigger>
      </Box>
    </Box>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-pink-100 p-8">
      <DropdownMenuTrigger>
        <Box className="relative">
          <Button title="Notifications" />
          <Box className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1">
            <String className="text-xs font-bold text-white">3</String>
          </Box>
        </Box>
      </DropdownMenuTrigger>
    </Box>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenuTrigger>
        <Button title="Disabled Trigger" disabled />
      </DropdownMenuTrigger>
    </Box>
  ),
};
