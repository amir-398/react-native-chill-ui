import type { Meta, StoryObj } from '@storybook/react';

import { Box, String } from '@/components';

import UiPresentation from './storybook';
import { AutocompleteDropdownContext, AutocompleteDropdown } from '../src/components/AutocompleteDropdown';

const meta: Meta<typeof AutocompleteDropdown> = {
  argTypes: {
    // Basic configuration
    dataSet: {
      control: 'object',
      description: 'The data to display in the dropdown list',
    },
    valueField: {
      control: 'text',
      description: 'The field to use as value',
    },

    // Input configuration
    inputProps: {
      control: 'object',
      description: 'Input configuration',
    },

    // Dropdown configuration
    dropdownProps: {
      control: 'object',
      description: 'Dropdown configuration',
    },

    maxHeight: {
      control: 'number',
      description: 'Maximum height of the dropdown',
    },

    minHeight: {
      control: 'number',
      description: 'Minimum height of the dropdown',
    },

    searchField: {
      control: 'text',
      description: 'The field to use for search',
    },

    // Items configuration
    dropdownItemProps: {
      control: 'object',
      description: 'Dropdown items configuration',
    },

    dropdownListProps: {
      control: 'object',
      description: 'Dropdown FlatList configuration',
    },
    offsetX: {
      control: 'number',
      description: 'Offset X of the dropdown',
    },
    offsetY: {
      control: 'number',
      description: 'Offset Y of the dropdown',
    },

    // State and loading
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading indicator',
    },

    // Customization
    customDropdownItem: {
      control: false,
      description: 'Custom component for items',
    },
    dropdownPosition: {
      control: 'select',
      description: 'Position of the dropdown',
      options: ['auto', 'top', 'bottom'],
    },

    // Filtering
    excludeItems: {
      control: 'object',
      description: 'Items to exclude from the list',
    },

    // Behavior
    closeModalWhenSelectedItem: {
      control: 'boolean',
      description: 'Closes the modal when selecting an item',
    },
    confirmSelectItem: {
      control: 'boolean',
      description: 'Activates selection confirmation',
    },
    hasHighlightString: {
      control: 'boolean',
      description: 'Activates highlight string',
    },

    hasPerformSearch: {
      control: 'boolean',
      description: 'Activates automatic search',
    },
    highlightProps: {
      control: 'object',
      description: 'Highlight string configuration',
    },

    // Callbacks
    onBlur: {
      control: false,
      description: 'Callback when input loses focus',
    },
    onConfirmSelectItem: {
      control: false,
      description: 'Callback when confirming selection',
    },
    onFocus: {
      control: false,
      description: 'Callback when input gains focus',
    },
    onSelectItem: {
      control: false,
      description: 'Callback when selecting an item',
    },
    searchQuery: {
      control: false,
      description: 'Custom search function (keyword, labelValue) => boolean',
    },
  },
  component: AutocompleteDropdown,
  decorators: [
    Story => (
      <AutocompleteDropdownContext>
        <UiPresentation className="items-start justify-center px-5">
          <Story />
          <String className="text-secondary">AutocompleteDropdown Examples</String>
        </UiPresentation>
      </AutocompleteDropdownContext>
    ),
  ],
  title: 'Components/Inputs/AutocompleteDropdown',
};

export default meta;
type Story = StoryObj<typeof AutocompleteDropdown>;

const data = [
  { category: 'fruit', label: 'Apple', value: 'apple' },
  { category: 'fruit', label: 'Banana', value: 'banana' },
  { category: 'vegetable', label: 'Carrot', value: 'carrot' },
  { category: 'vegetable', label: 'Tomato', value: 'tomato' },
  { category: 'fruit', label: 'Orange', value: 'orange' },
  { category: 'vegetable', label: 'Lettuce', value: 'lettuce' },
  { category: 'fruit', label: 'Strawberry', value: 'strawberry' },
  { category: 'vegetable', label: 'Broccoli', value: 'broccoli' },
];

const countries = [
  { code: 'FR', continent: 'Europe', name: 'France' },
  { code: 'DE', continent: 'Europe', name: 'Germany' },
  { code: 'US', continent: 'North America', name: 'United States' },
  { code: 'CA', continent: 'North America', name: 'Canada' },
  { code: 'JP', continent: 'Asia', name: 'Japan' },
  { code: 'AU', continent: 'Oceania', name: 'Australia' },
  { code: 'BR', continent: 'South America', name: 'Brazil' },
  { code: 'GB', continent: 'Europe', name: 'United Kingdom' },
];

export const Default: Story = {
  args: {
    closeModalWhenSelectedItem: true,
    confirmSelectItem: false,

    dataSet: data,
    dropdownItemProps: {
      stringItemProps: {},
    },
    dropdownPosition: 'auto',
    dropdownProps: {
      hasAnimation: true,
      hasShadow: true,
    },
    excludeItems: [],
    hasHighlightString: true,
    hasPerformSearch: true,

    inputProps: {
      placeholder: 'Search for an item...',
    },
    isLoading: false,
    maxHeight: 250,
    minHeight: 0,
    onBlur: () => {},
    onFocus: () => {},
    onSelectItem: () => undefined,
    searchField: 'label',
    valueField: 'value',
  },
};

// Variant with custom search
export const CustomSearch: Story = {
  args: {
    ...Default.args,
    dataSet: countries,
    inputProps: {
      placeholder: 'Search for a country (name or code)...',
    },
    searchField: 'name',
    valueField: 'code',
    // Custom search that searches in both name AND code
    searchQuery: (keyword, labelValue) => {
      const country = countries.find(c => c.name === labelValue || c.code === labelValue);
      if (!country) return false;

      const searchTerm = keyword.toLowerCase();
      return country.name.toLowerCase().includes(searchTerm) || country.code.toLowerCase().includes(searchTerm);
    },
  },
};

// Variant with loading
export const WithLoading: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Loading...',
    },
    isLoading: true,
  },
};

// Variant with excluded items
export const WithExcludedItems: Story = {
  args: {
    ...Default.args,
    excludeItems: [
      { category: 'fruit', label: 'Apple', value: 'apple' },
      { category: 'vegetable', label: 'Carrot', value: 'carrot' },
    ],
    inputProps: {
      placeholder: 'Search (Apple and Carrot excluded)...',
    },
  },
};

// Variant with selection confirmation
export const WithConfirmation: Story = {
  args: {
    ...Default.args,
    confirmSelectItem: true,
    inputProps: {
      placeholder: 'Selection with confirmation...',
    },
    onConfirmSelectItem: item => {
      // eslint-disable-next-line no-alert
      alert(`Do you want to select: ${item.label}?`);
    },
  },
};

// Variant without automatic closing
export const StayOpenOnSelect: Story = {
  args: {
    ...Default.args,
    closeModalWhenSelectedItem: false,
    inputProps: {
      placeholder: 'Dropdown stays open...',
    },
  },
};

// Variant with different search field
export const DifferentSearchField: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Search by category...',
    },
    searchField: 'category',
  },
};

// Variant without automatic search
export const NoAutoSearch: Story = {
  args: {
    ...Default.args,
    hasPerformSearch: false,
    inputProps: {
      placeholder: 'No automatic search...',
    },
  },
};

// Variant with custom height
export const CustomHeight: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Custom height...',
    },
    maxHeight: 150,
    minHeight: 100,
  },
};

// Variant with custom dropdown
export const CustomDropdownStyle: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      activeBackgroundColor: '#3B82',
      stringItemProps: {
        color: '#3B82F6',
        size: 'md',
      },
    },

    dropdownProps: {
      className: 'border-2 border-blue-500 rounded-xl',
      hasAnimation: true,
      hasShadow: false,
    },
    inputProps: {
      placeholder: 'Custom styling...',
    },
  },
};

// Complete example with all features
export const Complete: Story = {
  args: {
    ...Default.args,
    dataSet: countries,
    dropdownItemProps: {
      activeBackgroundColor: '#EBF8FF',
      stringItemProps: {
        size: 'sm',
      },
    },
    dropdownProps: {
      emptyText: 'No country found',
      hasAnimation: true,
      hasShadow: true,
    },
    inputProps: {
      hasError: false,
      label: 'Country selection',
      placeholder: 'Search by country, code or continent...',
    },
    maxHeight: 200,
    onSelectItem: item => {
      console.log('Selected country:', item);
    },
    searchField: 'name',
    searchQuery: (keyword, labelValue) => {
      const country = countries.find(c => c.name === labelValue);
      if (!country) return false;

      const searchTerm = keyword.toLowerCase();
      return (
        country.name.toLowerCase().includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm) ||
        country.continent.toLowerCase().includes(searchTerm)
      );
    },
    valueField: 'code',
  },
  render: args => (
    <Box className="gap-4">
      <AutocompleteDropdown {...args} />
    </Box>
  ),
};
