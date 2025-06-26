import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, String } from '../src/components';
import PlacesInput from '../src/components/places-input/PlacesInput';

const meta: Meta<typeof PlacesInput> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes for the input',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button when there is text',
    },
    clearQueryOnSelect: {
      control: 'boolean',
      description: 'Whether to clear the input after selecting a place',
    },
    containerClassName: {
      control: 'text',
      description: 'CSS classes for the container',
    },
    emptyListText: {
      control: 'text',
      description: 'Text to show when no results are found',
    },
    flatListProps: {
      control: 'object',
      description: 'Additional props for the FlatList component',
    },
    googleApiKey: {
      control: 'text',
      description: 'Google Places API key',
    },
    itemTextClassName: {
      control: 'text',
      description: 'CSS classes for the item text',
    },
    itemTextVariant: {
      control: 'select',
      description: 'Text variant for items',
      options: ['body-1', 'body-2', 'caption', 'heading-1', 'heading-2', 'heading-3', 'heading-4'],
    },
    listClassName: {
      control: 'text',
      description: 'CSS classes for the list container',
    },
    listFooterComponent: {
      control: 'object',
      description: 'Component to render at the bottom of the list',
    },
    listHeaderComponent: {
      control: 'object',
      description: 'Component to render at the top of the list',
    },
    listItemClassName: {
      control: 'text',
      description: 'CSS classes for list items',
    },
    maxListHeight: {
      control: 'number',
      description: 'Maximum height of the results list',
    },
    onChangeText: {
      action: 'changed',
      description: 'Callback when input text changes',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when a place is selected',
    },
    placeHolder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    placeholderTextColor: {
      control: 'color',
      description: 'Color of the placeholder text',
    },
    query: {
      control: 'text',
      description: 'Initial query value',
    },
    queryCountries: {
      control: 'object',
      description: 'List of country codes to restrict the search to',
    },
    renderItem: {
      control: 'object',
      description: 'Custom render function for list items',
    },
    requiredCharactersBeforeSearch: {
      control: 'number',
      description: 'Minimum number of characters before triggering a search',
    },
    requiredTimeBeforeSearch: {
      control: 'number',
      description: 'Delay in milliseconds before triggering a search',
    },
    selectedValue: {
      control: 'select',
      description: 'Type of value to return when a place is selected',
      options: ['longAddress', 'shortAddress', 'postal_code', 'locality', 'country', 'street_number', 'route'],
    },
    showListFooterComponentWhenResults: {
      control: 'boolean',
      description: 'Whether to show footer component when results are available',
    },
    showListHeaderComponentWhenResults: {
      control: 'boolean',
      description: 'Whether to show header component when results are available',
    },
    spinnerColor: {
      control: 'color',
      description: 'Color of the loading spinner',
    },
    spinnerSize: {
      control: 'number',
      description: 'Size of the loading spinner',
    },
    textInputProps: {
      control: 'object',
      description: 'Additional props for the TextInput component',
    },
  },
  component: PlacesInput,
  decorators: [
    Story => (
      <Box className="p-4">
        <Story />
      </Box>
    ),
  ],
  title: 'components/Inputs/PlacesInput',
};

export default meta;
type Story = StoryObj<typeof PlacesInput>;

export const Default: Story = {
  args: {
    className: 'text-black',
    clearable: true,
    clearQueryOnSelect: false,
    containerClassName: 'w-full',
    emptyListText: 'No results found',
    googleApiKey: 'AIzaSyCvc5-EgIoFWRGmuqrnayi8RObdJsaYJSY',
    itemTextClassName: 'text-gray-800',
    itemTextVariant: 'body-2',
    listClassName: 'bg-white',
    listFooterComponent: <String>Footer</String>,
    listHeaderComponent: <String>Header</String>,
    listItemClassName: 'hover:bg-gray-100',
    maxListHeight: 300,
    onChangeText: action('onChangeText'),
    onSelect: action('onSelect'),
    placeHolder: 'Search a place...',
    query: '',
    queryCountries: ['FR'],
    renderItem: undefined,
    requiredCharactersBeforeSearch: 2,
    requiredTimeBeforeSearch: 500,
    selectedValue: 'longAddress',
    showListFooterComponentWhenResults: true,
    showListHeaderComponentWhenResults: true,
    spinnerColor: '#d9d9d9',
    spinnerSize: 24,
    textInputProps: {},
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
    className: 'bg-dark text-white border-dark',
    containerClassName: 'w-full bg-dark',
    itemTextClassName: 'text-white',
    listClassName: 'bg-dark border-dark',
    listItemClassName: 'border-gray-700 hover:bg-gray-700',
    placeholderTextColor: 'white',
    spinnerColor: '#ffffff',
  },
};

export const RoundedStyle: Story = {
  args: {
    ...Default.args,
    className: 'rounded-full px-6 border-2 border-blue-500 focus:border-blue-600',
    containerClassName: 'w-full',
    listClassName: 'rounded-2xl mt-2 border-2 border-blue-500',
    listItemClassName: 'px-6 hover:bg-blue-50',
  },
};

export const ModernMinimal: Story = {
  args: {
    ...Default.args,
    className: 'border-0 border-b-2 border-gray-200 rounded-none focus:border-purple-500 transition-colors',
    containerClassName: 'w-full',
    listClassName: 'shadow-xl border-0 rounded-lg mt-2',
    listItemClassName: 'hover:bg-purple-50',
    spinnerColor: '#9333ea',
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    className: 'bg-orange-50 border-orange-300 text-orange-800',
    containerClassName: 'w-full',
    listClassName: 'bg-warning border-orange-200',
    listItemClassName: 'border-orange-100 hover:bg-orange-100',
    spinnerColor: '#f97316',
  },
};

export const ClearOnSelect: Story = {
  args: {
    ...Default.args,
    clearQueryOnSelect: true,
  },
};
