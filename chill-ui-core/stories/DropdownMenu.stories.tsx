import type { Meta, StoryObj } from '@storybook/react';

import { useRef } from 'react';

import { Box } from '../src/components';
import Icon from '../src/components/icon';
import DropdownMenu from '../src/components/dropdownMenu';
import { DropdownMenuRef, DropdownMenuItemProps } from '../src/types/dropdownMenu.types';

const meta: Meta<typeof DropdownMenu> = {
  argTypes: {
    // Basic configuration
    children: {
      control: false,
      description: "Le contenu qui déclenchera l'ouverture du menu (ex: icon, bouton)",
    },
    dataSet: {
      control: 'object',
      description: 'Les éléments du menu',
    },

    // Styling
    className: {
      control: 'text',
      description: 'Classe CSS du dropdown',
    },
    triggerClassName: {
      control: 'text',
      description: 'Classe CSS du trigger',
    },
    triggerStyle: {
      control: 'object',
      description: 'Style du container trigger',
    },

    // Position configuration
    dropdownPosition: {
      control: 'select',
      description: 'Position du dropdown par rapport au trigger',
      options: ['top', 'bottom', 'auto'],
    },
    horizontalPosition: {
      control: 'select',
      description: 'Position horizontale du dropdown par rapport au trigger',
      options: ['left', 'right', 'center', 'auto'],
    },

    // Offset and dimensions
    maxHeight: {
      control: 'number',
      description: 'Hauteur maximale du dropdown',
    },
    minHeight: {
      control: 'number',
      description: 'Hauteur minimale du dropdown',
    },
    offsetX: {
      control: 'number',
      description: 'Décalage horizontal',
    },
    offsetY: {
      control: 'number',
      description: 'Décalage vertical',
    },
    width: {
      control: 'number',
      description: 'Largeur du dropdown',
    },

    // Selection and behavior
    closeDropdownWhenSelectedItem: {
      control: 'boolean',
      description: 'Fermer le modal quand un élément est sélectionné',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver le dropdown',
    },
    hasAnimation: {
      control: 'boolean',
      description: "Afficher l'animation du dropdown",
    },
    hasScroll: {
      control: 'boolean',
      description: 'Activer/désactiver le scroll dans la liste',
    },
    selectedItem: {
      control: 'object',
      description: "Élément actuellement sélectionné (pour l'auto-scroll)",
    },

    // Component types
    itemClickableAs: {
      control: 'select',
      description: 'Type de composant cliquable à utiliser pour les éléments du menu',
      options: ['TouchableOpacity', 'TouchableHighlight', 'Pressable', 'RipplePressable', 'none'],
    },
    triggerAs: {
      control: 'select',
      description: 'Type de composant à utiliser pour le trigger du menu',
      options: ['TouchableOpacity', 'TouchableHighlight', 'Pressable', 'RipplePressable', 'none'],
    },

    // Props objects
    dropdownItemProps: {
      control: 'object',
      description: 'Props pour le dropdown item (className, stringItemProps, activeBackgroundColor)',
    },
    dropdownListProps: {
      control: 'object',
      description: 'Props pour la liste du dropdown',
    },
    modalProps: {
      control: 'object',
      description: 'Props pour le modal',
    },

    // Custom renders
    customItemRender: {
      control: false,
      description: 'Personnaliser le rendu des éléments',
    },

    // Callbacks
    onClose: {
      action: 'onClose',
      description: 'Callback appelé quand le menu se ferme',
    },
    onOpen: {
      action: 'onOpen',
      description: "Callback appelé quand le menu s'ouvre",
    },
    onSelectItem: {
      action: 'onSelectItem',
      description: 'Callback appelé quand un élément est sélectionné',
    },
  },
  component: DropdownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/DropdownMenu',
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: DropdownMenuItemProps[] = [
  {
    id: '1',
    label: 'Edit',
    leftIcon: 'pen-to-square-solid',
    onPress: () => console.log('Edit clicked'),
  },
  {
    id: '2',
    label: 'Share',
    leftIcon: 'share-solid',
    onPress: () => console.log('Share clicked'),
  },
  {
    id: '3',
    label: 'Delete',
    leftIcon: 'trash-solid',
    onPress: () => console.log('Delete clicked'),
  },
  {
    id: '4',
    label: 'Archive',
    leftIcon: 'filter-solid',
    onPress: () => console.log('Archive clicked'),
  },
];

const longListItems: DropdownMenuItemProps[] = Array.from({ length: 15 }, (_, index) => ({
  id: `item-${index + 1}`,
  label: `Option ${index + 1}`,
  leftIcon: index % 2 === 0 ? 'star-solid' : 'heart-solid',
  onPress: () => console.log(`Option ${index + 1} clicked`),
}));

export const Default: Story = {
  args: {
    dataSet: sampleItems,
    hasScroll: false,
    horizontalPosition: 'auto',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-end bg-black p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Icon name="ellipsis-vertical-solid" size="md" color="white" />
      </DropdownMenu>
    </Box>
  ),
};

export const WithScroll: Story = {
  args: {
    dataSet: longListItems,
    dropdownListProps: {
      showsVerticalScrollIndicator: false,
    },
    hasScroll: true,
    horizontalPosition: 'center',
    maxHeight: 200,
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-center bg-green-100 p-4">
      <DropdownMenu dataSet={longListItems} {...args}>
        <Box className="rounded bg-green-500 p-2">
          <Icon name="angle-down-solid" size="md" />
        </Box>
      </DropdownMenu>
    </Box>
  ),
};

export const LeftPosition: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'left',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-start bg-green-100 p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Icon name="ellipsis-vertical-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const RightPosition: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'right',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-end bg-red-100 p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Icon name="ellipsis-vertical-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const CenterPosition: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'center',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-center bg-purple-100 p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Icon name="user-solid" size="md" color="purple" />
      </DropdownMenu>
    </Box>
  ),
};

export const AutoPosition: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'auto',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const CustomWidth: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'center',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
    width: 300,
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-center bg-gray-100 p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Icon name="angle-down-solid" size="md" color="black" />
      </DropdownMenu>
    </Box>
  ),
};

export const DoNotCloseOnSelect: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'center',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => (
    <Box className="flex flex-row justify-center bg-yellow-100 p-4">
      <DropdownMenu dataSet={sampleItems} {...args}>
        <Box className="rounded bg-yellow-500 p-2">
          <Icon name="angle-down-solid" size="md" />
        </Box>
      </DropdownMenu>
    </Box>
  ),
};

export const WithRef: Story = {
  args: {
    dataSet: sampleItems,
    horizontalPosition: 'center',
    onSelectItem: (item: DropdownMenuItemProps) => console.log('Selected:', item.label),
  },
  render: (args: any) => {
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

        <DropdownMenu dataSet={sampleItems} ref={dropdownRef} {...args} closeDropdownWhenSelectedItem={false}>
          <Box className="rounded bg-gray-500 p-2">
            <Icon name="angle-down-solid" size="md" />
          </Box>
        </DropdownMenu>
      </Box>
    );
  },
};
