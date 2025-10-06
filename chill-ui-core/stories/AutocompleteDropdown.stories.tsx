import type { Meta, StoryObj } from '@storybook/react';

import { Box, String } from '@/components';

import UiPresentation from './storybook';
import { AutocompleteDropdownContext, AutocompleteDropdown } from '../src/components/AutocompleteDropdown';

const meta: Meta<typeof AutocompleteDropdown> = {
  argTypes: {
    // Required props
    dataSet: {
      control: 'object',
      description: 'Array of data items to display in the dropdown',
      table: {
        type: { summary: 'T[]' },
      },
    },
    valueField: {
      control: 'text',
      description: 'Field to use as the display value and identifier',
      table: {
        type: { summary: 'keyof T' },
      },
    },

    // Positioning and sizing
    offsetX: {
      control: 'number',
      description: 'Horizontal offset for dropdown positioning (default: 0)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset for dropdown positioning (default: 0)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of dropdown (default: 300)',
      table: {
        defaultValue: { summary: '300' },
        type: { summary: 'number' },
      },
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height of dropdown (default: 0)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },

    // Search configuration
    searchField: {
      control: 'text',
      description: 'Field to search in (defaults to valueField)',
      table: {
        type: { summary: 'keyof T' },
      },
    },
    hasPerformSearch: {
      control: 'boolean',
      description: 'Enable search functionality (default: true)',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    searchQuery: {
      control: false,
      description: 'Custom search function for filtering items',
      table: {
        type: { summary: '(keyword: string, labelValue: string) => boolean' },
      },
    },

    // Filtering
    excludeItems: {
      control: 'object',
      description: 'Items to exclude from dropdown',
      table: {
        type: { summary: 'T[]' },
      },
    },

    // Visual configuration
    hasHighlightString: {
      control: 'boolean',
      description: 'Highlight search terms in results (default: true)',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    highlightProps: {
      control: 'object',
      description: 'Props for text highlighting configuration',
      table: {
        type: { summary: 'Partial<Omit<HighlightStringProps, "text">>' },
      },
    },

    // State
    isLoading: {
      control: 'boolean',
      description: 'Show loading indicator',
      table: {
        type: { summary: 'boolean' },
      },
    },

    // Behavior
    closeModalWhenSelectedItem: {
      control: 'boolean',
      description: 'Close dropdown after selection (default: true)',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    confirmSelectItem: {
      control: 'boolean',
      description: 'Require confirmation before selecting',
      table: {
        type: { summary: 'boolean' },
      },
    },
    dropdownPosition: {
      control: 'select',
      description: "Dropdown positioning: 'auto', 'top', or 'bottom'",
      options: ['auto', 'top', 'bottom'],
      table: {
        type: { summary: "'auto' | 'top' | 'bottom'" },
      },
    },

    // Callbacks
    onBlur: {
      control: false,
      description: 'Callback when input loses focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Callback when input gains focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onChangeText: {
      control: false,
      description: 'Callback function when the input text changes',
      table: {
        type: { summary: '(text: string) => void' },
      },
    },
    onSelectItem: {
      control: false,
      description: 'Callback function when an item is selected',
      table: {
        type: { summary: '(item: T) => void' },
      },
    },
    onConfirmSelectItem: {
      control: false,
      description: 'Callback for confirmed selection',
      table: {
        type: { summary: '(item: T) => void' },
      },
    },

    // Customization
    customDropdownItem: {
      control: false,
      description: 'Custom renderer for dropdown items',
      table: {
        type: { summary: '(item: T, selected?: boolean) => React.ReactElement | null' },
      },
    },

    // Props objects
    inputProps: {
      control: 'object',
      description: 'Props to pass to the input component',
      table: {
        type: { summary: 'Omit<InputProps, "onChangeText">' },
      },
    },
    dropdownItemProps: {
      control: 'object',
      description: 'Props for styling dropdown items',
      table: {
        type: { summary: '{ className?: string; activeBackgroundColor?: string; stringItemProps?: StringPropsTw }' },
      },
    },
    dropdownListProps: {
      control: 'object',
      description: 'Props for the dropdown FlatList component',
      table: {
        type: { summary: 'Omit<FlatListProps<any>, "renderItem" | "data">' },
      },
    },
    dropdownProps: {
      control: 'object',
      description: 'Props for the dropdown container',
      table: {
        type: { summary: 'Partial<InputDropdownProps>' },
      },
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
