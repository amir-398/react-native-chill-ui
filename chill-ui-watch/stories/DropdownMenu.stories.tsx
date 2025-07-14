import type { Meta, StoryObj } from '@storybook/react';

import { useRef } from 'react';

import { Box, String } from '@/components';

import Icon from '../src/components/icon';
import DropdownMenu from '../src/components/dropdownMenu';
import { DropdownMenuRef, DropdownMenuItemProps } from '../src/types';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: DropdownMenuItemProps[] = [
  {
    id: '1',
    label: 'Éditer',
    leftIcon: 'pen-to-square-solid',
    onPress: () => console.log('Edit clicked'),
  },
  {
    id: '2',
    label: 'Partager',
    leftIcon: 'share-solid',
    onPress: () => console.log('Share clicked'),
  },
  {
    id: '3',
    label: 'Supprimer',
    leftIcon: 'trash-solid',
    onPress: () => console.log('Delete clicked'),
  },
  {
    id: '4',
    label: 'Archiver',
    leftIcon: 'filter-solid',
    onPress: () => console.log('Archive clicked'),
  },
  {
    id: '7',
    label: 'Archiver',
    leftIcon: 'filter-solid',
    onPress: () => console.log('Archive clicked'),
  },
];

// Créer une liste longue pour tester le scroll
const longListItems: DropdownMenuItemProps[] = Array.from({ length: 15 }, (_, index) => ({
  id: `item-${index + 1}`,
  label: `Option ${index + 1}`,
  leftIcon: index % 2 === 0 ? 'star-solid' : 'heart-solid',
  onPress: () => console.log(`Option ${index + 1} clicked`),
}));

export const Default: Story = {
  render: () => (
    <Box className="flex flex-row justify-end bg-black p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="auto"
        hasScroll={false}
      >
        <Icon name="ellipsis-vertical-solid" size="md" color="white" />
      </DropdownMenu>
    </Box>
  ),
};

export const WithScroll: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-green-100 p-4">
      <DropdownMenu
        items={longListItems}
        hasScroll
        maxHeight={200}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
        dropdownListProps={{
          showsVerticalScrollIndicator: false,
        }}
      >
        <Box className="rounded bg-green-500 p-2">
          <Icon name="angle-down-solid" size="md" />
        </Box>
      </DropdownMenu>
    </Box>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <Box className="flex flex-row justify-start bg-green-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="left"
      >
        <Icon name="ellipsis-vertical-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <Box className="flex flex-row justify-end bg-red-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="right"
      >
        <Icon name="ellipsis-vertical-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const CenterPosition: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-purple-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="user-solid" size="md" color="purple" />
      </DropdownMenu>
    </Box>
  ),
};

export const AutoPosition: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="auto"
      >
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        width={300}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const DoNotCloseOnSelect: Story = {
  render: () => (
    <Box className="flex flex-row justify-center bg-yellow-100 p-4">
      <DropdownMenu
        items={sampleItems}
        closeDropdownWhenSelectedItem={false}
        itemClickableAs="none"
        customItemRender={item => (
          <Box className="rounded bg-yellow-500 p-2">
            <String>{item.label} lol</String>
          </Box>
        )}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Box className="rounded bg-yellow-500 p-2">
          <Icon name="angle-down-solid" size="md" />
        </Box>
      </DropdownMenu>
    </Box>
  ),
};

export const WithRef: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dropdownRef = useRef<DropdownMenuRef>(null);

    return (
      <Box className="flex flex-col items-center gap-4 bg-slate-100 p-4">
        <Box className="flex flex-row gap-2">
          <Box className="rounded bg-blue-500 p-2">
            <Icon name="angle-right-solid" size="sm" onPress={() => dropdownRef.current?.open()} />
          </Box>
          <Box className="rounded bg-red-500 p-2">
            <Icon name="xmark-solid" size="sm" onPress={() => dropdownRef.current?.close()} />
          </Box>
          <Box className="rounded bg-purple-500 p-2">
            <Icon name="circle-notch-solid" size="sm" onPress={() => dropdownRef.current?.toggle()} />
          </Box>
        </Box>

        <DropdownMenu
          ref={dropdownRef}
          items={sampleItems}
          closeDropdownWhenSelectedItem={false}
          onSelectItem={item => console.log('Selected:', item.label)}
          horizontalPosition="center"
        >
          <Box className="rounded bg-gray-500 p-2">
            <Icon name="angle-down-solid" size="md" />
          </Box>
        </DropdownMenu>
      </Box>
    );
  },
};
