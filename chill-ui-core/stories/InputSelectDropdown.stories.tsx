import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Text } from 'react-native';

import UiPresentation from './storybook';
import { Box, cn } from '../src/components';
import InputSelectDropdown from '../src/components/inputSelectDropdown/InputSelectDropdown';

const meta: Meta<typeof InputSelectDropdown> = {
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

    // Search configuration
    hasSearch: {
      control: 'boolean',
      description: 'Enable search in the dropdown',
    },
    searchField: {
      control: 'text',
      description: 'The field to use for searching',
    },
    searchInputProps: {
      control: 'object',
      description: 'Search input configuration',
    },

    // Positioning configuration
    dropdownPosition: {
      control: 'select',
      description: 'Dropdown position',
      options: ['auto', 'top', 'bottom'],
    },

    maxHeight: {
      control: 'number',
      description: 'Maximum height of the dropdown',
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height of the dropdown',
    },

    // Items configuration
    dropdownItemProps: {
      control: 'object',
      description: 'Dropdown items configuration',
    },
    itemClickableAs: {
      control: 'select',
      description: 'Type of touchable component for items',
      options: ['touchable-opacity', 'pressable', 'touchable-highlight'],
    },

    // Customization
    customDropdownItem: {
      control: false,
      description: 'Custom component for items',
    },
    customSearchInput: {
      control: false,
      description: 'Custom component for search input',
    },

    // Filtering
    excludeItems: {
      control: 'object',
      description: 'Items to exclude from the list',
    },
    excludeSearchItems: {
      control: 'object',
      description: 'Items to exclude from search',
    },

    // Callbacks
    onBlur: {
      control: false,
      description: 'Callback on blur',
    },
    onFocus: {
      control: false,
      description: 'Callback on focus',
    },
    onSelectItem: {
      control: false,
      description: 'Callback when selecting an item',
    },

    // State management
    open: {
      control: 'boolean',
      description: 'Whether the dropdown is open (controlled mode)',
    },
    onOpenChange: {
      control: false,
      description: 'Callback when dropdown open state changes',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled mode)',
    },

    // Other options
    closeModalWhenSelectedItem: {
      control: 'boolean',
      description: 'Close modal when selecting an item',
    },

    searchQuery: {
      control: false,
      description: 'Custom search function',
    },
  },
  component: InputSelectDropdown,
  decorators: [
    (Story: any) => (
      <UiPresentation className="flex-1 items-start justify-center px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/InputSelectDropdown',
};

export default meta;
type Story = StoryObj<typeof InputSelectDropdown>;

// Various datasets
const basicData = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
  { label: 'Option 8', value: 'option8' },
  { label: 'Option 9', value: 'option9' },
  { label: 'Option 10', value: 'option10' },
];

const countriesData = [
  { code: 'FR', name: 'France', population: 67000000 },
  { code: 'DE', name: 'Germany', population: 83000000 },
  { code: 'IT', name: 'Italy', population: 60000000 },
  { code: 'ES', name: 'Spain', population: 47000000 },
  { code: 'UK', name: 'United Kingdom', population: 67000000 },
  { code: 'PL', name: 'Poland', population: 38000000 },
  { code: 'NL', name: 'Netherlands', population: 17000000 },
  { code: 'BE', name: 'Belgium', population: 11000000 },
];

const largeDataSet = Array.from({ length: 50 }, (_, i) => {
  let category = 'C';
  if (i % 3 === 0) category = 'A';
  else if (i % 3 === 1) category = 'B';

  return {
    category,
    id: i + 1,
    label: `Item ${i + 1}`,
    value: `item${i + 1}`,
  };
});

// Custom component for items
function CustomDropdownItem(item: any, selected?: boolean) {
  const { code, name, population } = item;
  return (
    <Box style={{ backgroundColor: selected ? '#e3f2fd' : 'white', padding: 12 }}>
      <Box className={cn('text-base', selected && 'font-bold')}>
        {name} ({code})
      </Box>
      <Text style={{ color: '#666', fontSize: 12 }}>Population: {population.toLocaleString()}</Text>
    </Box>
  );
}

// Custom search function
const customSearchQuery = (keyword: string, labelValue: string) =>
  labelValue.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(labelValue.toLowerCase());

export const Default: Story = {
  args: {
    dataSet: basicData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Select an option',
    },
    itemClickableAs: 'touchable-opacity',
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithSearch: Story = {
  args: {
    dataSet: countriesData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Search for a country...',
    },
    onSelectItem: (item: any) => console.log('Selected country:', item),
    searchField: 'name',
    searchInputProps: {
      placeholder: 'Type to search...',
    },
    valueField: 'name',
  },
};

export const WithCustomHeight: Story = {
  args: {
    dataSet: largeDataSet,
    hasSearch: true,
    inputProps: {
      placeholder: 'Select from a long list',
    },
    maxHeight: 200,
    minHeight: 100,
    onSelectItem: (item: any) => console.log('Selected item:', item),
    searchField: 'label',
    valueField: 'label',
  },
};

export const WithExcludedItems: Story = {
  args: {
    dataSet: basicData,
    excludeItems: [basicData[1], basicData[3]], // Excludes Option 2 and Option 4
    inputProps: {
      placeholder: 'Options 2 and 4 are excluded',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithCustomDropdownItem: Story = {
  args: {
    customDropdownItem: CustomDropdownItem,
    dataSet: countriesData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Select a country (custom design)',
    },
    maxHeight: 300,
    onSelectItem: (item: any) => console.log('Selected country:', item),
    searchField: 'name',
    valueField: 'name',
  },
};

export const PositionTop: Story = {
  args: {
    dataSet: basicData,
    dropdownPosition: 'top',
    inputProps: {
      placeholder: 'Dropdown opens upward',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const PositionBottom: Story = {
  args: {
    dataSet: basicData,
    dropdownPosition: 'bottom',
    inputProps: {
      placeholder: 'Dropdown opens downward',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithoutAutoClose: Story = {
  args: {
    closeModalWhenSelectedItem: false,
    dataSet: basicData,
    inputProps: {
      placeholder: 'Does not close automatically',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithCustomSearchQuery: Story = {
  args: {
    dataSet: countriesData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Custom search (bidirectional)',
    },
    onSelectItem: (item: any) => console.log('Selected country:', item),
    searchField: 'name',
    searchInputProps: {
      placeholder: 'Advanced search...',
    },
    searchQuery: customSearchQuery,
    valueField: 'name',
  },
};

export const WithExcludedSearchItems: Story = {
  args: {
    dataSet: countriesData,
    excludeSearchItems: [countriesData[0], countriesData[2]], // Excludes France and Italy from search
    hasSearch: true,
    inputProps: {
      placeholder: 'France and Italy excluded from search',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    searchField: 'name',
    valueField: 'name',
  },
};

export const WithDropdownProps: Story = {
  args: {
    dataSet: basicData,
    dropdownProps: {
      className: 'border-2 border-blue-500',
      hasAnimation: true,
      hasShadow: true,
    },
    inputProps: {
      placeholder: 'Dropdown with custom style',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithDropdownItemProps: Story = {
  args: {
    dataSet: basicData,
    dropdownItemProps: {
      className: 'py-4 px-6',
    },
    inputProps: {
      placeholder: 'Items with custom style',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const ComplexExample: Story = {
  args: {
    closeModalWhenSelectedItem: true,
    customDropdownItem: CustomDropdownItem,
    dataSet: countriesData,
    dropdownPosition: 'auto',
    dropdownProps: {
      hasAnimation: true,
      hasShadow: true,
    },
    excludeItems: [countriesData[countriesData.length - 1]], // Excludes the last country
    hasSearch: true,
    inputProps: {
      placeholder: 'Complex example with all features',
    },
    maxHeight: 250,
    minHeight: 150,
    onBlur: () => console.log('Focus lost'),
    onFocus: () => console.log('Focus gained'),
    onSelectItem: (item: any) => console.log('Selected in complex example:', item),
    searchField: 'name',
    searchInputProps: {
      placeholder: 'Search for a country...',
    },
    valueField: 'name',
  },
};

// New stories for controlled/uncontrolled modes
export const UncontrolledWithDefaultOpen: Story = {
  args: {
    dataSet: basicData,
    defaultOpen: true,
    hasSearch: true,
    inputProps: {
      placeholder: 'Opens by default (uncontrolled)',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const UncontrolledWithDefaultClosed: Story = {
  args: {
    dataSet: basicData,
    defaultOpen: false,
    hasSearch: true,
    inputProps: {
      placeholder: 'Closed by default (uncontrolled)',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const ControlledMode: Story = {
  args: {
    dataSet: basicData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Controlled mode - use controls to toggle',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
    // Note: open and onOpenChange are controlled by Storybook controls
  },
  render: args => {
    const [isOpen, setIsOpen] = React.useState(false);

    return <InputSelectDropdown {...args} open={isOpen} onOpenChange={setIsOpen} />;
  },
};

export const AlwaysOpenControlled: Story = {
  args: {
    dataSet: basicData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Always open (controlled)',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
    open: true,
    onOpenChange: () => {}, // Prevent closing
  },
};

export const ConditionalOpen: Story = {
  args: {
    dataSet: countriesData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Conditional opening',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    searchField: 'name',
    valueField: 'name',
  },
  render: args => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState(null);

    return (
      <Box>
        <Box style={{ marginBottom: 10 }}>
          <Text>Selected: {selectedCountry?.name || 'None'}</Text>
        </Box>
        <InputSelectDropdown
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          onSelectItem={item => {
            setSelectedCountry(item);
            setIsOpen(false); // Close after selection
          }}
        />
      </Box>
    );
  },
};

// Touch component type examples
export const TouchableOpacity: Story = {
  args: {
    dataSet: basicData,
    hasSearch: true,
    inputProps: {
      placeholder: 'TouchableOpacity (default)',
    },
    itemClickableAs: 'touchable-opacity',
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const Pressable: Story = {
  args: {
    dataSet: basicData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Pressable touch feedback',
    },
    itemClickableAs: 'pressable',
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const TouchableHighlight: Story = {
  args: {
    dataSet: basicData,
    hasSearch: true,
    inputProps: {
      placeholder: 'TouchableHighlight feedback',
    },
    itemClickableAs: 'touchable-highlight',
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};
