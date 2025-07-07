import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import Icon from '../src/components/icon';
import { DropdownMenuItem } from '../src/types';
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

const sampleItems: DropdownMenuItem[] = [
  {
    icon: 'pen-to-square-solid',
    id: '1',
    label: 'Éditer',
    onPress: () => console.log('Edit clicked'),
  },
  {
    icon: 'share-solid',
    id: '2',
    label: 'Partager',
    onPress: () => console.log('Share clicked'),
  },
  {
    icon: 'trash-solid',
    id: '3',
    label: 'Supprimer',
    onPress: () => console.log('Delete clicked'),
  },
  {
    icon: 'filter-solid',
    id: '4',
    label: 'Archiver',
    onPress: () => console.log('Archive clicked'),
  },
  {
    icon: 'filter-solid',
    id: '5',
    label: 'Archiver',
    onPress: () => console.log('Archive clicked'),
  },
  {
    icon: 'filter-solid',
    id: '6',
    label: 'Archiver',
    onPress: () => console.log('Archive clicked'),
  },
  {
    icon: 'filter-solid',
    id: '7',
    label: 'Archiver',
    onPress: () => console.log('Archive clicked'),
  },
];

const longListItems: DropdownMenuItem[] = Array.from({ length: 15 }, (_, index) => ({
  icon: index % 2 === 0 ? 'star-solid' : 'heart-solid',
  id: (index + 1).toString(),
  label: `Option ${index + 1}`,
  onPress: () => console.log(`Option ${index + 1} clicked`),
}));

export const Default: Story = {
  render: () => (
    <View className="flex flex-row justify-end bg-black p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="auto"
      >
        <Icon name="ellipsis-vertical-solid" size="md" color="white" />
      </DropdownMenu>
    </View>
  ),
};

export const WithAutoScroll: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={longListItems}
        selectedItem={longListItems[10]} // Sélectionner l'option 11
        hasAutoScroll
        maxHeight={200}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </View>
  ),
};

export const WithScrollDisabled: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={longListItems}
        hasScroll={false}
        maxHeight={200}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </View>
  ),
};

export const AutoScrollWithCenter: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-blue-100 p-4">
      <DropdownMenu
        items={longListItems}
        selectedItem={longListItems[7]} // Sélectionner l'option 8
        hasAutoScroll
        hasScroll
        maxHeight={180}
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="settings-solid" size="md" color="blue" />
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
        <Icon name="menu-solid" size="md" color="green" />
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
        <Icon name="plus-solid" size="md" color="purple" />
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

export const Disabled: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        disabled
        onSelectItem={item => console.log('Selected:', item.label)}
        horizontalPosition="center"
      >
        <Icon name="angle-down-solid" size="md" color="gray" />
      </DropdownMenu>
    </View>
  ),
};
