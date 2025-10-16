import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import UiPresentation from './storybook';
import { String, PlacesInput } from '../src/components';
import { AutocompleteDropdownContext } from '../src/components/AutocompleteDropdown';

const meta: Meta<typeof PlacesInput> = {
  argTypes: {
    clearQueryOnSelect: {
      control: 'boolean',
      description: 'Whether to clear the input after selecting a place',
    },
    customDropdownItem: {
      control: 'object',
      description: 'Custom render function for dropdown items',
    },
    dropdownItemProps: {
      control: 'object',
      description: 'Props for styling dropdown items',
    },
    dropdownListProps: {
      control: 'object',
      description: 'Additional props for the FlatList component',
    },
    dropdownProps: {
      control: 'object',
      description: 'Props for the dropdown container',
    },
    googleApiKey: {
      control: 'text',
      description: 'Google Places API key (required)',
    },
    inputProps: {
      control: 'object',
      description: 'Props for the input component',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading indicator',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the results list',
    },
    onChangeText: {
      action: 'changed',
      description: 'Callback when input text changes',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when a place is selected (with error handling)',
    },
    query: {
      control: 'text',
      description: 'External query value to control the input',
    },
    queryCountries: {
      control: 'object',
      description: 'List of country codes to restrict the search to',
    },
    requiredCharactersBeforeSearch: {
      control: 'number',
      description: 'Minimum number of characters before triggering a search',
    },
    requiredTimeBeforeSearch: {
      control: 'number',
      description: 'Delay in milliseconds before triggering a search (debounce)',
    },
    selectedValue: {
      control: 'select',
      description: 'Type of address component to display after selection',
      options: ['longAddress', 'shortAddress', 'postal_code', 'locality', 'country', 'street_number', 'route'],
    },
  },
  component: PlacesInput,
  decorators: [
    (Story: any) => (
      <AutocompleteDropdownContext>
        <UiPresentation className="items-start justify-center px-5">
          <Story />
        </UiPresentation>
      </AutocompleteDropdownContext>
    ),
  ],
  title: 'components/Inputs/PlacesInput',
};

export default meta;
type Story = StoryObj<typeof PlacesInput>;

export const Default: Story = {
  args: {
    clearQueryOnSelect: false,
    dropdownProps: {
      className: 'bg-white',
    },
    googleApiKey: 'AIzaSyCvc5-EgIoFWRGmuqrnayi8RObdJsaYJSY',
    inputProps: {
      placeholder: 'Search a place...',
    },
    maxHeight: 300,
    onChangeText: action('onChangeText'),
    onSelect: action('onSelect'),
    query: '',
    queryCountries: ['FR'],
    requiredCharactersBeforeSearch: 2,
    requiredTimeBeforeSearch: 500,
    selectedValue: 'longAddress',
  },
};

export const WithInitialQuery: Story = {
  args: {
    ...Default.args,
    query: 'Paris',
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'border-gray-700 hover:bg-gray-700',
      stringItemProps: {
        className: 'text-white',
      },
    },
    dropdownProps: {
      className: 'bg-gray-800 border-gray-600',
    },
    inputProps: {
      className: 'bg-gray-800 text-white border-gray-600',
    },
  },
};

export const RoundedStyle: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'px-6 hover:bg-blue-50',
    },
    dropdownProps: {
      className: 'rounded-2xl mt-2 border-2 border-blue-500',
    },
    inputProps: {
      className: 'rounded-full px-6 border-2 border-blue-500 focus:border-blue-600',
    },
  },
};

export const ModernMinimal: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'hover:bg-purple-50',
    },
    dropdownProps: {
      className: 'shadow-xl border-0 rounded-lg mt-2',
    },
    inputProps: {
      className: 'border-0 border-b-2 border-gray-200 rounded-none focus:border-purple-500 transition-colors',
    },
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'border-orange-100 hover:bg-orange-100',
    },
    dropdownProps: {
      className: 'bg-orange-50 border-orange-200',
    },
    inputProps: {
      className: 'bg-orange-50 border-orange-300 text-orange-800',
    },
  },
};

export const ClearOnSelect: Story = {
  args: {
    ...Default.args,
    clearQueryOnSelect: true,
  },
};

export const CountryRestricted: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Search in North America...',
    },
    queryCountries: ['US', 'CA'],
  },
};

export const CustomRenderItem: Story = {
  args: {
    ...Default.args,
    customDropdownItem: (item: any) => (
      <div className="border-b border-gray-200 p-4">
        <String className="text-lg font-bold text-blue-600">{item.placePrediction.text.text}</String>
        <String className="mt-1 text-xs text-green-500">✓ Tap to select</String>
      </div>
    ),
  },
};

export const AddressComponentExtraction: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Search for a city...',
    },
    selectedValue: 'locality',
  },
};

export const PostalCodeExtraction: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Search for postal code...',
    },
    selectedValue: 'postal_code',
  },
};

export const StreetAddressExtraction: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Search for street address...',
    },
    selectedValue: 'street_number',
  },
};

export const FastSearch: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Fast search (1 char, 200ms delay)...',
    },
    requiredCharactersBeforeSearch: 1,
    requiredTimeBeforeSearch: 200,
  },
};

export const SlowSearch: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Slow search (4 chars, 2s delay)...',
    },
    requiredCharactersBeforeSearch: 4,
    requiredTimeBeforeSearch: 2000,
  },
};

export const CustomHeight: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Limited height dropdown...',
    },
    maxHeight: 150,
  },
};

export const ErrorHandlingDemo: Story = {
  args: {
    ...Default.args,
    googleApiKey: 'invalid-key-for-demo',
    inputProps: {
      placeholder: 'Demo with error handling...',
    },
    onSelect: (place: any) => {
      action('onSelect')(place);
      console.log('Selected place (may be fallback data):', place);
    },
  },
};
