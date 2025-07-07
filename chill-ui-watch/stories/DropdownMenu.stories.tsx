import type { Meta, StoryObj } from '@storybook/react';

import { View, Alert } from 'react-native';

import { DropdownMenuItem } from '../src/types';
import { Box, DropdownMenu, Icon } from '../src/components';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component: 'Le composant DropdownMenu permet de créer un menu déroulant avec un trigger personnalisé.',
      },
    },
  },
  title: 'Components/DropdownMenu',
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: DropdownMenuItem[] = [
  {
    icon: 'home-solid',
    id: '1',
    label: 'Accueil',
    onPress: () => Alert.alert('Action', 'Accueil sélectionné'),
  },
  {
    icon: 'user-solid',
    id: '2',
    label: 'Profil',
    onPress: () => Alert.alert('Action', 'Profil sélectionné'),
  },
  {
    icon: 'home-solid',
    id: '3',
    label: 'Paramètres',
    onPress: () => Alert.alert('Action', 'Paramètres sélectionné'),
  },
];

export const Default: Story = {
  render: () => (
    <View className="flex flex-row justify-end bg-black p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={(item: DropdownMenuItem) => console.log('Item sélectionné:', item)}
        dropdownPosition="bottom"
        horizontalPosition="auto"
        width={180}
      >
        <Box className="bg-primary">
          <Icon name="home-solid" size="md" color="black" />
        </Box>
      </DropdownMenu>
    </View>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <View className="flex flex-row justify-start bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={(item: DropdownMenuItem) => console.log('Item sélectionné:', item)}
        dropdownPosition="bottom"
        horizontalPosition="left"
        width={180}
      >
        <Box className="rounded bg-blue-500 p-2">
          <Icon name="home-solid" size="md" color="white" />
        </Box>
      </DropdownMenu>
    </View>
  ),
};

export const RightAligned: Story = {
  render: () => (
    <View className="flex flex-row justify-end bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={(item: DropdownMenuItem) => console.log('Item sélectionné:', item)}
        dropdownPosition="bottom"
        horizontalPosition="right"
        width={180}
      >
        <Box className="rounded bg-red-500 p-2">
          <Icon name="home-solid" size="md" color="white" />
        </Box>
      </DropdownMenu>
    </View>
  ),
};

export const CenterAligned: Story = {
  render: () => (
    <View className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu
        items={sampleItems}
        onSelectItem={(item: DropdownMenuItem) => console.log('Item sélectionné:', item)}
        dropdownPosition="bottom"
        horizontalPosition="center"
        width={180}
      >
        <Box className="rounded bg-green-500 p-2">
          <Icon name="home-solid" size="md" color="white" />
        </Box>
      </DropdownMenu>
    </View>
  ),
};
