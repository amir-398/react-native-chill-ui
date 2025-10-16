import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, String, DropdownMenuSeparator } from '../../src/components';

const meta: Meta<typeof DropdownMenuSeparator> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
    style: {
      control: 'object',
      description: 'Custom style (StyleSheet only)',
    },
  },
  component: DropdownMenuSeparator,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu/Separator',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-gray-100 p-8">
      <String className="text-lg font-semibold">Default Separator</String>
      <Box className="w-64 rounded-lg bg-white p-4">
        <String>Item 1</String>
        <DropdownMenuSeparator />
        <String>Item 2</String>
      </Box>
    </Box>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-blue-100 p-8">
      <String className="text-lg font-semibold">Custom Styled Separator</String>
      <Box className="w-64 rounded-lg bg-white p-4">
        <String>Item 1</String>
        <DropdownMenuSeparator className="my-4 h-0.5 bg-blue-200" />
        <String>Item 2</String>
      </Box>
    </Box>
  ),
};

export const WithDifferentColors: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-green-100 p-8">
      <String className="text-lg font-semibold">Different Colors</String>

      <Box className="flex flex-col gap-4">
        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-2 h-0.5 bg-gray-200" />
          <String>Gray Separator</String>
        </Box>

        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-2 h-0.5 bg-blue-200" />
          <String>Blue Separator</String>
        </Box>

        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-2 h-0.5 bg-red-200" />
          <String>Red Separator</String>
        </Box>
      </Box>
    </Box>
  ),
};

export const WithDifferentHeights: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-purple-100 p-8">
      <String className="text-lg font-semibold">Different Heights</String>

      <Box className="flex flex-col gap-4">
        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-2 h-0.5 bg-gray-300" />
          <String>Thin Separator</String>
        </Box>

        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-2 h-1 bg-gray-300" />
          <String>Medium Separator</String>
        </Box>

        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-2 h-2 bg-gray-300" />
          <String>Thick Separator</String>
        </Box>
      </Box>
    </Box>
  ),
};

export const WithDifferentSpacing: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-yellow-100 p-8">
      <String className="text-lg font-semibold">Different Spacing</String>

      <Box className="flex flex-col gap-4">
        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-1 h-0.5 bg-gray-300" />
          <String>Small Spacing</String>
        </Box>

        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-4 h-0.5 bg-gray-300" />
          <String>Medium Spacing</String>
        </Box>

        <Box className="w-64 rounded-lg bg-white p-4">
          <String>Item 1</String>
          <DropdownMenuSeparator className="my-8 h-0.5 bg-gray-300" />
          <String>Large Spacing</String>
        </Box>
      </Box>
    </Box>
  ),
};

export const InMenuContext: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-pink-100 p-8">
      <String className="text-lg font-semibold">In Menu Context</String>

      <Box className="w-64 rounded-lg bg-white shadow-lg">
        <Box className="p-4">
          <String className="text-sm font-medium text-gray-500">Account</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Profile</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Settings</String>
        </Box>
        <DropdownMenuSeparator className="mx-4 my-2 h-0.5 bg-gray-200" />
        <Box className="p-4">
          <String className="text-sm font-medium text-gray-500">Actions</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Share</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Export</String>
        </Box>
        <DropdownMenuSeparator className="mx-4 my-2 h-0.5 bg-gray-200" />
        <Box className="px-4 pb-4">
          <String className="text-red-600">Delete</String>
        </Box>
      </Box>
    </Box>
  ),
};

export const WithDashedStyle: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-indigo-100 p-8">
      <String className="text-lg font-semibold">Dashed Style</String>

      <Box className="w-64 rounded-lg bg-white p-4">
        <String>Item 1</String>
        <Box className="my-2 h-0.5 bg-gray-300" style={{ borderTop: '1px dashed #9CA3AF' }} />
        <String>Dashed Separator</String>
      </Box>
    </Box>
  ),
};

export const WithDottedStyle: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-orange-100 p-8">
      <String className="text-lg font-semibold">Dotted Style</String>

      <Box className="w-64 rounded-lg bg-white p-4">
        <String>Item 1</String>
        <Box className="my-2 h-0.5 bg-gray-300" style={{ borderTop: '1px dotted #9CA3AF' }} />
        <String>Dotted Separator</String>
      </Box>
    </Box>
  ),
};

export const WithGradient: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-slate-100 p-8">
      <String className="text-lg font-semibold">Gradient Separator</String>

      <Box className="w-64 rounded-lg bg-white p-4">
        <String>Item 1</String>
        <Box
          className="my-2 h-0.5"
          style={{
            background: 'linear-gradient(to right, transparent, #9CA3AF, transparent)',
            height: '1px',
          }}
        />
        <String>Gradient Separator</String>
      </Box>
    </Box>
  ),
};

export const MultipleSeparators: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-cyan-100 p-8">
      <String className="text-lg font-semibold">Multiple Separators</String>

      <Box className="w-64 rounded-lg bg-white shadow-lg">
        <Box className="p-4">
          <String className="text-sm font-medium text-gray-500">Section 1</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Item 1.1</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Item 1.2</String>
        </Box>

        <DropdownMenuSeparator className="mx-4 my-2 h-0.5 bg-gray-200" />

        <Box className="p-4">
          <String className="text-sm font-medium text-gray-500">Section 2</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Item 2.1</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Item 2.2</String>
        </Box>

        <DropdownMenuSeparator className="mx-4 my-2 h-0.5 bg-gray-200" />

        <Box className="p-4">
          <String className="text-sm font-medium text-gray-500">Section 3</String>
        </Box>
        <Box className="px-4 pb-2">
          <String>Item 3.1</String>
        </Box>
        <Box className="px-4 pb-4">
          <String>Item 3.2</String>
        </Box>
      </Box>
    </Box>
  ),
};

export const WithCustomStyle: Story = {
  render: () => (
    <Box className="flex flex-col items-center gap-4 bg-rose-100 p-8">
      <String className="text-lg font-semibold">Custom Style</String>

      <Box className="w-64 rounded-lg bg-white p-4">
        <String>Item 1</String>
        <DropdownMenuSeparator
          style={{
            backgroundColor: '#3B82F6',
            borderRadius: 1,
            height: 2,
            marginVertical: 8,
          }}
        />
        <String>Custom Styled Separator</String>
      </Box>
    </Box>
  ),
};
