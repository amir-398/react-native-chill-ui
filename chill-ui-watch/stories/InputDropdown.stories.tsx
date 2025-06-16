import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import InputDropdown from '../src/components/select/inputDropdown/InputDropdown';

const meta: Meta<typeof InputDropdown> = {
  argTypes: {
    // Configuration de base
    dataSet: {
      control: 'object',
      description: 'Les données à afficher dans la liste déroulante',
    },
    disable: {
      control: 'boolean',
      description: 'Désactive le composant',
    },
    mode: {
      control: 'select',
      description: "Mode d'affichage du dropdown",
      options: ['default', 'modal', 'auto'],
    },
    valueField: {
      control: 'text',
      description: 'Le champ à utiliser comme valeur',
    },

    // Configuration de l'input
    inputProps: {
      control: 'object',
      description: "Configuration de l'input",
    },

    // Configuration du dropdown
    dropdownProps: {
      control: 'object',
      description: 'Configuration du dropdown',
    },

    // Configuration de la recherche
    hasSearch: {
      control: 'boolean',
      description: 'Active la recherche dans le dropdown',
    },
    searchField: {
      control: 'text',
      description: 'Le champ à utiliser pour la recherche',
    },
    searchInputProps: {
      control: 'object',
      description: 'Configuration du champ de recherche',
    },

    // Configuration du positionnement
    dropdownPosition: {
      control: 'select',
      description: 'Position du dropdown',
      options: ['auto', 'top', 'bottom'],
    },
    keyboardAvoiding: {
      control: 'boolean',
      description: 'Évite le chevauchement avec le clavier',
    },
    maxHeight: {
      control: 'number',
      description: 'Hauteur maximale du dropdown',
    },
    minHeight: {
      control: 'number',
      description: 'Hauteur minimale du dropdown',
    },

    // Configuration des items
    dropdownItemProps: {
      control: 'object',
      description: 'Configuration des items du dropdown',
    },

    // Personnalisation
    customDropdownItem: {
      control: false,
      description: 'Composant personnalisé pour les items',
    },
    customInputSearch: {
      control: false,
      description: 'Composant personnalisé pour la recherche',
    },

    // Filtrage
    excludeItems: {
      control: 'object',
      description: 'Items à exclure de la liste',
    },
    excludeSearchItems: {
      control: 'object',
      description: 'Items à exclure de la recherche',
    },

    // Callbacks
    onBlur: {
      control: false,
      description: 'Callback lors du blur',
    },
    onConfirmSelectItem: {
      control: false,
      description: 'Callback lors de la confirmation de la sélection',
    },
    onFocus: {
      control: false,
      description: 'Callback lors du focus',
    },
    onSelectItem: {
      control: false,
      description: "Callback lors de la sélection d'un item",
    },

    // Autres options
    autoScroll: {
      control: 'boolean',
      description: 'Active le défilement automatique',
    },
    closeModalWhenSelectedItem: {
      control: 'boolean',
      description: "Ferme le modal lors de la sélection d'un item",
    },
    confirmSelectItem: {
      control: 'boolean',
      description: 'Active la confirmation de sélection',
    },
    hasPerformSearch: {
      control: 'boolean',
      description: 'Active la recherche',
    },
    searchQuery: {
      control: false,
      description: 'Fonction de recherche personnalisée',
    },
  },
  component: InputDropdown,
  decorators: [
    Story => (
      <UiPresentation className="items-start justify-center px-5">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/InputDropdown',
};

export default meta;
type Story = StoryObj<typeof InputDropdown>;

const data = [
  { label: 'labelItem 1', value: 'ValueItem 1' },
  { label: 'labelItem 2', value: 'ValueItem 2' },
  { label: 'labelItem 3', value: 'ValueItem 3' },
  { label: 'labelItem 4', value: 'ValueItem 4' },
  { label: 'labelItem 5', value: 'ValueItem 5' },
  { label: 'labelItem 6', value: 'ValueItem 6' },
  { label: 'labelItem 7', value: 'ValueItem 7' },
  { label: 'labelItem 8', value: 'ValueItem 8' },
];

export const Default: Story = {
  args: {
    dataSet: data,
    dropdownPosition: 'auto',
    dropdownProps: {
      className: 'rounded-lg mt-1',
      emptyText: 'Aucun résultat',
      hasBackdrop: true,
      hasShadow: true,
    },

    hasSearch: true,
    inputProps: {
      placeholder: 'Sélectionnez une options',
    },
    valueField: 'label',
  },
};
