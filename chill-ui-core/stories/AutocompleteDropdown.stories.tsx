import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { AutocompleteDropdownContext, AutocompleteDropdown, Box } from '../src/components';

const meta: Meta<typeof AutocompleteDropdown> = {
  args: {
    closeDropdownWhenSelectedItem: true,
    hasHighlightString: true,
    hasPerformSearch: true,
    maxHeight: 300,
    minHeight: 0,
    offsetX: 0,
    offsetY: 0,
  },
  argTypes: {
    closeDropdownWhenSelectedItem: {
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    hasHighlightString: {
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    hasPerformSearch: {
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    maxHeight: {
      table: {
        defaultValue: { summary: '300' },
      },
    },
    minHeight: {
      table: {
        defaultValue: { summary: '0' },
      },
    },
    offsetX: {
      table: {
        defaultValue: { summary: '0' },
      },
    },
    offsetY: {
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
  component: AutocompleteDropdown,
  decorators: [
    Story => (
      <AutocompleteDropdownContext>
        <Box>
          <Story />
        </Box>
      </AutocompleteDropdownContext>
    ),
  ],
  title: 'FORMS/AutocompleteDropdown',
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
    dataSet: data,
    dropdownPosition: 'bottom',
    inputProps: {
      placeholder: 'Search for an item...',
    },
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
    searchQuery: (keyword: string, labelValue: string) => {
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
