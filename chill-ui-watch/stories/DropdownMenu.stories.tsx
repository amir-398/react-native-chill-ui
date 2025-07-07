import type { Meta, StoryObj } from '@storybook/react';

import { View, Alert } from 'react-native';

import { DropdownMenuItem } from '../src/types';
import { DropdownMenu, Icon } from '../src/components';

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
    <View className="flex-1 p-4">
      {/* <String className="mb-4 text-lg font-semibold">Cliquez sur l&apos;icône pour ouvrir le menu</String> */}
      <DropdownMenu
        items={sampleItems}
        onSelectItem={(item: DropdownMenuItem) => console.log('Item sélectionné:', item)}
        dropdownPosition="bottom"
      >
        <Icon name="home-solid" size="md" color="black" />
      </DropdownMenu>
    </View>
  ),
};
