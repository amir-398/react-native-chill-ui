import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import Icon from '../src/components/icon';
import { DropdownMenuItemProps } from '../src/types';
import DropdownMenu from '../src/components/dropdownMenu';

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
    <View className="flex flex-row justify-end bg-black p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="auto"
        hasScroll={false}
      >
        <Icon name="ellipsis-vertical-solid" size="md" color="white" />
      </DropdownMenu>
    </View>
  ),
};

export const WithScroll: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-green-100 p-4">
      <DropdownMenu
        items={longListItems}
        hasScroll
        maxHeight={200}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <View className="rounded bg-green-500 p-2">
          <Icon name="angle-down-solid" size="md" color="white" />
        </View>
      </DropdownMenu>
    </View>
  ),
};

export const WithoutScroll: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-red-100 p-4">
      <DropdownMenu
        items={longListItems}
        hasScroll={false}
        maxHeight={200}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <View className="rounded bg-red-500 p-2">
          <Icon name="angle-down-solid" size="md" color="white" />
        </View>
      </DropdownMenu>
    </View>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <View className="flex flex-row justify-start bg-green-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="left"
      >
        <Icon name="home-solid" size="md" color="green" />
      </DropdownMenu>
    </View>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <View className="flex flex-row justify-end bg-red-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="right"
      >
        <Icon name="ellipsis-v-solid" size="md" color="red" />
      </DropdownMenu>
    </View>
  ),
};

export const CenterPosition: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-purple-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="user-solid" size="md" color="purple" />
      </DropdownMenu>
    </View>
  ),
};

export const AutoPosition: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="auto"
      >
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </View>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        width={300}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </View>
  ),
};
