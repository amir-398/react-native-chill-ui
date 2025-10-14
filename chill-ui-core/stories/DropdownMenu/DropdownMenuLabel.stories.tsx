import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../../src/components/icon';
import { Box } from '../../src/components/box';
import { String } from '../../src/components/string';
import { DropdownMenuLabel } from '../../src/components/dropdownMenu';

const meta: Meta<typeof DropdownMenuLabel> = {
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to clone the child element',
    },
    children: {
      control: false,
      description: 'Label content (string or React element)',
    },
    stringProps: {
      control: 'object',
      description: 'Props for String component when children is a string',
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
  component: DropdownMenuLabel,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu/Label',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-8">
      <DropdownMenuLabel>Default Label</DropdownMenuLabel>
    </Box>
  ),
};

export const WithString: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-blue-100 p-8">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
    </Box>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-8">
      <DropdownMenuLabel className="font-semibold text-gray-500">Styled Label</DropdownMenuLabel>
    </Box>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-purple-100 p-8">
      <DropdownMenuLabel asChild>
        <Box className="flex flex-row items-center gap-2">
          <Icon name="user-solid" size="sm" color="blue" />
          <String>Account Settings</String>
        </Box>
      </DropdownMenuLabel>
    </Box>
  ),
};

export const WithMultipleIcons: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-yellow-100 p-8">
      <String className="text-lg font-semibold">Labels with Icons</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2">
            <Icon name="user-solid" size="sm" color="blue" />
            <String>Account</String>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2">
            <Icon name="gear-solid" size="sm" color="gray" />
            <String>Settings</String>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2">
            <Icon name="shield-solid" size="sm" color="green" />
            <String>Security</String>
          </Box>
        </DropdownMenuLabel>
      </Box>
    </Box>
  ),
};

export const WithCustomComponents: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-pink-100 p-8">
      <String className="text-lg font-semibold">Custom Components</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2 rounded bg-blue-50 px-3 py-1">
            <Icon name="star-solid" size="sm" color="yellow" />
            <String className="font-medium text-blue-600">Premium Features</String>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2 rounded bg-green-50 px-3 py-1">
            <Icon name="check-solid" size="sm" color="green" />
            <String className="font-medium text-green-600">Active Features</String>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2 rounded bg-red-50 px-3 py-1">
            <Icon name="exclamation-triangle-solid" size="sm" color="red" />
            <String className="font-medium text-red-600">Warning</String>
          </Box>
        </DropdownMenuLabel>
      </Box>
    </Box>
  ),
};

export const WithStringProps: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-indigo-100 p-8">
      <String className="text-lg font-semibold">String Props</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel stringProps={{ style: { color: 'red', fontWeight: 'bold' } }}>
          Red Bold Label
        </DropdownMenuLabel>

        <DropdownMenuLabel stringProps={{ style: { color: 'blue', fontSize: 16 } }}>Blue Large Label</DropdownMenuLabel>

        <DropdownMenuLabel stringProps={{ style: { color: 'green', fontStyle: 'italic' } }}>
          Green Italic Label
        </DropdownMenuLabel>
      </Box>
    </Box>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-orange-100 p-8">
      <String className="text-lg font-semibold">Different Sizes</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel className="text-sm">Small Label</DropdownMenuLabel>

        <DropdownMenuLabel className="text-base">Medium Label</DropdownMenuLabel>

        <DropdownMenuLabel className="text-lg">Large Label</DropdownMenuLabel>
      </Box>
    </Box>
  ),
};

export const WithColors: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-slate-100 p-8">
      <String className="text-lg font-semibold">Different Colors</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel className="text-gray-500">Gray Label</DropdownMenuLabel>

        <DropdownMenuLabel className="text-blue-600">Blue Label</DropdownMenuLabel>

        <DropdownMenuLabel className="text-green-600">Green Label</DropdownMenuLabel>

        <DropdownMenuLabel className="text-red-600">Red Label</DropdownMenuLabel>

        <DropdownMenuLabel className="text-purple-600">Purple Label</DropdownMenuLabel>
      </Box>
    </Box>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-cyan-100 p-8">
      <String className="text-lg font-semibold">Labels with Badges</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel asChild>
          <Box className="flex w-full flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-2">
              <Icon name="bell-solid" size="sm" color="blue" />
              <String>Notifications</String>
            </Box>
            <Box className="rounded-full bg-red-500 px-2 py-1">
              <String className="text-xs font-bold text-white">3</String>
            </Box>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex w-full flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-2">
              <Icon name="envelope-solid" size="sm" color="green" />
              <String>Messages</String>
            </Box>
            <Box className="rounded-full bg-green-500 px-2 py-1">
              <String className="text-xs font-bold text-white">12</String>
            </Box>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex w-full flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-2">
              <Icon name="star-solid" size="sm" color="yellow" />
              <String>Favorites</String>
            </Box>
            <Box className="rounded-full bg-yellow-500 px-2 py-1">
              <String className="text-xs font-bold text-white">5</String>
            </Box>
          </Box>
        </DropdownMenuLabel>
      </Box>
    </Box>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-teal-100 p-8">
      <String className="text-lg font-semibold">Status Labels</String>

      <Box className="flex flex-col gap-2">
        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2">
            <Box className="h-2 w-2 rounded-full bg-green-500"></Box>
            <String>Online</String>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2">
            <Box className="h-2 w-2 rounded-full bg-yellow-500"></Box>
            <String>Away</String>
          </Box>
        </DropdownMenuLabel>

        <DropdownMenuLabel asChild>
          <Box className="flex flex-row items-center gap-2">
            <Box className="h-2 w-2 rounded-full bg-red-500"></Box>
            <String>Offline</String>
          </Box>
        </DropdownMenuLabel>
      </Box>
    </Box>
  ),
};
